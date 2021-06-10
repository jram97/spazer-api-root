"user strict";

const Company = require("../models/Company");
const BranchOfficeService = require('../services/branchOffice');

class CompanyService {
    constructor() { }

    /*create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, user, category, contactNumber, email, dui, nit, iva, isActive, branchOffices } = body;

                const nuevaEmpresa = new Company({
                    name,
                    user,
                    category,
                    contactNumber,
                    email,
                    dui,
                    nit,
                    iva,
                    isActive,
                    branchOffices: []
                });

                if (branchOffices.length > 0) {

                    BranchOfficeService.createMany(branchOffices)
                        .then(async (result) => {

                            nuevaEmpresa.branchOffices = result.branchOffices.map(function (branchOffice) {
                                return branchOffice._id
                            })

                            const company = await nuevaEmpresa.save();

                            if (company) {
                                resolve({
                                    msg: "Exito",
                                    company
                                })
                            } else {
                                reject({
                                    msg: "No se ha podido registrar la compañia",
                                    company
                                });
                            }
                        }).catch((result) => {
                            reject({
                                msg: "",
                                result
                            });
                        })
                } else {
                    const company = await nuevaEmpresa.save();

                    if (company) {
                        resolve({
                            msg: "Exito",
                            company
                        })
                    } else {
                        reject({
                            msg: "No se ha podido registrar la compañia",
                            company
                        });
                    }
                }

            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            };
        });
    }*/

    create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, user, category, contactNumber, email, dui, nit, iva, isActive, branchOffices } = body;

                const nuevaEmpresa = new Company({
                    name,
                    user,
                    category,
                    contactNumber,
                    email,
                    dui,
                    nit,
                    iva,
                    isActive,
                    branchOffices: []
                });

                if (branchOffices.length > 0) {

                    const created = await BranchOfficeService.createMany(branchOffices);
                    console.log(created);
                    if (created) {
                        nuevaEmpresa.branchOffices = created.map(function (branchOffice) {
                            return branchOffice._id
                        });
                    }

                    await nuevaEmpresa.save();

                    resolve({
                        msg: "Insertado",
                        company: nuevaEmpresa
                    });


                } else {
                    const company = await nuevaEmpresa.save();

                    if (company) {
                        resolve({
                            msg: "Exito",
                            company
                        })
                    } else {
                        reject({
                            msg: "No se ha podido registrar la compañia",
                            company
                        });
                    }
                }

            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            };
        });
    }

    deactivate(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const company = await Company.findOne({ _id: params._id }).populate('user');

                if (company) {
                    company.isActive = !company.isActive
                }

                const newData = await company.save();

                if (company) {
                    resolve({
                        msg: "Exito",
                        company: newData
                    });
                } else {
                    reject({
                        msg: "No se ha podido desactivar la expresa",
                        company
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    error
                });
            }

        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {

            try {
                const all = await Company.find({}).populate('user').populate('category').populate('branchOffices');

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        all
                    });
                }

            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }

        });
    }

    getById(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const company = await Company.findById(params._id).populate('user').populate('branchOffices').populate('category');

                if (company) {
                    resolve({
                        msg: "Exito",
                        company
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        company
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }

        });
    }

    update(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const company = await Company.findById(req.body.id);
                //console.log(req.params._id);
                //const { name, category, contactNumber, email, dui, nit, iva, isActive, branchOffices } = req.body

                if (company) {
                    /*company.name = name;
                    company.category = category;
                    company.contactNumber = contactNumber;
                    company.email = email;
                    company.dui = dui;
                    company.nit = nit;
                    company.iva = iva;
                    company.isActive = isActive;
                    company.branchOffices = branchOffices;*/

                    const newData = await Company.findByIdAndUpdate(req.body.id, { ...req.body });

                    if (newData) {
                        resolve({
                            msg: "Exito",
                            newData
                        });
                    } else {
                        reject({
                            msg: "Non se pudo actualizar el usuario",
                        });
                    }
                } else {
                    reject({
                        msg: "No se pudo encontrar el usuario",
                        company
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    addBranchOffice(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const company = await Company.findById(body.id);
                console.log(body);

                if (company) {
                    const newBranchOffice = await BranchOfficeService.createOne(body);
                    if (newBranchOffice) {
                        company.branchOffices.push(newBranchOffice);
                        await company.save();
                        resolve({
                            msg: "Sucursal Agregada con exito",
                            branchOffice: newBranchOffice
                        });
                    } else {
                        reject({
                            msg: "No se ha podido crear la sucursal"
                        });
                    }
                } else {
                    reject({
                        msg: "No existe el registro de esa compañia"
                    });
                }

            } catch (err) {
                console.log("Metodo add branch office de comopany", err);
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }
}

module.exports = new CompanyService();