const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, phone, address, comments, 'project-type': projectType } = body;

        if (!name || !email) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Name and Email are required' }),
            };
        }

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
                ${comments ? `Query / Comments: ${comments}` : ''}
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
                        ${comments ? `<p><strong>Query / Comments:</strong> ${comments}</p>` : ''}
                    </div>
                    <p style="font-size: 12px; color: #777; margin-top: 20px;">Sent via LUSH Living Website</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Inquiry sent successfully' }),
        };
    } catch (error) {
        console.error('Email Sending Error Details:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to send inquiry.',
                details: error.message,
            }),
        };
    }
};
