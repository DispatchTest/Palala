const nodemailer = require('nodemailer');

exports.mail = async(receipient,subject,name,message)=>{


    let transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        },

    })

  let info = await transporter.sendMail({
    from: '"Palala Bot" <Palala@bot.com>', // sender address
    to: receipient,
    subject: subject, // Subject line
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <title>Palala Email </title>
    </head>
    <body style="      margin: 0%;
    padding: 0;
     background-color: #1a1a1a;
     width: 100%;
     font-family: 'Rubik', sans-serif;">
        <section style="       width: 60%;
        margin: 0 auto;
        padding: 50px;">
            <div style="         padding: 40px;
            text-align: center;
            background-color: #202020;
            color: white;">
            <img src="https://res.cloudinary.com/dan6ksd6d/image/upload/v1612030341/email_cukxja.png" height="100px" alt="">
        <p style="        font-size: 1.2rem;
        font-weight: 100;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 5px 0;">Market Place</p>
                <h1 style="        font-size: 3rem;
                margin: 0;">palala</h1>
            </div>
            <div style="         padding:  50px 120px;
            background-color:#272727 ;">
                 <h3 style="color: white;
                 font-size: 1.6rem;
                 font-weight: 100;">Dear <b>${name}</b>,</h3>
                 
                 ${message}

            </div>
            <div style="         padding: 20px 120px;
             background-color: #202020;   
             text-align: center;   ">
                <p style="       color: #797979;">
                    Excusively from ♥ palalabot.
                </p>
                <small  style="       color: #797979;">Accra, Ghana, +233 059 390 0000</small>
            </div>
            <p style="         font-size: 0.6rem;
            color:#464646;
            text-transform: uppercase;
            text-align: center;
            margin: 20px 0px;">
                © 2021 Palala. All rights reserved.
            </p>
        </section>
    </body>
    </html>`, // html body
  });

  console.log("Message sent: %s".yellow, info.messageId);
}
