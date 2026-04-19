import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_PiBLSvyL_LFBXYSxQdMYAHjfKk47TYTUt");

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, nature, message } = await request.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Royalty Website <sales@royaltyfuneral.com>",
      to: ["sales@royaltyfuneral.com"],
      subject: `Website Inquiry: ${nature} from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Nature of Inquiry:</strong> ${nature}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred while sending the message." },
      { status: 500 }
    );
  }
}
