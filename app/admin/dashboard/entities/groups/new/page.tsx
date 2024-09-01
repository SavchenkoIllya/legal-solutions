import { getPosts } from "@/app/api/interfaces/posts/posts.api";
import GroupsForm from "../components/groups-form";
import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const revalidate = 0;

export default async function NewGroupView() {
  const posts = await getPosts();

  return (
    <Container>
      <Box margin={2}>
        <IconButton color="secondary" href="/admin/dashboard/entities">
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box padding={4} bgcolor="white" borderRadius={4} mb={8}>
        <GroupsForm posts={posts} />
      </Box>
    </Container>);
}
