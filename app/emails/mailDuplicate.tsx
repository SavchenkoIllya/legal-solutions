import { Box, Container, Stack, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import SVGLogo from "@/app/assets/Logo.svg";

interface MailDuplicateEmailTemplateProps {
  name: string;
  phone: string;
  email?: string | undefined;
  comment?: string | undefined;
  region?: string | undefined;
}

export const MailDuplicateEmailTemplate: React.FC<
  Readonly<MailDuplicateEmailTemplateProps>
> = ({ name, phone, email, comment, region }) => (
  <div>
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" height="100dvh">
        <Stack>
          <Stack padding={2} direction="row" spacing={4} alignItems="center" bgcolor="#fff">
            <img src={SVGLogo.src} className="h-[60px] w-[60px]" />
            <Typography variant="h4" color={red[400]} fontWeight="bold">You have got a new mail from Pro Legal Solutions!</Typography>
          </Stack>
          <Stack p={2} spacing={2}>
            <div>
              <span className="plain-font">From: </span>
              <span className="plain-bold-font">{name}</span>
            </div>
            <div>
              <span className="plain-font">Phone: </span>
              <a className="plain-bold-font" href={`tel:${phone}`}>{phone}</a>
            </div>
            {email && (
              <div>
                <span className="plain-font">Email: </span>
                <a className="plain-bold-font" href={`mailto:${email}`}>{email}</a>
              </div>
            )}
            {comment && (
              <div>
                <span className="plain-font">Comment: </span>
                <span >{comment}</span>
              </div>
            )}
            {region && (
              <div>
                <span className="plain-font">Region: </span>
                <span className="plain-bold-font">{region}</span>
              </div>
            )}
          </Stack>
        </Stack>
      </Box>
    </Container>
  </div>
);