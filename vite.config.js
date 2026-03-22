import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import nodemailer from 'nodemailer'

function apiPlugin() {
  return {
    name: 'api-server',
    configureServer(server) {
      server.middlewares.use('/api/inquiry', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.writeHead(405);
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { name, email, phone, address, comments, 'project-type': projectType } = JSON.parse(body);

            if (!name || !email) {
              res.writeHead(400);
              res.end(JSON.stringify({ error: 'Name and Email are required' }));
              return;
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

            await transporter.sendMail({
              from: `"${name}" <${process.env.SMTP_USER}>`,
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
                    ${comments ? `<p><strong>Query / Comments:</strong> ${comments}</p>` : ''}
                  </div>
                  <p style="font-size: 12px; color: #777; margin-top: 20px;">Sent via LUSH Living Website</p>
                </div>
              `,
            });

            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Inquiry sent successfully' }));
          } catch (error) {
            console.error('Email error:', error.message);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to send inquiry.' }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
})
