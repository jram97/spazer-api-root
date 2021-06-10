"user strict";

const User = require("../models/User");
const Bann = require("../models/Bann");
const Request = require("../models/Request");
const { urlencoded } = require("body-parser");
const { unsubscribe } = require("../routes/user");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "dxmoev2hb",
	api_key: "644335251315747",
	api_secret: "t4jxKvIosZ00j9sqzn3x3yG7CzA",
});

class UserService {
	constructor() { }

	getByEmail(params) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findOne({ email: params.email });

				if (user) {
					resolve({
						msg: "Usuario obtenido con exito",
						user,
					});
				} else {
					reject({
						msg: "No han obtenido resultados",
						user: {},
					});
				}
			} catch (err) {
				reject({
					msg: "Algo salio mal",
					err,
				});
				console.log(err);
			}
		});
	}

	getById(params) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(params.id);
				const user = await User.findById(params.id);

				if (user) {
					resolve({
						msg: "Usuario obtenido con exito",
						user,
					});
				} else {
					reject({
						msg: "No han obtenido resultados",
						user: {},
					});
				}
			} catch (err) {
				reject({
					msg: "Algo salio mal",
					err,
				});
				console.log(err);
			}
		});
	}

	isEmailAvailable(params) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findOne({ email: params.email });
				const request = await Request.findOne({ email: params.email, $or: [{ state: "w" }, { state: "a" }] });

				console.log(user);
				if (user || request) {
					reject({
						msg: "El correo ya esta registrado",
						status: false,
					});
				} else {
					resolve({
						msg: "El correo esta disponible",
						status: true,
					});
				}
			} catch (err) {
				reject({
					msg: "Algo salio mal",
					err,
				});
			}
		});
	}

	update(body) {
		return new Promise(async (resolve, reject) => {
			try {
				const { name, imei, banns } = body;

				const user = await User.findById(body.id);

				if (user) {
					/*user.name = name;
					user.imei = imei;
					user.banns = banns;*/

					const savedUser = await User.findByIdAndUpdate(body.id, { ...body });

					if (savedUser) {
						resolve({
							msg: "El usuario ha sido actualizado con exito",
							user: savedUser,
						});
					} else {
						reject({
							msg: "No se ha podido modificar el usuario",
						});
					}
				}
			} catch (err) {
				console.log(err);
				reject({
					msg: "Algo salio mal",
				});
			}
		});
	}

	changeProfilePicture(body) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(body.type);
				const user = await User.findById(body.id);
				let url = "",
					publicId = "";
				cloudinary.uploader.destroy(body.oldUrl);
				if (user) {
					await cloudinary.uploader.upload(
						`data:${body.type};base64,${body.imgData}`,
						{
							folder: "Spazer/ProfilePictures",
						},
						async (err, result) => {
							if (err) {
								reject({
									msg: "Ocurrio un error al cambiar la imagen",
									err,
								});
							} else {
								console.log(result);
								url = result.secure_url;
								publicId = result.public_id;
								resolve({
									msg: "Imagen cambiada con exito",
									url: result.secure_url,
									publicId: result.public_id,
								});
							}
						}
					);
					user.profilePicture = {
						url,
						publicId,
					};
					await user.save();
				} else {
					reject({
						msg: "El usuario no existe",
					});
				}
			} catch (err) {
				reject({
					msg: "Algo salio mal",
					err,
				});
			}
		});
	}

	changeState(params) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(params._id);

				if (user) {
					user.isActive = !user.isActive;

					if (await user.save()) {
						resolve({
							msg: `El estado ha cambiado a ${user.isActive}`,
							user,
						});
					} else {
						reject({
							msg: "No se ha podido cambiar el estado",
						});
					}
				} else {
					reject({
						msg: "Ese usuario no existe",
					});
				}
			} catch (err) {
				console.error(err);

				reject({
					msg: "algo salio mal",
					err,
				});
			}
		});
	}

	addBann(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const newBann = Bann.create(req.body);

				if (newBann) {
					resolve({
						msg: "Exito",
						newBann
					});
				} else {
					resolve({
						msg: "No se ha podido agregar la amonestacion"
					});
				}
			} catch (err) {
				reject({
					msg: "Algo salio mal",
				});
			}
		});
	}

	cleanBannHistory(body) {
		return new Promise(async (resolve, reject) => {
			try {
				/*const user = await User.findById(body.userId);
		
				if (user) {
				  user.banns = [];
		
				  await user.save();
		
				  resolve({
					msg: "El historial se ha limpiado con exito",
				  });
				} else {
				  reject({
					msg: "No existe ese usuario",
				  });
				}*/
			} catch (err) {
				reject({
					msg: "algo salio mal",
				});
			}
		});
	}

	addFirebaseToken(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(req.body.id);

				if (user) {
					user.firebaseTokens.push(req.body.firebaseToken);
					user.save();
					resolve({
						msg: "El token ha sido agregado con exito"
					});
				} else {
					resolve({
						msg: "El usuario no existe"
					});
				}
			} catch (error) {
				reject({
					msg: "algo salio mal",
				});
			}
		});
	}

	deleteFirebaseToken(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(req.body.id);

				if (user) {
					const index = user.firebaseTokens.indexOf(req.body.firebaseToken);

					if (index > -1) {
						user.firebaseTokens.splice(index, 1);
						await user.save();
						resolve({
							msg: "Token eliminado con exito"
						});
					} else {
						resolve({
							msg: "No existe el token"
						});
					}
				} else {
					resolve({
						msg: "El usuario no existe"
					});
				}
			} catch (error) {
				reject({
					msg: "algo salio mal",
					error
				});
			}
		});
	}

	notificar(req) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findById(req.body.id);

				resolve({
					msg: "Metodo de notificar",
					ids: user.firebaseTokens
				});
			} catch (error) {
				reject({
					msg: "algo salio mal",
					error
				});
			}
		});
	}

}

module.exports = new UserService();
