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
    <h1>You have got a new mail from Pro Legal Solutions!</h1>
    <div>
      <span>Name: </span>
      <span>{name}</span>
    </div>
    <div>
      <span>Phone: </span>
      <a href={`tel:${phone}`}>{phone}</a>
    </div>
    {email && (
      <div>
        <span>Email: </span>
        <a href={`mailto:${phone}`}>{phone}</a>
      </div>
    )}
    {comment && (
      <div>
        <p>Comment: </p>
        <p>{comment}</p>
      </div>
    )}
    {region && (
      <div>
        <span>Region: </span>
        <a>{region}</a>
      </div>
    )}
  </div>
);
