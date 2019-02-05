const nodemailer = require("nodemailer");

const main = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'agnesgaroux47@gmail.com',
        pass: ''
      }
    });

    const mailOptions = {
      from: 'agnesgaroux47@gmail.com', // sender address
      to: 'agnesgaroux47@gmail.com', // list of receivers
      subject: 'New jobs', // Subject line
      html: '<p>Here are some new jobs!</p>'// plain text body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        console.log(err)
      else
        console.log(info);
    });

  } catch (err) {
    console.error(err)
  }
}


