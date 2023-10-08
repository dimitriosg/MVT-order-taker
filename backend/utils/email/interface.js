export default class EmailInterface {
    sendEmail(to, subject, text) {
        throw new Error('This method must be overridden by subclass');
    }
}
