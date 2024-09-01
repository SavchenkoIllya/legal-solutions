"use client";
import { useState, Fragment, forwardRef } from "react";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slide, TableCell, TableRow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import { Groups as Group } from "@/app/api/interfaces/groups/types";
import { deleteGroup } from "@/app/api/interfaces/groups/groups.api";
import GroupsForm from "./groups-form";
import { Post } from "@/app/api/interfaces/posts/types";

export function GroupRow({ group, posts }: { group: Group, posts: Post[] }) {
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleCloseAndRefresh = () => {
        window.location.reload();
    }
    const handleClickOpenDelete = () => setOpenDeleteModal(true)
    const handleCloseDelete = () => setOpenDeleteModal(false)
    const handleDeleteGroup = async (id: number) => { await deleteGroup(id).then(() => { window.location.reload() }) }
    const formatDate = (date: Date) => dayjs(date).format('DD/MM/YYYY')

    return (<Fragment>
        <TableRow
            sx={{ "&:hover": { bgcolor: "#ebebeb" }, '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {group.id}
            </TableCell>
            <TableCell align="right">{group.title_ru}</TableCell>
            <TableCell align="right">
                {group.category}
            </TableCell>
            <TableCell align="right">{group.posts_id.join(" ,")}</TableCell>
            <TableCell align="right">{formatDate(group.created_at)}</TableCell>
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
            key={group.id + 2}
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
                    <Box mb={8}>
                        {posts && <GroupsForm posts={posts} groupData={group} />}
                    </Box>
                </Container>
            </DialogContent>
        </Dialog>
        <Dialog
            key={group.id + 3}
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
                Are you sure that you want to delete group: {group.title_ru}
            </DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
                This action is irreversible and once your are trying to delete user you won't be able to restore it
            </DialogContent>
            <DialogActions >
                <Button onClick={handleCloseDelete} variant="text">
                    Close
                </Button>
                <Button variant="outlined" color="warning" onClick={() => handleDeleteGroup(group.id)}>
                    Delete user: {group.title_ru}
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