import nodemailer from "nodemailer";

export default async function sendEmail(
  to: string,
  url: string,
  subject: string,
  html: string
) {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.USER, pass: process.env.PASS },
  });
  const mailOptions = {
    from: process.env.USER,
    to,
    subject,
    html,
  };
  await smtpTransport.sendMail(mailOptions);
}
