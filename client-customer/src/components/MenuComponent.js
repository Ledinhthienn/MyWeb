import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Css/Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      placeholder: '',
      isTyping: false,
      isLoading: true,
      error: null
    };
    this.autoTypeText = "Hôm nay bạn cần mua gì?"; 
    this.index = 0;
    this.timer = null; 
    this.inactivityTimeout = null; 
  }

  render() {
    const { categories, isLoading, error, txtKeyword, placeholder } = this.state;

    if (isLoading) {
      return <p>Loading categories...</p>;
    }

    if (error) {
      return <p>Error fetching categories: {error.message}</p>;
    }

    const cates = categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={'/product/category/' + item._id} className="styled-link">{item.name}</Link>
        </li>
      );
    });

    return (
      <div className="border-bottom menu-container">
        <ul className="menu">
          <li className="menu">
            <Link to='/' className="home-style">
              <span className="letter">T</span>
              <span className="letter">e</span>
              <span className="letter">c</span>
              <span className="letter">h</span>
              <span className="letter">Z</span>
              <span className="letter">o</span>
              <span className="letter">n</span>
              <span className="letter">e</span>
            </Link>
          </li>
          {cates}
        </ul>

        <form className="search" onSubmit={(e) => this.btnSearchClick(e)}>
          <input
            type="search"
            placeholder={placeholder}
            className="keyword"
            value={txtKeyword}
            onFocus={this.handleFocus}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            onBlur={this.handleBlur}
          />
          <button type="submit" className="styled-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
    this.typeEffect();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.inactivityTimeout); 
  }

  typeEffect = () => {
    this.timer = setInterval(() => {
      if (this.index < this.autoTypeText.length) {
        this.setState((prevState) => ({
          placeholder: this.autoTypeText.substring(0, this.index + 1),
        }));
        this.index++;
      } else {
        clearInterval(this.timer);
        setTimeout(() => {
          this.setState({ placeholder: '' });
          this.index = 0;
          this.typeEffect();
        }, 1500);
      }
    }, 200);
  };

  handleFocus = () => {
    this.setState({ placeholder: '', isTyping: true });
    clearInterval(this.timer);
    clearTimeout(this.inactivityTimeout);
  };

  handleBlur = () => {
    this.setState({ isTyping: false });
    this.restartTypingEffect();
  };

  restartTypingEffect = () => {
    clearTimeout(this.inactivityTimeout); 
    this.inactivityTimeout = setTimeout(() => {
      this.index = 0;
      this.setState({ placeholder: '' }, () => {
        this.typeEffect();
      });
    }, 2000);
  };

  btnSearchClick(e) {
    e.preventDefault();
    const { txtKeyword } = this.state;
    if (txtKeyword.trim() !== '') {
      this.props.navigate('/product/search/' + txtKeyword);
    } else {
      alert('Please enter a keyword to search.');
    }
  }

  apiGetCategories() {
    axios.get('/api/customer/categories')
      .then((res) => {
        this.setState({ categories: res.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  }
}

export default withRouter(Menu);