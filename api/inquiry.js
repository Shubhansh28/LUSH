const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, address, 'project-type': projectType } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    // Transporter configuration using environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || 'lushlivingindia@gmail.com',
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
                <p style="font-size: 12px; color: #777; margin-top: 20px;">Sent via LUSH Living Website</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Email Sending Error Details:', {
            message: error.message,
            code: error.code
        });
        res.status(500).json({ 
            error: 'Failed to send inquiry.', 
            details: error.message 
        });
    }
};
