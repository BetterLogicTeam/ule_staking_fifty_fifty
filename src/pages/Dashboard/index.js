import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/Icon/1.jpg";
import logo1 from "../../assets/images/Icon/2.jpg";
import './DsIndex.css';
import logo2 from "../../assets/images/Icon/3.jpg";
import logo3 from "../../assets/images/Icon/4.jpg";
import logo4 from "../../assets/images/Icon/5.jpg";
import logo5 from "../../assets/images/Icon/6.jpg";
import logo6 from "../../assets/images/Icon/7.jpg";
import logo7 from "../../assets/images/Icon/8.jpg";
import logo8 from "../../assets/images/Icon/9.jpg";
import logo9 from "../../assets/images/Icon/10.jpg";
import logo10 from "../../assets/images/Icon/coinsbit.png";
import logo11 from "../../assets/images/Icon/azbit.png";
import logo12 from "../../assets/images/Icon/bitcboot.png";
import { useEffect, useState } from "react";
import {
  getWalletAddress,
  getDailyYeild,
  getTeamDy,
  getAllParticipants,
  getBonusDy,
  getReferralEarning,
  getPools,
  getWithdrawal,
  getDownlineBusiness,
} from "../../store/actions/dashboard";
import { API } from "../../store/actions/API";
import axios from "axios";
const Dashboard = () => {
  const dashboard = useSelector((state) => state?.dashboard);

  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getWalletAddress(uId));
      dispatch(getAllParticipants(uId));
      dispatch(getDailyYeild(uId));
      dispatch(getTeamDy(uId));
      dispatch(getBonusDy(uId));
      dispatch(getReferralEarning(uId));
      dispatch(getPools(uId));
      dispatch(getWithdrawal(uId));
      dispatch(getDownlineBusiness(uId));
    }
  };
  useEffect(() => {
    getBetaWallet();
    getAllData();
  }, []);

  const [betaWallet, setBetaWallet] = useState(null);
  const [EarnAmount, setEarnAmount] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [MaxIncome, setMaxIncome] = useState(0);



