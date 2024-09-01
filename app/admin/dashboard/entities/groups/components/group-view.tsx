"use client"

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
// import { PostRow } from "./post-row";
import { CustomButton } from "@/app/admin/components/login";
import { Groups } from "@/app/api/interfaces/groups/types";
import { GroupRow } from "./group-row";
import { Post } from "@/app/api/interfaces/posts/types";

type GroupsEntityProps = { groups: Groups[], posts: Post[] };

export default function GroupsTableView({ groups, posts }: GroupsEntityProps) {
    return (<>
        <Box marginBottom={2}>
            <CustomButton href="/admin/dashboard/entities/groups/new">Add new group</CustomButton>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {groups.length <= 0 && (<caption>You don't have any posts yet</caption>)}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#5152F4" }}>
                        <TableCell sx={{ color: "white" }}>ID</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Title ru</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Category</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Posts ids</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Created at</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((group) => (
                        <GroupRow key={group.title_ru} group={group} posts={posts} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}