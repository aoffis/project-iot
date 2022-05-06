import React, { useContext, useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import { Box } from "@mui/material";
import Dhome from "./pages/Dhome";
import Node1 from "./node/node1";
import Node2 from "./node/node2";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState();
  const [time, setTime] = useState();

  // const writeUserData = (userId, name, email) => {
  //   firebaseConfig
  //     .database()
  //     .ref("users/" + userId)
  //     .set({
  //       username: name,
  //       email: email,
  //     });
  // };
  useEffect(() => {
    const dataRead = firebaseConfig.database().ref("Data");
    dataRead.on("value", (snapshot) => {
      let dataList = [];
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childData) {
          dataList.push({ ...childData, id: childKey });
        }
      });
      setData(dataList);
    });
  }, [time]);

  if (!currentUser) {
    //notLogin
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="">
        <Topbar currentUser={currentUser} />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route path="/*" element={<Dhome data={data} />} />
            <Route path="node1" element={<Node1 data={data} />} />
            <Route path="node2" element={<Node2 data={data} />} />
          </Routes>
        </Box>
      </div>
    </>
  );
};
export default React.memo(DashBoard);
