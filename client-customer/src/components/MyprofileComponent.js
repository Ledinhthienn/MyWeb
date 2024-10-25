import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../Css/MyProfile.css'; // Import CSS cho kiểu dáng

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtEmail: '',
      txtPhone: '',
      showPassword: false, // Ẩn/hiện mật khẩu
      redirectToHome: false, // Trạng thái điều hướng về trang chủ
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtEmail: this.context.customer.email || '',
        txtPhone: this.context.customer.phone || '',
      });
    }
  }

  btnUpdateClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtEmail, txtPhone } = this.state;
    if (txtUsername && txtPassword && txtEmail && txtPhone) {
      const customer = { 
        username: txtUsername, 
        password: txtPassword, 
        email: txtEmail, 
        phone: txtPhone 
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input all fields');
    }
  };

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/customer/customers/${id}`, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Update successful!');
        this.context.setCustomer(result);
      } else {
        alert('Update failed!');
      }
    });
  }

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleBackClick = () => {
    this.setState({ redirectToHome: true });
  };

  render() {
    const { token } = this.context;
    const { redirectToHome } = this.state;

    if (redirectToHome) {
      return <Navigate to="/" />;
    }

    if (token === '') return <Navigate replace to='/login' />;

    return (
    <div className='body-profile'>
              <video autoPlay loop muted className="background-video">
          <source src="video-profile.mp4" type="video/mp4" />
        </video>
      <div className="form-container">
        <form className="custom-form">
          <h1 className="form-title">My Profile</h1>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                placeholder="Username"
                value={this.state.txtUsername}
                readOnly
                className="no-change"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-icon">
              <FaLock />
              <input
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
              <span onClick={this.toggleShowPassword} className="toggle-password">
                {this.state.showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                placeholder="example@company.com"
                value={this.state.txtEmail}
                onChange={(e) => this.setState({ txtEmail: e.target.value })}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <div className="input-icon">
              <FaPhone />
              <input
                type="tel"
                placeholder="Phone Number"
                value={this.state.txtPhone}
                onChange={(e) => this.setState({ txtPhone: e.target.value })}
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="form-row">
            <button type="submit" className="submit-button" onClick={this.btnUpdateClick}>
              UPDATE
            </button>
          </div>

{/* Back Button */}
<div className="form-row">
  <button type="button" className="back-button" onClick={this.handleBackClick}>
    <span className="hand left-hand">👉</span>
    <span className="text">BACK TO HOME</span>
    <span className="hand right-hand">👈</span>
  </button>
</div>

        </form>
      </div>
      </div>
    );
  }
}

export default Myprofile;
