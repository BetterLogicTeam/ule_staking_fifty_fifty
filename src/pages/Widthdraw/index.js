import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { getDownlineReport } from "../../store/actions/dailyYield";
import { getWalletAddress } from "../../store/actions/dashboard";
import { API } from "../../store/actions/API";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import TronWeb from "tronweb";
import Web3 from "web3";
import { Withdraw_Abi, Withdrwa_Address } from "../Activate/constants";
import { ethers } from "ethers";
import { loadWeb3 } from "../../Api/Api";
// ye wala he

export const Widthdraw = () => {
  const downlineReport = useSelector(
    (state) => state?.dailyYield?.downlineReport
  );
  const dashboard = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [depositeAmount, setDepositeAmount] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [tronAdd, setTronAdd] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoadingTrans, setLoadingTrans] = useState(false);
  const [Value_Cal, setValue_Cal] = useState()
  const [BtnDisable, setBtnDisable] = useState(false)
  const [Hash, setHash] = useState()



  window.troni = {};



  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const metamask = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        if (account !== accounts[0]) {
          setAccount(accounts[0]);
        }

        let chain = await web3.eth.getChainId();
        setChainId(chain);
        if (chain === 303) {
          // handleLogin2(accounts[0]);
        }
        window.ethereum.on("accountsChanged", async function (accounts) {
          if (account !== accounts[0]) {
            setAccount(accounts[0]);
          }

          let chain = await web3.eth.getChainId();
          setChainId(chain);
          if (chain === 303) {
            // handleLogin2(accounts[0]);
          }
        });
      }
    } catch (error) {
      console.log("error message", error?.message);
    }
  };
  const [rate, setRate] = useState(0);
  const getLiveRate = async () => {
    try {
      const res = await API.get(`/live_rate`);
      setRate(res?.data.data[0].usdperunit);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getUserInfo = async () => {
    try {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      const res = await API.get(`/get_user_info?id=${uId}`);
      if (res?.data?.data?.length > 0) {
        setUserInfo(res?.data?.data[0]);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };



  let mainAccount = "";

  var nonce = 2; // some random number
  const [accountAddress, setAccountAddress] = useState("");
  const [trxtBalance, setTrxBalance] = useState("0");
  const [TokenValue, setTokenValue] = useState("0")

  // console.log(trxtBalance);

  const getBlnce = async () => {
    try {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      const res = await API.get(`/net_usd?id=${uId}`);
      // console.log("RESSSS", res);
      setTrxBalance(
        res?.data?.data[0]?.netbal ? res?.data?.data[0]?.netbal : 0
      );
      setTokenValue(
        res?.data?.data[0]?.netbal_Token ? res?.data?.data[0]?.netbal_Token : 0

      )
    } catch (e) {
      console.log("error", e);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      // Ethereum();
      getBlnce();
    }, 2000);
    getUserInfo();
    getLiveRate();
    metamask();
  }, []);





  const Withdraw_toke = async () => {
    let CONTRACT_ADDRESS = "0x4c6034e5c05683785e5d117d50d8ce63d8450a4c";
    let privateKey = "97d86df48a3d49741d0db91dacb28143537a975a3ae7e051adc5372f3a4dfbdb";
    var nonce = 2; // some random number
    const web3 = window.web3;
    const acc = await loadWeb3()
    // console.log("Amount_Data");

    setLoadingTrans(true)
    try {
      if (acc == userInfo?.EthAddress) {
        // console.log("Amount_Data"); 

        let multilplyValue = 0.95;
        let AmountBNB = depositeAmount * multilplyValue;
       
        AmountBNB = AmountBNB.toString()
        let AmountToken = web3.utils.toWei(AmountBNB);
        


        // let AmountToken = ((depositeAmount*0.95)* 10 ** 18).toString();
        // let actualValue = window.tronWeb.toBigNumber(AmountToken);

       
        // let res = await axios.post('https://ulenftapis.ulenft.site/get_usd_value', {
        //   "tokenamount": depositeAmount
        // })
        // console.log("res", res.data.data);
       
        let ress = JSON.parse(user);
        let uId = ress?.user_id;

        let res = await axios.post('https://ulenftapis.ulenft.site/get_usd_value', {
          "uid": uId,
          "tokenamount": depositeAmount

        })
        setValue_Cal(res.data.data)
        
        let res_Condition = await axios.post('https://ulenftapis.ulenft.site/withdrawlCondition', {
          "uid": uId,
          "amount": res.data.data,
          "tokenamount": depositeAmount

        })

    

        // console.log("res_Condition", res_Condition.data.data);
        if (res_Condition.data.data == "Your next Withdrawal will be after 2 hours ...") {
          setBtnDisable(true)
          toast.error(res_Condition.data.data)
          setLoadingTrans(false)

        } else {
          if (res_Condition.data.data == "Success") {
            const ethers = window.ethers.utils;
            let contractof = new web3.eth.Contract(Withdraw_Abi, Withdrwa_Address);
            let signingKey = new ethers.SigningKey('0x' + privateKey);
            let extra = Math.random() * 100 + 1; // Additional randomness
            nonce = parseInt(nonce + Math.random() * 10);
            nonce = nonce + extra;
            let message = (nonce + depositeAmount + new Date()).toString(); // Random unique message
            let messageBytes = ethers.toUtf8Bytes(message);
            let messageDigest = ethers.keccak256(messageBytes);
            let signature = signingKey.signDigest(messageDigest);
            // console.log("Test", contractof);
            // let hash = await contract.methods.userTokenWithdraw(AmountToken, parseInt(nonce), [messageDigest, signature.r, signature.s], signature.v).send({ from: userInfo?.EthAddress }).then((output) => {

            // });
            //   const signedTx = await  web33.eth.accounts.signTransaction({
            //     to: '0xbd6Dd0fB2D8304c27A2ce055f6B20b5547E3390F',
            //     value: '1000000000000000',
            //     gas: 2000000,
            //     common: {
            //       customChain: {
            //         name: 'custom-chain',
            //         chainId: 56,
            //         networkId: 56
            //       }
            //     }
            // }, pvtkey);

            // web33.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
            //     if (!error) {
            //       console.log("🎉 The hash of your transaction is: ", hash);
            //     } else {
            //       console.log("❗Something went wrong while submitting your transaction:", error)
            //     }
            //    });

          

            await contractof.methods.userTokenWithdraw(AmountToken, parseInt(nonce),
              [messageDigest, signature.r, signature.s], signature.v).send({
                from: userInfo?.EthAddress,
                // gasPrice: "20000000000"

              },
                async function (error, hash) {
                  if (!error) {
                    // console.log("🎉 The hash of your transaction is: ", hash);
                    // console.log("uid", uId, "address", userInfo?.EthAddress, "amount", AmountBNB, "tokenvalue", AmountToken, "txn", hash);

                    let Final_Res = await axios.post('https://ulenftapis.ulenft.site/save_withdraw', {
                      "uid": uId,
                      "address": userInfo?.EthAddress,
                      "amount": depositeAmount,
                      "tokenvalue": depositeAmount,
                      "txn": hash

                    })
                    // console.log("Final_Res", Final_Res.data.data);
                    
                    setLoadingTrans(false)
                    toast.success("Withdraw SuccessFull")

                  } else {
                    console.log("❗Something went wrong while submitting your transaction:", error)
                  }
                })






            setLoadingTrans(false)
          } else {
            toast.error(res_Condition.data.data)
            setLoadingTrans(false)

          }
        }
      } else {
        toast.error("Account Mismatch")
        setLoadingTrans(false)


      }





    } catch (e) {
      setLoadingTrans(false)
      console.log("Erroe while call Withdraw Fuction", e);

    }
  }




  return (
    <>
      {isLoading ? (
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <ToastContainer />
          {!userInfo?.EthAddress ? (
            <div className="" ng-controller="myProfileAngularCtrl">
              <div className="content-wrapper">
                <div className="grid grid-1">
                  <div className="">
                    <div className="section-heading">
                      <h2>Enter Withdrawal Address</h2>
                    </div>
                    <div className="box box-default">
                      {userInfo?.EthAddress == userInfo?.EthAddress ? (
                        <>
                          <div className="panel-body">
                            <br />
                            <div className="row">
                              <div className="col-md-2">
                                <label>Metamask Address</label>
                              </div>
                              <div className="col-md-5">
                                <input
                                  type="text"
                                  id="EthAddress"
                                  name="EthAddress"
                                  className="form-control mb-20"
                                  value={userInfo?.EthAddress}
                                  disabled={true}
                                  placeholder="Enter ETH Address"
                                />
                              </div>
                            </div>
                            <br />
                            {/* <div className="row">
                              <div className="col-md-2">
                                <label>TRON Address</label>
                              </div>
                              <div className="col-md-5">
                                <input
                                  type="text"
                                  id="TronAddress"
                                  name="TronAddress"
                                  value={tronAdd}
                                  onChange={(e) => setTronAdd(e.target.value)}
                                  className="form-control mb-20"
                                  placeholder="Enter TRON Address"
                                />
                              </div>
                            </div> */}
                            {/* <div className="row pt-4">
                              <div className="col-md-3 col-md-offset-2">
                                <div className="submit_bnt">
                                  <button
                                
                                    id="btnsub2"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </>
                      ) : (
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-2">
                              <label style={{ color: 'red' }}>Wrong Address</label>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-md-2">
                              <label>
                                Plaese connect Metamask with{" "}
                                <b>
                                  {`${userInfo?.EthAddress
                                    ? userInfo?.EthAddress.substr(
                                      0,
                                      6
                                    )
                                    : ""} ... ${userInfo?.EthAddress
                                      ? userInfo?.EthAddress.substr(
                                        userInfo?.EthAddress.length - 6,
                                        userInfo?.EthAddress.length
                                      )
                                      : ""} `}
                                </b>

                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-wrapper">
              <div className="grid grid-1">
                <div className="">
                  <div className="section-heading">
                    <h2>Withdrawal</h2>

                  </div>

                  <div className="box box-default table-wrapper ">
                    <div className="panel-body">
                      {/* <span className="metamaskConnection" style={{color:"red"}}>Metamask is not connected..!..Wait...</span> */}
                      <br />
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-md-2">
                          <label>Metamask Address</label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            id="EthAddress"
                            name="EthAddress"
                            className="form-control mb-20"
                            value={userInfo?.EthAddress}
                            disabled={true}
                            placeholder="Enter ETH Address"
                          />
                        </div>
                      </div>
                      {/* <div className="row mt-3 mb-3">
                      <div className="col-md-2">
                        <label>TRON Address</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="text"
                          id="TronAddress"
                          name="TronAddress"
                          value={userInfo?.TronAddress}
                          disabled={true}
                          className="form-control mb-20"
                          placeholder="Enter TRON Address"
                        />
                      </div>
                    </div> */}
                      <div className="row mt-5">
                        <div className="col-md-2">
                          <label>Wallet Net USD Value</label>
                        </div>
                        <div className="col-md-3">
                          <label className="form-control d-flex align-items-center">
                            {trxtBalance}
                          </label>
                        </div>
                      </div>

                      <div className="row mt-5">
                        <div className="col-md-2">
                          <label>Wallet Net Token Value</label>
                        </div>
                        <div className="col-md-3">
                          <label className="form-control d-flex align-items-center">
                            {TokenValue}
                          </label>
                        </div>
                      </div>

                      <br />

                      <div className="row">
                        <div className="col-md-2">
                          <label>Enter Token Amount </label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control mb-20 ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                            id="amount"
                            placeholder="Enter Token Amount"
                            value={depositeAmount}
                            onChange={(e) => setDepositeAmount(e.target.value)}
                            maxLength={10}
                          />
                        </div>
                      </div>

                      <div className="row mrset mt-5" id="withdrwaltokendiv">
                        <div className="col-md-2">
                          <label>Withdrawal Token </label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                            value={rate ? (depositeAmount) * 0.95 : 0}
                            placeholder="Withdrwal Token "
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="row mrset mt-5" id="withdrwaltokendiv">
                        <div className="col-md-2">
                          <label>Calculate USD value </label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                            value={Value_Cal}
                            placeholder="Calculate USD value"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <input
                        type="hidden"
                        id="address"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        value=""
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        id="userid"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        value=""
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        id="withdrawalvalidate"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        value=""
                        autoComplete="off"
                      />

                      <div className="row">
                        <div className="col-md-3 col-md-offset-2">
                          {isLoadingTrans ? (
                            <button
                              className="btn btn-success"
                              style={{ marginTop: "10px" }}
                              id="btnother"
                            >
                              <div
                                className="loaders"
                                style={{ height: "30px", width: "30px" }}
                              ></div>
                              Transaction is in progress
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              style={{ marginTop: "10px" }}
                              id="btnother"
                              disabled={BtnDisable}
                              onClick={() => Withdraw_toke()}
                            >
                              Withdrawal
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="clearfix">
            <br />
          </div>

          <br />
          <br />
          <div className="footer-section">
            Copyright © 2022 Yeepule. All Rights Reserved.
          </div>
        </>
      )}
    </>
  );
};
