// This mailer will not work unless you give non-secure apps access to the sender's inbox

const nodemailer = require("nodemailer");

const mailer = async (jobs) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '', // email address goes here 
        pass: '' // password goes there 
      }
    });

    const mailOptions = {
      from: '', // sender address
      to: '', // list of receivers
      subject: 'New jobs', // Subject line
      html: `<p>${jobs}</p>`// plain text body
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

module.exports = {
  mailer,
}


