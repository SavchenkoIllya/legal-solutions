interface EmailTemplateProps {
  name: string;
  email: string;
}

export const RegisteredAdminEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name, email }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>
      You have registered in Pro Legal Solution system using email: ${email}
    </p>
  </div>
);
