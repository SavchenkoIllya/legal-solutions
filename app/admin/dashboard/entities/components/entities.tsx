"use client";
import Contacts from "./contacts";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { SyntheticEvent, useState } from "react";
import PostsTableView from "../posts/components/posts-view";
import GroupsTableView from "../groups/components/group-view";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@mui/material/styles';
import CarouselTableView from "../carousel/components/carousel-view";


type PropsData = { data: Record<string, any[]> };

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Entities({ data }: PropsData) {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container>
      <Box mb={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example">
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Carousel" {...a11yProps(1)} />
          <Tab label="Groups" {...a11yProps(2)} />
          <Tab label="Contacts" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <Stack direction="column" gap={2}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <CustomTabPanel dir={theme.direction} value={value} index={0}>
            <PostsTableView posts={data.posts} />
          </CustomTabPanel>
          <CustomTabPanel dir={theme.direction} value={value} index={1}>
            <CarouselTableView carousel={data.carousel}/>
          </CustomTabPanel>
          <CustomTabPanel dir={theme.direction} value={value} index={2}>
            <GroupsTableView groups={data.groups} posts={data.posts} />
          </CustomTabPanel>
          <CustomTabPanel dir={theme.direction} value={value} index={3}>
            <Box sx={{ p: 4, borderRadius: 4, bgcolor: "white" }}>
              <Contacts contacts={data.contacts} />
            </Box>
          </CustomTabPanel>
        </SwipeableViews>
      </Stack>
    </Container>
  );
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
