import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPoolsReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";

export const Pools = () => {
  const referralReport = useSelector((state) => state?.dailyYield?.poolsReport);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);

  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getPoolsReport(uId));
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    let arr = [];
    referralReport.forEach((item, index) => {
      arr.push({
        sNo: index + 1,
        from_id: item?.uid,
        amount: item?.netincome,
        pool_level: item?.Pool_level,
        date:moment(item?.edate.replace("Z",'')).format("M/D/YYYY"),
      });
    });
    setDateState([...arr]);
  }, [referralReport]);
  console.log("state", referralReport);
  return (
    <>
      <div class="content-wrapper">
        <div class="grid grid-1">
          <div class="section-heading">
            <h2>Pool Income</h2>
          </div>
          <CustomTable
            columns={[
              { title: "S.No", field: "sNo" },
              { title: "User ID", field: "from_id" },
              { title: "Income", field: "amount" },
              { title: "Date", field: "date" },
              { title: "Pool Level", field: "pool_level" },
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
