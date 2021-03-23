const nodemailer = require('nodemailer');

exports.postSend = (req, res) => {
    const output = `

      <p><center>
         <h1>Thank you for your cooperation</h1>
         <h2>
         <p>Hi, ${req.body.name} Thank you for choosing Roniel's blog Site, We look forward to seeing you soon!</p>
       </h2> 
      </center></p>


      <h3>Your Personal Information</h3>
      <ul style="    list-style-type: none;">  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      
      <h3>Suggestion</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'lauritosamber@gmail.com', // generated ethereal user
          pass: 'Myloves061617'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mc Roniel De Gozo" <ronieldegozo@gmail.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Contact Roniel', // Subject line
        text: 'Mc Roniel', // plain text body
        html: output, // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('welcome', {
            msg:'Email has been sent', 
            pageTitle: 'Home'
        });
    });
    }
