import { Mail } from "@/app/api/interfaces/mails/types";
import MailCard from "./mail";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SearchWithDateTest from "./search/search-date-test";

export default async function MailView({ mails }: { mails: Mail[] }) {
  return (
    <>
      <Container>
        <Box marginBottom={2}>
          <SearchWithDateTest />
        </Box>
        <Stack
          position="relative"
          spacing={{ xs: 1, sm: 2 }}
          marginTop={2}
          direction="row"
          useFlexGap
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap">

          {mails.map((mail) => (
            <MailCard mail={mail} key={mail.id} />
          ))}
          {!mails.length && <h1>You don't have any mails yet</h1>}

        </Stack>
      </Container>
    </>
  );
}
