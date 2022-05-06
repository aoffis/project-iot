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
import FeaturedSoc from "../featuredInfo/FeaturedSoc";
function node2(props) {
  if (props.data) {
    var temp = props.data[1].temp;
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
        <Box sx={{ display: "flex" }}>
          <Card
            variant="outlined"
            sx={{
              minWidth: "100%",
              maxHeight: "100%",
              boxShadow: 1,
            }}
          >
            <CardHeader sx={{ padding: 3 }} title="Tempurature" />
            <CardContent
              sx={{
                flex: 1,
                textAlign: "center",
                padding: 0,
                minHeight: "6vh",
              }}
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
              <Button size="large">Read More</Button>
            </CardActions>
          </Card>
        </Box>
        <FeaturedSoc data={props.data} node={1} />
      </Box>
    </>
  );
}

export default node2;
