import nodemailer from "nodemailer";

import { EmailContact } from "@/types/email-contact";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const POST = requestMiddleware(async ({ data }: { data: EmailContact }) => {
  try {
    const email_ = process.env.NEXT_PUBLIC_BURNER_EMAIL;
    const password_ = process.env.NEXT_PUBLIC_BURNER_PASSWORD;

    const { name, email, message } = data;

    const transporter = nodemailer.createTransport({
      secure: true,
      service: "gmail",
      auth: { user: email_, pass: password_ },
    });

    await transporter.sendMail({
      to: email_,
      from: email_,
      subject: `Nuevo Mensaje | Contacto`,
      html: `
              <p><strong>Nombre:</strong> ${name} </p>
              <p><strong>Email:</strong> ${email} </p>
              <p><strong>Mensaje:</strong> ${message} </p>
              `,
    });

    return "Email sent successfully";
  } catch (error) {
    throw new Error("Error sending mail");
  }
});
