import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    padding: '15px'
  },
  productMain: {
    display: 'flex',
    marginBottom: '20px'
  },
  productImageContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  },
  productImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease'
  },
  productDetails: {
    flex: '1',
    padding: '20px',
    textAlign: 'left'
  },
  detailRow: {
    marginBottom: '10px'
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px'
  },
  quantityInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '50px',
    textAlign: 'center',
    marginRight: '10px'
  },
  addToCartButton: {
    background: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
    fontWeight:'bold'
  },
  addToCartButtonHover: {
    backgroundColor: '#219653'
  },
  productTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(#6B00FF, #00FF8E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center', // Center the button
    marginBottom: '10px'
  },
  policies: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '20px',
    borderTop: '1px solid #ddd',
    marginTop: '20px'
  },
  policyItem: {
    flex: '1 1 45%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  policyIcon: {
    marginRight: '10px'
  }
};

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  apiGetProduct(id) {
    axios.get(`/api/customer/products/${id}`).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  btnAdd2CartClick = (e) => {
    e.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Product added to cart successfully!');
    } else {
      alert('Please input quantity');
    }
  };

  render() {
    const prod = this.state.product;
    if (!prod) return null;

    return (
      <div style={styles.body}>
        <div className="product-container" style={styles.productContainer}>
          <div className="product-main" style={styles.productMain}>
            <div style={styles.productImageContainer}>
              <img src={`data:image/jpg;base64,${prod.image}`} alt={prod.name} style={styles.productImage} />
            </div>
            <div style={styles.productDetails}>
              <h2 className="text-center" style={styles.productTitle}>PRODUCT DETAILS</h2>
              <div style={styles.detailRow}>
                <span style={styles.label}>ID:</span>
                {prod._id}
              </div>
              <div style={styles.detailRow}>
                <span style={styles.label}>Name:</span>
                {prod.name}
              </div>
              <div style={styles.detailRow}>
                <span style={styles.label}>Price:</span>
                {formatPrice(prod.price)}
              </div>
              <div style={styles.detailRow}>
                <span style={styles.label}>Category:</span>
                {prod.category.name}
              </div>
              <div style={styles.detailRow}>
                <span style={styles.label}>Quantity:</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={this.state.txtQuantity}
                  onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}
                  style={styles.quantityInput}
                />
              </div>
              <div style={styles.buttonRow}>
                <button
                  type="submit"
                  onClick={this.btnAdd2CartClick}
                  style={styles.addToCartButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#219653'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div style={styles.policies}>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Hang_chinh_hang_0b0233a2c6.svg?w=32&q=60" alt="Chính hãng" style={styles.policyIcon} />
              <span>Hàng chính hãng</span>
            </div>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Mien_phi_giao_hang_3339a0ce65.svg?w=32&q=60" alt="Giao hàng" style={styles.policyIcon} />
              <span>Giao hàng miễn phí trong 90 phút</span>
            </div>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Doi_tra_59d1881db4.svg?w=32&q=60" alt="Đổi trả" style={styles.policyIcon} />
              <span>Chính sách đổi trả</span>
            </div>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Bao_hanh_9415bfe460.svg?w=32&q=60" alt="Bảo hành" style={styles.policyIcon} />
              <span>Bảo hành (tháng): 12</span>
            </div>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Cai_dat_21382ecc84.svg?w=32&q=60" alt="Hỗ trợ" style={styles.policyIcon} />
              <span>Hỗ trợ cài đặt miễn phí</span>
            </div>
            <div style={styles.policyItem}>
              <img src="https://cdn2.fptshop.com.vn/svg/Type_Tra_gop_0362e63008.svg?w=32&q=60" alt="Trả góp" style={styles.policyIcon} />
              <span>Chính sách trả góp</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
