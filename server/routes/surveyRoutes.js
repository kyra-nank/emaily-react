const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // could have just required in Surveys model, but this is safer (pulling from model)

module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // p obj we can use to look at the surveyId and choice

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname); // extract, returns { surveyId: '621bfca9ee4fff0e251027db', choice: 'yes' }
        if (match) {
          return { email: email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // returns non-undefined objects
      .uniqBy('email', 'surveyId') // only unique email&&surveyId pairs
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({});

  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => { return { email: email.trim() }; }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      // send an email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();

      // deduct 1 credit
      req.user.credits -= 1;
      const user = await req.user.save();

      // send back updated user model
      res.send(user);

    } catch (e) {
      res.status(422).send(err);
    }


  });

};