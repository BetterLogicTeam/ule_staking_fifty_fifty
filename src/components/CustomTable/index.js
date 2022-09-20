import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export const CustomTable = ({ data, columns, title }) => {
  const [page, setPage] = useState(0);
  const [tableData, settableData] = useState([]);
  const [count, setCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    if (data?.length > 0) {
      setPage(1);
    }
    settableData([...data.slice(0, pageSize)]);
    setCount(data.length);
  }, [data]);

  const handleChange = (event, value) => {
    setPage(value);
    settableData([...data.slice(pageSize * (value - 1), pageSize * value)]);
  };

  return (
    <MaterialTable
      data={[...tableData]}
      columns={[...columns]}
      title={title ?? ""}
      options={{
        toolbar: false,
        search: false,
        pageSize: pageSize,
        headerStyle: {
          backgroundColor: "#FBC50B",
          color: "#fff",
          position: "sticky",
          top: 0,
        },
      }}
      components={{
        Pagination: () => {
          return (
            <Grid
              container
              style={{
                margin: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                style={{ margin: "0rem 0.5rem", background: "#FBC50B" }}
              >
                Page {page} of {Math.ceil(count / pageSize)}
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{ background: "#FBC50B" }}
              >
                showing items {page ? pageSize * (page - 1) + 1 : 0} to{" "}
                {pageSize * page < count ? pageSize * page : count} of {count}
              </Button>
              <Pagination
                onChange={handleChange}
                count={Math.ceil(count / pageSize)}
                shape="rounded"
                page={page}
              />
            </Grid>
          );
        },
      }}
    />
  );
};
