"use client"
import { Post as PostType } from "@/app/api/interfaces/posts/types";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PostRow } from "./post-row";
import { CustomButton } from "@/app/admin/components/login";

type PostsEntityProps = { posts: PostType[] };

export default function PostsTableView({ posts }: PostsEntityProps) {
    return (<>
        <Box marginBottom={2}>
            <CustomButton href="/admin/dashboard/entities/posts/new">Add new post</CustomButton>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {posts.length <= 0 && (<caption>You don't have any posts yet</caption>)}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#5152F4" }}>
                        <TableCell sx={{ color: "white" }}>ID</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Title ru</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Is published</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Created at</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <PostRow key={post.title_ru} post={post} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}