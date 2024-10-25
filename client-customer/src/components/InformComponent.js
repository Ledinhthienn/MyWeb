import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faCheckCircle, faShoppingCart, faSignOutAlt, faUserCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import '../Css/Inform.css';

class Inform extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.lnkLogoutClick = this.lnkLogoutClick.bind(this);
  }

  render() {
    const customerName = this.context.customer ? this.context.customer.name : '';

    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ? (
            <div>
              <div className="tooltip-container">
                <Link to="/login" className="styled-link login-link">
                  <FontAwesomeIcon icon={faUser} className="link-icon" /> Login
                </Link>
                <div className="tooltip-content">
                  <img src="hi-dangnhap.gif" alt="Login" className="tooltip-image" />
                  <span className="tooltip-text">Đăng nhập để trải nghiệm mua sắm thuận tiện và dễ dàng hơn</span>
                </div>
              </div> |
              <Link to="/signup" className="styled-link signup-link">
                <FontAwesomeIcon icon={faUserPlus} className="link-icon" /> Sign-up
              </Link> |
              <Link to="/active" className="styled-link active-link">
                <FontAwesomeIcon icon={faCheckCircle} className="link-icon" /> Active
              </Link>
            </div>
          ) : (
            <div>
              <span className="greeting">Hi, </span>
              <b className="ten-khach-hang">{customerName.split('').map((char, index) => (
                <span key={index}>{char}</span>
              ))}</b> |
              <Link to="/home" className="styled-link logout-link" onClick={this.lnkLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} className="link-icon" /> Logout
              </Link> |
              <Link to="/myprofile" className="styled-link profile-link">
                <FontAwesomeIcon icon={faUserCircle} className="link-icon" /> My profile
              </Link> |
              <Link to="/myorders" className="styled-link orders-link">
                <FontAwesomeIcon icon={faClipboardList} className="link-icon" /> My orders
              </Link>
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to="/mycart" className="styled-link cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="link-icon" /> My cart
          </Link> <b>have <span className="cart-item-count">{this.context.mycart.length}</span> items</b>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      this.context.setToken('');
      this.context.setCustomer(null);
      this.context.setMycart([]);
    }
  }
  
}

export default Inform;
