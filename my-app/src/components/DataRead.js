import firebaseConfig from "../config";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function Dataread() {
  const [data, setData] = useState();

  useEffect(() => {
    const dataRead = firebaseConfig.database().ref("Data/");
    dataRead.on("value", (snapshot) => {
      const data = snapshot.val();
      const dataList = [];
      for (let id in data) {
        dataList.push({ id, ...data[id] });
      }
      setData(dataList);
    });
  }, []);
  console.log(data);
  return (
    <>
      <Box
        sx={{
          flex: 8,
          backgroundColor: "",
          zIndex: 1,
          margin: 5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {data
            ? data.map((data, index) => {
                console.log(data);
                return <>{data.moist}</>;
              })
            : ""}
        </Box>
      </Box>
    </>
  );
}

export default Dataread;
