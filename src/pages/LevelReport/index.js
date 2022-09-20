import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLevelReport } from "../../store/actions/dailyYield";
import moment from "moment";
import { CustomTable } from "../../components/CustomTable";

export const LevelReport = () => {
  const downlineReport = useSelector((state) => state?.dailyYield?.levelReport);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const [dataState, setDateState] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterValue1, setFilterValue1] = useState("");
  const getAllData = () => {
    if (user) {
      let ress = JSON.parse(user);
      let uId = ress?.user_id;
      dispatch(getLevelReport(uId));
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    let arr = [];
    downlineReport.forEach((item, index) => {
      if (filterValue != "" && filterValue != '0') {
        if (filterValue == item?.Leveltype) {
          if (filterValue1 == "" || filterValue1 == "0") {
            arr.push({
              sNo: index + 1,
              from_id: item?.uid,
              pkg_amount: item?.pp,
              level: item?.Leveltype,
              date: item?.date1,
            });
          } else if (filterValue1 == "2") {
            if (item?.pp == 0) {
              arr.push({
                sNo: index + 1,
                from_id: item?.uid,
                pkg_amount: item?.pp,
                level: item?.Leveltype,
                date: item?.date1,
              });
            }
          }else if (filterValue1 == "1") {
            if (item?.pp != 0) {
              arr.push({
                sNo: index + 1,
                from_id: item?.uid,
                pkg_amount: item?.pp,
                level: item?.Leveltype,
                date: item?.date1,
              });
            }
          }
        }
      } else {
        if (filterValue1 == "" || filterValue1 == "0") {
          arr.push({
            sNo: index + 1,
            from_id: item?.uid,
            pkg_amount: item?.pp,
            level: item?.Leveltype,
            date: item?.date1,
          });
        } else if (filterValue1 == "1") {
          if (item?.pp != 0) {
            arr.push({
              sNo: index + 1,
              from_id: item?.uid,
              pkg_amount: item?.pp,
              level: item?.Leveltype,
              date: item?.date1,
            });
          }
        } else if (filterValue1 == "2") {
          if (item?.pp == 0) {
            arr.push({
              sNo: index + 1,
              from_id: item?.uid,
              pkg_amount: item?.pp,
              level: item?.Leveltype,
              date: item?.date1,
            });
          }
        }
      }
    });
    setDateState([...arr]);
  }, [downlineReport, filterValue, filterValue1]);

  return (
    <>
      <div class="content-wrapper">
        <div class="grid grid-1">
          <div class="section-heading">
            <h2>Level Details</h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-xl-6">
              <div className="row pb-4 pt-2">
                <div class="col-6">
                  <label class="control-label">Select Level : </label>
                </div>
                <div class="col-6">
                  <select
                    class="form-control"
                    id="level"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="">Select Level</option>
                    <option value="0">All Level</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                    <option value="5">Level 5</option>
                    <option value="6">Level 6</option>
                    <option value="7">Level 7</option>
                    <option value="8">Level 8</option>
                    <option value="9">Level 9</option>
                    <option value="10">Level 10</option>
                    <option value="11">Level 11</option>
                    <option value="12">Level 12</option>
                    <option value="13">Level 13</option>
                    <option value="14">Level 14</option>
                    <option value="15">Level 15</option>
                    <option value="16">Level 16</option>
                    <option value="17">Level 17</option>
                    <option value="18">Level 18</option>
                    <option value="19">Level 19</option>
                    <option value="20">Level 20</option>
                  </select>
                </div>
              </div>
            </div>
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
              { title: "User ID", field: "from_id" },
              { title: "Level", field: "level" },
              { title: "Package Amount", field: "pkg_amount" },
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
