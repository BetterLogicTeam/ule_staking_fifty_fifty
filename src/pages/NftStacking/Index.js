import React, { useEffect, useState } from "react";
import { API } from "../../store/actions/API";
import { $, jQuery } from "jquery";
import Web3 from "web3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { loadWeb3, loadweb3 } from '../../Api/Api'
import { type } from "@testing-library/user-event/dist/type";
import { ULE_NFT_100, ULE_NFT_100_ABI, ULE_NFT_Staking_100, Ule_NFT_Staking_100_ABI } from "../Utils/Contract_Address";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


// import Activate from '../../pages/Activate/index';
// import { ethers } from "ethers";
// import "./App.css";
// import { Button, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NftStak from "./NftStak";

let network;
let contract_address;
let connection;
let web3;
let interval;
let myBalance;
let mainAccount;
let accounts;
let Accounttype = "0";
let windows = {};



function NftStaking() {
  const [uid, setUId] = useState("101010");
  const [address, setAddress] = useState("12356");
  const [tokenid, setTokenId] = useState("");
  const [txn, setTxn] = useState("nhtyty78");
  const [rate, setRate] = useState(0);
  const [account, setAccount] = useState("");
  const [isLoadingTrans, setLoadingTrans] = useState(false);
  const [amount, setAmount] = useState("");
  const [balnacBNB, setBalnacBNB] = useState(0);
  const [blnce, setBlnce] = useState(0);
  let [btnTxt, setBtTxt] = useState("Connect Wallet")
  let [connectText, setconnectText] = useState("Metamask Unlocked")
  const [userInfo, setUserInfo] = useState(null);


  const user = localStorage.getItem("user");
  const dashboard = useSelector((state) => state?.dashboard);


  // console.log("dashboard",dashboard);

  const getAccount = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      setBtTxt("No Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);
      setconnectText("Metamask Unlocked")

    }
  }

  useEffect(() => {
    setInterval(() => {
      // getAccount();
    }, 1000);
  }, []);



  // const metamask = async () => {
  //   let isConnected = false;
  //   try {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.ethereum);
  //       await window.ethereum.enable();
  //       isConnected = true;
  //     } else if (window.web3) {
  //       window.web3 = new Web3(window.web3.currentProvider);
  //       isConnected = true;
  //     } else {
  //       isConnected = false;
  //     }
  //     if (isConnected === true) {
  //       const web3 = window.web3;
  //       let acc = await loadWeb3()
  //       let accounts = await web3.eth.getAccounts();
  //       console.log("Account", accounts[0]);
  //       mainAccount = accounts[0];
  //       //   $('#metamaskconnection').val("Wallet is connected");
  //       jQuery("#metamaskconnection").text("connected");
  //       setAccount(accounts[0]);
  //       let chain = await web3.eth.getChainId();
  //       console.log("ChainID", chain);
  //       setChainId(chain);

  //       let contractOf = new web3.eth.Contract(abitoken, contractAddresstoken);
  //       let data = await contractOf.methods.balanceOf(acc).call();
  //       console.log("Balance ",data);
  //       let token = data / 1000000000000000000;
  //       setBlnce(token);
  //       console.log(token);

  //       window.ethereum.on("accountsChanged", async function (accounts) {
  //         setAccount(accounts[0]);
  //         let chain = await web3.eth.getChainId();
  //         setChainId(chain);
  //         const web3 = window.web3;
  //         let contract = new web3.eth.Contract(abitoken, contractAddresstoken);
  //         let data = await contract.methods.balanceOf(accounts[0]).call();
  //         let token = data / 1000000000000000000;
  //         setBlnce(token);
  //         console.log(blnce);
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error message", error?.message);
  //   }
  // };

  const getBalance = async () => {
    let acc = await loadWeb3()
    try {
      const web3 = await window.web3;
      // let contractOf = new web3.eth.Contract(abitoken, contractAddresstoken);
      // let nftContractOf = new web3.eth.Contract(abitoken, contractAddresstoken);
      let res = await web3.eth.getBalance(acc)
      res = web3.utils.fromWei(res)
      // let ResultRes = res.toString();
      // console.log("ResultRes ",ResultRes);
      setBlnce(res)
      // console.log(type(res))
      // setBalnacBNB(res?.data.data[0].usdperunit);
      //   let data = await nftContractOf.methods.balanceOf(acc).call();

      // console.log("Balance ",data);


    } catch (e) {
      console.log("Erroe while Call function Of GetBAlance", e);
    }

  }
  // console.log("what is api",API)
  const WalletAddress = async () => {

    let ress = JSON.parse(user);
    let uId = ress?.user_id;

    // 
    try {
      const res = await axios.get(`https://ulenftapis.ulenft.site/get_user_info?id=${uId}`);
      // console.log("res", res);
      let User_Address = res?.data?.data[0].EthAddress
      if (res?.data?.data?.length > 0) {
        //    
        setUserInfo(res?.data?.data[0]);
      }

    } catch (e) {
      console.log("Fatch Api", e);
    }


  }


  useEffect(() => {
    getBalance();
    WalletAddress()
  }, []);

  // async function handleActivation() {
  //   try {
  //     setLoadingTrans(true);

  //     let usdamt = amount; //Package USD Amount
  //     let token = blnce; //Package ULE Value
  //     let mainadd = account;

  //     if (parseInt(blnce) < parseInt(parseInt(amount) / rate)) {
  //       alert("Wallet balance insufficient!!!");
  //       setLoadingTrans(false);

  //       return;
  //     }

  //     if (mainadd == undefined) {
  //       alert("Please connect wallet!!!");
  //       setLoadingTrans(false);
  //       return;
  //     }

  //     if (parseInt(usdamt) < 100) {
  //       alert("Enter Minimum package amount 100 USD!!!");
  //       setLoadingTrans(false);
  //       return;
  //     }
  //     if (parseInt(usdamt) < 100) {
  //       alert("Enter Minimum package amount 100 USD!!!");
  //       setLoadingTrans(false);
  //       return;
  //     }

  //     if (parseInt(parseInt(usdamt) % 100) != 0) {
  //       alert("Enter package amount in multiple of 100 USD!!!");
  //       setLoadingTrans(false);
  //       return;
  //     }

  //     if (parseInt(usdamt) > 10000) {
  //       alert("Maximum package amount is 10000 USD");
  //       setLoadingTrans(false);
  //       return false;
  //     }

  //     const web3 = window.web3;

  //     // let tokenAmount = web3.utils.toWei(value.toString());
  //     // console.log("tokenAmount", tokenAmount);
  //     let contract = new web3.eth.Contract(abi, contractAddress);
  //     let tokencontract = new web3.eth.Contract(abitoken, contractAddresstoken);
  //     await tokencontract.methods
  //       // .approve(contractAddress, tokenAmount.toString())
  //       .send({ from: account });

  //     contract.methods
  //       // .sell(tokenAmount.toString())
  //       .send({
  //         from: account,
  //       })
  //       .on("transactionHash", async (hash) => {
  //         if (hash != "") {
  //           try {
  //             const res = await API.post(`/activation`, {
  //               // uid: uid,
  //               // transaction: hash,
  //               amount: amount,
  //               addreslist: account,
  //               useraddress: account,
  //               // amountlist: value,
  //               // tokenamount: amount / rate,
  //             });

  //             console.log(res);
  //             if (res?.data?.success) {
  //               toast.success("Successfully subscribed to Activation ! ");
  //               setLoadingTrans(false);
  //             } else {
  //               setLoadingTrans(false);

  //               toast.error("Something went wrong ! ");
  //             }
  //             setTimeout(() => {
  //               // getLiveRate1();
  //             }, 250);
  //           } catch (e) {
  //             console.log("error", e);
  //             setLoadingTrans(false);
  //             toast.error("Something went wrong ! ");
  //           }
  //         }
  //       });
  //   } catch (error) {
  //     console.log("error", error);
  //     setLoadingTrans(false);
  //   }
  // }




  const ULE_Stake = async () => {
    const acc = await loadWeb3()
    const user = localStorage.getItem("user");
    let ress = JSON.parse(user);
    let uId_user = ress?.user_id;
    //     
    try {
      if (userInfo.EthAddress == acc) {
        if (tokenid == "") {
          alert("Please Enter Token Id")
        } else {
          const web3 = await window.web3;
          let Ule_100_ContractOf = new web3.eth.Contract(ULE_NFT_100_ABI, ULE_NFT_100);
          let ULE_Staking_ContractOf = new web3.eth.Contract(Ule_NFT_Staking_100_ABI, ULE_NFT_Staking_100);
          let check_Nft_Balance = await Ule_100_ContractOf.methods.ownerOf(tokenid).call();
          //     

          let Api_Conditon=await axios.post("https://ulenftapis.ulenft.site/stakeNftCondition",{
            "uid":uId_user,
            "amount":"100"
          })

          if (check_Nft_Balance == acc) {
            // let Check_staked_id = await ULE_Staking_ContractOf.methods.check(tokenid).call();
            // if (Check_staked_id == false) {
            await Ule_100_ContractOf.methods.setApprovalForAll(ULE_NFT_Staking_100, true).send({
              from: acc
            })

            toast.success("Successfully Approved")

            let hash = await ULE_Staking_ContractOf.methods.Stake(tokenid).send({
              from: acc,
              // value: totalMintingPriceBNB.toString()

            })

            //       
            hash = hash.transactionHash
            //       

            let postapi = await axios.post('https://ule-nft-api-1.herokuapp.com/nftStaking', {
              "uid": uId_user,
              "address": acc,
              "tokenid": tokenid,
              "txn": hash
            })
                  


            toast.success("Transaction Confirmed")
            // alert("Transaction Confirmed")
            window.location.reload()

            // } else {
            //   alert("NFT Id Already Staked. ")

            // }
          } else {
            alert("You are not owner of this ID. ")
          }


        }

      } else {
        // alert("Account Mismatch")
        toast.error("Account Mismatch")

      }


    } catch (error) {
      console.log("Erroe While Call Staking Fuction", error);
      toast.error("Transaction Failed")

    }
  }

  const getLiveRate = async () => {
    try {
      const res = await API.get(`/live_rate`);
      // console.log(res);
      setRate(res?.data.data[0].usdperunit);
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    getLiveRate();
  }, []);

  function saveUser() {
    console.warn({ tokenid });
    let data = { uid, address, tokenid, txn };
    //        
    fetch("https://ule-nft-api-1.herokuapp.com/nftStaking", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      // console.warn("result",result);
      result.json().then((resp) => {
        console.warn("resp", resp);
      });
    });
  }
  return (
    <>
      <div class="col-md 9 stak">
        <div className="col-md-7 stack-md">
          <div className="d-flex justify-content-between">
          <h4 className="stack-h4">NFT Staking </h4>
          <button className="btn btn-success " onClick={()=>getAccount()}> {btnTxt}</button>
          </div>
        
          {/* <h6 className="stack-h6">
            Available BNB Balance :
            <input
              type="text"
              className="input_width"
              id="txtchangevalue"
              style={{ color: "black" }}
              placeholder={`${setBalnacBNB}`}
              readonly=""
            />
          </h6> */}

          {/* <h6 className="stack-h6">
            Available BNB Balance :
            <span
              id="tokenbalance"
              style={{
                paddingTop: "7px",
                paddingBottom: "7px",
                marginLeft: "0.5rem"
              }}
            >
              {blnce}  BNB
            </span>
          </h6> */}
          {/* <Activate /> */}
          {/* <h6 className="stack-h6">
            Live Rate :
            <input
              type="text"
              className="input_width btn btn-stack"
              id="txtchangevalue"
              style={{ color: "black" }}
              placeholder={`1 ULE /  ${rate} USD`}
              readonly=""
            />
          
          </h6> */}


          <hr className="stak-hr" />
          {/* <isLocked /> */}
          <h6 className="stack-h6 text-center mt-5">
            {/* Available BNB Balance : */}
            <span
              id="tokenbalance"

            >
              {connectText}

            </span>
            {/* <span>{btnTxt}</span> */}
          </h6>
          <form name="frm1" method="post">
            <h6 className="stack-h6 ipp">
              {/* <input
                type="text"
                className="stak-input"
                name="User Id"
                value={uid}
                onChange={(e) => {
                  setUId(e.target.value);
                }}
                placeholder="Enter User id"
                style={{ display: "none" }}
                required
              />
              <input
                type="text"
                className="stak-input"
                name="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter Address"
                style={{ display: "none" }}
                required
              /> */}

              <div class="dropdown ms-2 mt-2 mb-4">
                <button
                  class="btn btn-secondary dropdown-toggle select_main btn_dropdownhere"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Staking
                </button>
                <ul
                  class="dropdown-menu btn_dropdownhere text-center h-auto fs-3"
                  aria-labelledby="dropdownMenuButton1"
                >
 <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_100" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 100 USD
                      </Link>
                    </a>
                  </li>
                
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_200" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 200 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_300" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 300 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_400" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 400 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_500" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 500 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_1000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 1000 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_2000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 2000 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_3000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 3000 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_4000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 4000 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_5000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 5000 USD
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item">
                      {" "}
                      <Link to="Stacking_With_10000" className="text-d">
                        {" "}
                        {/* <img src="bsc3.png" alt="" /> */}
                        Staking With 10000 USD
                      </Link>
                    </a>
                  </li>
                  {/* <li>
                      <a class="dropdown-item">
                        <Link to="/Main_polygon" className="text-d">
                          {" "}
                          <img src="polygon.png" alt="" /> Polygon
                        </Link>
                      </a>
                    </li> */}
                </ul>
              </div>
              {/* <input
                type="text"
                className="stak-input"
                name="fname"
                value={tokenid}
                onChange={(e) => {
                  setTokenId(e.target.value);
                }}
                placeholder="Enter Token id"
                required
              /> */}


              {/* <input
                type="text"
                className="stak-input"
                name="fname"
                value={txn}
                onChange={(e) => {
                  setTxn(e.target.value);
                }}
                placeholder="Enter Txn id"
                style={{ display: "none" }}
                required
              /> */}
              {/* <span className="stak-span">Token ID</span> */}
            </h6>
            {/* <button className="btn btn-stak" onClick={() => ULE_Stake()} type="button">
              <img className="stack-sr" src="assets/images/Icon/112.png" />
              Staking
            </button> */}
          </form>
        </div>
      </div>

      <br />
      <br />
      <div className="footer-section">
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
}

export default NftStaking;
