import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
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
    if (this.context.token === '') {
      return (
        <div className="login-body">
          <div className="login-card">
            <h2 className="login-header">ADMIN LOGIN</h2>
            <form className="login-form">
              <table>
                <tbody>
                  <tr>
                    <td className="login-label">Username:</td>
                    <td>
                      <input 
                        type="text" 
                        value={this.state.txtUsername} 
                        onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
                        className="login-input" 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="login-label">Password:</td>
                    <td>
                      <input 
                        type="password" 
                        value={this.state.txtPassword} 
                        onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                        className="login-input" 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input 
                        type="submit" 
                        value="LOGIN" 
                        onClick={(e) => this.btnLoginClick(e)} 
                        className="login-submit" 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      );
    }
    return (<div />);
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
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
