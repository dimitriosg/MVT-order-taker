import AwsSesAdapter from "./email/awsSesAdapter.js";

const emailAdapter = AwsSesAdapter;


export function sendEmail(to, subject, text) {
    return emailAdapter.sendEmail(to, subject, text);
}
