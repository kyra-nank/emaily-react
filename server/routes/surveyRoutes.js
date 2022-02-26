const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys'); // could have just required in Surveys model, but this is safer (pulling from model)

module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => { return { email: email.trim() } }),
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