// console.log("DashBordApi",DashBordApi?.userId);
  const getBetaWallet = async () => {
    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    try {
      const res = await API.get(`/get_betawallet?id=${uId}`);
      setBetaWallet(res?.data.data[0]);
      setEarnAmount(res.data.data[0].EarnAmount)
      setTotalAmount(res.data.data[0].tt)
      setMaxIncome(res.data.data[0].MaxIncome)
    } catch (e) {
      console.log("error", e);
    }
  };


  const Live_Rate_Api=async() =>{
    try{

      // console.log("dashboard.userId",dashboard.userId);
    
      let resAPI= await axios.get(`http://yeepule-nft.herokuapp.com/get_betawallet?id=${dashboard.userId}`)
      // console.log("RESAPI_here",resAPI.data.data[0]);
      

    }catch(e){
      console.log("Live Rate Api",e);
    }
  }


  useEffect(() => {
    Live_Rate_Api()
    
  }, [MaxIncome])
  
  // console.log("state test", betaWallet);
  return (
    <div class="content-wrapper">
      <link
        rel="stylesheet"
        type="text/css"
        href="assets/css/NewUserPannel.css"
      />
      <section className="maindsb">
        <div className="container">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo}
                    alt="d-app banner -1"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div class="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo1}
                    alt="d-app banner -2"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div class="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo2}
                    alt="d-app banner -3"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo3}
                    alt="d-app banner -4"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo4}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo5}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo6}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo7}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo8}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src={logo9}
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          {/* <div
            id="myCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src="assets/images/banner/12.jpg"
                    alt="d-app banner -1"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="item active">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src="assets/images/banner/8.jpg"
                    alt="d-app banner -2"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src="assets/images/banner/9.jpg"
                    alt="d-app banner -3"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src="assets/images/banner/10.jpg"
                    alt="d-app banner -4"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
              <div className="item">
                <a href="https://www.wyshopping.life/" target="_blank">
                  <img
                    src="assets/images/banner/11.jpg"
                    alt="d-app banner -5"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
            </div>
            <a
              className="left carousel-control indicator_set"
              href="#myCarousel"
              data-bs-slide="prev"
            >
              <span className=" indicator_set glyphicon fa fa-chevron-circle-left"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control indicator_set"
              href="#myCarousel"
              data-bs-slide="next"
            >
              <span className=" indicator_set glyphicon fa fa-chevron-circle-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </div> */}
        </div>
      </section>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <a href="/daily-yeild">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Daily Yeild</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.dailyYeild ? dashboard?.dailyYeild : 0
                        ).toFixed(4)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/team-dy">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Team DY</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.teamDy ? dashboard?.teamDy : 0
                        ).toFixed(4)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/referral-earning">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Referral Earning</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.referralEearnig
                            ? dashboard?.referralEearnig
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/my-team">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">My Team</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {betaWallet?.totaldownline
                          ? betaWallet?.totaldownline
                          : 0}
                      </span>
                      <input type="hidden" id="jj" autocomplete="off" />
                      <input type="hidden" id="u" autocomplete="off" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/referral-report">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">My Referral</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {betaWallet?.totaldirect ? betaWallet?.totaldirect : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/pools">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Total Pool Income</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.pools?.total_pool_income
                            ? dashboard?.pools?.total_pool_income
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/pools">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Pool Income 1</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.pools?.pool_income_1
                            ? dashboard?.pools?.pool_income_1
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/pools">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Pool Income 2</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {" "}
                        {parseFloat(
                          dashboard?.pools?.pool_income_2
                            ? dashboard?.pools?.pool_income_2
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/pools">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Pool Income 3</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {" "}
                        {parseFloat(
                          dashboard?.pools?.pool_income_3
                            ? dashboard?.pools?.pool_income_3
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/bonus-dy">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Bonus DY</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.bonusDy ? dashboard?.bonusDy : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="/widthdrawl">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Withdrawal</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.widthdrawl ? dashboard?.widthdrawl : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-3">
            <a href="#">
              <div class="box features-1">
                <div class="gen-comp-plan">
                  <div class="gcp-description">
                    <div class="gcp-title">Total Downline Business</div>
                    <div class="gcp-income">
                      <span class="cur1">
                        {parseFloat(
                          dashboard?.downlineBusiness
                            ? dashboard?.downlineBusiness
                            : 0
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="swap_heading">
              <h2>
                Want to be auto-trade , remember "Bitcbot" ? Select exchange
                pair according to exchange Now
                <span class="blink_me">
                  {" "}
                  <i class="fa fa-mars"></i>
                </span>
              </h2>
            </div>
            <div class="exbox ">
              <a
                href="https://coinsbit.io/trade"
                target="_blank"
              >
                <div class="rate juslogoset">
                  <span>
                    <img className="dsIn-img" src={logo10} />{" "}
                  </span>
                </div>
              </a>
              <a href="https://azbit.com/" target="_blank">
                <div class="rate juslogoset mrlrset">
                  <span>
                    <img className="dsIn-img1" src={logo11} />{" "}
                  </span>
                </div>
              </a>
              <a href="https://bitcbot.trade/" target="_blank">
                <div class="rate juslogoset ds-ju">
                  <span>
                    <img className="dsIn-img2" src={logo12} />{" "}
                  </span>
                </div>
              </a>
              {/* <a
                href="https://info.quickswap.exchange/#/pair/0xc2d2647786c22200c73f1dbee5798aad86f54c44"
                target="_blank"
              >
                <div class="rate juslogoset">
                  <span>
                    <img src={logo4} />{" "}
                  </span>
                </div>
              </a> */}
              {/* <a
                href="https://pancakeswap.finance/info/pool/0x718cec478b7cebfe7dc4986d295065e3cb60e635"
                target="_blank"
              >
                <div class="rate juslogoset">
                  <span>
                    <img src={logo5} />{" "}
                  </span>
                </div>
              </a> */}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div class="row">
          <div class="col-md-12">
            <div class="wyz_bridge">
              <p>
                Get Multi-Chain ULE From Using{" "}
                <a href="https://bridge.wyzthswap.org/" target="_blank">
                  <img src="assets/images/bridge-logo.svg" />
                </a>{" "}
                & Enjoy Price Hedging !!
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="prgs">
              <div
                class="progress mt-4"
                style={{ height: "3.5rem", background: "#656262" }}
              >
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${
                      betaWallet?.MaxIncome ? betaWallet?.MaxIncome : 0
                    }%`,
                    fontWeight: "bold",
                    color: "#f1c004",

                    background: "#656262",
                  }}
                  aria-valuenow={
                    betaWallet?.MaxIncome ? betaWallet?.MaxIncome : 0
                  }
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {`${betaWallet?.MaxIncome ? betaWallet?.MaxIncome : 0} %`}
                </div>
              </div>
            </div>
            <div className="mb-5" style={{ color: "#000", fontWeight: "400" }}>
            Your total earning is {EarnAmount} USD out of {TotalAmount} USD (Your earned {MaxIncome}% out of 300% of your investment )
            {/* Your total earning is {EarnAmount} USD out of {TotalAmount} USD (Your earned 100.0000% out of 300% of your investment ) */}
            </div>
            {/* 
                    <style>


                        #myProgress {
                            width: 100%;
                            background-color: lightblue;
                        }

                        #myBar {
                            width: 1%;
                            height: 30px;
                            background: #656262 !important;
                        }
                    </style>
                    <script>
                        $(document).ready(function () {
                            move();
                        });
                        var i = 0;
                        function move() {
                            if (i == 0) {
                                i = 1;
                                var elem = document.getElementById("myBar");
                                var width =100.0000  ;
                                elem.style.width = width + "%";
                                if (width > 90) {
                                    elem.style.backgroundColor = "red";
                                }
                                else {
                                    elem.style.backgroundColor = "green";
                                }
                                
                            }
                        }

                    </script> */}
                    <h6 className="foo-h6">
                    Copyright © 2022 YeepULEnft. All Rights Reserved.
                    </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
