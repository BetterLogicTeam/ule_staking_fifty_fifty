import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyReferralReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";
import axios from "axios";

export const ReferralReport = () => {
  const refReport = useSelector((state) => state?.dailyYield?.refReport_Updated);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [ApiData, setApiData] = useState([]);


  console.log("refReport",refReport);
  const getAllData = async() => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      let res = await axios.get(`https://ulenftapis.ulenft.site/my_referral_report?id=${uId}`);
      console.log("Res",res.data.data);
      setApiData(res.data.data)
      dispatch(getMyReferralReport(uId));
    }
  };
  useEffect(() => {
    getAllData();
  }, [filterValue]);

  useEffect(() => {
    let arr = [];
    ApiData?.forEach((item, index) => {
      if (filterValue == "" || filterValue == "1") {
        arr?.push({
          sNo: index + 1,
          from_id: item?.sid,
          package: item?.packagename,
          // remark: item?.usdvalue,
          // Txn: item?.txn,
          // date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
          date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
          date2:
            moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
            "Invalid date"
              ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
              : "Inactive",
        });
      } else {
        if (
          filterValue == "2" &&
          moment(item?.top_update).format("M/D/YYYY h:m:s A") != "Invalid date"
        ) {
          arr.push({
            sNo: index + 1,
            from_id: item?.sid,
            package: item?.packagename,
            // remark: item?.packagename,
            // Txn: item?.txn,
            // date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
            date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
            date2:
              moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
              "Invalid date"
                ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
                : "Inactive",
          });
        } else if (
          filterValue == "3" &&
          moment(item?.top_update).format("M/D/YYYY h:m:s A") == "Invalid date"
        ) {
          arr.push({
            sNo: index + 1,
            from_id: item?.sid,
            package: item?.packagename,
            // remark: item?.usdvalue,
            // Txn: item?.txn,
            // date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
            date2: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
            date2:
              moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
              "Invalid date"
                ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
                : "Inactive",
          });
        }
      }
    });
    setDateState([...arr]);
  }, [ApiData, filterValue]);
  console.log("state", filterValue);
  return (
    <>
      <div class="content-wrapper">
        <div class="grid grid-1">
          <div class="section-heading">
            <h2>My Referral</h2>
          </div>
          <div className="row">
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
          </div>
          <CustomTable
            columns={[
              { title: "S.No", field: "sNo" },
              { title: "User ID", field: "from_id" },
              // { title: "Token ID", field: "package" },
              // { title: "Date", field: "date" },
              { title: "Package Amount", field: "package" },
              // { title: "Txn	", field: "Txn" },
              { title: "Activation Date Time", field: "date2" },
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
