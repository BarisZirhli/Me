const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baris.zirhli10@gmail.com",
    pass: "moyu nrgr gnpl zfvw",
  },
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const mailOptions = {
    from: email,
    to: "baris.zirhli10@gmail.com",
    subject: "New Contact Form Submission",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent:", info.response);

      res.redirect("/page.html");
    }
  });
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "test.html");
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
