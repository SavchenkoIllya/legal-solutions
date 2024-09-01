"use client";
import { User } from "@/app/api/interfaces/users/types";
import { useState, Fragment, forwardRef } from "react";
import { deleteUser } from "@/app/api/interfaces/users/users.api";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slide, TableCell, TableRow } from "@mui/material";
import EditUser from "@/app/admin/components/register/edit-user";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';

export function UserRow({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndRefresh = () => {
    handleClose();
    window.location.reload();
  }

  const handleClickOpenDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id).then(() => {
      window.location.reload();
    });

  }


  return (<Fragment key={user.name}>
    <TableRow
      sx={{ "&:hover": { bgcolor: "#ebebeb" }, '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {user.id + 1}
      </TableCell>
      <TableCell align="right">{user.name}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">
        <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <IconButton color="warning" onClick={handleClickOpenDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    <Dialog
      key={user.id + 2}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogActions disableSpacing sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton onClick={handleClose} color="primary">
          <ArrowBackIosIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Container>
          <EditUser user={user} onSuccess={handleCloseAndRefresh} />
        </Container>
      </DialogContent>
    </Dialog>
    <Dialog
      key={user.id + 3}
      open={openDeleteModal}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogActions>
        <IconButton onClick={handleCloseDelete} color="warning">
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle>
        Are you sure that you want to delete user {user.name}
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        This action is irreversible and once your are trying to delete user you won't be able to restore it
      </DialogContent>
      <DialogActions >
        <Button onClick={handleCloseDelete} variant="text">
          Close
        </Button>
        <Button variant="outlined" color="warning" onClick={() => handleDeleteUser(user.id)}>
          Delete user: {user.name}
        </Button>
      </DialogActions>
    </Dialog>
  </Fragment>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});