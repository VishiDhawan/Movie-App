import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      usernameRequired: 'dispNone',
      username: '',
      loginPasswordRequired: 'dispNone',
      loginPassword: '',
      firstnameRequired: 'dispNone',
      firstname: '',
      lastnameRequired: 'dispNone',
      lastname: '',
      emailRequired: 'dispNone',
      email: '',
      registerPasswordRequired: 'dispNone',
      registerPassword: '',
      contactRequired: 'dispNone',
      contact: '',
      registrationSuccess: false,
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true
    };
  }

  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      usernameRequired: 'dispNone',
      username: '',
      loginPasswordRequired: 'dispNone',
      loginPassword: '',
      firstnameRequired: 'dispNone',
      firstname: '',
      lastnameRequired: 'dispNone',
      lastname: '',
      emailRequired: 'dispNone',
      email: '',
      registerPasswordRequired: 'dispNone',
      registerPassword: '',
      contactRequired: 'dispNone',
      contact: ''
    });
  };

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  loginClickHandler = () => {
    this.state.username === '' ? this.setState({ usernameRequired: 'dispBlock' }) : this.setState({ usernameRequired: 'dispNone' });
    this.state.loginPassword === '' ? this.setState({ loginPasswordRequired: 'dispBlock' }) : this.setState({ loginPasswordRequired: 'dispNone' });

    fetch(`${this.props.baseUrl}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(`${this.state.username}:${this.state.loginPassword}`)}`,
        'Cache-Control': 'no-cache',
      },
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('uuid', data.id);

        if (data['access-token'] !== null) {
          sessionStorage.setItem('access-token', data['access-token']);
        }

        this.setState({
          loggedIn: true
        });

        this.closeModalHandler();
      })
      .catch(error => console.error('Error during login:', error));
  };

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  registerClickHandler = () => {
    this.state.firstname === '' ? this.setState({ firstnameRequired: 'dispBlock' }) : this.setState({ firstnameRequired: 'dispNone' });
    this.state.lastname === '' ? this.setState({ lastnameRequired: 'dispBlock' }) : this.setState({ lastnameRequired: 'dispNone' });
    this.state.email === '' ? this.setState({ emailRequired: 'dispBlock' }) : this.setState({ emailRequired: 'dispNone' });
    this.state.registerPassword === '' ? this.setState({ registerPasswordRequired: 'dispBlock' }) : this.setState({ registerPasswordRequired: 'dispNone' });
    this.state.contact === '' ? this.setState({ contactRequired: 'dispBlock' }) : this.setState({ contactRequired: 'dispNone' });

    let dataSignup = JSON.stringify({
      "email_address": this.state.email,
      "first_name": this.state.firstname,
      "last_name": this.state.lastname,
      "mobile_number": this.state.contact,
      "password": this.state.registerPassword
    });

    fetch(`${this.props.baseUrl}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: dataSignup,
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          registrationSuccess: true
        });
      })
      .catch(error => console.error('Error during registration:', error));
  };

  // ... other methods

  logoutHandler = () => {
    let dataSignout = JSON.stringify({
      "uuid": sessionStorage.getItem("uuid")
    });

    fetch(`${this.props.baseUrl}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: dataSignout,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Logged Out successfully.') {
          sessionStorage.removeItem('uuid');
          sessionStorage.removeItem('access-token');

          this.setState({
            loggedIn: false
          });
        }
      })
      .catch(error => console.error('Error during logout:', error));
  };

  // ... render method and other JSX

  render() {
    return (
      <div>
        {/* ... existing JSX */}
      </div>
    );
  }
}

export default Header;
