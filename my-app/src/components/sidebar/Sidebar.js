import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DataObjectIcon from "@mui/icons-material/DataObject";
import HomeIcon from "@mui/icons-material/Home";
import { grey, blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          bgcolor: "",
          padding: "2vh",
          height: "92vh",
          boxShadow: 3,
          zIndex: 2,
          position: "sticky",
          top: "56px",
        }}
      >
        <Box className="Wrapper">
          <Box className="Menu">
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: grey[700],
                fontWeight: "bold",
                paddingBottom: "1vh",
                fontSize: "20px",
              }}
            >
              Dashboard
            </Typography>
            <List sx={{ listStyle: "none", padding: "5px" }}>
              <Link to="" style={{ color: grey[900], textDecoration: "none" }}>
                <ListItem
                  sx={{
                    ":hover": {
                      backgroundColor: blue[100],
                      borderRadius: "10px",
                    },
                    padding: "5px",
                    cursor: "pointer",
                    maxWidth: "17vh",
                  }}
                >
                  <ListItemIcon sx={{ paddingLeft: "10px" }}>
                    <HomeIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    primary="overview"
                    secondary=""
                  />
                </ListItem>
              </Link>
              <Link
                to="node1"
                style={{ color: grey[900], textDecoration: "none" }}
              >
                <ListItem
                  sx={{
                    ":hover": {
                      backgroundColor: blue[100],
                      borderRadius: "10px",
                    },
                    padding: "5px",
                    cursor: "pointer",
                    marginTop: "9px",
                    marginBottom: "9px",
                    maxWidth: "17vh",
                  }}
                >
                  <ListItemIcon sx={{ paddingLeft: "10px" }}>
                    <DataObjectIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textTransform: "uppercase" }}
                    primary="node 1"
                    secondary=""
                  />
                </ListItem>
              </Link>
              <Link
                to="node2"
                style={{ color: grey[900], textDecoration: "none" }}
              >
                <ListItem
                  sx={{
                    ":hover": {
                      backgroundColor: blue[100],
                      borderRadius: "10px",
                    },
                    padding: "5px",
                    cursor: "pointer",
                    maxWidth: "17vh",
                  }}
                >
                  <ListItemIcon sx={{ paddingLeft: "10px" }}>
                    <DataArrayIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textTransform: "uppercase" }}
                    primary="node 2"
                    secondary=""
                  />
                </ListItem>
              </Link>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
