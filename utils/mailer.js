const nodemailer = require('nodemailer');

const mail = async(receipient,subject,message)=>{

    console.log(process.env.SMTP_PASS);

    let transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })

  let info = await transporter.sendMail({
    from: '"Palala Bot" <Palala@bot.com>', // sender address
    to: receipient,
    subject: subject, // Subject line
    html: `<b>${message}</b>`, // html body
  });

  console.log("Message sent: %s".yellow, info.messageId);
}

module.exports = mail;