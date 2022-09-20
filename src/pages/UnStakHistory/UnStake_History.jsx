import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyUnStakingReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";

export default function UnStake_History() {
    const refReport = useSelector((state) => state?.dailyYield?.refReport);
    const dispatch = useDispatch();
    const user = localStorage.getItem("user");
    const [dataState, setDateState] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const getAllData = () => {
        if (user) {
          let ress = JSON.parse(user);
          let uId = ress?.user_id;
          dispatch(getMyUnStakingReport(uId));
        }
      };
      useEffect(() => {
        getAllData();
      }, []);
    
      useEffect(() => {
        let arr = [];
        refReport.forEach((item, index) => {
          if (filterValue == "" || filterValue == "1") {
            arr.push({
              sNo: index + 1,
              from_id: item?.uid,
              package: item?.tokenid,
              remark: item?.usdvalue,
              Txn: item?.txn,
    
              date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
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
                from_id: item?.uid,
                package: item?.tokenid,
                remark: item?.usdvalue,
                Txn: item?.txn,
                date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
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
                from_id: item?.uid,
                package: item?.tokenid,
                remark: item?.usdvalue,
                Txn: item?.unstake_txn,
                date: moment(item?.edate).format("M/D/YYYY h:m:s A"),
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
      }, [refReport, filterValue]);
      // console.log("state", filterValue);
    return (
        <div>
            <div class="content-wrapper">
                <div class="grid grid-1">
                    <div class="section-heading">
                        <h2>NFT Unstaking History</h2>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-xl-6"></div>
                    </div>
                    <CustomTable
                        columns={[
                            { title: "S.No", field: "sNo" },
                            { title: "User ID", field: "from_id" },
                            { title: "Token ID", field: "package" },
                            { title: "Stake Date", field: "date" },
                            { title: "Usd", field: "remark" },
                            { title: "Txn	", field: "Txn" },
                            { title: "Unstake Date", field: "date2" },
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


        </div>
    )
}
