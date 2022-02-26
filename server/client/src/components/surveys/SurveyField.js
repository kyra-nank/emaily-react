// SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {

  return (
    <div style={{ marginTop: "30px" }}>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "1rem", height: "2rem" }} />
      <div style={{ color: "red", marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  );
};