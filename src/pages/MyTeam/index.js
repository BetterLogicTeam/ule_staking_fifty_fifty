import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTeamReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";

export const MyTeam = () => {
  const downlineReport = useSelector((state) => state?.dailyYield?.teamReport);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);
  const [filterValue1, setFilterValue1] = useState("");

  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getTeamReport(uId));
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    let arr = [];
    downlineReport.forEach((item, index) => {
      if (filterValue1 == "" || filterValue1 == "0") {
        arr.push({
          sNo: index + 1,
          from_id: item?.uid,
          pkg_amount: item?.packageamount,
          date: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
          date:
            moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
            "Invalid date"
              ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
              : "Inactive",
        });
      } else if (filterValue1 == "1") {
        if (
          moment(item?.top_update).format("M/D/YYYY h:m:s A") != "Invalid date"
        ) {
          arr.push({
            sNo: index + 1,
            from_id: item?.uid,
            pkg_amount: item?.packageamount,
            date: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
            date:
              moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
              "Invalid date"
                ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
                : "Inactive",
          });
        }
      } else if (filterValue1 == "2") {
        if (
          moment(item?.top_update).format("M/D/YYYY h:m:s A") == "Invalid date"
        ) {
          arr.push({
            sNo: index + 1,
            from_id: item?.uid,
            pkg_amount: item?.packageamount,
            date: moment(item?.top_update).format("M/D/YYYY h:m:s A"),
            date:
              moment(item?.top_update).format("M/D/YYYY h:m:s A") !=
              "Invalid date"
                ? moment(item?.top_update).format("M/D/YYYY h:m:s A")
                : "Inactive",
          });
        }
      }
    });
    setDateState([...arr]);
  }, [downlineReport,filterValue1]);

  return (
    <>
      <div className="content-wrapper">
        <div className="grid grid-1">
          <div className="section-heading">
            <h2>My Team</h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-xl-6">
              <div className="row pb-4 pt-2">
                <div class="col-6">
                  <label class="control-label">Choose Status : </label>
                </div>
                <div class="col-6">
                  <select
                    class="form-control"
                    id="level"
                    value={filterValue1}
                    onChange={(e) => setFilterValue1(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="0">All</option>
                    <option value="1">Active</option>
                    <option value="2">In-Active</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <CustomTable
            columns={[
              { title: "S.No", field: "sNo" },
              { title: "From ID", field: "from_id" },
              { title: "Package Amount", field: "pkg_amount" },
              { title: "Date", field: "date" },
            ]}
            data={[...dataState]}
            title=""
            toolbar={false}
          />
        </div>
      </div>
      <div className="clearfix">
        <br />
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
};
