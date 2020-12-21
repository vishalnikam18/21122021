require("dotenv").config();
var nodemailer = require("nodemailer");

exports.mailsender = (req, res) => {
  emailId = req.body.email;
  score = req.body.score;
  var transporter = nodemailer.createTransport({
    host: process.env.SERVER,
    secure: false,
    port: 25, //587
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: emailId,
    subject: "Testing the Nodemailer here",
    html: "<h1> Your score is" + score + "</h1>",
  };

  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      res.send([
        {
          result: "failed to send the mail here",
        },
      ]);
      
    } else {
      res.send([
        {
          result: "successfuly sent mail",
        },
      ]);
      console.log("Your email has been sent" + success.info);
    }
  });
};

