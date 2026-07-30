import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendNewsletterInput {
  to: string[];
  subject: string;
  html: string;
}

export async function sendNewsletter({
  to,
  subject,
  html,
}: SendNewsletterInput) {
  return resend.emails.send({
    from: "BlockBrief <news@paythai.online>",
    to,
    subject,
    html,
  });
}