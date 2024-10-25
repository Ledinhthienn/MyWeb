require('../utils/MongooseUtil');
const Models = require('./Models');

const OrderDAO = {
  async insert(order) {
    const mongoose = require('mongoose');
    order._id = new mongoose.Types.ObjectId();
    const result = await Models.Order.create(order);
    return result;
  },
  async selectByCustID(_cid) {
    const query = { 'customer._id': _cid };
    const orders = await Models.Order.find(query).exec();
    return orders;
  },
  async selectAll() {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const orders = await Models.Order.find(query).sort(mysort).exec();
    return orders;
  },
  async update(_id, newStatus) {
    const newvalues = { status: newStatus };
    const result = await Models.Order.findByIdAndUpdate(_id, newvalues, { new: true });
    return result;
  },
  async selectByCount(){
    const query ={};
    const noOrders = await Models.Order.find(query).count().exec();
    return noOrders;
  },
  async selectByCountStatus(status){
    const query ={ status: status };
    const noOrders = await Models.Order.find(query).count().exec();
    return noOrders;
  },
  async sumTotalApproved() {
    const result = await Models.Order.aggregate([
      { $match: { status: "APPROVED" } }, // Chỉ lấy các đơn hàng "APPROVED"
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } } // Tính tổng "total"
    ]).exec();
  
    return result.length > 0 ? result[0].totalRevenue : 0; // Trả về tổng doanh thu hoặc 0 nếu không có đơn hàng nào
  }
};
module.exports = OrderDAO;