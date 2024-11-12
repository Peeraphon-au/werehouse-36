import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Home.css';
function Home() {
    return (
        <div className="home-container">
           {/* nav bar */}
        {/* <aside className="sidebar">
          <div className="logo">Logo</div>
          <nav>
            <ul>
              <li>หน้าหลัก/Dashboard</li>
              <li>จัดการบุคลากร</li>
              <li>จัดการหน่วยงาน</li>
              <li>รายการนำเข้าสินค้า</li>
              <li>รายการเบิกสินค้า</li>
              <li>บัญชี</li>
              <li>ออกจากระบบ</li>
            </ul>
          </nav>
        </aside> */}
  
        <main className="dashboard-content">
          <header className="dashboard-header">
            <h1>Dashboard / รายงาน</h1>
          </header>
  
          <div className="info-cards">
            <div className="card blue-card">
              <h2>300</h2>
              <p>จำนวนสินค้าที่รับเข้า</p>
              <a href="#">More info</a>
            </div>
            <div className="card green-card">
              <h2>297</h2>
              <p>จำนวนสินค้าที่อยู่ในคลังสินค้า</p>
              <a href="#">More info</a>
            </div>
            <div className="card red-card">
              <h2>130</h2>
              <p>จำนวนสินค้าที่เบิกออก</p>
              <a href="#">More info</a>
            </div>
          </div>
        </main>
      </div>
    );
}

export default Home;