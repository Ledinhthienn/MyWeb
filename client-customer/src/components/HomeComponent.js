import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Css/Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      banners: [
        "laptop-amd-1200x375.png",
        "web-huawel-fit-3-web.jpg",
        "xiaomi-redmi-12-web.png",
        "s24-ultra-1200x375_638551915514340880.jpg",
        "ocal-tiger-1200x375.png",
        "tecno-camon-30-1200x375.jpg",
        "honor-x7b-1200x375.jpg",
        "1200x375.png",
        "1200x375-msi-150624.png",
        "sennheiser-1200x375.jpg",
        "xiaomi-14-1200-x-375.jpg"
      ],
      techNews: [
        {
          title: "Bộ sưu tập laptop văn phòng và sáng tạo nội dung ASUS tại Computex 2024",
          link: "https://genk.vn/bo-suu-tap-laptop-van-phong-va-sang-tao-noi-dung-asus-tai-computex-2024-2024060323564376.chn",
          image: "imgtechnew1.webp"
        },
        {
          title: "Những cải tiến đáng chú ý của dòng AMD Ryzen 8000 dành cho laptop",
          link: "https://genk.vn/nhung-cai-tien-dang-chu-y-cua-dong-amd-ryzen-8000-danh-cho-laptop-20240321121313802.chn",
          image: "imgtechnew2.webp"
        },
        {
          title: "Ra mắt điện thoại pin 10600 mAh",
          link: "https://genk.vn/ra-mat-dien-thoai-pin-10600-mah-2024062311150792.chn",
          image: "imgtechnew3.webp"
        },
        {
          title: "Skyworth đột phá thế hệ mới với tivi Coocaa cải tiến bảo vệ sức khỏe người tiêu dùng",
          link: "https://genk.vn/skyworth-dot-pha-the-he-moi-voi-tivi-coocaa-cai-tien-bao-ve-suc-khoe-nguoi-tieu-dung-20231004165124199.chn",
          image: "imgtechnew4.webp"
        }
      ],
      timeRemaining: 604800 // 7 days in seconds
    };

    // Bind the method to this
    this.topFunction = this.topFunction.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    // Ẩn nút ngay khi load trang
  const mybutton = document.getElementById("backToTopBtn");
  if (mybutton) {
    mybutton.style.display = "none";
  }
      // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = this.scrollFunction;
    // Start countdown timer
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timeRemaining: Math.max(prevState.timeRemaining - 1, 0), // Giảm và tránh âm
      }));
    }, 1000);
  }
  componentWillUnmount() {
    // Clear interval when component is unmounted
    clearInterval(this.timer);
  }
  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
  
  // Show or hide the button based on scroll position
  scrollFunction() {
    const mybutton = document.getElementById("backToTopBtn");
    if (mybutton) { // Check if mybutton exists
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Helper function to format the price
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    // Helper function to format the time remaining
    formatTime(seconds) {
      const days = Math.floor(seconds / (24 * 60 * 60));
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const secs = seconds % 60;
    
      return { days, hours, minutes, secs };
    }
    
  render() {
    const newprods = this.state.newprods.map((item) => (
      <div key={item._id} className="product-card inline" style={{ position: 'relative' }}>
        <Link to={'/product/' + item._id}>
          <figure>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            <figcaption className="text-center">
              {item.name}<br />
              <span className="price">Price: {this.formatPrice(item.price)}</span>
            </figcaption>
          </figure>
        </Link>
        <img
          src="https://cdn-icons-png.flaticon.com/128/14027/14027015.png"
          alt="New Product Badge"
          className="new-product-badge"
        />
        <img
          src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/300-300-iconsalesapsant_4.gif"
          alt="New Hot"
          className="new-image"
        />
        <div className="promo-info">
          <div className="promo-item">KM Ưu đãi trả góp 0% lãi suất - 0% phí chuyển đổi (Không áp dụng với chương trình ưu đãi HSSV)</div>
          <div className="promo-item">KM Ưu đãi mua càng nhiều - giá càng rẻ. Giảm thêm tới 300.000Đ</div>
          <div className="promo-item">KM Ưu đãi tặng Sim Mobifone Hera & Key bản quyền Office 365 A3 khi mua điện thoại tại Hoàng Hà Mobile (SL có hạn)</div>
        </div>
      </div>
    ));
    
    const hotprods = this.state.hotprods.map((item) => (
      <div key={item._id} className="product-card inline" style={{ position: 'relative' }}>
        <Link to={'/product/' + item._id}>
          <figure>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            <figcaption className="text-center">
              {item.name}<br />
              <span className="price">Price: {this.formatPrice(item.price)}</span>
            </figcaption>
          </figure>
        </Link>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3655/3655418.png" // Update the path if necessary
          alt="Hot Product Badge"
          className="hot-product-badge"
        />
        <img
          src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/300-300-iconsalesapsant_4.gif"
          alt="New promotional "
          className="new-image"
        />
        <div className="promo-info">
          <div className="promo-item">KM Ưu đãi trả góp 0% lãi suất - 0% phí chuyển đổi (Không áp dụng với chương trình ưu đãi HSSV)</div>
          <div className="promo-item">KM Ưu đãi mua càng nhiều - giá càng rẻ. Giảm thêm tới 300.000Đ</div>
          <div className="promo-item">KM Ưu đãi tặng Sim Mobifone Hera & Key bản quyền Office 365 A3 khi mua điện thoại tại Hoàng Hà Mobile (SL có hạn)</div>
        </div>
      </div>
    ));
    const categories = [
      { id: 1, name: 'Ipad', image: 'https://product.hstatic.net/200000144777/product/11_gray_3299cacce39144d49b690bea91dda7e8_master.png'
        ,link :'/product/category/6288b164708fabf8ab29ca0a' },

      { id: 2, name: 'Iphone', image: 'https://vn-test-11.slatic.net/p/26c2a39938b1659b0247d3135dac138e.jpg'
        ,link :'/product/category/6288b174708fabf8ab29ca0d' },

      { id: 3, name: 'Macbook ', image: 'https://shopdunk.com/images/thumbs/0024503_macbook-air-m3-15-inch.jpeg'
        ,link :'/product/category/6288b180708fabf8ab29ca10' },

      { id: 4, name: 'Watch', image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/s9-case-unselect-gallery-1-202403_GEO_VN_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=1708729783552'
        ,link :'/product/category/667c18f24971770a87b5db5b' },

      { id: 5, name: 'Airpods', image: 'https://onewaymobile.vn/images/products/2022/05/09/large/airpod-3-1_1652101860.webp'
        ,link:'/product/category/667c324c2540a585554008c0' },

      { id: 6, name: 'Laptop', image: 'https://bizweb.dktcdn.net/thumb/medium/100/329/122/products/laptop-gaming-msi-sword-16-hx-b14vfkg-045vn.jpg?v=1720089128953'
        ,link :'/product/category/667c34162540a58555400902' },

      { id: 7, name: 'Smart TV', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu_gFpRgPW4N7poue2FFZ3lMQmGOF1e6cQKVjgUUul4wvrMCERAcBVZ2jtOJBLlhi0Iw&usqp=CAU'
        ,link :'/product/category/667d064d68cd20f772933cc0' },
    ];
    const techNews = this.state.techNews.map((news, index) => (
      <div key={index} className="item">
        <a href={news.link} target="_blank" rel="noopener noreferrer">
          <img src={news.image} alt={news.title} />
          <div className="item-title">{news.title}</div>
        </a>
      </div>
    ));
    const {timeRemaining } = this.state;
    const formattedTime = this.formatTime(timeRemaining);
    const { days, hours, minutes, secs } = formattedTime;
    return (
      <div>
        <style>{` 
.new-products {
    position: relative;
    border-radius: 25px;
    padding: 22px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: linear-gradient(135deg, #f8f8f8, #e6e6e6);
    animation: backgroundAnimation 5s ease infinite; /* Thêm animation cho nền mặc định */
    transition: box-shadow 0.5s ease;
    margin-top: 15px;
}

/* Định nghĩa animation cho nền */
@keyframes backgroundAnimation {
    0% {
        background: linear-gradient(135deg, #f8f8f8, #e6e6e6);
    }
    50% {
        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    }
    100% {
        background: linear-gradient(135deg, #f8f8f8, #e6e6e6);
    }
}
.new-products:hover {
    box-shadow: 0 8px 16px rgba(255, 140, 180, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: backgroundHoverAnimation 2s ease infinite; /* Gọi animation cho nền khi hover */
}
/* Định nghĩa animation cho nền khi hover */
@keyframes backgroundHoverAnimation {
    0% {
        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    }
    50% {
        background: linear-gradient(135deg, #fbc2eb, #ff9a9e);
    }
    100% {
        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    }
}
.new-products::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    transition: transform 0.5s ease;
    transform: scale(0); /* Ẩn hiệu ứng trước khi hover */
}
.new-products:hover::before {
    transform: scale(1); /* Kích hoạt hiệu ứng ánh sáng lan tỏa */
}
.hot-products {
  background: linear-gradient(rgb(248, 62, 96), rgb(254, 80, 72));
  border-radius: 25px;
  padding: 22px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: backgroundShift 5s ease infinite;
  margin-top: 15px;
}
.gradient-text {
  background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
  animation: gradientShift 8s ease-in-out infinite, blink 1s step-start infinite;
  text-decoration: none;
  margin: 15px;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
.product-card {
  flex: 0 0 calc(33.33% - 20px); 
  margin: 19px; 
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  position: relative;
}
.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1), 0 0 15px rgba(255, 255, 255, 1);
}
.product-card img {
  border-radius: 10px 10px 0 0;
}
.product-card figcaption {
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.hot-products .product-card figcaption .price,
.new-products .product-card figcaption .price {
  color: red; /* Màu đỏ */
  font-weight: bold; 
  font-size: 1.2em; 
}
.new-products a,
.hot-products a {
  text-decoration: none;
  color: #333; 
  font-weight: bold;
}
.promo-info {
  font-weight:bold;
  display: none;
  position: absolute;
  bottom: 150px;
  left: 50%;  /* Center horizontally */
  transform: translateX(-50%);  /* Adjust for centering */
  background: rgba(255, 255, 255, 0.8);
  border: 3px solid #006400;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 320px;  /* Adjust the width as needed */
}
.promo-info .promo-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 12px;
  color: #333;
}
.promo-info .promo-item::before {
  content: 'KM';
  display: inline-block;
  font-size: 10px;
  color: white;
  background: orange;
  border-radius: 3px;
  padding: 2px 5px;
  margin-right: 5px;
}
.product-card:hover .promo-info {
  display: block;
  outline: 1px solid #ddd;
}
        `}</style>

        <div className="banner-container">
          <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showArrows>
            {this.state.banners.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Banner ${index + 1}`} className="img-responsive" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="poster1">
          <Link to='/product/category/667c34162540a58555400902' onClick={this.topFunction}>
            <img src="deal-gia-soc.png" alt="Deal" className="deal-image" />
          </Link>
        </div>

        <div className="product-categories">
          <h2>Danh Mục Sản Phẩm</h2>
        <div className="categories-container">
        {categories.map((category) => (
          <a href={category.link} key={category.id} className="category-card">
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </a>
        ))}
      </div>


    </div>
        <div className="align-center new-products">
          <h2 className="gradient-text">NEW PRODUCTS</h2>
          {newprods}
        </div>

        <div className="wrapper">
  <div className="backtoschool-section">
    <div className="title-backtoschool">BACK TO SCHOOL</div>
    <div className="phandau-banner">
      <Link to='/product/category/667c34162540a58555400902' onClick={this.topFunction}>
        <img src="backtoschool1.jpg" alt="Back to school banner 1" />
      </Link>
    </div>
    <div className="phancuoi-banner">
      <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showArrows>
        <div className="product">
          <img src="backtoschool2.png" alt="Back to school product 2" />
        </div>
        <div className="product">
          <img src="backtoschool3.png" alt="Back to school product 3" />
        </div>
        <div className="product">
          <img src="backtoschool4.jpg" alt="Back to school product 4" />
        </div>
        <div className="product">
          <img src="backtoschool5.png" alt="Back to school product 5" />
        </div>
      </Carousel>
    </div>
  </div>
</div>


{this.state.hotprods.length > 0 ? (
      <div className="align-center hot-products">
        <img 
          src="hotsale-gia-soc-20-03-gif.gif" 
          alt="Hot Products" 
          className="hot-products-image" 
        />
        <div className="countdown-wrapper">
          
          <div className="countdown-container">
          <h3 className="countdown-label">Kết thúc trong : </h3>
            <div className="countdown-box">{days} ngày</div>
            <span className="colon">:</span>
            <div className="countdown-box">{hours} giờ</div>
            <span className="colon">:</span>
            <div className="countdown-box">{minutes} phút</div>
            <span className="colon">:</span>
            <div className="countdown-box">{secs} giây</div>
          </div>
        </div>
        {hotprods}
      </div>
    ) : (
      <div />
    )}



        <h2 className="text-left text-danger">TIN TỨC CÔNG NGHỆ</h2>
        <div className="align-center tech-news">
          {techNews}
        </div>
        <h2>CHUYÊN GIA THƯƠNG HIỆU</h2>
        <div className="wrapper">
        <div className="expert-brand">
    <div className="brand-images">
      <a href="https://www.topzone.vn/khuyen-mai-soc-apple" target="_blank" rel="noopener noreferrer">
        <img src="chuyengiathuonghieu1.webp" alt="Brand 1" />
      </a>
      <a href="https://www.hp.com/vn-vi/workstations/industries/it-professionals.html" target="_blank" rel="noopener noreferrer">
        <img src="chuyengiathuonghieu2.webp" alt="Brand 2" />
      </a>
      <a href="https://mytour.vn/vi/blog/bai-viet/lenovo-nguon-goc-va-su-noi-tieng.html" target="_blank" rel="noopener noreferrer">
        <img src="chuyengiathuonghieu3.webp" alt="Brand 3" />
      </a>
    </div>
  </div>
</div>

        <h2>CHUỖI MỚI DEAL KHỦNG</h2>
        <div className="special-deals">
          <div className="deal-images">
            <a href="https://www.topzone.vn/khuyen-mai-soc-apple" target="_blank" rel="noopener noreferrer">
              <img src="chuoimoidealkhung1.webp" alt="Deal 1" />
            </a>
            <a href="https://www.avakids.com/online-gia-re?utm_source=facebook&utm_medium=cpc&utm_campaign=avakids-km" target="_blank" rel="noopener noreferrer">
              <img src="chuoimoidealkhung2.webp" alt="Deal 2" />
            </a>
            <a href="https://www.avakids.com/tuan-le-thuong-hieu" target="_blank" rel="noopener noreferrer">
            <img src="chuoimoidealkhung3.webp" alt="Deal 3" />
          </a>
        </div>
        </div>
  
  <div className="block_mainmenu mainmenu-service mainmenu__menu block">
    <div id="menu-service" className="container">
        <ul className="service">
            <li className="level_0 col-sm-3">
                    <img src="https://24hstore.vn/images/menus/original/thu-cu-doi-moi-04_1593600161.png" style={{width: '37px', height: '29px'}} alt="GIAO HÀNG MIỄN PHÍ TRONG 2H" />
                    <span>GIAO HÀNG MIỄN PHÍ TRONG 2H</span>
            </li>
            <li className="level_0 col-sm-3">
                    <img src="https://24hstore.vn/images/menus/original/thu-cu-doi-moi-03_1593677647.png" style={{width: '37px', height: '29px'}} alt="ĐỔI TRẢ MIỄN PHÍ TRONG 7 NGÀY" />
                    <span>ĐỔI TRẢ MIỄN PHÍ TRONG 7 NGÀY</span>
            </li>
            <li className="level_0 col-sm-3">
                    <img src="https://24hstore.vn/images/menus/original/thu-cu-doi-moi-02_1593600187.png" style={{width: '37px', height: '29px'}} alt="BẢO HÀNH 10 NĂM" />
                    <span>BẢO HÀNH 10 NĂM</span>
            </li>
            <li className="level_0 col-sm-3">
                    <img src="https://24hstore.vn/images/menus/original/thu-cu-doi-moi-01_1593600193.png" style={{width: '37px', height: '29px'}} alt="THU CŨ ĐỔI MỚI TẶNG 3.000.000Đ" />
                    <span>THU CŨ ĐỔI MỚI TẶNG 3.000.000Đ</span>
            </li>
        </ul>
    </div>
</div>

<div className="khachhang-techzone">
      <div className="title-khachhang-techzone">KHÁCH HÀNG CỦA TECHZONE STORE</div>
      <Carousel
        autoPlay
        interval={1500}
        infiniteLoop
        showThumbs={false}
        showArrows
        centerMode
        centerSlidePercentage={33.33}
        showIndicators={false}
        showStatus={false}
      >
        <div className="carousel-item">
          <img src="khachhang1.jpg" alt="khách hàng 1" />
        </div>
        <div className="carousel-item">
          <img src="khachhang2.jpg" alt="khách hàng 2" />
        </div>
        <div className="carousel-item">
          <img src="khachhang3.jpg" alt="khách hàng 3" />
        </div>
        <div className="carousel-item">
          <img src="khachhang4.jpg" alt="khách hàng 4" />
        </div>
        <div className="carousel-item">
          <img src="khachhang5.jpg" alt="khách hàng 5" />
        </div>
        <div className="carousel-item">
          <img src="khachhang6.jpg" alt="khách hàng 6" />
        </div>
        <div className="carousel-item">
          <img src="khachhang7.jpeg" alt="khách hàng 7" />
        </div>
        <div className="carousel-item">
          <img src="khachhang8.jpg" alt="khách hàng 8" />
        </div>
      </Carousel>
    </div>

<div class="container-showroom">
    <div class="promo-showroom">
        <img src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/small_86842026_3091645480860161_5034451456237764608_n_3a1d592ef5.jpg" alt="showroom" />
    </div>
    <div class="showrooms">
        <h2>HỆ THỐNG SHOWROOM</h2>
        <ul class="address-list">
            <li><a href="https://www.google.com/maps/search/?api=1&query=69/68+Đặng+Thuỳ+Trâm,+phường+13,+Quận+Bình+Thạnh,+TP.HCM" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> 69/68 Đặng Thuỳ Trâm, phường 13, Quận Bình Thạnh, TP.HCM</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=80/68+Dương+Quảng+Hàm,+phường+5,+Quận+Gò+Vấp,+TP.HCM" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> 80/68 Dương Quảng Hàm, phường 5, Quận Gò Vấp, TP.HCM</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=45+Nguyễn+Khắc+Nhu,+phường+Cô+Giang,+Quận+1,+TP.HCM" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> 45 Nguyễn Khắc Nhu, phường Cô Giang, Quận 1, TP.HCM</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=233A+Phan+Văn+Trị,+phường+11,+Quận+Bình+Thạnh,+TP.HCM" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> 233A Phan Văn Trị, phường 11, Quận Bình Thạnh, TP.HCM</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=160/63AB+Phan+Huy+Ích,+Phường+12,+Quận+Gò+Vấp" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> 160/63AB Phan Huy Ích, Phường 12, Quận Gò Vấp</a></li>
        </ul>
    </div>
</div>  

<div class="footer-phancuoiweb">
  <div>
    <h3>Hỗ trợ khách hàng</h3>
    <ul>
      <li><a href="/home">Khách hàng doanh nghiệp (B2B)</a></li>
      <li><a href="/home">Danh sách cửa hàng</a></li>
      <li><a href="/home">Mua hàng trả góp</a></li>
      <li><a href="/home">Tra cứu điểm thành viên</a></li>
      <li><a href="/home">Tuyển dụng mới nhất</a></li>
      <li><a href="/home">Hướng dẫn mua hàng Online</a></li>
      <li><a href="/home">Trung tâm bảo hành Apple tại Việt Nam</a></li>
    </ul>
  </div>
  <div>
    <h3>Chính sách</h3>
    <ul>
      <li><a href="/home">Chính sách bảo hành</a></li>
      <li><a href="/home">Chính sách đổi trả</a></li>
      <li><a href="/home">Chính sách bán hàng</a></li>
      <li><a href="/home">Chính sách bảo mật</a></li>
      <li><a href="/home">Chính sách sử dụng</a></li>
      <li><a href="/home">Chính sách kiểm hàng</a></li>
    </ul>
  </div>
  <div class="contact-info">
    <h3>Liên hệ</h3>
    <div>
      <span>Mua ngay: </span>
      <a href="tel:18006018">1800.6018</a>
      <time> (07:30 – 21:30)</time>
    </div>
    <div>
      <span>Kỹ thuật: </span>
      <a href="tel:18006729">1800.6729</a>
      <time> (08:30 – 21:30)</time>
    </div>
    <div>
      <span>Bảo hành: </span>
      <a href="tel:18006729">1800.6729</a>
      <time> (09:00 – 21:00)</time>
    </div>
    <div>
      <span>Góp ý: </span>
      <a href="tel:18006306">1800.6306</a>
      <time> (08:30 – 21:30)</time>
    </div>
    <div class="partners">
      <h4>Đối tác TechZone Store</h4>
      <img src="https://didongviet.vn/svg/statics/vertu.svg" alt="Vertu"/>
      <img src="https://didongviet.vn/svg/statics/vdd.svg" alt="Viendidong"/>
    </div>
  </div>
</div>
<div class="bottom-info">
  <p>Công Ty TNHH Công Nghệ TechZone - 77 Trần Quang Khải, P. Tân Định, Quận 1, TP. Hồ Chí Minh. Mã số doanh nghiệp: 0312193244, nơi cấp: Sở kế hoạch và đầu tư thành phố Hồ Chí Minh</p>
  <p>MST: 0312732474. Chủ sở hữu: Lê Đình Thiện - Điện thoại: 0973 280 657 (miễn phí) - Email: harrydinhthien@gmail.com - Bản quyền thuộc về TechZone.</p>
</div>



        <div className="social-sidebar">
          <a href="https://www.facebook.com/thieniunguyenn/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=118497&format=png" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/channel/UCWG0nL3P3FtL7T0IESgFdaQ" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=19318&format=png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/ntruong.1103/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=64&id=119026&format=png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@jaji.z" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=50&id=118638&format=png" alt="TikTok" />
          </a>
          <a href="https://zalo.me/0973280657" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=48&id=0m71tmRjlxEe&format=png" alt="Zalo" />
          </a>
        </div>
        <div id="contact-widget">
  <div className="contact-option">
    <a href="https://zalo.me/0973280657" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/?size=48&id=0m71tmRjlxEe&format=png" alt="Zalo Icon" className="hover-effect"/>
    </a>
    <a href="https://zalo.me/0973280657" target="_blank" rel="noopener noreferrer" className="text-link">
      <div className="text-container">
        <span className="main-text">Chat Zalo</span>
        <span className="sub-text">(8h - 24h)</span>
      </div>
    </a>
  </div>

  <div className="contact-option">
    <a href="tel:0973280657">
      <img src="https://dienthoaigiakho.vn/_next/image?url=%2Ficons%2Fcommon%2Fbtn-call.svg&w=48&q=75" alt="Phone Icon" className="hover-effect" />
    </a>
    <a href="tel:0973280657" className="text-link">
      <div className="text-container">
        <span className="main-text">Gọi mua hàng</span>
        <span className="sub-text">0973280657 (8h-24h)</span>
      </div>
    </a>
  </div>

  <div className="contact-option">
    <a href="tel:0973280657">
      <img src="https://dienthoaigiakho.vn/_next/image?url=%2Ficons%2Fcommon%2Ficon-repair.svg&w=48&q=75" alt="Warranty Icon" className="hover-effect" />
    </a>
    <a href="tel:0973280657" className="text-link">
      <div className="text-container">
        <span className="main-text">Gọi bảo hành</span>
        <span className="sub-text">0973280657 (8h-21h)</span>
      </div>
    </a>
  </div>
</div>



        <button onClick={this.topFunction} id="backToTopBtn" title="Go to top">
          <img src="https://24hstore.vn/images/back.svg" alt="Go to top" style={{ width: '24px', height: '24px' }} />
          <div>Quay về đầu trang</div>
        </button>
      </div>
      
    );
  }
}


export default Home;
