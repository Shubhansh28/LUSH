const { Resend } = require('resend');

module.exports = async (req, res) => {
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'LUSH Living <onboarding@resend.dev>',
            to: process.env.RECIPIENT_EMAIL || 'lushlivingindia@gmail.com',
            replyTo: email,
            subject: `New Project Inquiry from ${name}`,
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
        });
        res.status(200).json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Email Sending Error:', {
            message: error.message,
            code: error.code
        });
        res.status(500).json({
            error: 'Failed to send inquiry.',
            details: error.message
        });
    }
};
