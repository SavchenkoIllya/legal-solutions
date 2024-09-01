"use client";
import {
  deleteMail,
} from "@/app/api/interfaces/mails/mails.api";
import { Mail } from "@/app/api/interfaces/mails/types";
import { cn } from "@/app/utils/cn";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { mailStatus } from "./search/utils/mailStatus";
import dayjs, { Dayjs } from "dayjs";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function MailCard({ mail }: { mail: Mail }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { refresh } = router;

  const formatDate = (date: Dayjs | null) => {
    return date ? date.format('DD/MM/YYYY') : '';
  };

  const handleClose = () => (setIsOpen(false));

  const handleOpen = () => (setIsOpen(true));

  const handleDeleteMail = async () => {
    await deleteMail(mail.id);
    setIsOpen(false);
    handleClose();
    refresh();
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              {mail.name}
            </Typography>
            <Typography>
              Status: {mail.is_read}
            </Typography>
          </Stack>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent
          sx={{ minWidth: "450px" }}
        >
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column">
              <Typography>{mail.email}</Typography>
              <Typography>{mail.phone}</Typography>
            </Stack>
            {mail.comment && (
              <Box marginY={2}>
                <Divider />
                <Typography sx={{
                  marginTop: 2
                }}>{mail.comment}</Typography>
              </Box>
            )}
            <Divider sx={{ marginY: 2 }} />
            <Typography>{mail.region}</Typography>
            <Typography>{mail.created_at && formatDate(dayjs(mail.created_at))}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">change status</Button>
          <Button onClick={handleDeleteMail} autoFocus variant="outlined" color="warning" endIcon={<DeleteIcon />}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>



      <button
        onClick={handleOpen}
        key={mail.id}
        className="relative group cursor mx-2 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-1 w-[300px]"
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-3 h-3 rounded-full mt-4 mr-2",
            mailStatus[mail.is_read].styles
          )}
        ></div>
        <div className="flex-1 overflow-hidden bg-white px-6 py-8">
          <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
            {mail.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 overflow-hidden">
            {mail.comment}
          </p>
          <div className="flex justify-between">
            <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
              {mail.email}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
              {mail.phone}
            </p>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {mail.region}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 descriptor-font">
            {formatDate(dayjs(mail.created_at))}
          </p>
        </div>
      </button>
    </>
  );
}
