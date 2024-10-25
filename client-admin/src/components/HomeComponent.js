import React, { Component } from 'react';
import '../Css/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-centerhome">
          <i className="fas fa-cog spinning-icon"></i> WELCOME TO THE ADMIN HOME
        </h2>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f483_1f3fb/512.gif" width="700px" height="500px" alt="💃" />
      </div>
    );
  }
}
export default Home;
