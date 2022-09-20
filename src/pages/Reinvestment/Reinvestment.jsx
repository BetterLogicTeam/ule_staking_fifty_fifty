import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { loadWeb3 } from '../../Api/Api'
// import { tokenAbi, tokenAddress } from '../Activate/constants'
import { contractAbiBNB, contractAddressbnb, tokenAbi, tokenAddress } from "../Activate/constants";

import axios from 'axios';
// import './css/bootstrap.min.css'
// import './css/reinvestment.css'
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;

export default function Reinvestment() {
    const [balanceUle, setbalanceUle] = useState(0)
    const [TrxBalance, setTrxBalance] = useState(0)
    const [RateMatic, setRateMatic] = useState(0)
    let [matic, setmatic] = useState(0)
    let [ule, setule] = useState(0)
    const [spiner, setspiner] = useState(false)

    const [Rate, setRate] = useState(0)
    const [amount, setamount] = useState(0)
    const [meticmultiplyablevalue, setmeticmultiplyablevalue] = useState(0)


    const [connected, setconnected] = useState("Wallet is locked")


    const walletConnected = async () => {
        try {
            let acc = await loadWeb3()

            if (acc == 'No Wallet') {
                toast.error('No Wallet')
                setconnected('Wallet is locked')

            }
            else if (acc == 'Wrong Network') {
                toast.error(' Wrong Network Please Connect Polygon Network')
                setconnected('Wallet is locked')
            }
            else {
                // setaddress(acc)
                setconnected('Wallet is Unlocked')
            }



        } catch (e) {
            console.log("Error While WalletConnect", e);
        }
    }


    const UleBalance = async () => {
        let acc = await loadWeb3()

        let contract = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
        let result = await contract.methods.balanceOf(acc).call()
        // result = parseInt(result)
        result = window.web3.utils.fromWei(result);
        // result = result.toFixed(1)
        // setBlnce(result);

        setbalanceUle(result)
        console.log("Balance Ule", result);


        let bNB_balance = await window.web3.eth.getBalance(acc)
        result = parseInt(result)

        bNB_balance = window.web3.utils.fromWei(bNB_balance)
        // bNB_balance = bNB_balance.toFixed(8)

        console.log("Addressss", bNB_balance);
        console.log("Balance_BNB", bNB_balance);

        setTrxBalance(bNB_balance)

    }

    const getLiveRate = async () => {
        try {
            const res = await axios.get(`https://ulenftapis.ulenft.site/live_rate_ule`);
            setRate((res?.data.data[0].usdperunit));
            console.log("what is rate", res?.data.data[0].usdperunit)
        } catch (e) {
            console.log("error", e);
        }
    };
    const LiveRateMaticAPI = async () => {
        try {
            let res = await axios.get(`https://ulematic-api.herokuapp.com/live_rate_matic?id=${1}`);
            res = res.data.data[0];
            console.log("res", res);
            setRateMatic((res.usdperunit));

        } catch (e) {
            console.log("Error While Fatch Dashboard API", e);
        }
    };

    const fifty = async (value) => {
        if (value == 50) {
            setmeticmultiplyablevalue(value)
            setamount('')
            count2 = 0
            count3 = 0
            count4 = 0
            count1 = count1 + 1;

            setamount(value * count1);

        }
        else if (value == 100) {
            count1 = 0
            count3 = 0
            count4 = 0
            setmeticmultiplyablevalue(value)
            setamount('')
            count2 = count2 + 1;

            setamount(value * count2);


        }
        else if (value == 500) {
            count1 = 0
            count2 = 0
            count4 = 0
            setmeticmultiplyablevalue(value)
            setamount('')
            count3 = count3 + 1;

            setamount(value * count3);


        }
        else if (value == 1000) {

            setamount('')
            setmeticmultiplyablevalue(value)
            count1 = 0
            count3 = 0
            count2 = 0
            count4 = count4 + 1;

            setamount(value * count4);


        }

        // setamount(value * count);


    }
    const reinvestmentCall = async () => {
        let acc = await loadWeb3();
        if (acc == 'No Wallet') {
            toast.error('No Wallet')
        }
        else if (acc == 'Wrong Network') {
            toast.error('Wrong Network Please Connect Polygon Network')
        }
        else {

            // alert(`Are You Sure! Your referral ID is This: ${sId}`)

            // setaddress(acc)
            // setconnected('MetaMask is connected... Ready To Register')

            console.log("ule", ule);
            setspiner(true)
            ule = amount * (1 / Rate)
            console.log('what is amount', typeof (ule))
            ule = ule.toString()
            console.log('what is amount', typeof (ule))

            ule = window.web3.utils.toWei(ule)
            matic = matic * amount
            console.log("ule matic before converting", matic);

            matic = matic.toString()

            matic = window.web3.utils.toWei(matic)
            console.log("ule matic", matic);

            try {
                let contract = await new window.web3.eth.Contract(contractAbiBNB, contractAddressbnb)
                let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
                console.log("what is matoc value", matic);
                let approveCall = await token.methods.approve(contractAddressbnb, ule).send({ from: acc });
                toast.success('Approved')
                let sellCall = await contract.methods.sell(ule).send({ from: acc, value: matic });
                toast.success('Transection Succesfull')
                const user = localStorage.getItem("user");

                let ress = JSON.parse(user);
                let uId = ress?.user_id;
                sellCall = sellCall.transactionHash
                let token_amount = amount * (1 / Rate)
                // console.log('what is user id', uId)
                // console.log('what is transactionHash', sellCall)
                // console.log('what is token_amount', token_amount)
                // console.log('what is  metamask account', acc)
                // console.log('what is  amount', amount)






                let res = await axios.post(`https://ulenftapis.ulenft.site/Reinvestment`, {
                    uid: uId,
                    transaction: sellCall,
                    amount: amount,
                    useraddress: acc,
                    tokenamount: token_amount
                });

                setspiner(false)

            }
            catch (err) {
                console.log("error while calling fuction sell", err)
                setspiner(false)

            }

        }
        // setloader(false)
    }
    const callMaticUrliApi = async () => {
        let res = await axios.get(`https://ulenftapis.ulenft.site/live_rate_bnb`);
        console.log("BNB", res);
        setmatic((Number(res.data.data[0].usdperunit)))


    }
    // const callUleApi = async () => {
    //     let res = await axios.get(` https://ulenftapis.ulenft.site/live_rate_ule`);
    //     console.log("ULE", res);
    //     setule(((1 / Number(res.data.data[0].usdperunit)) * 25))


    // }

    useEffect(() => {
        getLiveRate()
        LiveRateMaticAPI()
        UleBalance()
        walletConnected()
        // callUleApi()
        callMaticUrliApi()
    }, [])

    return (
        <div>
            <div class="container body-content mt-5">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="ule_logo">
                                    <img src="assets/images/logo.png" />
                                </div>
                                <h3 class="text-center">Reinvestment</h3>
                                <div class="modal-header" style={{ paddingBottom: "10px !important" }}>
                                    <div class="avlbal">
                                        <h5 class="modal-title" id="exampleModal3Label2">
                                            Available ULE Token Balance
                                            <span id="tokenbalance">{balanceUle} Token</span>
                                        </h5>
                                        <br />

                                        <h5 class="modal-title">
                                            Live Rate
                                            <input type="text" class="input_width" id="txtchangevalue" style={{ color: "black" }} value={`${1} USD / ${1 / Rate}  ULE Token`} placeholder="0 USD / 9.1036  ULE Token" readonly="" />
                                        </h5>
                                    </div>
                                </div>
                                <div class="modal-body">
                                    <div class="popup_net">
                                        <div class="set_meta" style={{ marginTop: "15px" }}>
                                            <span class="metamaskConnection">{connected}</span>
                                        </div>
                                        {/* <!---onclick number increase start--> */}
                                        <div class="addNum">
                                            <div class="trxnumber">
                                                <div class="trx_field">
                                                    <input type="text" class="form5" id="txtamount" readonly value={amount} name="txtamount" placeholder="Enter Package Amount in USD" />

                                                    <input type="text" value={amount * (1 / Rate)} readonly="" class="form5" id="txtTokenvalue" name="txtTokenvalue" />
                                                </div>
                                                <div class="pkg_btn">
                                                    <button type="button" onClick={() => { fifty(50) }}>50</button>
                                                    <button type="button" onClick={() => { fifty(100) }}>100</button>
                                                    <button type="button" onClick={() => { fifty(500) }}>500</button>
                                                    <button type="button" onClick={() => { fifty(1000) }}>1000</button>
                                                </div>
                                                <button onClick={reinvestmentCall}>
                                                    <img src="assets/images/activateBlack.png" class="whImg" />
                                                    <img src="assets/images/activateYello.png" class="yellowImg" />
                                                    Reinvestment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
