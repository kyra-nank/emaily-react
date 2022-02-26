// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields() {
    return (
      _.map(formFields, ({ label, name }) => {
        return <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />;
      })
    );
  }


  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" style={{ marginTop: "30px" }} className="red btn-flat white-text left">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" style={{ marginTop: "30px" }} className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // if all emails are valid, validate returns undefined
  errors.recipients = validateEmails(values.recipients || '');

  // can't leave a field empty, basically enforcing *required*
  _.each(formFields, ({ label, name }) => {

    // change "a" to "an" if there's a vowel
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let grammarPolice = 'a';
    if (vowels.indexOf(label[0].toLowerCase()) !== -1) {
      grammarPolice = 'an';
    }

    if (!values[name]) {
      errors[name] = `You must provide ${grammarPolice} ${label.toLowerCase()}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);