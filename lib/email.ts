import nodemailer from 'nodemailer';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: false,
});

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div>
        <h1>Welcome to Izzles!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div>
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(email: string, order: any) {
  const orderItemsHtml = order.items.map((item: any) => `
    <li>
      <strong>Product #${item.productId}</strong> — Quantity: ${item.quantity} — $${item.price.toFixed(2)}
    </li>
  `).join('');

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Order Confirmation - Order #${order.id.slice(-6)}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>Thank you for your order!</h2>
        <p>Your order <strong>#${order.id.slice(-6)}</strong> has been received and is currently <strong>${order.status}</strong>.</p>
        <h3>Order Details:</h3>
        <ul>${orderItemsHtml}</ul>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p>We appreciate your business!</p>
        <p style="color: #888; font-size: 0.9em;">If you have any questions, reply to this email.</p>
      </div>
    `,
  });
}

export async function sendCancellationEmail(email: string, order: any) {
  const orderItemsHtml = order.items.map((item: any) => `
    <li>
      <strong>${item.name}</strong> — Quantity: ${item.quantity} — $${item.price.toFixed(2)}
    </li>
  `).join('');

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Order Cancelled - Order #${order.id.slice(-6)}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>Your order has been cancelled</h2>
        <p>Your order <strong>#${order.id.slice(-6)}</strong> has been cancelled and refunded.</p>
        <h3>Order Details:</h3>
        <ul>${orderItemsHtml}</ul>
        <p><strong>Total Refunded:</strong> $${order.total.toFixed(2)}</p>
        <p>The refund will be processed to your original payment method within 5-10 business days.</p>
        <p style="color: #888; font-size: 0.9em;">If you have any questions, reply to this email.</p>
      </div>
    `,
  });
} 