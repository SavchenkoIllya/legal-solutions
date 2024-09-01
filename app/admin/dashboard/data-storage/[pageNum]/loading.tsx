"use client"
import Container from "@mui/material/Container";
import { DataCardSkeleton } from "./components/data-card-skeleton";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeleton() {
    return (
        <Container>
            <Box marginBottom={2}>
                <Skeleton variant="rectangular" sx={{ borderRadius: 4 }} width={200} height={50} />
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {Array.from({ length: 20 }).map((_, idx) => (
                    <DataCardSkeleton key={idx} />
                ))}
            </Box>
        </Container>
    )
}