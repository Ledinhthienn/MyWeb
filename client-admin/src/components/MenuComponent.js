import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaBox, FaClipboardList, FaUsers, FaChartLine, FaSignOutAlt, FaHandPaper } from 'react-icons/fa';
import '../Css/Menu.css';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    return (
      <div className="menu-container">
        <div className="menu-content">
          <div className="menu-left">
            <div className="admin-greeting">
              <FaHandPaper className="icon"/>
              <span className="text">Hi, <b>{this.context.username}</b></span>
            </div>
            <ul className="menu-list">
              <li className="menu-item"><Link to='/admin/home'><FaHome /> Home</Link></li>
              <li className="menu-item"><Link to='/admin/category'><FaList /> Category</Link></li>
              <li className="menu-item"><Link to='/admin/product'><FaBox /> Product</Link></li>
              <li className="menu-item"><Link to='/admin/order'><FaClipboardList /> Order</Link></li>
              <li className="menu-item"><Link to='/admin/customer'><FaUsers /> Customer</Link></li>
              <li className="menu-item"><Link to='/admin/statistics'><FaChartLine /> Statistics</Link></li>
            </ul>
          </div>
          <div className="menu-right">
            <Link to='/admin/home' className="logout-link" onClick={() => this.lnkLogoutClick()}><FaSignOutAlt /> Logout</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
