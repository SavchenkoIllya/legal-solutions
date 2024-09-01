import Register from "@/app/admin/components/register/register";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Container } from "@mui/material";

export default function NewUser() {
  return (
    <Container>
      <Box margin={2}>
        <IconButton href="/admin/dashboard/users" color="secondary">
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box padding={4} bgcolor="white" borderRadius={4}>
        <Register />
      </Box>
    </Container>
  );
}
