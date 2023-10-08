import AWS from 'aws-sdk';
import EmailInterface from './interface.js';

class AwsSesAdapter extends EmailInterface {
    constructor() {
        super();
        AWS.config.update({ region: 'eu-central-1' });  // Update with your AWS region
        this.ses = new AWS.SES({ apiVersion: '2010-12-01' });
    }

    sendEmail(to, subject, text) {
        const params = {
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: text
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: 'Order Taker <no-reply@dgalanopoulos.eu>',
        };

        return this.ses.sendEmail(params).promise();
    }
}

export default new AwsSesAdapter();
