"use client";
import { useState, Fragment, forwardRef } from "react";
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slide, TableCell, TableRow, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { red } from "@mui/material/colors";
import { Carousel } from "@/app/api/interfaces/carousel/types";
import { deleteCarousel } from "@/app/api/interfaces/carousel/carousel.api";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CarouselFormView from "./carousel-form";

export function CarouselRow({ carousel }: { carousel: Carousel }) {
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const handleCloseAndRefresh = () => {
        handleClose();
        window.location.reload();
    }
    const handleClickOpenDelete = () => setOpenDeleteModal(true)
    const handleCloseDelete = () => setOpenDeleteModal(false)
    const handleDeleteCarousel = async (id: number) => { await deleteCarousel(id).then(() => { window.location.reload() }) }

    return (<Fragment>
        <TableRow
            sx={{ "&:hover": { bgcolor: "#ebebeb" }, '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {carousel.id}
            </TableCell>
            <TableCell align="right">{carousel.title_ru}</TableCell>
            <TableCell align="right"><div>
                <Button
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClickMenu}
                >
                    Image preview
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleCloseMenu}>
                        <Box position="relative" height={200} width={300}>
                            {isLoading && (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    height="100%"
                                    width="100%"
                                    zIndex={1}
                                    bgcolor="white"
                                >
                                    <CircularProgress />
                                </Box>
                            )}
                            <img
                                className="h-[200px] w-[300px]"
                                src={carousel.image_src}
                                onLoad={handleImageLoad}
                                style={{ display: isLoading ? 'none' : 'block' }}
                            />
                        </Box>
                    </MenuItem>
                </Menu>
            </div></TableCell>
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
            key={carousel.id + 2}
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
                        <CarouselFormView carouselData={carousel} />
                    </Box>
                </Container>
            </DialogContent>
        </Dialog>
        <Dialog
            key={carousel.id + 3}
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
                Are you sure that you want to delete carousel {carousel.title_ru}
            </DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
                This action is irreversible and once your are trying to delete post you won't be able to restore it
            </DialogContent>
            <DialogActions >
                <Button onClick={handleCloseDelete} variant="text">
                    Close
                </Button>
                <Button variant="outlined" color="warning" onClick={() => handleDeleteCarousel(carousel.id)}>
                    Delete carousel: {carousel.title_ru}
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