import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import '../Css/Login.css'; 

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div className="alignCenter"> {/* Use className for applying styles */}
        <video autoPlay muted loop>
    <source src="video5.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        <div className="loginContainer">
          <div className="loginImgContainer">
            <img src="https://cdn-icons-png.flaticon.com/256/7381/7381253.png" alt="Login" className="loginImage" />
          </div>
          <h2 className="title">CUSTOMER LOGIN</h2>
          <form>
            <div className="inputGroup">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={this.state.txtUsername}
                onChange={(e) => {
                  this.setState({ txtUsername: e.target.value });
                }}
                className="input" // Apply input style
              />
            </div>
            <div className="inputGroup">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={this.state.txtPassword}
                onChange={(e) => {
                  this.setState({ txtPassword: e.target.value });
                }}
                className="input" // Apply input style
              />
            </div>
            <div className="inputGroup">
              <input
                type="submit"
                value="LOGIN"
                onClick={(e) => this.btnLoginClick(e)}
                className="submitButton" // Apply submitButton style
              />
            </div>
            <div className="forgotPassword">
              <Link to="/resetpwd" className="forgotPasswordLink">
                Forgot Username / Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.warning('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        toast.success('Welcome to ShoppingOnline');
      } else {
        toast.error(result.message);
      }
    });
  }
}

export default withRouter(Login);
