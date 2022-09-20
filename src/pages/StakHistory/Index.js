import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyReferralReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";
import { ULE_NFT_100, ULE_NFT_100_ABI, ULE_NFT_Staking_100, Ule_NFT_Staking_100_ABI } from "../Utils/Contract_Address";
import { loadWeb3 } from "../../Api/Api";
import { toast } from "react-toastify";
import axios from "axios";
import { areArraysEqual } from "@mui/base";
import Spinner_data from "./Spinner_data";

function StakHistory() {
  const refReport = useSelector((state) => state?.dailyYield?.refReport);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [tokenid, setTokenId] = useState("");
  let [spinner, setspinner] = useState(false);
  let [LOading_Spinner, setLOading_Spinner] = useState(false);



  const WalletAddress = async () => {

    let ress = JSON.parse(user);
    let uId = ress?.user_id;

    console.log("uIdTayy", uId);
    try {
      const res = await axios.get(`https://yeepule-nft-api.herokuapp.com/get_user_info?id=${uId}`);
      
      let User_Address = res?.data?.data[0].EthAddress
      if (res?.data?.data?.length > 0) {
        setUserInfo(res?.data?.data[0]);
           
      }

    } catch (e) {
      console.log("Fatch Api", e);
    }


  }




  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getMyReferralReport(uId));
    }

  };



  useEffect(() => {
    getAllData();
    // WalletAddress()
  }, []);


  const Unstake_NFT = async () => {
    const acc = await loadWeb3()

    setLOading_Spinner(true)

    const user = localStorage.getItem("user");
    let ress = JSON.parse(user);
    let uId_user = ress?.user_id;
    // console.log("acc",uId_user);
    let user_Address
    let RowId
    try {
      // setLOading_Spinner(true)

      const res = await axios.get(`https://yeepule-nft-api.herokuapp.com/get_user_info?id=${uId_user}`);
      // console.log("res", res);
      user_Address = res?.data?.data[0].EthAddress
      if (res?.data?.data?.length > 0) {
        setUserInfo(res?.data?.data[0]);
        //    
      }

    } catch (e) {
      console.log("Fatch Api", e);
      // setLOading_Spinner(false)

    }

    // console.log("userInfo",user_Address);

    try {
      setLOading_Spinner(true)
    console.log("spinner",LOading_Spinner);



      let refReport_length = refReport.length
      let getTokId
      for (let i = 0; i < refReport_length; i++) {
        getTokId = refReport[i].tokenid
        RowId = refReport[i].id
      }

      let ConditionalApi = await axios.post('https://yeepule-nft-api.herokuapp.com/unstakeNftDayCondition', {
        "uid": uId_user,
        "address": acc,
        "rowid": RowId,

      })
      let DayComp = ConditionalApi.data.data
      // console.log("ConditionalApi", ConditionalApi.data.data);

      let ConditionalApiIncom = await axios.post('https://yeepule-nft-api.herokuapp.com/unstakeNftCondition', {
        "uid": uId_user,

      })
      let inComeData = ConditionalApiIncom.data.data
      // console.log("ConditionalApi", ConditionalApiIncom.data.data);
      if (DayComp == 0 || inComeData == 0) {
        setLOading_Spinner(true)

        if (user_Address == acc) {
          setLOading_Spinner(true)


          // console.log("refReport",refReport.length);

          alert("Are you sure, You want to unstake..?")

          const web3 = await window.web3;
          let Ule_100_ContractOf = new web3.eth.Contract(ULE_NFT_100_ABI, ULE_NFT_100);
          let ULE_Staking_ContractOf = new web3.eth.Contract(Ule_NFT_Staking_100_ABI, ULE_NFT_Staking_100);
          let OwnCheck = await ULE_Staking_ContractOf.methods.IDOwnerCheck(user_Address, getTokId).call();
          // console.log("OwnCheck", OwnCheck);
          // console.log("RowId", RowId);

          if (OwnCheck == true) {
            let hash = await ULE_Staking_ContractOf.methods.unstake(getTokId, user_Address).send({
              from: acc,
              // value: totalMintingPriceBNB.toString()

            })

                  
            hash = hash.transactionHash
                  

            let postapi = await axios.post('https://ule-nft-api-1.herokuapp.com/nftUnstkaing', {
              "uid": uId_user,
              "address": acc,
              "rowid": RowId,
              "txn": hash
            })
                  


            toast.success("Transaction Confirmed")
            // alert("Transaction Confirmed")

          } else {
            alert("you are not owner of this id")
            setLOading_Spinner(false)

          }




        } else {
          alert("Account Mismatch")
          setLOading_Spinner(false)

        }

      } else {
        toast.error(`You can’t unstake till 250 days of your staking or 290% of your total earning whichever is earlier Remaning Days: ${DayComp}`)
        setLOading_Spinner(false)

      }



    } catch (error) {
      console.log("Erroe While Call Staking Fuction", error);
      toast.error("Transaction Failed")
      alert("Transaction Failed")
      setLOading_Spinner(false)


    }

  }

  useEffect(() => {
    let arr = [];
    // console.log("refReport", refReport);
    refReport.forEach((item, index) => {

      arr.push({
        sNo: index + 1,
        from_id: item?.uid,
        package: item?.tokenid,
        remark: item?.usdvalue,
        Txn: item?.txn,

        date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
        date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
        date2: <Spinner_data  LOading_Spinner={LOading_Spinner} Unstake_NFT={Unstake_NFT}  />

          // (<>

          //   {
          //     spinner ? (
          //       <>
          //         <div class="spinner-border" role="status">
          //           <span class="visually-hidden">Loading...</span>
          //         </div>
          //       </>
          //     ) :
          //       (
          //         <>
          //           <button className="btn btn-success" onClick={() => Unstake_NFT()}>unstake</button>



          //         </>
          //       )
          //   }

          // </>)

      });
      // if (filterValue == "" || filterValue == "1") {

      // } else {
      //   if (
      //     filterValue == "2" &&
      //     moment(item?.top_update).format("M/D/YYYY h:m:s A") != "Invalid date"
      //   ) {
      //     arr.push({
      //       sNo: index + 1,
      //       from_id: item?.uid,
      //       package: item?.tokenid,
      //       remark: item?.usdvalue,
      //       Txn: item?.txn,
      //       date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
      //       date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
      //       date2:
      //         moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
      //         "Invalid date"
      //           ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
      //           : "Inactive",
      //     });
      //   } else if (
      //     filterValue == "3" &&
      //     moment(item?.top_update).format("M/D/YYYY h:m:s A") == "Invalid date"
      //   ) {
      //     arr.push({
      //       sNo: index + 1,
      //       from_id: item?.uid,
      //       package: item?.tokenid,
      //       remark: item?.usdvalue,
      //       Txn: item?.txn,
      //       date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
      //       date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
      //       date2:
      //         moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
      //         "Invalid date"
      //           ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
      //           : "Inactive",
      //     });
      //   }
      // }
    });
    setDateState([...arr]);
  }, [refReport, filterValue]);
  // console.log("state", filterValue);
  return (
    <>

    
      <div class="content-wrapper">
        <div class="grid grid-1">
          <div class="section-heading">
            <h2>NFT History</h2>
          </div>
          <h3 style={{ color: 'red', marginBottom: '1rem' }}>Note: If user has unstake his NFT, it cannot be staked again.</h3>

          {/* <div className="row">
            <div className="col-12 col-md-6 col-xl-6">
              <div className="row pb-4 pt-2">
                <div className="col-6">
                  <label className="control-label">Choose Status : </label>
                </div>
                <div className="col-6">
                  <select
                    className="form-control"
                    id="level"
                    defaultValue={filterValue}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="1">All</option>
                    <option value="2">Active</option>
                    <option value="3">In-Active</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-6"></div>
          </div> */}
          <CustomTable
            columns={[
              { title: "S.No", field: "sNo" },
              { title: "User ID", field: "from_id" },
              { title: "Token ID", field: "package" },
              { title: "Date", field: "date" },
              { title: "Usd", field: "remark" },
              { title: "Txn	", field: "Txn" },


              { title: "Action", field: "date2" },
            ]}
            data={[...dataState]}
            title=""
            toolbar={false}
          />
        </div>
      </div>
      <div class="clearfix">
        <br />
      </div>

      <br />
      <br />
      <div class="footer-section">
        Copyright © 2022 Yeepule. All Rights Reserved.
      </div>
      <link
        rel="stylesheet"
        type="text/css"
        href="assets/css/2.d34346ea.chunk.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="assets/css/main.f70df022.chunk.css"
      />
    </>
  );
};


export default StakHistory;