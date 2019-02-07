const nodemailer = require("nodemailer");

const mailer = async (jobs) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'agnesgaroux47@gmail.com',
        pass: 'london-trans.2017'
      }
    });

    const mailOptions = {
      from: 'agnesgaroux47@gmail.com', // sender address
      to: 'agnesgaroux47@gmail.com', // list of receivers
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


