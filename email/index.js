const jwt = require("jsonwebtoken");
const credentials = require("./credentials");
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	//service: process.env.EMAIL_SERVICE,
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER, // generated ethereal user
		pass: process.env.EMAIL_PASS, // generated ethereal password
	},
});

class Utils {
	constructor() { }

	auth(req, res, next) {
		//const token = req.headers["access-token"];

		/*console.log("si");
		if (token) {
			jwt.verify(token, credentials.key, (err, decoded) => {
				if (err) {
					return res.json({
						mensaje: "El token ingresado, es invalido",
						status: false,
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.send({
				mensaje: "El token a expirado.",
				status: false,
			});
		}*/
		next();
	}

	async sendConfirmRequestMail(company, pass) {
		//var testAccount = await nodemailer.createTestAccount();
		//console.log("User",process.env);

		/*let transporter = nodemailer.createTransport({
			service: process.env.EMAIL_SERVICE,
			host: process.env.EMAIL_HOST,
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USER, // generated ethereal user
				pass: process.env.EMAIL_PASS, // generated ethereal password
			},
		});*/

		const sendInfo = {
			from: '"Spazer App 👻" <spazer@roots.com>', // sender address
			to: company.email, // list of receivers
			subject: "Confirmacion para Spazer!", // Subject line
			text: "Se ha aprobado tu solicitud!, ahora tu sucursal estara disponible en nuestra App.", // plain text body
			html: `<b>Tu solicitud, para incorporar ${company.name} a Spazer, ha sido aceptada!, ahora tu sucursal estara disponible en nuestra App.</b>
					<b>Su contraseña es: ${pass}, ingrese al siguiente enlace con su correo y esta contraña para cambiarla!<b>`, // html body
		}

		transporter.sendMail(sendInfo, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("enviado");
			}
		});
	}

	async sendCodeChangePass(code, email) {
		const sendInfo = {
			from: '"Spazer App 👻" <spazer@roots.com>', // sender address
			to: email, // list of receivers
			subject: "Solicitud cambio de contraseña de cuenta Spazer", // Subject line
			html: `<p>Haz solicitado el cambio de contraseña, tu codigo es el siguiente:<p>
					<center><h3>${code}<h3><center>`, // html body
		}

		transporter.sendMail(sendInfo, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("enviado");
			}
		});
	}

	async sendEmailNewRequest(request) {
		const sendInfo = {
			from: '"Spazer App" <spazer@roots.com>', // sender address
			to: "info@spazerapp.com", // list of receivers
			subject: "Nuevo registro Spazer", // Subject line
			html: `<p>Se ha realizado un nuevo Registro en Spazer.<p>
					<p>La compañia ${request.companyName} se ha registrado a nombre de ${request.companyOwner}.<p>
					<p>Correo: ${request.email}<p>
					<p>Numero de contacto: ${request.contactNumber}<p>`, // html body
		}

		transporter.sendMail(sendInfo, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("enviado");
			}
		});
	}

	async sendEmailNewNormalRequestUser(request) {
		const sendInfo = {
			from: '"Spazer App" <spazer@roots.com>', // sender address
			to: request.email, // list of receivers
			subject: "Te has registrado en Spazer!", // Subject line
			html: `<p>Bienvenido/a ${request.companyOwner}!<p>
					<p>Has realizado una solicitud de registro para tu compañia ${request.companyName}!<p>
					<p>Pronto recibiras un correo para completar tu registro.<p>`, // html body
		}

		transporter.sendMail(sendInfo, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("enviado");
			}
		});
	}
}

module.exports = new Utils();
