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
function FeaturedSoc(props) {
  if (props.data) {
    var soc = props.data[props.node].soc;
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
          <CardHeader sx={{ padding: 3 }} title="SoC Status" />
          <CardContent
            sx={{ flex: 1, textAlign: "center", padding: 0, minHeight: "8vh" }}
          >
            <Typography
              variant="h4"
              component="div"
              style={{ marginTop: "3vh" }}
            >
              {soc}
            </Typography>
            <Typography color="text.secondary">เปอร์เซ็น</Typography>
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
export default FeaturedSoc;
