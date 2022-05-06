import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
function FeaturedPump(props) {
  if (props.data) {
    var pump = props.data[0].pump;
    var status;
    if (pump === "off") {
      status = "ปิด";
    } else {
      status = "เปิด";
    }
  }

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
          <CardHeader sx={{ padding: 3 }} title="Pump Status" />
          <CardContent
            sx={{ flex: 1, textAlign: "center", padding: 0, minHeight: "8vh" }}
          >
            <Typography
              variant="h4"
              component="div"
              style={{ marginTop: "3vh" }}
            >
              {pump}
            </Typography>
            <Typography color="text.secondary">{status}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Link to="node1" style={{ textDecoration: "none" }}>
              <Button size="large">Read More</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default FeaturedPump;
