import React from 'react';
import { connect } from 'react-redux' ;
import { routes } from '../../../../config/routes-config';
import { NavLink } from 'react-router-dom';
import './menu.css';

const Menu = ({ user }) => (
  <ul className="menu menu-items">
    <li>
      <NavLink exact activeClassName="active" to={routes.dashboard.path}>Home</NavLink>
      {user && <NavLink exact activeClassName="active" to={routes.profile.path}>Profile</NavLink> }
    </li>
  </ul>
);

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps, null, null, { pure: false });

export default enhance(Menu);
