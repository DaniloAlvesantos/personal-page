import nodemailer from "nodemailer";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const { name, email, message, subject } = JSON.parse(event.body || "{}");

    if (!name || !email || !message || !subject) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "vendas.daniloasan.itapira@gmail.com",
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: "vendas.daniloasan.itapira@gmail.com",
      to: "daniloasan.itapira@gmail.com",
      subject: `Personal Page - ${subject}`,
      html: `
        <p>Nome: ${name}</p>
        <p>Email: ${email}</p>
        <p>Mensagem: ${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", info }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email",
        error: error.message,
      }),
    };
  }
}
