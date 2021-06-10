"user strict";

const Request = require("../models/Request");
const branchOfficeService = require("../services/branchOffice");
const slot = require("../services/slot");
const User = require("../models/User");
const BranchOffice = require("../models/BranchOffice");
const Company = require("../models/Company");
var generatePassword = require("password-generator");
const mailer = require("../email/index");

class RequestService {
    constructor() { }

    create(req) {

        return new Promise(async (resolve, reject) => {
            try {
                const { companyName, companyOwner, category, contactNumber, email, dui, nit, iva, state, branchOffice } = req.body
                //const branchOffice = JSON.parse(req.body.branchOffice);

                const userEmail = await User.findOne({ email: req.body.email });
                const requestEmail = await Request.findOne({ email: req.body.email });

                if (userEmail || requestEmail) {
                    reject({
                        msg: "Ya existe ese correo en el registro"
                    });
                } else {
                    console.log(req.body);
                    const newRequest = new Request({
                        companyName,
                        companyOwner,
                        category,
                        contactNumber,
                        email,
                        dui,
                        nit,
                        iva,
                        state,
                    });

                    if (branchOffice) {
                        const parsedBranchOffice = JSON.parse(req.body.branchOffice);
                        branchOffice.images = req.files.images;
                        const newBranchOffice = await branchOfficeService.createOne(parsedBranchOffice);
                        console.log("se crea el branchxd");

                        newRequest.branchOffice = [newBranchOffice._id];
                    } else {
                        newRequest.toCompleteURL = `${newRequest.companyName.replace(/\s+/g, "-").toLowerCase()}${Date.now()}`
                    }
                    const request = await newRequest.save();

                    if (request) {
                        mailer.sendEmailNewRequest(request);
                        if (!request.branchOffice) {
                            mailer.sendEmailNewNormalRequestUser(request);
                        }
                        resolve({
                            msg: "Solicitud realizada con exito",
                            request
                        });
                    } else {
                        reject({
                            msg: "No se ha podido realizar la solicitud"
                        });
                    }
                }

            } catch (err) {
                console.log('error', err)
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });


    }

    changeState(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Request.findOne({ _id: req.params._id }); //.populate('category').populate('branchOffice');

                if (request) {
                    request.state = req.body.state;

                    const newRequest = await request.save();

                    if (newRequest) {
                        resolve({
                            msg: "Exito",
                            request: newRequest,
                        });
                    } else {
                        reject({
                            msg: "No se ha podido realizar el cambio de estado",
                        });
                    }
                } else {
                    reject({
                        msg: "No se ha encontrado la solicitud",
                    });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err,
                });
            }
        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const all = await Request.find({})
                    .populate("category")
                    .populate("branchOffice");

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        requests: all,
                    });
                } else {
                    reject({
                        msg: "No se obuvieron resultados",
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                });
            }
        });
    }

    getById(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Request.findById(params._id)
                    .populate("category")
                    .populate("branchOffice");

                if (request) {
                    resolve({
                        msg: "Exito",
                        request,
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        request,
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                });
            }
        });
    }

    update(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Request.findById(req.body.id);

                if (request) {
                    const {
                        companyName,
                        companyOwner,
                        category,
                        contactNumber,
                        email,
                        dui,
                        nit,
                        iva,
                        state,
                        branchOffice,
                    } = req.body;

                    request.companyName = companyName;
                    request.companyOwner = companyOwner;
                    request.category = category;
                    request.contactNumber = contactNumber;
                    request.email = email;
                    request.dui = dui;
                    request.nit = nit;
                    request.iva = iva;
                    request.state = state;
                    request.branchOffice = branchOffice;

                    const newData = await request.save();

                    if (newData) {
                        resolve({
                            msg: "Exito",
                            newData,
                        });
                    } else {
                        reject({
                            msg: "No se ha podido realizar el cambio",
                            request,
                        });
                    }
                } else {
                    reject({
                        msg: "No existe esa solicitud",
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                });
            }
        });
    }

    delete(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Request.deleteOne({ _id: params._id });

                if (request) {
                    resolve({
                        msg: "La solicitud se ha borrado con exito",
                        request,
                    });
                } else {
                    reject({
                        msg: "No se ha podido borrar",
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                })

            }
        })
    }




    acceptRequest(body) {
        return new Promise(async (resolve, reject) => {
            console.log(body.id);
            const request = await Request.findById(body.id);

            if (request) {
                const exist = await User.findOne({ email: request.email });
                const pass = generatePassword(6, false);
                console.log("Pass", pass);
                console.log("Exist", exist);

                if (!exist) {
                    const newUser = new User({
                        name: request.companyOwner,
                        email: request.email,
                        role: 2,
                    });

                    newUser.password = await newUser.encryptPassword(pass);
                    const user = await newUser.save();
                    console.log(request.branchOffice);

                    const branchOffice = await BranchOffice.findById(
                        request.branchOffice
                    );
                    console.log("Sucursal", request.branchOffice);

                    if (branchOffice) {
                        branchOffice.isActive = true;
                        branchOffice.user = user._id;
                        await branchOffice.save();
                    }

                    const newCompany = new Company({
                        name: request.companyName,
                        user: user._id,
                        category: request.category,
                        contactNumber: request.contactNumber,
                        email: request.email,
                        dui: request.dui,
                        nit: request.nit,
                        iva: request.iva,
                        isActive: true,
                        branchOffices: [request.branchOffice],
                    });

                    const company = await newCompany.save();

                    if (company) {
                        request.state = "a";
                        request.save();

                        mailer.sendConfirmRequestMail(company, pass);

                        resolve({
                            msg: `La solicitud de ${company.name} de ha aceptado con exito`,
                            company,
                        });
                    } else {
                        reject({
                            msg: "No se ha podido crear la compañia",
                        });
                    }
                } else {
                    reject({
                        msg: "Existe un usuario registrado con esa direccion de correo",
                    });
                }
            } else {
                reject({
                    msg: "No existe esa solicitud",
                });
            }
        });
    }
}

module.exports = new RequestService();
