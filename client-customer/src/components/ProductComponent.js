import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../Css/Product.css'; // Import CSS cho kiểu dáng

const styles = {
  body: {
    background: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  productList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  productCard: {
    position: 'relative',
    width: '22%',
    height: '520px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  productCardHovered: {
    transform: 'scale(1.1)',
  },
  productImage: {
    display: 'block',
    margin: '12px auto',
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease',
  },
  productDetails: {
    position: 'absolute',
    bottom: '60px',
    left: '0',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    boxSizing: 'border-box',
    borderTop: '1px solid #ccc',
    transition: 'transform 0.3s ease',
  },
  productName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    transition: 'color 0.3s ease',
    color: '#0000EE',
  },
  productPrice: {
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'red',
  },
  buyNowButton: {
    display: 'none', 
    width: '80%',
    textAlign: 'center',
    margin: '-40px auto 0',
    padding: '5px',
    backgroundImage: 'linear-gradient(to right, #ff4450, #ff8c00)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
  selectBox: {
    padding: '10px',
    fontSize: '18px',
    border: '4px solid #00008B',
    borderRadius: '5px',
    fontWeight: 'bold',
    color: '#000088',
  },
  listProducts: {
    background: '-webkit-linear-gradient(left, violet, indigo, blue, green, yellow, orange, red)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  linkImage: {
    display: 'block',
    margin: '0 auto',
    width: '290px',
    height: 'auto',
    position: 'relative',
    top: '-40px',
    left: '-6px',
  },
  discountBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  note: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '90px',
    justifyContent: 'center',
  },
  bag: {
    backgroundColor: 'orange',
    color: 'white',
    padding: '5px',
    borderRadius: '3px',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  textOrange: {
    color: 'orange',
    fontWeight: 'bold',
    marginLeft: '5px',
  },
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: 'default',
    };

    this.topFunction = this.topFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
        // Ẩn nút ngay khi load trang
  const mybutton = document.getElementById("backToTopBtnProduct");
  if (mybutton) {
    mybutton.style.display = "none";
  }
    window.addEventListener('scroll', this.scrollFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction);
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get(`/api/customer/products/category/${cid}`).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get(`/api/customer/products/search/${keyword}`).then((res) => {
      this.setState({ products: res.data });
    });
  }

  cmbSortChange(sort) {
    const sortedProducts = [...this.state.products];
    if (sort === 'nameASC') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nameDESC') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'priceASC') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDESC') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    this.setState({ products: sortedProducts, sort });
  }

  scrollFunction() {
    const mybutton = document.getElementById('backToTopBtnProduct');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleMouseEnter(index) {
    const products = [...this.state.products];
    products[index].hovered = true;
    this.setState({ products });
  }

  handleMouseLeave(index) {
    const products = [...this.state.products];
    products[index].hovered = false;
    this.setState({ products });
  }

  formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  render() {
    const { products, sort } = this.state;

    return (
      <div style={styles.body}>
        <h2 className="text-center" style={styles.listProducts}>
          LIST PRODUCTS
        </h2>
        <div style={styles.sortBy}>
          <select
            value={sort}
            onChange={(e) => {
              this.cmbSortChange(e.target.value);
            }}
            style={styles.selectBox}
          >
            <option value="default">------ Sort by ------</option>
            <option value="nameASC">Name (a &#8594; z)</option>
            <option value="nameDESC">Name (z &#8594; a)</option>
            <option value="priceASC">Price (low &#8594; high)</option>
            <option value="priceDESC">Price (high &#8594; low)</option>
          </select>
        </div>
        <div style={styles.productList}>
          {products.map((item, index) => (
            <div
              key={item._id}
              className="product-card"
              style={{
                ...styles.productCard,
                ...(item.hovered ? styles.productCardHovered : {}),
              }}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={() => this.handleMouseLeave(index)}
            >
              <Link to={`/product/${item._id}`}>
                <div style={styles.discountBadge}>-500.000đ</div>
                <img
                  src={`data:image/jpg;base64,${item.image}`}
                  alt={item.name}
                  style={styles.productImage}
                />
                <div className="product-details" style={styles.productDetails}>
                  <div className="product-name" style={styles.productName}>
                    {item.name}
                  </div>
                  <div className="product-price" style={styles.productPrice}>
                    Price: {this.formatPrice(item.price)}
                  </div>
                </div>
              </Link>
              <img
                src="https://24hstore.vn/images/sticky/original/sticky-gv-hssv-100k_1721229183.webp"
                alt="Link Image"
                style={styles.linkImage}
              />
              <Link to={`/product/${item._id}`} style={{ ...styles.buyNowButton, display: item.hovered ? 'block' : 'none' }}>
                Buy Now
              </Link>
              <div style={styles.note}>
                <span style={styles.bag}>KM</span>
                <label title="Trả góp tới 06 tháng không lãi suất, trả trước 0 đồng với Samsung Finance+.">
                  Trả góp tới 06 tháng không lãi suất...
                </label>
                <strong style={styles.textOrange}> VÀ 12 KM KHÁC</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Back to top button */}
        <button onClick={this.topFunction} id="backToTopBtnProduct" title="Go to top">
          <img
            src="https://24hstore.vn/images/back.svg"
            alt="Go to top"
            style={{ width: '24px', height: '24px' }}
          />
          <div>Quay về đầu trang</div>
        </button>
      </div>
    );
  }
}

export default withRouter(Product);