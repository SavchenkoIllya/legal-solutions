"use client"
import { User } from "@/app/api/interfaces/users/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UserRow } from "./user-row";

export default function UserTable({ users }: { users: User[] }) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#5152F4" }}>
                        <TableCell sx={{ color: "white" }}>ID</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Name</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Email</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
