const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error Details:', {
            message: error.message,
            code: error.code,
            command: error.command
        });
    } else {
        console.log('Server is ready to take messages');
    }
});

// Endpoint to handle project inquiries
app.post('/api/inquiry', async (req, res) => {
    const { name, email, phone, address, 'project-type': projectType } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || 'ashmit.sahu181207@gmail.com',
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        text: `
            New Project Inquiry Received:
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Project Type: ${projectType}
            Address: ${address}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #c9a050;">New Project Inquiry</h2>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Project Type:</strong> ${projectType}</p>
                    <p><strong>Address:</strong> ${address}</p>
                </div>
                <p style="font-size: 12px; color: #777; margin-top: 20px;">Sent via LUSH Living Website Backend</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Email Sending Error Details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({ 
            error: 'Failed to send inquiry.', 
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
