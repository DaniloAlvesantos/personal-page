require("dotenv").config();
const express = require("express");
const http = require("http");
const nodemailer = require("nodemailer");
const process = require("process");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "vendas.daniloasan.itapira@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

app.use(express.static("static"));

app.post("/api/send/message", async (req, res) => {
  try {
    const verifyTransporter = await transporter.verify();

    if (!verifyTransporter) {
      return res
        .status(500)
        .json({ message: "Error verifying transporter credentials" });
    }

    const { name, email, message, subject } = req.body;

    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const mailOption = {
      from: "vendas.daniloasan.itapira@gmail.com",
      to: "daniloasan.itapira@gmail.com",
      subject: `Personal Page - ${subject}`,
      html: `
        <p>Nome: ${name}</p>
        <p>Email: ${email}</p>
        <p>Mensagem: ${message}</p>
      `,
    };

    const emailSent = await transporter.sendMail(mailOption);

    res.status(200).json({ message: "Email sent successfully", emailSent });
  } catch (error) {
    console.error("Error sending email:", error);

    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log("Server is running on " + port));
