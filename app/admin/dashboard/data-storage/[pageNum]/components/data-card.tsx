"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomButton, CustomCard } from "@/app/admin/components/login";
import { Box, Button, Dialog, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type DataProps = {
  blob: ListBlobResultBlob;
};

function formatBytes(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));

  return `${value} ${sizes[i]}`;
}

const DataCard = ({ blob }: DataProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();

  const formattedTime = () => {
    let temp = blob.uploadedAt.toISOString().split("T");
    let date = temp[0].replaceAll("-", " ");
    let time = temp[1].split(".")[0].split(":").slice(0, 2).join(":");
    return date + " " + time;
  };

  const handleClipboard = () => {
    navigator.clipboard
      .writeText(blob.url)
      .then(() => toast.success("Copied to clipboard", { autoClose: 2000 }));
  };

  const handleDeleteData = async () => {
    try {
      const response = await fetch("/api/interfaces/files", {
        method: "DELETE",
        body: JSON.stringify({ url: blob.url }),
      });
      toast.success("Deleted", {
        autoClose: 2000,
        onClose: () => router.refresh(),
      });
    } catch (error) {
      toast.error("Failed deleting", { autoClose: 2000 });
    }
    setDeleteModal(false);
  };

  return (
    <>
      <CustomCard sx={{ position: "relative", padding: "2rem", width: "325px" }}>
        <Box position='absolute' top={0} right={0} margin={0.5}>
          <IconButton onClick={() => setDeleteModal(true)}>
            <CloseIcon color="warning" fontSize="small" />
          </IconButton>
        </Box>
        <Image
          src={blob.url}
          alt={blob.pathname}
          width={300}
          height={300}
          className="object-cover w-[300px] h-[200px]"
        />
        <Typography className="truncate">{blob.pathname}</Typography>
        <Typography>{formatBytes(blob.size)}</Typography>
        <Typography>{formattedTime()}</Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CustomButton onClick={handleClipboard}>Click to copy link</CustomButton>
        </Box>
      </CustomCard>
      <ToastContainer position="bottom-center" />
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)} sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}>
        <Box margin="2rem">
          <Typography fontWeight="bold">You are trying to delete data!</Typography>
          <Divider sx={{ marginY: "1rem" }} />
          <Typography>
            You cannot cancel this event so be careful deleting data. Once you
            deleted one of them you cannot restore it and have to upload one
            more time.
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
            <Button variant="text" color="primary" onClick={() => setDeleteModal(false)}>
              Close
            </Button>
            <Button variant="outlined" color="warning" onClick={handleDeleteData}>
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default DataCard;