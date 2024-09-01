"use client";
import { ChangeEvent, useCallback, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import dayjs, { Dayjs } from "dayjs";
import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    Menu,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme, css, styled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Search from "./search";

type MailStatusesType = { label: "read" | "unread" | "in progress" | "complete" };

const mailStatuses: MailStatusesType[] = [
    { label: "read" },
    { label: "unread" },
    { label: "in progress" },
    { label: "complete" },
];

export default function SearchWithDateTest() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [startDate, setStartDate] = useState<Dayjs | null>(
        searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : dayjs("2024-05-01")
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        searchParams.get("endDate") ? dayjs(searchParams.get("endDate")) : dayjs()
    );
    const [relevance, setRelevance] = useState(searchParams.get("relevance") || "DESC");
    const [mailStatus, setMailStatus] = useState<MailStatusesType | null>(
        mailStatuses.find((status) => status.label === searchParams.get("mailStatus")) || null
    );

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const formatDate = (date: Dayjs | null) => {
        return date ? date.format("DD/MM/YYYY") : "";
    };

    const updateSearchParams = useCallback(
        (params: Record<string, string | null>) => {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    searchParams.set(key, value);
                }
            });

            replace(`${pathname}?${searchParams.toString()}`);
        },
        [pathname, replace]
    );

    const handleStartSearch = useDebouncedCallback((date: Dayjs) => {
        setStartDate(date);
        updateSearchParams({
            startDate: date.toISOString(),
            endDate: endDate?.toISOString() || null,
            relevance,
            mailStatus: mailStatus?.label || null,
        });
    }, 300);

    const handleEndSearch = useDebouncedCallback((date: Dayjs) => {
        setEndDate(date);
        updateSearchParams({
            startDate: startDate?.toISOString() || null,
            endDate: date.toISOString(),
            relevance,
            mailStatus: mailStatus?.label || null,
        });
    }, 300);

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const newRelevance = event.target.checked ? "DESC" : "ASC";
        setRelevance(newRelevance);
        updateSearchParams({
            startDate: startDate?.toISOString() || null,
            endDate: endDate?.toISOString() || null,
            relevance: newRelevance,
            mailStatus: mailStatus?.label || null,
        });
    };

    const handleChangeDropdown = (event: any, newValue: MailStatusesType | null) => {
        setMailStatus(newValue);
        updateSearchParams({
            startDate: startDate?.toISOString() || null,
            endDate: endDate?.toISOString() || null,
            relevance,
            mailStatus: newValue?.label || null,
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                direction={isSmallScreen ? "column" : "row"}
                spacing={2}
                sx={{ bgcolor: "#5152F4", padding: 2, borderRadius: 8 }}
            >
                <Search placeholder="Search me" />

                <CustomSearchButton
                    variant="outlined"
                    onClick={handleClick}
                    aria-controls={open ? "search-menu1" : undefined}
                    id="search-button1"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    fullWidth
                >
                    {formatDate(startDate) + " — " + formatDate(endDate)}
                </CustomSearchButton>
                <Menu
                    id="search-menu1"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "search-button",
                    }}
                >
                    <Box marginX={2} marginBottom={2}>
                        <Box display="flex" justifyContent="end" marginBottom={2}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon color="warning" />
                            </IconButton>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            gap={2}
                            flexDirection={isSmallScreen ? "column" : "row"}
                        >
                            <DatePicker
                                label="Pick start date"
                                value={startDate}
                                onChange={(newValue) => newValue && handleStartSearch(newValue)}
                            />
                            <DatePicker
                                label="Pick end date"
                                value={endDate}
                                onChange={(newValue) => newValue && handleEndSearch(newValue)}
                            />
                        </Box>
                    </Box>
                </Menu>

                <CustomSearchButton
                    variant="outlined"
                    onClick={handleClick2}
                    aria-controls={open2 ? "search-menu2" : undefined}
                    id="search-button2"
                    aria-haspopup="true"
                    aria-expanded={open2 ? "true" : undefined}
                    fullWidth
                >
                    {mailStatus?.label || "unread"} - {relevance}
                </CustomSearchButton>
                <Menu
                    id="search-menu2"
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose2}
                    MenuListProps={{
                        "aria-labelledby": "search-button2",
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
                                defaultValue={mailStatus}
                                value={mailStatus}
                                onChange={handleChangeDropdown}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box display="flex" alignItems="center" gap={2} marginY={2}>
                            <Typography>ASC</Typography>
                            <Switch checked={relevance === "DESC"} onChange={handleCheck} />
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