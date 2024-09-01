import { getAllUsersForDashboard } from "@/app/api/interfaces/users/users.api";
import { Suspense } from "react";
import { CustomButton } from "../../components/login";
import UserTable from "./components/users-table";
import Skeleton from '@mui/material/Skeleton';
import { Box, Container } from "@mui/material";

// Very nextjs staff don't touch
export const revalidate = 0;

export default async function Users() {
  const users = await getAllUsersForDashboard();

  return (
    <Container>
      <Box marginBottom={2}>
        <CustomButton href="/admin/dashboard/users/new">Add new user</CustomButton>
      </Box>

      <Suspense fallback={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}>
        <UserTable users={users} />
      </Suspense>

    </Container>
  );
}