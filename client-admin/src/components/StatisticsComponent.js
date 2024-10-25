import axios from "axios";
import React, { Component, createRef } from "react";
import MyContext from "../contexts/MyContext";
import '../Css/Statistics.css';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

class Statistics extends Component {
    static contextType = MyContext; // using this.context to access global state 
    constructor(props) {
        super(props);
        this.state = {
            noCategories: 0,
            noProducts: 0,
            noOrders: 0,
            noOrdersPending: 0,
            noOrdersApproved: 0,
            noOrdersCanceled: 0,
            noOrdersRevenue: 0,  // Default doanh thu là 0
            noCustomers: 0
        };
        this.statisticsRef = createRef(); // Create a ref for the statistics container
    }

    formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    render() {
        return (
            <div>
                <div className="statistics-container" ref={this.statisticsRef}>
                    <div className="statistics-header text-center">
                        <h2>STATISTICS</h2> 
                        <table id="statistics-table" className="statistics-table align-center">
                            <tbody> 
                                <tr className="statistics-section-heading">
                                    <td colSpan="3">Quản lí bán hàng</td>
                                </tr>
                                <tr>
                                    <td align="right">📂No. Categories: </td> 
                                    <td></td>
                                    <td>{this.state.noCategories}</td>
                                </tr>
                                <tr>
                                    <td align="right">📦No. Products: </td> 
                                    <td></td>
                                    <td>{this.state.noProducts}</td>
                                </tr>
                                <tr>
                                    <td align="right">🛒 No. Orders: </td> 
                                    <td></td>
                                    <td>{this.state.noOrders}</td>
                                </tr>
                                <tr>
                                    <td align="right">👥 No. Customers: </td>
                                    <td></td> 
                                    <td>{this.state.noCustomers}</td>
                                </tr>
                                <tr className="statistics-section-heading">
                                    <td colSpan="3">Quản lí tài khoản</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td align="right">⏳Pending: &ensp; </td>
                                    <td>{this.state.noOrdersPending}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td align="right">✅Approved: &ensp; </td>
                                    <td>{this.state.noOrdersApproved}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td align="right">❌Canceled: &ensp; </td>
                                    <td>{this.state.noOrdersCanceled}</td>
                                </tr>
                                <tr className="statistics-section-heading">
                                    <td colSpan="3">Quản lí doanh thu</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td align="right">💵Revenue: &ensp; </td>
                                    {/* Nếu doanh thu là null hoặc 0, hiển thị 0 */}
                                    <td>{this.formatPrice(this.state.noOrdersRevenue || 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="export-button" onClick={this.exportToPDF}>Export to PDF</button>
            </div>
        );
    }

    componentDidMount() {
        this.apiGetStatistics();
    }
    
    // apis
    apiGetStatistics() {
        const config = { headers: { 'x-access-token': this.context.token } }; 
        axios.get('/api/admin/statistics', config).then((res) => {
            const result = res.data;
            this.setState({
                noCategories: result.noCategories, 
                noProducts: result.noProducts,
                noOrders: result.noOrders,
                noOrdersPending: result.noOrdersPending, 
                noOrdersApproved: result.noOrdersApproved, 
                noOrdersCanceled: result.noOrdersCanceled, 
                // Nếu doanh thu trả về là null, gán về 0
                noOrdersRevenue: result.noOrdersRevenue || 0,  
                noCustomers: result.noCustomers
            });
        }).catch(error => {
            console.error("Error fetching statistics:", error);
        });
    }

    exportToPDF = () => {
        if (window.confirm("Are you sure you want to export to PDF?")) {
            const input = this.statisticsRef.current;
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save("statistics.pdf");
            });
        }
    }
}

export default Statistics;
