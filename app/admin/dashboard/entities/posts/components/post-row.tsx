"use client";
import { useState, Fragment, forwardRef } from "react";
import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slide, TableCell, TableRow, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { Post } from "@/app/api/interfaces/posts/types";
import { updatePost, deletePost } from "@/app/api/interfaces/posts/posts.api";
import dayjs from "dayjs";
import PostsFormView from "./post-form";
import { red } from "@mui/material/colors";

export function PostRow({ post }: { post: Post }) {
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const handleCloseAndRefresh = () => {
        handleClose();
        window.location.reload();
    }
    const handleClickOpenDelete = () => setOpenDeleteModal(true)
    const handleCloseDelete = () => setOpenDeleteModal(false)
    const handleDeletePosts = async (id: number) => { await deletePost(id).then(() => { window.location.reload() }) }

    const handleChangeIsRead = async (postData: Post) => {
        const { id, author_id, is_published, updated_at, ...rest } = postData
        await updatePost({ ...rest, is_published: !is_published }, id).then(() => {
            window.location.reload()
        }).catch((error) => {
            setError(error);
        })
    }

    const formatDate = (date: Date) => dayjs(date).format('DD/MM/YYYY')
    const formatIsPublished = (boolValue: boolean) => boolValue ? "Yes" : "No"

    return (<Fragment>
        <TableRow
            sx={{ "&:hover": { bgcolor: "#ebebeb" }, '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {post.id}
            </TableCell>
            <TableCell align="right">{post.title_ru}</TableCell>
            <TableCell align="right">
                <form
                    action={() => handleChangeIsRead(post)}>
                    <button type="submit">
                        <Chip
                            label={formatIsPublished(post.is_published)}
                            color={post.is_published ? "success" : "warning"}
                            variant="outlined" />
                    </button>
                </form>
            </TableCell>
            <TableCell align="right">{formatDate(post.created_at)}</TableCell>
            <TableCell align="right">
                <IconButton color="primary" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton color="warning" onClick={handleClickOpenDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
        {error && <caption><Typography color={red[500]}>{error}</Typography></caption>}
        <Dialog
            key={post.id + 2}
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
                        <PostsFormView postData={post} onSuccess={handleCloseAndRefresh} />
                    </Box>
                </Container>
            </DialogContent>
        </Dialog>
        <Dialog
            key={post.id + 3}
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
                Are you sure that you want to delete post {post.title_ru}
            </DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
                This action is irreversible and once your are trying to delete post you won't be able to restore it
            </DialogContent>
            <DialogActions >
                <Button onClick={handleCloseDelete} variant="text">
                    Close
                </Button>
                <Button variant="outlined" color="warning" onClick={() => handleDeletePosts(post.id)}>
                    Delete post: {post.title_ru}
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