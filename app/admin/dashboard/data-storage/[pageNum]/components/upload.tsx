"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/app/admin/components/login";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default function UploadButton() {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      await fetch("/api/interfaces/files", {
        method: "POST",
        body: formData,
      }).then(() => {
        toast.success("uploaded successfully", {
          onClose: () => router.refresh(),
        });
      });
      setOpenModal(false);
    } catch (error) {
      toast.error("error occurred during uploading");
    }
  };

  return (
    <>
      <CustomButton onClick={() => setOpenModal(true)}>Upload new</CustomButton>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}>
        <Box margin="2rem" width={400}>
          <Typography fontWeight="bold">Upload picture</Typography>
          <Divider sx={{ marginY: "1rem" }} />
          <Box display="flex" justifyContent="center">
            <CustomButton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(e: any) => { setFile(e.target.files?.item(0) || null) }}
                type="file" />
            </CustomButton>
          </Box>
          <Box marginY={2} display="flex" justifyContent="center">
            <Typography color="green">{file && "File is ready to upload"}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginTop={2}>
            <Button variant="text" color="primary" onClick={() => setOpenModal(false)}>
              Close
            </Button>
            <Button variant="outlined" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Dialog>
      <ToastContainer position="bottom-center" />
    </>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});