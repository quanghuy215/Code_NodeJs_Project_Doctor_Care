require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Harry Nguyen👻" <nguyenquanghuy2021@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã nhận được email vì đặt lịch khám bệnh online</p>
    <p>Thông tin đặt lịch khám bệnh của bạn: </p>
    <div>
        <b>Thời gian: ${dataSend.time} <br></b>
        <b>Bác sĩ: ${dataSend.doctorName}</b>
    </div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</div>
    <div>
      <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Xin chân thành cảm ơn</div>
    `, // html body
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
