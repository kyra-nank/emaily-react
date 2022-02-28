import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <div style={{ textAlign: 'center' }}>
            <h1>
              Emaily!
            </h1>
            Collect feedback from your users.
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center' }}>
            <h3>
              Welcome back to Emaily!
            </h3>
            <Link className="btn" to="/surveys">View Surveys</Link>
            <div className="fixed-action-btn">
              <Link
                className="btn-floating btn-large waves-effect waves-light red"
                to="/surveys/new"
              >
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
        );
    }
  }


  render() {
    return (
      <>
        {this.renderContent()}
      </>
    );
  }

};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Landing);