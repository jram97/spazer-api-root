const accountSid = 'ACe6119ebbe5bfabf8dad8c4045880dcd7';
const authToken = '512703aa11cb93645c53d8d95e20c62a';
const client = require('twilio')(accountSid, authToken);

class SMS {
    constructor() { }

    verifyPhoneNumber(number,code) {
        client.messages
            .create({
                body: `El codigo de verificacion de tu numero de telefono es: ${code}`,
                from: '+12106258120',
                to: `+503${number}`
            })
            .then(message => console.log(message.sid));
    }
}

module.exports = new SMS();