import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import ProtectedRoute from "./utils/routes/protectedRoutes";
import PublicRoutes from "./utils/routes/publicRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Login,
  DailyYeild,
  BonusDY,
  ReferralEarning,
  Pools,
  TeamDY,
  ReferralReport,
  DownlineReport,
  ActiveHistory,
  WidthdrawlReport,
  MyTeam,
  LevelReport,
  Widthdraw,
  Activate,
  Wallets,
  RegRoiIncome,
  RegDirectIncome,
  RegCTOIncome_2, 
  RegCTOIncome_1 ,
  RegistrationHistory,
  RegTeamDetails
} from "./pages";
import BuyNft from "./pages/BuyNft";
import NftStaking from "./pages/NftStacking/Index";
import StakHistory from "./pages/StakHistory/Index";
import UnStake_History from "./pages/UnStakHistory/UnStake_History";
import Stacking_With_200 from "./pages/NftStacking/Stacking_With_200";
import Stacking_With_300 from "./pages/NftStacking/Stacking_With_300";
import Stacking_With_400 from "./pages/NftStacking/Stacking_With_400";
import Stacking_With_500 from "./pages/NftStacking/Stacking_With_500";
import Stacking_With_1000 from "./pages/NftStacking/Stacking_With_1000";
import Stacking_With_2000 from "./pages/NftStacking/Stacking_With_2000";
import Stacking_With_3000 from "./pages/NftStacking/Stacking_With_3000";
import Stacking_With_4000 from "./pages/NftStacking/Stacking_With_4000";
import Stacking_With_5000 from "./pages/NftStacking/Stacking_With_5000";
import Stacking_With_10000 from "./pages/NftStacking/Stacking_With_10000";
import Stacking_With_100 from "./pages/NftStacking/Stacking_With_100";
import Reinvestment from "./pages/Reinvestment/Reinvestment";


function App() {
  return (
    <Provider store={store}>
        <ToastContainer />
      <Router>
        <Switch>
          <ProtectedRoute exact path="/activate" component={Activate} />
          <ProtectedRoute exact path="/level-details" component={LevelReport} />
          <ProtectedRoute exact path="/widthdrawl" component={Widthdraw} />
          <ProtectedRoute exact path="/UnStake_History" component={UnStake_History} />

          <ProtectedRoute exact path="/wallet" component={Wallets} />
          <ProtectedRoute exact path="/my-team" component={MyTeam} />
          <ProtectedRoute
            exact
            path="/downline-report"
            component={DownlineReport}
          />
          <ProtectedRoute
            exact
            path="/active-history"
            component={ActiveHistory}
          />
          <ProtectedRoute
            exact
            path="/widthdrawl-report"
            component={WidthdrawlReport}
          />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/Reinvestment" component={Reinvestment} />

          <ProtectedRoute exact path="/daily-yeild" component={DailyYeild} />
          <ProtectedRoute exact path="/bonus-dy" component={BonusDY} />
          <ProtectedRoute exact path="/buy-nft" component={BuyNft} />
          <ProtectedRoute exact path="/nft-staking" component={NftStaking} />
          <ProtectedRoute exact path="/stak-history" component={StakHistory} />
          <ProtectedRoute exact path="/Stacking_With_100" component={Stacking_With_100} />

          <ProtectedRoute exact path="/Stacking_With_200" component={Stacking_With_200} />
          <ProtectedRoute exact path="/Stacking_With_300" component={Stacking_With_300} />
          <ProtectedRoute exact path="/Stacking_With_400" component={Stacking_With_400} />
          <ProtectedRoute exact path="/Stacking_With_500" component={Stacking_With_500} />
          <ProtectedRoute exact path="/Stacking_With_1000" component={Stacking_With_1000} />
          <ProtectedRoute exact path="/Stacking_With_2000" component={Stacking_With_2000} />
          <ProtectedRoute exact path="/Stacking_With_3000" component={Stacking_With_3000} />
          <ProtectedRoute exact path="/Stacking_With_4000" component={Stacking_With_4000} />
          <ProtectedRoute exact path="/Stacking_With_5000" component={Stacking_With_5000} />
          <ProtectedRoute exact path="/Stacking_With_10000" component={Stacking_With_10000} />



          <ProtectedRoute
            exact
            path="/referral-earning"
            component={ReferralEarning}
          />
          <ProtectedRoute
            exact
            path="/referral-report"
            component={ReferralReport}
          />
          <ProtectedRoute exact path="/pools" component={Pools} />
          <ProtectedRoute exact path="/team-dy" component={TeamDY} />
          
          <ProtectedRoute exact path="/RegRoiIncome" component={RegRoiIncome} />
          <ProtectedRoute exact path="/RegDirectIncome" component={RegDirectIncome} />
          <ProtectedRoute exact path="/RegCTOIncome_1" component={RegCTOIncome_1} />
          <ProtectedRoute exact path="/RegCTOIncome_2" component={RegCTOIncome_2} />
          <ProtectedRoute exact path="/RegistrationHistory" component={RegistrationHistory}/>
          <ProtectedRoute exact path="/RegTeamDetails" component={RegTeamDetails}/>
          
          <PublicRoutes exact path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
