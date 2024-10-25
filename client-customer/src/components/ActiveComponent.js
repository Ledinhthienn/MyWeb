import React, { Component } from 'react';
import axios from 'axios';
import { FaIdBadge, FaKey } from 'react-icons/fa';
import '../Css/Active.css'; // Import file CSS

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }

  render() {
    return (
      <div className="body-active"> 
        <video autoPlay muted loop className="video-background">
    <source src="video3.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        <div className="container-active"> 
          <h2 className="header-active">ACTIVE ACCOUNT</h2> 
          <form className="form-active"> 
            <div className="inputGroup-active"> 
              <span className="icon-active"><FaIdBadge /></span> 
              <input
                type="text"
                value={this.state.txtID}
                onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                placeholder="ID"
                className="input-active" 
              />
            </div>
            <div className="inputGroup-active"> 
              <span className="icon-active"><FaKey /></span> 
              <input
                type="text"
                value={this.state.txtToken}
                onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
                placeholder="Token"
                className="input-active" 
              />
            </div>
            <input
              type="submit"
              value="ACTIVE"
              onClick={(e) => this.btnActiveClick(e)}
              className="submitButton-active" 
            />
          </form>
        </div>
      </div>
    );
  }

  // Event handler
  btnActiveClick = (e) => {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert('Please input ID and Token');
    }
  };

  // API call
  apiActive = (id, token) => {
    const body = { id, token };
    axios.post('/api/customer/active', body)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY!');
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        alert('Error occurred while trying to activate account.');
      });
  };
}

export default Active;
