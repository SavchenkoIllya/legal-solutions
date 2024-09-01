"use client"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { CustomButton } from "@/app/admin/components/login";
import { Carousel } from "@/app/api/interfaces/carousel/types";
import { CarouselRow } from "./carousel-row";

type CarouselEntityProps = { carousel: Carousel[] };

export default function CarouselTableView({ carousel }: CarouselEntityProps) {
    return (<>
        <Box marginBottom={2}>
            <CustomButton href="/admin/dashboard/entities/carousel/new">Add new carousel</CustomButton>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {carousel.length <= 0 && (<caption>You don't have any posts yet</caption>)}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#5152F4" }}>
                        <TableCell sx={{ color: "white" }}>ID</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Title ru</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Image</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carousel.map((carouselData) => (
                        <CarouselRow key={carouselData.dev_name} carousel={carouselData} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}