const Services = require("./../services");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const Verify = require("../models/Verify");
const key = require("../keys");
const sms = require("../sms");
var generatePassword = require('password-generator');
const { sendCodeChangePass } = require("../email/index");
const { findOneAndRemove } = require("../models/User");

class AuthController {
    constructor() { }

    async login(req, res) {
        //try {
        const { email, password } = req.body
        if (email && password) {
            var datosUsuario, userDB = await User.findOne({ email: email });
            //console.log(userDB);

            if (!userDB) {
                res.json({
                    mensaje: "No existe el usuario en la base de datos",
                    status: false
                });
            } else {
                const match = await userDB.matchPassword(password, userDB.password);

                if (match) {
                    const payload = {
                        check: true,
                        email: email,
                        role: userDB.role,
                        userId: userDB._id
                    }

                    console.log(payload);

                    const token = jwt.sign(payload, key.llave, {
                        expiresIn: "365 days"
                    });
                    
                    datosUsuario = {...userDB._doc}
                    if (payload.role == 2) {
                        const branchOffice = await BranchOffice.findOne({ user: userDB._id });
                        console.log(branchOffice);
                        datosUsuario.branchOffice = branchOffice;
                    }

                    res.json({
                        usuario: datosUsuario,
                        mensaje: "Autenticado con exito",
                        status: true,
                        token: token
                    });

                } else {
                    res.json({
                        mensaje: "Contraseña incorrecta",
                        status: false
                    });
                }
            }
        } else {
            res.json({
                mensaje: "Existe algun campo vacio",
                status: false
            });
        }
        /*} catch (err) {
            res.json({
                mensaje: err,
                status: false
            });
        }*/
    }

    async register(req, res) {

        const { name, password, imei, banns, email } = req.body
        const exist = await User.findOne({ email: email });

        if (!exist) {
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                imei: imei,
                profilePicture: " ",
                points: 0,
                role: 3
            });

            newUser.password = await newUser.encryptPassword(password);

            newUser.save(function (err, saved) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        msg: `Bienvenido ${saved.name}!`,
                        usuario: saved,
                        status: true
                    });
                }
            });
        } else {
            res.json({
                msg: "El correo ya ha sido registrado con anterioridad",
                status: false,
            });
        }
    }

    async enviarCodigoCambioContrasena(req, res) {
        try {
            const code = generatePassword(4, false, /\d/) // -> 252667390298

            const existeCorreo = await Verify.findOne({ email: req.body.email });

            if (existeCorreo) {
                await Verify.findOneAndRemove({ email: req.body.email });
            }

            await Verify.create({ code: code, email: req.body.email });

            sendCodeChangePass(code, req.body.email);
            res.json({
                msg: "El correo ha sido enviado",
                code: code
            });

        } catch (error) {
            res.json({
                msg: "Algo salio mal",
                error,
                status: false,
            });
        }
    }

    async recibirCodigoCambioContrasena(req, res) {
        try {
            const verify = await Verify.findOneAndRemove({ email: req.body.email, code: req.body.code });

            if (verify) {
                res.json({
                    msg: "Codigo valido",
                });
            } else {
                res.json({
                    msg: "Codigo no valido",
                });
            }
        } catch (error) {
            res.json({
                msg: "Algo salio mal",
                error,
                status: false,
            });
        }
    }

    async enviarVerifyPhoneNumber(req, res) {

        const code = generatePassword(4, false, /\d/);

        const existeNumero = await Verify.findOne({ phoneNumber: req.body.number });

        if (existeNumero) {
            await Verify.findOneAndRemove({ phoneNumber: req.body.number });
        }

        await Verify.create({ code: code, phoneNumber: req.body.number });

        sms.verifyPhoneNumber(req.body.number, code);
        res.json({
            msg: "El correo ha sido enviado",
            code: code
        });
    }

    async verifyPhoneNumber(req, res) {

    }

}

module.exports = new AuthController();