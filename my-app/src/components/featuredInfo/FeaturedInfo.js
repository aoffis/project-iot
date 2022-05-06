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
import { Link } from "react-router-dom";
function FeaturedInfo(props) {
  if (props.data) {
    var temp = props.data[1].temp;
    var humidity = props.data[0].avg_moisture_percent;
    var light = props.data[0].light;
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
          <CardHeader sx={{ padding: 3 }} title="Avg Tempurature" />
          <CardContent
            sx={{ flex: 1, textAlign: "center", padding: 0, minHeight: "8vh" }}
          >
            <Typography
              variant="h4"
              component="div"
              style={{ marginTop: "3vh" }}
            >
              {temp}
            </Typography>
            <Typography color="text.secondary">องศา</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Link to="node2" style={{ textDecoration: "none" }}>
              <Button size="large">Read More</Button>
            </Link>
          </CardActions>
        </Card>
        <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
          <CardHeader sx={{ padding: 3 }} title="Avg Humidity" />
          <CardContent
            sx={{ flex: 1, textAlign: "center", padding: 0, minHeight: "8vh" }}
          >
            <Typography
              variant="h4"
              component="div"
              style={{ marginTop: "3vh" }}
            >
              {humidity}
            </Typography>
            <Typography color="text.secondary">เปอร์เซ็น</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Link to="node1" style={{ textDecoration: "none" }}>
              <Button size="large">Read More</Button>
            </Link>
          </CardActions>
        </Card>
        <Card variant="outlined" sx={{ minWidth: "25vw", boxShadow: 1 }}>
          <CardHeader sx={{ padding: 3 }} title="Avg Light" />
          <CardContent
            sx={{ flex: 1, textAlign: "center", padding: 0, minHeight: "8vh" }}
          >
            <Typography
              variant="h4"
              component="div"
              style={{ marginTop: "3vh" }}
            >
              {light}
            </Typography>
            <Typography color="text.secondary">ลักซ์</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Link to="node2" style={{ textDecoration: "none" }}>
              <Button size="large">Read More</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default FeaturedInfo;
