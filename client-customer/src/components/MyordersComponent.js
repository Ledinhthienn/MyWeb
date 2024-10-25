import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import '../Css/Myorders.css';
import axios from 'axios';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedOrder: null,
      isModalOpen: false,
      activeTab: 'all',
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/customer/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      const sortedOrders = result.sort((a, b) => new Date(b.cdate) - new Date(a.cdate));
      this.setState({ orders: sortedOrders });
    });
  }

  formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  }

  toggleModal(order = null) {
    this.setState({
      selectedOrder: order,
      isModalOpen: !this.state.isModalOpen,
    });
  }

  getFilteredOrders() {
    const { orders, activeTab } = this.state;
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === activeTab);
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;

    const { selectedOrder, isModalOpen, activeTab } = this.state;
    const filteredOrders = this.getFilteredOrders();

    return (
      <div className="body">
        <div className="orderListContainer">
          <h2 className="detailHeader">ORDER LIST</h2>

          <div className="tabContainer">
            <div
              className={`tabItem ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => this.setActiveTab('all')}
            >
              Tất cả
            </div>
            <div
              className={`tabItem ${activeTab === 'approved' ? 'active' : ''}`}
              onClick={() => this.setActiveTab('approved')}
            >
              Approved
            </div>
            <div
              className={`tabItem ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => this.setActiveTab('pending')}
            >
              Pending
            </div>
            <div
              className={`tabItem ${activeTab === 'canceled' ? 'active' : ''}`}
              onClick={() => this.setActiveTab('canceled')}
            >
              Canceled
            </div>
          </div>

          <table className="table">
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="datatable tableRow"
                  onClick={() => this.toggleModal(order)}
                >
                  <td className="tableCell">{order._id}</td>
                  <td className="tableCell">{new Date(order.cdate).toLocaleString()}</td>
                  <td className="tableCell">{order.customer.name}</td>
                  <td className="tableCell">{order.customer.phone}</td>
                  <td className="tableCell">{this.formatPrice(order.total)}</td>
                  <td
                    className={
                      order.status === 'APPROVED'
                        ? 'statusApproved'
                        : order.status === 'PENDING'
                        ? 'statusPending'
                        : 'statusCanceled'
                    }
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedOrder && (
          <div className="modal">
            <div className="modalContent">
              <button onClick={() => this.toggleModal()}>Close</button>
              <h3 className="orderdetail">ORDER DETAIL</h3>
              <table className="table">
                <thead>
                  <tr className="tableHeader">
                    <th>No.</th>
                    <th>Prod. ID</th>
                    <th>Prod. name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={item.product._id}>
                      <td className="tableCell">{index + 1}</td>
                      <td className="tableCell">{item.product._id}</td>
                      <td className="tableCell">{item.product.name}</td>
                      <td className="tableCellImage">
                        <img src={`data:image/jpg;base64,${item.product.image}`} alt="" />
                      </td>
                      <td className="tableCell">{this.formatPrice(item.product.price)}</td>
                      <td className="tableCell">{item.quantity}</td>
                      <td className="tableCell">{this.formatPrice(item.product.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}


export default Myorders;
