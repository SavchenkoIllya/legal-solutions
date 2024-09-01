import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const DataCardSkeleton = () => (
    <Card sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 10px",
        border: "1px solid #eeeeee",
        borderRadius: "1rem",
        width: 350,
        "&:hover": {
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            scale: "1.005",
            transition: "all .5s, easy-in-out"
        }
    }}>
        <CardContent>
            <Stack>
                <Skeleton height={200} width="100%" variant="rectangular" />
                <Skeleton variant="text" />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Skeleton variant="text" width="25%" />
                    <Skeleton variant="text" width="35%" />

                </Box>
                <Box marginTop={2} display="flex" justifyContent="center">
                    <Skeleton variant="text" width="50%" />
                </Box>
            </Stack>
        </CardContent>
    </Card>
)