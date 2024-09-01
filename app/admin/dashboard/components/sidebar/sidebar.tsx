"use client";
import { SyntheticEvent } from "react";
import { signOut } from "next-auth/react";
import SVGLogo from "@/app/assets/Logo.svg";
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

export const drawerWidth = 100

export default function CustomSidebar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <Drawer
      variant="permanent"
      anchor={isSmallScreen ? "bottom" : "left"}
      sx={{ width: isSmallScreen ? 0 : drawerWidth, "& .MuiDrawer-paper": { borderWidth: 0 } }}>
      <Stack
        p={1}
        direction={isSmallScreen ? "row" : "column"}
        justifyContent="center"
        alignItems="center">
        {!isSmallScreen && (<img src={SVGLogo.src} className="h-[40px] w-[40px]" />)}
        <Divider sx={{ marginY: 2, backgroundColor: 'red', height: '1px' }} variant="fullWidth" />
        <List sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? "row" : "column",
          padding: 0,
        }}>
          {/* <ListItem>
            <ListItemButton LinkComponent="a" href="/admin/dashboard" sx={{ borderRadius: 5 }}>
              <TableChartIcon />
            </ListItemButton>
          </ListItem> */}
          <ListItem>
            <ListItemButton LinkComponent="a" href="/admin/dashboard/users" sx={{ borderRadius: 5 }}>
              <PersonIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent="a" href="/admin/dashboard/entities" sx={{ borderRadius: 5 }}>
              <StorageIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent="a" href="/admin/dashboard/data-storage" sx={{ borderRadius: 5 }}>
              <ImageSearchIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent="a" href="/admin/dashboard/inbox/1" sx={{ borderRadius: 5 }}>
              <MailIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  );
}
