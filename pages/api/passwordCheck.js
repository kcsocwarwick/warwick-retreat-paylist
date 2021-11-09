import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler(process.env.PASSWORD, {
    // Options go here (optional)
    cookieName: "next-password-protect",
});
