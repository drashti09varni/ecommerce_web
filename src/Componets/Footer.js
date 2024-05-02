import React from "react";
import { Link } from "react-router-dom";
import hederlogo from "../img/Asset 2.png"
import gogglePlay from "../img/imresizer-1711517798188.jpg"
import "../../src/css/footer.css"


function Footer() {
  return <>
    <>
      <footer className="py-5 mt-5  ">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-lg-3 about-footer">
                <div className="footer-title">
                  <h4>Street Number</h4>
                </div>
                <ul>
                  <li>
                    <a href="tel:(010) 1234 4321">
                      <i className="fas fa-phone" />
                      (010) 1234 4321
                    </a>
                  </li>
                  <li className="demo222">
                    {/* FH-22, SWASTIK PLAZA, SWASTIK PLAZA, YOGICHOK, SURAT, Surat, Gujarat, 395010 */}
                    <i className="fas fa-map-marker-alt" />
                    FH-22, SWASTIK PLAZA,
                    <br />
                    YOGICHOK, SURAT,
                    <br />
                    Gujarat, 395010
                  </li>
                </ul>
                {/* <a href="" className="btn red-btn">
            Book Now
          </a> */}
              </div>
              <div className="col-md-6 col-lg-2 page-more-info">
                <div className="footer-title">
                  <h4>Our Page</h4>
                </div>
                <ul className="">
                  <li className="py-2">
                    <Link to=".">Home</Link>
                  </li>
                  <li className="py-2">
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li className="py-2">
                    <Link to="/shop">Shop</Link>
                  </li>
                  {/* <li>
              <Link to="">Blog</Link>
            </li> */}
                  {/* <li className="py-2">
                    <Link to="">Contact</Link>
                  </li> */}
                </ul>
              </div>
              <div className="col-md-6 col-lg-3 page-more-info">
                <div className="footer-title">
                  <h4>Our Category</h4>
                </div>
                <ul>
                  <li className="py-2">
                    <Link to="/shop?categoryName=Men">Men</Link>
                  </li>
                  <li className="py-2">
                    <Link to="/shop?categoryName=Women">Women</Link>
                  </li>
                  <li className="py-2">
                    <Link to="/shop?categoryName=Beauty">Beauty</Link>
                  </li>
                  <li className="py-2">
                    <Link to="/shop?categoryName=Jewellery">Jewellery</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-6 col-lg-4 open-hours">
                <div className="footer-title">
                  <h4>About Company</h4>
                  <ul className="footer-social">
                    <li>
                      <a href="" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>


                <div className="table-responsive">
                  <table class="table text-light">
                    <tbody>
                      <tr class="demo222">
                        <td class="fs-6 fs-sm-7 fs-md-8"><i class="far fa-envelope"></i> Email:</td>
                        <td class="fs-6 fs-sm-7 fs-md-8">199shop@gmail.com</td>
                      </tr>
                      <tr class="demo222">
                        <td class="fs-6 fs-sm-7 fs-md-8"><i class="fas fa-phone-alt"></i> Phone No:</td>
                        <td class="fs-6 fs-sm-7 fs-md-8">+91 7412589630</td>
                      </tr>
                      <tr class="demo222">
                        <td class="fs-6 fs-sm-7 fs-md-8"><i class="fas fa-headset"></i> Customer Care:</td>
                        <td class="fs-6 fs-sm-7 fs-md-8">(Mon to Sat 9:30 AM to 6:00 PM)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="">
                  <p className="demo222">For Best Experience Please connect from the Registered Number.</p>
                </div>

                <hr />

                {/* <div className="">
                  <ul className="footer-social" style={{padding: "0"}}>
                    <li style={{padding: "10px"}}>
                      <a href="" target="_blank">
                        <img src={hederlogo} style={{ width: "10vw" }} />
                      </a>
                    </li>
                    <li style={{padding: "10px"}}>
                      <a href="" target="_blank">
                        <img src={gogglePlay} style={{ width: "10vw" }} />
                      </a>
                    </li>
                    <li style={{padding: "10px"}}>
                      <a href="" target="_blank">
                      </a>
                    </li>
                  </ul>
                </div> */}

                <div class="row">
                  <div class="column">
                    <img src={hederlogo} alt="Snow" style={{ width: "100%" }} />
                  </div>
                  <div class="column">
                    <img src={gogglePlay} alt="Forest" style={{ width: "100%" }} />
                  </div>

                </div>


              </div>
            </div>
          </div>
          <hr />
          {/* <div className="footer-bottom">
      <div className="row">
        <div className="col-sm-4">
          <a href="">Privacy policy</a>
        </div>
        <div className="col-sm-8">
          <p>Lorem ipsum dolor sit amet @ 2019 All rights reserved</p>
        </div>
      </div>
    </div> */}
        </div>
      </footer>





    </>

  </>
}
export default Footer
// It JOb in surat