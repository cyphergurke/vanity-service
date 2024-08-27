
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const htmlContent = (name: string, email: string, subject: string, message: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 24px;
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Neue Anfrage von ${name}</h1>
        <p><strong>Betreff:</strong> ${subject}</p> 
        <p><strong>Email Adresse:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
    </div>
</body>
</html>
`;

}

export async function POST(req: NextRequest,) {
    try {
        const { name, subject, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: 'Please fill in all fields' });
        }

        let transporter = nodemailer.createTransport({
            host: process.env.IMAP_MAIL_SERVER_OUT,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Cypherweb Development" <${process.env.EMAIL_ADDRESS}>`,
            to: process.env.EMAIL_ADDRESS,
            subject: subject || `Neue Anfrage von ${name} ${email}: ${subject}`,
            html: htmlContent(name, email, subject, message)
        });

        return Response.json({ status: 200, message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 500, error: 'Failed to send email' });
    }
}
