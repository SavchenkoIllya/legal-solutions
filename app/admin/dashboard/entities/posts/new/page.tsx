import PostsFormView from "../components/post-form";
import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function NewPostView() {
  return (<>
    <Container>
      <Box margin={2}>
        <IconButton color="secondary" href="/admin/dashboard/entities">
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box padding={4} bgcolor="white" borderRadius={4} mb={8}>
        <PostsFormView />
      </Box>
    </Container>
  </>);
}
