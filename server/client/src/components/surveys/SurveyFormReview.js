// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router';
import * as actions from '../../actions';

const SurveyFormReview = ({ onSurveyEdit, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} style={{ marginTop: "30px" }}>
        <label>{label}</label>
        <div style={{ marginBottom: "1rem", height: "2rem" }}>
          {formValues[name]}
        </div>
      </div>
    );
  });


  return (
    <div>
      <h5>Please confirm your entries.</h5>
      {reviewFields}
      <button
        className="red btn-flat white-text"
        onClick={onSurveyEdit}
        style={{ marginTop: "30px" }}
      >
        Edit
        <i className="material-icons right">edit</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="teal btn-flat right white-text"
        style={{ marginTop: "30px" }}>
        Send Survey
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));