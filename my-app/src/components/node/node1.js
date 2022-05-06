import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import FeaturedPump from "../featuredInfo/FeaturedPump";
import FeaturedSoc from "../featuredInfo/FeaturedSoc";
function node1(props) {
  if (props.data) {
    var moist1 = props.data[0].moist1;
    var moist2 = props.data[0].moist2;
    var light = props.data[0].light;
  }
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
            <CardHeader sx={{ padding: 3 }} title="Humidity : 1" />
            <CardContent
              sx={{
                flex: 1,
                textAlign: "center",
                padding: 0,
                minHeight: "6vh",
              }}
            >
              <Typography variant="h4" component="div">
                {moist1}
              </Typography>
              <Typography color="text.secondary">เปอร์เซ็น</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button size="large">Read More</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
            <CardHeader sx={{ padding: 3 }} title="Humidity : 2" />
            <CardContent
              sx={{
                flex: 1,
                textAlign: "center",
                padding: 0,
                minHeight: "6vh",
              }}
            >
              <Typography variant="h4" component="div">
                {moist2}
              </Typography>
              <Typography color="text.secondary">เปอร์เซ็น</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button size="large">Read More</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
            <CardHeader sx={{ padding: 3 }} title="Light" />
            <CardContent
              sx={{
                flex: 1,
                textAlign: "center",
                padding: 0,
                minHeight: "6vh",
              }}
            >
              <Typography variant="h4" component="div">
                {light}
              </Typography>
              <Typography color="text.secondary">ลักซ์</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button size="large">Read More</Button>
            </CardActions>
          </Card>
        </Box>
        <FeaturedPump data={props.data} />
        <FeaturedSoc data={props.data} node={0} />
      </Box>
    </>
  );
}

export default node1;
