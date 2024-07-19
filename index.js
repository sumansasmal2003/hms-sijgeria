const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sijgeriaucssangha@gmail.com', // Replace with your email
        pass: 'ushv odpq fiqn elos'   // Replace with your email password
    }
});

app.post('/schedule', (req, res) => {
    const { name, email, phone, date, time, department, doctor } = req.body;

    const mailOptions = {
        from: 'sijgeriaucssangha@gmail.com', // Replace with your email
        to: email,
        subject: 'Appointment Scheduled',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2e6c80;">Dear ${name},</h2>
                <p>Your appointment request has been submitted successfully. Here are the details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Name:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Phone Number:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Department:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${department}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Doctor:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${doctor}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Date:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Time:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${time}</td>
                    </tr>
                </table>
                <p>Further notifications will be available soon in your email.</p>
                <p>Thank you,<br>Sijgeria HMS</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

// Endpoint for handling appointment confirmation
app.post('/confirm', (req, res) => {
    const { patientEmail, patientName, phone, department, doctor, date, time } = req.body;

    const mailOptions = {
        from: 'sijgeriaucssangha@gmail.com', // Replace with your email
        to: patientEmail,
        subject: 'Appointment Confirmed',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2e6c80;">Dear ${patientName},</h2>
                <p>Your appointment has been <span style="color: #008000;">confirmed successfully</span>. Here are the details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Name:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${patientName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Phone Number:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Department:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${department}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Doctor:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${doctor}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Date:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Time:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${time}</td>
                    </tr>
                </table>
                <p>Thank you for scheduling with us.</p>
                <p>Best regards,<br>Sijgeria HMS</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

// Endpoint for handling appointment rejection
app.post('/reject', (req, res) => {
    const { patientEmail, patientName, phone, department, doctor, date, time } = req.body;

    const mailOptions = {
        from: 'sijgeriaucssangha@gmail.com', // Replace with your email
        to: patientEmail,
        subject: 'Appointment Rejected',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #d9534f;">Dear ${patientName},</h2>
                <p>We regret to inform you that your appointment has been <span style="color: #FF0000;">rejected.</span> Here were the details of the appointment request:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Name:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${patientName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Phone Number:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Department:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${department}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Doctor:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${doctor}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Date:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dddddd;">Time:</td>
                        <td style="padding: 8px; border: 1px solid #dddddd;">${time}</td>
                    </tr>
                </table>
                <p>We apologize for any inconvenience this may have caused. Please contact us to reschedule or for further assistance.</p>
                <p>Best regards,<br>Sijgeria HMS</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
