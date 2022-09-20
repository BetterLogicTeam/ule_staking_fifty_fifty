import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from "web3";
import { API } from "../../store/actions/API";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { loginAction } from "../../store/actions/login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { contractAbiBNB, contractAddressbnb, tokenAbi, tokenAddress } from "../Activate/constants";
import { loadWeb3 } from "../../Api/Api";
import axios from "axios";
export default function FormDialog({ setRegistered }) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [RefID, setRefID] = useState()
  let [matic, setmatic] = useState(0)
  let [ule, setule] = useState(0)
  const [spiner, setspiner] = useState(false)
  const user = localStorage.getItem("user");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRegistered(false);
  };
  const [sId, setSId] = useState(null);
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
        setAccount(accounts[0]);
        let chain = await web3.eth.getChainId();
        setChainId(chain);
        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
          let chain = await web3.eth.getChainId();
          setChainId(chain);
        });
      }
    } catch (error) {
      console.log("error message", error?.message);
    }
  };



  const ReferralAddress = async () => {
    const user = localStorage.getItem("user");

    let ress = JSON.parse(user);
    let uId = ress?.user_id;

    try {

      let URL = window.location.href;


      // const str = 'http://www.yulenft.net/login?referrallink=464867';
      // var pathArray = str.split( '=' );
      // alert(pathArray[pathArray.length-1]);
      // console.log("last",pathArray[pathArray.length-1])
      // console.log("LAST", URL);

      if (URL.includes("referrallink")) {
        let pathArray = URL.split('=');
        // console.log("LAST");
        setRefID(pathArray[pathArray.length - 1])
        setSId(pathArray[pathArray.length - 1])


      } else {

      }



    } catch (e) {
      console.log("Erroe Whille Referral Fuction Call", e);
    }
  }

  const registered = async (sellCall) => {
    try {
      // console.log("SID", sId);
      setspiner(true)

      const res = await API.post(`/registraction`, {
        sid: sId,
        uid: "",
        accountnumber: account,
        email: "",
        addresslist: "",
        paymentType: "",
        amount: "",
        traxn: sellCall,
        status: "success",
        amount1: "",
        amount2: "",
      });
      // console.log(res);
      handleLogin2(account);
      toast.success("Successfully registered !");
      setspiner(false)

    } catch (e) {
      console.log("error", e);
      toast.error("Something went wrong !");
      setspiner(false)

    }
  };
  const handleLogin2 = async (ids) => {
    setspiner(true)

    let res = await dispatch(loginAction(ids));
    if (res) {
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
      // window.location.reload()
    } else {
      setspiner(false)

      toast.error("Something went wrong ! ");
    }
  };



  const handleLogin3 = async (ids) => {
    setspiner(true)

    let res = await dispatch(loginAction(ids));
    console.log("Res_Data", res);
    if (res) {

      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
      // window.location.reload()
    } else {
      setspiner(false)

      cotractCall()
    }
  };


  const cotractCall = async () => {
    let acc = await loadWeb3();
    if (acc == 'No Wallet') {
      toast.error('No Wallet')
    }
    else if (acc == 'Wrong Network') {
      toast.error('Wrong Network Please Connect Polygon Network')
    }
    else {

      alert(`Are You Sure! Your referral ID is This: ${sId}`)

      // setaddress(acc)
      // setconnected('MetaMask is connected... Ready To Register')
      console.log("ule", ule);
      console.log("ule", matic);
      setspiner(true)
      ule = ule.toString()
      ule = window.web3.utils.toWei(ule)
      matic = matic.toString()
      matic = window.web3.utils.toWei(matic)
      try {
        let contract = await new window.web3.eth.Contract(contractAbiBNB, contractAddressbnb)
        let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
        console.log("Tayy");
        let approveCall = await token.methods.approve(contractAddressbnb, ule).send({ from: acc });
        toast.success('Approved')
        let sellCall = await contract.methods.sell(ule).send({ from: acc, value: matic });
        toast.success('Transection Succesfull')
        sellCall = sellCall.transactionHash

        registered(sellCall)
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
    setmatic((Number(res.data.data[0].usdperunit) * 25))


  }
  const callUleApi = async () => {
    let res = await axios.get(` https://ulenftapis.ulenft.site/live_rate_ule`);
    console.log("ULE", res);
    setule(((1 / Number(res.data.data[0].usdperunit)) * 25))


  }



  useEffect(() => {
    metamask();
    callMaticUrliApi()
    callUleApi()
    ReferralAddress()
  }, []);
  return (
    <div>
      <ToastContainer />

      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        className="modalContainer"
      >
        <DialogTitle
          id="form-dialog-title"
          className="d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px" }}
        >
          Register an Account
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            placeholder="Please enter upline ID or referral link "
            fullWidth
            value={RefID}
            onChange={(e) => setSId(e.target.value)}
          />
          <DialogContentText className="mt-1 textStyle">
            Enter the account id or referral link
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center align-items-center">
          <Button onClick={() => handleLogin3(account)} className="loginbtn">
            {
              spiner ? <><div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div></> :
                <>OK</>
            }

          </Button>
          <Button onClick={handleClose} className="loginbtn">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
