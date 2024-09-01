import { getBlobs } from "@/app/api/interfaces/files/route";
import Box from "@mui/material/Box";
import DataCard from "./data-card";
import UploadButton from "./upload";

export const revalidate = 0;


export default async function DataCards() {
    const blobs = await getBlobs();

    return (
        <>
            <Box marginBottom={2}>
                <UploadButton />
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {blobs.map((blob) => (
                    <DataCard blob={blob} key={blob.url} />
                ))}
            </Box>
        </>
    )
}