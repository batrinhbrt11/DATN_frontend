import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./style.css";
import Profile from "./Profile";
import Voucher from "./Voucher";
import History from "./History";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useSelector } from "react-redux";
const boxStyled = {
  borderBottom: 1,
  borderColor: "divider",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  margin: "30px",
};
export default function Content() {
  const [value, setValue] =useState("1");
  const [anchorEl, setAnchorEl] =useState(null);
  const info = useSelector((state) => state.info.info);
  const [user, setUser] = useState(info);
  const open = Boolean(anchorEl);
 useEffect(() => {
    setUser(info);
  }, [info]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setValue(value);
    setAnchorEl(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <TabContext value={value}>
        <Box sx={boxStyled}>
          <TabList
            onChange={handleChange}
            orientation="vertical"
            aria-label="lab API tabs example"
          >
            <h3 className="hello-user">Hello, {user.name}</h3>
            <Tab label="Profile" value="1" />
            <Tab label="History" value="2" />
            <Tab label="Voucher" value="3" />
          </TabList>
          <div className="sub_menu">
            <h3 className="hello-user">Hello, {user.name}</h3>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => handleClose("1")}>Profile</MenuItem>
              <MenuItem onClick={() => handleClose("2")}>History</MenuItem>
              <MenuItem onClick={() => handleClose("3")}>Voucher</MenuItem>
            </Menu>
          </div>
        </Box>

        <TabPanel value="1" sx={{ width: "100%" }}>
          <Profile />
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%" }}>
          <History />
        </TabPanel>
        <TabPanel value="3" sx={{ width: "100%" }}>
          <Voucher />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
