"use client";
import Search from "./search";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import dayjs, { Dayjs } from "dayjs";
import { Autocomplete, Box, Button, IconButton, Menu, Stack, Switch, TextField, Typography, css, styled, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers";
import { blue } from "@mui/material/colors";

type MailStatusesType = { label: "read" | "unread" | "in progress" | "complete" }

const mailStatuses: MailStatusesType[] = [
  { label: "read" },
  { label: "unread" },
  { label: "in progress" },
  { label: "complete" }
]

export default function SearchWithDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-05-01'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const relevance = searchParams.get('relevance');
  const mailStatus = searchParams.get("mailStatus")

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date: Dayjs | null) => {
    return date ? date.format('DD/MM/YYYY') : '';
  };

  const updateSearchParams = useCallback((name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);

  const handleStartSearch = useDebouncedCallback((date: Dayjs) => {
    updateSearchParams("startDate", date.toISOString());
  }, 300);

  const handleEndSearch = useDebouncedCallback((date: Dayjs) => {
    updateSearchParams("endDate", date.toISOString());
  }, 300);

  useEffect(() => {
    handleStartSearch(dayjs("2024-04-01T00:00:00"));
    handleEndSearch(dayjs());
  }, []);

  useEffect(() => { startDate && handleStartSearch(startDate) }, [startDate])
  useEffect(() => { endDate && handleEndSearch(endDate) }, [endDate])

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const switchTransformer = (switchValue: boolean) => switchValue ? "DESC" : "ASC"

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams("relevance", switchTransformer(event.target.checked))
  }

  const handleChangeDropdown = (event: any, newValue: MailStatusesType | null) => {
    if (newValue?.label) {
      updateSearchParams("mailStatus", newValue.label)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={2} sx={{ bgcolor: blue[400], padding: 2, borderRadius: 4 }}>
        <Search placeholder="Search me" />

        <CustomSearchButton
          variant="outlined"
          onClick={handleClick}
          aria-controls={open ? 'search-menu1' : undefined}
          id="search-button1"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          fullWidth
        >{formatDate(startDate) + " — " + formatDate(endDate)}</CustomSearchButton>
        <Menu
          id="search-menu1"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'search-button',
          }}
        >
          <Box marginX={2} marginBottom={2}>
            <Box display="flex" justifyContent="end" marginBottom={2}>
              <IconButton onClick={handleClose}>
                <CloseIcon color="warning" />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" gap={2} flexDirection={isSmallScreen ? 'column' : 'row'}>
              <DatePicker
                label="Pick start date"
                value={startDate}
                onChange={(newValue) => newValue && setStartDate(newValue)}
              />
              <DatePicker
                label="Pick end date"
                value={endDate}
                onChange={(newValue) => newValue && setEndDate(newValue)}
              />
            </Box>
          </Box>
        </Menu>

        <CustomSearchButton
          variant="outlined"
          onClick={handleClick2}
          aria-controls={open2 ? 'search-menu2' : undefined}
          id="search-button2"
          aria-haspopup="true"
          aria-expanded={open2 ? 'true' : undefined}
          fullWidth
        >{mailStatus} - {relevance}</CustomSearchButton>
        <Menu
          id="search-menu2"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'search-button2',
          }}
        >
          <Box marginX={2} marginBottom={2}>
            <Box display="flex" justifyContent="end" marginBottom={2}>
              <IconButton onClick={handleClose2}>
                <CloseIcon color="warning" />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginY={2}>
              <Autocomplete
                id="combo-box-demo"
                options={mailStatuses}
                defaultValue={mailStatuses[1]}
                sx={{ width: "100%" }}
                onChange={handleChangeDropdown}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2} marginY={2}>
              <Typography>ASC</Typography>
              <Switch defaultChecked onChange={handleCheck} />
              <Typography>DESC</Typography>
            </Box>
          </Box>
        </Menu>
      </Stack>
    </LocalizationProvider>
  );
}

export const CustomSearchButton = styled(Button)(() => css`
  &&{
    background-color: #ffffff;
    box-shadow: none;
    text-transform: none;
    flex: 1;
    text-wrap: "nowrap";
    padding-top: 0.85;
    padding-bottom: 0.85;
    overflow: "hidden";
    text-overflow: "ellipsis";
    white-space: "nowrap";
    border: transparent;

    &:hover{
      background-color: #fffffff4;
      box-shadow: none;
    }
  }
`)