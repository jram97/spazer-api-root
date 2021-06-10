"user strict";

const BranchOffice = require("../models/BranchOffice");
const Company = require("../models/Company");
const User = require("../models/User");
const slotService = require("../services/slot");
const servicesService = require("../services/service");
const slot = require("../services/slot");
const Slot = require("../models/Slot");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxmoev2hb',
    api_key: '644335251315747',
    api_secret: 't4jxKvIosZ00j9sqzn3x3yG7CzA'
});

class BranchOfficeService {
    constructor() { }

    create(req) {
        return new Promise(async (resolve, reject) => {
            try {

                if (req.files) {
                    req.body.images = req.files.images
                }

                const branchOffice = await this.createOne(req.body);

                if (branchOffice) {
                    resolve({
                        msg: "Exito",
                        branchOffice
                    });
                } else {
                    reject({
                        msg: "No se ha podido registrar la sucursal",
                        branchOffice
                    })
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    error
                })
            }
        });
    }

    async probarImagenes(req) {


        const images = req.body.images;

        const rutas = images.map(function (image) {
            return image.path;
        });

        await cloudinary.uploader.upload(rutas, {
            //html: {multiple:true},
            folder: "Spazer/BranchOffices",
        }, (err, result) => {
            if (err) {
                return result.url;
            }
        });
    }

    async createOne(req) {
        //console.log("Metodo create one");
        try {
            const imagen = req.images
            let imgs = [];

            for (let index = 0; index < imagen.length; index++) {
                await cloudinary.uploader.upload(imagen[index].path, {
                    folder: "Spazer/BranchOffices"
                }, async (err, result) => {
                    if (err) {
                        console.log("Error imagenes", err);
                    }
                    imgs.push(result.secure_url)
                })
            }

            const newBranchOffice = new BranchOffice(req);
            newBranchOffice.images = imgs

            if (req.slots) {
                const newSlots = await slotService.createMany(req.slots);

                if (newSlots.length > 0) {
                    newBranchOffice.slots = newSlots.map(function (slot) {
                        return slot._id;
                    });
                } else {
                    newBranchOffice.slots = [];
                }
            }

            if (req.services) {
                const newServices = await servicesService.createMany(req.services)
                if (newServices.length > 0) {
                    newBranchOffice.services = await newServices.map(function (service) {
                        return service._id
                    })
                } else {
                    newBranchOffice.service = [];
                }

            }

            return await newBranchOffice.save();

            //console.log("Se creo branch office");
        } catch (error) {
            console.log(error);
        }
    }

    async createMany(branchOffices) {

        try {
            const retorno = await BranchOffice.collection.insertMany(branchOffices);
            return retorno.ops

        } catch (err) {
            reject({ err });
        }

    }

    deactivate(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const branchOffice = await BranchOffice.findOne({ _id: params._id });//.populate('slots').populate('users').populate('schedules');
                //console.log(company);

                if (branchOffice) {
                    branchOffice.isActive = !branchOffice.isActive

                    await branchOffice.save();

                    resolve({
                        msg: `${BranchOffice.name} ha cambiado su estado`,
                        branchOffice
                    });
                } else {
                    reject({ data: "Usuario no registrado" });
                }


            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                })
            }
        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {

            const all = await BranchOffice.find({}).populate('users').populate('slots').populate('services');

            if (all.length > 0) {
                resolve({
                    msg: "Existo",
                    branchOffices: all
                });
            } else {
                reject({
                    msg: "Sin resultados",
                    branchOffices: []
                });
            }
        });
    }

    getById(params) {

        return new Promise(async (resolve, reject) => {
            const branchOffice = await BranchOffice.findById(params._id).populate('slots').populate('users').populate('services');

            if (branchOffice) {
                resolve({
                    msg: "Exito",
                    branchOffice
                });
            } else {
                reject({
                    msg: "Sin resultados",
                    branchOffices: all
                });
            }
        });
    }

    getByCategoryId(params) {
        return new Promise(async (resolve, reject) => {
            const companys = await Company.find({ category: params._id });

            let result = [];

            if (companys.length > 0) {
                companys.forEach((company) => {
                    result = result.concat(company.branchOffices);
                });

                result = await this.getBranchOfficesData(result);

                resolve({
                    msg: "Exito",
                    branchOffices: result,
                });
            } else {
                reject({
                    msg: "No se obtuvieron resultados",
                    branchOffices: result
                });
            }
        });
    }

    async getActiveSlots(branchOfficeId) {
        //console.log(branchOfficeId);
        const branchOffice = await BranchOffice.findById(branchOfficeId).populate('slots');
        //console.log(branchOffice.slots.length);
        if (branchOffice) {
            const slots = branchOffice.slots;
            //console.log(slots.length);

            if (slots.length > 0) {
                return slots.filter(slot => slot.isActive);
            }
        }

        return [];
    }

    async getBranchOfficesData(branchOffices) {
        let i, branchOffice;
        let result = [];
        for (i = 0; i < branchOffices.length; i++) {
            branchOffice = await BranchOffice.findById(branchOffices[i]);//.populate('slots');
            result = result.concat(branchOffice);
        }

        return result;
    }

    update(req) {

        return new Promise(async (resolve, reject) => {

            try {
                const branchOffice = await BranchOffice.findById(req.body.id);

                //const { name, address, slots, images, users, schedule, isActive } = req.body

                if (branchOffice) {
                    /* branchOffice.name = name
                     branchOffice.address = address
                     branchOffice.slots = slots
                     branchOffice.images = images
                     branchOffice.users = users
                     branchOffice.schedule = schedule
                     branchOffice.isActive = isActive*/

                    const newBranchOffice = await BranchOffice.findByIdAndUpdate(req.body.id, { ...req.body });

                    resolve({
                        msg: "exito",
                        branchOffice: newBranchOffice
                    });
                } else {
                    reject({ msg: "Usuario no registrado", branchOffice });
                }
            } catch (err) {
                reject({ msg: err });
            }
        });

    }

    addUser(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(body.id);
                const branchOffice = await BranchOffice.findById(body.id);

                const { name, email, password, } = body;

                const user = await User.findOne({ email: email });

                if (!user) {
                    const newUser = new User({
                        name, email, password,
                        role: 2,
                        isActive: true,
                        banns: [],
                        imei: ""
                    });

                    newUser.password = await newUser.encryptPassword(password);
                    //console.log(branchOffice);

                    if (branchOffice) {
                        const user = await newUser.save();
                        branchOffice.users.push(user._id);

                        await branchOffice.save();

                        resolve({
                            msg: "Exito",
                            user
                        });
                    } else {
                        reject({
                            msg: "No existe esa sucursal"
                        });
                    }
                } else {
                    reject({
                        msg: "El correo ya se encuentra registrado"
                    });
                }
            } catch (err) {
                console.error(err);

                reject({
                    msg: "Algo salio mal"
                });
            }
        });
    }

    addSlot(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(body);
                const newSlot = await slotService.createOne(body);

                if (newSlot) {
                    const branchOffice = await BranchOffice.findById(body.branchOfficeId);
                    branchOffice.slots.push(newSlot._id);
                    await branchOffice.save();

                    resolve({
                        msg: "El slot ha sido agregado con exito",
                        newSlot
                    });
                } else {
                    msg: "No se ha podido agregar o crear el slot"
                }
            } catch (err) {
                console.error(err);
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });

    }
}

module.exports = new BranchOfficeService();