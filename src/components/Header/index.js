import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/Icon/sp2.png";
import "./index.css";
import Dropdown from 'react-bootstrap/Dropdown';
export const Header = ({ hiddenSideMenu, setHidden }) => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("user", null);
    history.push("/login");
    window.location.reload();
  };

  return (
    <div class="top-bar-wrapper" data-menu="collapse">
      <div>
        <div class="left-menu-icon" onClick={() => setHidden(!hiddenSideMenu)}>
          <i
            class="fa fa-sliders"
            aria-hidden="true"
            style={{ color: "#f1c40f" }}
          ></i>
        </div>
      </div>
      <ul
        id="main-menu"
        class="menu-nav mob-navset"
        style={{ display: showMenu ? "inline" : "none" }}
        
      >
        <li className="nav-item">
          <img src={logo} alt='' />
        </li>
        <li class="tviconset">
          <a className="ind-a" href="https://www.wyshopping.life/" target="_blank">
            <span>
              <img src="assets/images/WYshoping.png" />
            </span>
            Shopping
          </a>
        </li>

        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wygame.games/" target="_blank">
            <span>
              <img src="assets/images/WYgaming.png" />
            </span>
            Gaming
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wybet.games/" target="_blank">
            <span>
              <img src="assets/images/wybet.png" />
            </span>
            Betting
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wc.exchange/" target="_blank">
            <span>
              <img src="assets/images/wcx-exchange.png" />
            </span>
            Exchange
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://thecoinweekly.com/" target="_blank">
            <span>
              <img src="assets/images/wyz_news.png" />
            </span>
            Crypto News
          </a>
        </li>
        <li class="sep"></li>

        <li class="tviconset">
          <a className="ind-a" href="/dashboard">
            <span>
              <img src="assets/images/homeIcon.png" />
            </span>
            Office
          </a>
        </li>
        <li class="sep"></li>

        <li >

          <div class="dropdown">
            <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              History
            </a>

            <ul class="submenu dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="nav-item">
                {/* <Link to="https://yulenft.com/Mint_With_100" target="_blank"> */}

                <a href="https://yulenft.com/Mint_With_100" target="_blank"  >BUY NFT</a>

                {/* </Link> */}
              </li>
              <li className="nav-item" aria-expanded="false" >
                {/* <Link to="/nft-staking"> */}
                  <a href="/nft-staking" >NFT STAKING</a>
                {/* </Link> */}
              </li>
              <li className="nav-item">
                {/* <Link to="/stak-history"> */}
                  <a href="/stak-history"  >NFT STAKING HISTORY</a>
                {/* </Link> */}
              </li>
              <li className="nav-item">

                {/* <Link to="/UnStake_History"> */}
                  <a href="/UnStake_History" >NFT UNSTAKING HISTORY </a>
                {/* </Link> */}
              </li>
              <li className="nav-item">
                {/* <Link to="/widthdrawl"> */}
                  <a href="/widthdrawl">Withdrawal</a>
                {/* </Link> */}
              </li>
              <li className="nav-item">
                {/* <Link to="/widthdrawl-report"> */}
                  <a href="/widthdrawl-report" >Widthrawal History</a>
                {/* </Link> */}

              </li>
              <li className="nav-item">
                {/* <Link to="/widthdrawl-report"> */}
                  <a href="/RegistrationHistory" >Registration History</a>
                {/* </Link> */}

              </li>
            </ul>
          </div>
        </li>
        <li class="sep"></li>
        <li >

          <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            My Team
          </a>

          <ul class="submenu dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="nav-item">
              <a href="/my-team">My Team</a>
            </li>
            <li className="nav-item">
              <a href="/referral-report">My Referral</a>
            </li>
            <li className="nav-item">
              <a href="/level-details">Level Details</a>
            </li>
            <li className="nav-item">
              <a href="/downline-report">My Leg Downline</a>
            </li>
            <li className="nav-item">
              <a href="/RegTeamDetails">Registration Team Details</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">

          <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Income
          </a>

          <ul class="submenu dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="nav-item">
              <a href="/daily-yeild">Daily Yield</a>
            </li>
            <li className="nav-item">
              <a href="/team-dy">Team DY</a>
            </li>
            <li className="nav-item">
              <a href="/bonus-dy">Bonus DY</a>
            </li>
            <li className="nav-item">
              <a href="/referral-earning">Referral Earning</a>
            </li>
            <li className="nav-item">
              <a href="/pools">Pool Income</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">

          <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            50:50 Income
          </a>

          <ul class="submenu dropdown-menu" aria-labelledby="dropdownMenuButton1">            
          <li className="nav-item">
              <a href="/RegRoiIncome">Registration ROI Income</a>
            </li>
            <li className="nav-item">
              <a href="/RegDirectIncome">Registration Direct Income</a>
            </li>
            <li className="nav-item">
              <a href="/RegCTOIncome_1">Registration Cto Income(1%)</a>
            </li>
            <li className="nav-item">
              <a href="/RegCTOIncome_2">Registration Cto Income(2%)</a>
            </li>
            <li>
              <a href="/Reinvestment">ReInvestment</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li className="nav-item">
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
      <ul id="main-menu" class="menu-nav mob-navset">
        <li>
          <img className="ind-img" src={logo} alt='' />
        </li>
        <li class="tviconset">
          <a className="ind-a" href="https://www.wyshopping.life/" target="_blank">
            <span>
              <img src="assets/images/WYshoping.png" />
            </span>
            Shopping
          </a>
        </li>

        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wygame.games/" target="_blank">
            <span>
              <img src="assets/images/WYgaming.png" />
            </span>
            Gaming
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wybet.games/" target="_blank">
            <span>
              <img src="assets/images/wybet.png" />
            </span>
            Betting
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://wc.exchange/" target="_blank">
            <span>
              <img src="assets/images/wcx-exchange.png" />
            </span>
            Exchange
          </a>
        </li>
        <li class="sep"></li>
        <li class="tviconset">
          <a className="ind-a" href="https://thecoinweekly.com/" target="_blank">
            <span>
              <img src="assets/images/wyz_news.png" />
            </span>
            Crypto News
          </a>
        </li>
        <li class="sep"></li>

        <li class="tviconset">
          <a className="ind-a" href="/dashboard">
            <span>
              <img src="assets/images/homeIcon.png" />
            </span>
            Office
          </a>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">
          <a className="ind-a">
            History &nbsp; <i class="fa fa-sort-desc" aria-hidden="true"></i>{" "}
          </a>
          <ul class="submenu" >

            <li>
              <a href="https://yulenft.com/Mint_With_100" target="_blank">BUY NFT</a>
            </li>
            <li>
              <a href="/nft-staking">NFT STAKING</a>
            </li>
            <li>
              <a href="/stak-history">NFT STAKING HISTORY</a>
            </li>
            <li>
              <a href="/UnStake_History">NFT UNSTAKING HISTORY</a>
            </li>
            <li>
              <a href="/widthdrawl">Withdrawal</a>
            </li>
            {/* <li>
              <a href="/wallet">Withdrawal Address </a>
            </li> */}
            <li>
              <a href="/widthdrawl-report">Widthrawal History</a>
            </li>
            <li>
              <a href="/RegistrationHistory">Registration History</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">
          <a className="ind-a">
            My Team &nbsp; <i class="fa fa-sort-desc" aria-hidden="true"></i>{" "}
          </a>
          <ul class="submenu">
            <li>
              <a href="/my-team">My Team</a>
            </li>
            <li>
              <a href="/referral-report">My Referral</a>
            </li>
            <li>
              <a href="/level-details">Level Details</a>
            </li>
            <li>
              <a href="/downline-report">My Leg Downline</a>
            </li>
            <li>
              <a href="/RegTeamDetails">Registration Team Details</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">
          <a className="ind-a">
            Income &nbsp; <i class="fa fa-sort-desc" aria-hidden="true"></i>{" "}
          </a>
          <ul class="submenu">
            <li>
              <a href="/daily-yeild">Daily Yield</a>
            </li>
            <li>
              <a href="/team-dy">Team DY</a>
            </li>
            <li>
              <a href="/bonus-dy">Bonus DY</a>
            </li>
            <li>
              <a href="/referral-earning">Referral Earning</a>
            </li>
            <li>
              <a href="/pools">Pool Income</a>
            </li>
          </ul>
        </li>
        <li class="sep"></li>
        <li data-submenu="true">
          <a className="ind-a">
            50:50 Income &nbsp; <i class="fa fa-sort-desc" aria-hidden="true"></i>{" "}
          </a>
          <ul class="submenu">
            <li>
              <a href="/RegRoiIncome">Registration ROI Income</a>
            </li>
            <li>
              <a href="/RegDirectIncome">Registration Direct Income</a>
            </li>
            <li>
              <a href="/RegCTOIncome_1">Registration Cto Income(1%)</a>
            </li>
            <li>
              <a href="/RegCTOIncome_2">Registration Cto Income(2%)</a>
            </li>
            <li>
              <a href="/Reinvestment">ReInvestment</a>
            </li>
            {/* <li>
              <a href="/referral-earning">Registration Cto Achievers(2%)</a>
            </li> */}
            {/* <li>
              <a href="/referral-earning">Registration Details</a>
            </li>
            <li>
              <a href="/referral-earning">Registration Team Details</a>
            </li> */}         
          </ul>
        </li>
        <li class="sep"></li>
        <li>
          <a className="ind-a" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
      <div
        class="toggle-menu"
        onClick={() => setShowMenu(showMenu ? false : true)}
      >
        <span></span>
        <i class="fa fa-times close_button" aria-hidden="true"></i>
      </div>
    </div>
  );
};
