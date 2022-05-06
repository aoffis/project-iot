import React, { useEffect } from "react";
import { Box } from "@mui/material";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import AvgHumidChart from "../Chart/AvgHumidChart";
import firebaseConfig from "../../config";
import TempChart from "../Chart/TempChart";
import LightChart from "../Chart/LightChart";
import FeaturedPump from "../featuredInfo/FeaturedPump";

function Dhome(props) {
  const data = props.data;
  useEffect(() => {
    if (data) {
      dataWrite(
        data[0].datetime,
        data[0].avg_moisture_percent,
        data[0].light,
        data[0].moist1,
        data[0].moist2,
        data[0].pump,
        data[0].soc,
        data[1].soc,
        data[1].datetime,
        data[1].temp
      );
      // console.log(data[0].moist1);
    }
    async function dataWrite(
      date,
      avgMoist,
      light,
      moist1,
      moist2,
      pump,
      soc1,
      soc2,
      date2,
      temp
    ) {
      const today = new Date();
      var time = today.getHours() + "-" + today.getMinutes();
      var timeSend =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // console.log(timeSend);
      const dataSend = firebaseConfig.database().ref("posts/" + time);
      dataSend.set({
        id: "avg",
        timestamp: new Date().getTime(),
        date: timeSend,
        date1: date,
        humidity: avgMoist,
        light: light,
        humidity1: moist1,
        humidity2: moist2,
        pump: pump,
        soc1: soc1,
        soc2: soc2,
        date2: date2,
        temp: temp,
      });
    }
  }, [data]);

  return (
    <>
      <Box
        sx={{
          flex: 7,
          backgroundColor: "",
          zIndex: 1,
          margin: 5,
        }}
      >
        <FeaturedInfo data={data} />
        <FeaturedPump data={data} />
        <AvgHumidChart />
        <TempChart />
        <LightChart />
      </Box>
    </>
  );
}

export default Dhome;
