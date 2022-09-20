import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRegCTOncome_2_Report } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";

export const RegCTOIncome_2 = () => {
  const bonusDyReport = useSelector(
    (state) => state?.dailyYield?.dailyYeildReport
  );
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);

  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getRegCTOncome_2_Report(uId));
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    let arr = [];
    bonusDyReport.forEach((item, index) => {
      arr.push({
        sNo: index + 1,
        from_id: item?.uid,
        amount: item?.income,
        date:moment(item?.edate.replace("Z",'')).format("M/D/YYYY"),
      });
    });
    setDateState([...arr]);
  }, [bonusDyReport]);
  // console.log("state", bonusDyReport);
  return (
    <>
      <div class="content-wrapper">
        <div class="grid grid-1">
          <div class="section-heading">
          <h2>Registration CTO Income(2%)</h2>
          </div>
          <CustomTable
            columns={[
              { title: "S.No", field: "sNo" },
              { title: "ID", field: "from_id" },
              { title: "USD Value", field: "amount" },
              { title: "Date", field: "date" },
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
