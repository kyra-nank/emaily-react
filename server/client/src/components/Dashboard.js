import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = function () {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link
          class="btn-floating btn-large waves-effect waves-light red"
          to="/surveys/new"
        >
          <i class="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;