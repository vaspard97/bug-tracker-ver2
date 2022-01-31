import { sendEmail } from "./sendEmail.js";

export const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
	origin,
}) => {
	origin = "https://bugz-trakerzz.netlify.app";
	const verificationUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
	const message = `
      <h1>Hello ${name}</h1>
      <p>Verify your email by clicking this link:</p>
      <a href=${verificationUrl} clicktracking=off>${verificationUrl}</a>
    `;

	return sendEmail({ to: email, subject: "Email Verfication", html: message });
};
