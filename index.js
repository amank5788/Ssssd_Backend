const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors=require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Email sending route
app.post('/send-email', async (req, res) => {
    
    const { name, email,callBackDate,callBackTime, message } = req.body;
    message=`${message} call back date:- ${callBackDate} call back time:- ${callBackTime}`;
    if (!name || !email || !callBackDate || !callBackTime || !message) {
    
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'aman12057k@gmail.com',
        subject: 'ssdc website visitor request',
        text: message
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Email sent successfully' });
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.post('/send-message', async (req, res) => {

    const { name, email,subject, message } = req.body;
    //message=message+'call back date:-'+callBackDate+'call back time:-'+callBackTime;
    if (!name || !email || !subject || !message) {
        
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'aman12057k@gmail.com',
        subject: subject,
        text: message
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Email sent successfully' });
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to send email' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
