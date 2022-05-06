import React, { useState, useEffect } from "react";
import { Box, Card, CardHeader } from "@mui/material";
import { blue } from "@mui/material/colors";
import firebaseConfig from "../../config";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function BarChart() {
  // var today = new Date(),
  //   time =
  //     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // var now = {
  //   currentTime: time,
  // };
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState();
  useEffect(() => {
    // const dataRead = firebaseConfig.database().ref("Data");
    // dataRead.on("value", (snapshot) => {
    //   let request = [];
    //   snapshot.forEach((childSnapshot) => {
    //     request.push({ ...childSnapshot.val(), id: childSnapshot.key });
    //     // var childKey = childSnapshot.key;
    //     // var childData = childSnapshot.val();
    //     console.log(request);
    //   });
    //   request.forEach((data) => {
    //     console.table(data.temp);
    //   });
    // });
    const dataPosts = firebaseConfig.database().ref("posts");
    dataPosts.orderByChild("timestamp").on("value", (snapshot) => {
      setUpdate();
      if (data.length === 0) {
        setData([]);
        // orderByChild('timestamp')
      }
      // console.log(update);
      const numData = snapshot.val();
      const firebaseData = [];
      for (let id in numData) {
        firebaseData.push({ ...numData[id] });
      }
      // console.log("Firebase Data", firebaseData.length); // Firebase length

      snapshot.forEach((childSnapshot) => {
        // var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childData) {
          if (data.length === 0) {
            setData(
              (currentData) => [...currentData, childData]
              // console.log(currentData);
            );
            // console.log("Data");
          } else {
            if (Math.abs(data.length - firebaseData.length) !== 0) {
            } else {
              setData([]);
              // console.log("clear");
            }
          }
        }
      });
    });
  }, [update]);
  // console.log("Chart data", data.length);
  // console.table(data);

  // const data = [
  //   {
  //     date: "Page A",
  //     humidity: 4000,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <>
      <Box sx={{ marginTop: 5, display: "flex" }}>
        <Card
          variant="outlined"
          sx={{
            minWidth: "100%",
            maxHeight: "100%",
            boxShadow: 1,
          }}
        >
          <CardHeader sx={{ padding: 3 }} title="ANALYTICS HUMIDITY" />
          {{ data } ? (
            <ResponsiveContainer width="99%" aspect={4 / 1}>
              <LineChart
                margin={{ top: 5, right: 50, left: 20, bottom: 20 }}
                data={data}
              >
                <XAxis dataKey="date" stroke={blue[700]} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />

                <Line type="monotone" dataKey="humidity" stroke={blue[700]} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            "dsds"
          )}
        </Card>
      </Box>
    </>
  );
}

export default React.memo(BarChart);
