const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const moment = require('moment');
const sendMail = async (to, name, status, from = 'ngoducanh179@gmail.com') => {
    const msg = {
        to,
        from, // Use the email address or domain you verified above
        subject: `${name} have ${status} a report`,
        text: `${name} just upload a ${status} at ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
    };
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.body);
            }
        }
    })();
}
module.exports = sendMail;
