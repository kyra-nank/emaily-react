import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return <li><a>Logout</a></li>
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">Emaily</a>

          <ul className="right">
            {this.renderContent()}
          </ul>

        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);