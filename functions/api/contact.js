// functions/api/contact.js
//
// Cloudflare Pages Function — handles POST requests to /api/contact
// Receives the contact form data and sends an email via Resend.
//
// The RESEND_API_KEY must be set as a secret environment variable in
// the Cloudflare Pages project settings (Settings > Environment variables).

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    preferredContact,
    message,
    appointmentType,
  } = data;

  // Basic server-side validation - never trust the client alone
  if (!firstName || !lastName || !email || !phone || !location || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const emailBody = `
    New contact form submission:

    Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phone}
    Preferred Location: ${location}
    Appointment Type: ${appointmentType || 'Not specified'}
    Preferred Contact Method: ${preferredContact || 'Not specified'}

    Message:
    ${message}
  `.trim();

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // "from" must be an address on your verified domain
        from: 'Website Contact Form <contact@lenscraftersdoctor.com>',
        to: ['nashwanhabbooshcs@gmail.com'],
        reply_to: email, // lets staff hit "reply" and respond directly to the patient
        subject: `New Contact Form Submission - ${firstName} ${lastName}`,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorDetails = await resendResponse.text();
      console.error('Resend API error:', errorDetails);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}