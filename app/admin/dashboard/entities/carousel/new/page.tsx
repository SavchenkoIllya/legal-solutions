import CarouselFormView from "../components/carousel-form"
import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function NewCarousel() {
  return (
    <Container>
      <Box margin={2}>
        <IconButton color="secondary" href="/admin/dashboard/entities">
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box padding={4} bgcolor="white" borderRadius={4} mb={8}>
        <CarouselFormView />
      </Box>
    </Container>);

}
