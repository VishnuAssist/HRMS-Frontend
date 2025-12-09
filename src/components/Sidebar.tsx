// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Divider, Typography,  } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import MenuIcon from "@mui/icons-material/Menu";
import {  useAppSelector } from "../hooks"; 
// import { toggleSidebar, } from "../store/uiSlice";
import { useNavigate } from "react-router-dom";

const collapsedWidth = 64;
const expandedWidth = 240;

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { key: "employee_Management", label: "Employee Management", icon: <DashboardIcon />, path: "/employee_Management" },
];

const Sidebar: React.FC = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sidebarExpanded = useAppSelector((s) => s.ui.sidebarExpanded);
  const [hover, ] = useState(false);

  const effectiveExpanded = sidebarExpanded || hover;

  return (
    <Box
      component="nav"
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
      sx={{
        width: effectiveExpanded ? expandedWidth : collapsedWidth,
        transition: "width 200ms ease",
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        position: "sticky",
        top: 0,
        overflowX: "hidden",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent={effectiveExpanded ? "space-between" : "center"} p={1}>
        {effectiveExpanded ? (
          <Typography variant="h6" noWrap>
            HR Web
          </Typography>
        ) :  <Typography variant="h6" noWrap>
            HR 
          </Typography> }
        {/* <IconButton
          size="small"
          onClick={() => dispatch(toggleSidebar())}
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton> */}
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          const content = (
            <ListItemButton
              key={item.key}
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.2,
                px: 2,
                minHeight: 44,
                justifyContent: effectiveExpanded ? "initial" : "center",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: effectiveExpanded ? 2 : 0, justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {effectiveExpanded ? <ListItemText primary={item.label} /> : null}
            </ListItemButton>
          );

          // when collapsed, show tooltip with label on hover
          return effectiveExpanded ? content : <Tooltip title={item.label} key={item.key} placement="right">{content}</Tooltip>;
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
