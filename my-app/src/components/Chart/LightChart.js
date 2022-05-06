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

function LightChart() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState();
  useEffect(() => {
    const dataPosts = firebaseConfig.database().ref("posts");
    dataPosts.orderByChild("timestamp").on("value", (snapshot) => {
      setUpdate();
      if (data.length === 0) {
        setData([]);
      }

      const numData = snapshot.val();
      const firebaseData = [];
      for (let id in numData) {
        firebaseData.push({ ...numData[id] });
      }
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();

        if (childData) {
          if (data.length === 0) {
            setData((currentData) => [...currentData, childData]);
          } else {
            if (Math.abs(data.length - firebaseData.length) !== 0) {
            } else {
              setData([]);
            }
          }
        }
      });
    });
  }, [update]);

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
          <CardHeader sx={{ padding: 3 }} title="ANALYTICS LIGHT" />
          {{ data } ? (
            <ResponsiveContainer width="99%" aspect={4 / 1}>
              <LineChart
                margin={{ top: 5, right: 50, left: 20, bottom: 20 }}
                data={data}
              >
                <XAxis dataKey="date" stroke={blue[700]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />

                <Line type="monotone" dataKey="light" stroke={blue[700]} />
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

export default React.memo(LightChart);
