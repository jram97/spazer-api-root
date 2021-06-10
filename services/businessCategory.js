"user strict";

const Category = require("../models/BusinessCategory");
const Feature = require("../models/Feature");
const FeatureService = require("../services/feature");
const ServiceService = require("../services/service");
const { response } = require("express");
const BusinessCategory = require("../models/BusinessCategory");

class BusinessCategoryService {
    constructor() { }

    create(body) {

        return new Promise(async (resolve, reject) => {
            try {
                const category = await this.createOne(body);
                if (category) {
                    resolve({
                        msg: "Exito",
                        category
                    });
                } else {
                    reject({
                        msg: "No se ha podido crear la categoria"
                    });
                }
            } catch (err) {
                console.log(err);
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    async createOne(body) {
        try {
            const { name, isActive, logo } = body;

            const newCategory = new Category({
                name,
                isActive,
                logo
            });

            const category = await newCategory.save();

            return category;
        } catch (err) {
            console.log("Error", err)
            return {};
        }
    }

    addFeature(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const feature = await FeatureService.createOne(body);

                if (feature) {
                    console.log("Si se crea");
                    const category = await BusinessCategory.findOne({ _id: body.categoryId });

                    if (category) {
                        category.features.push(feature._id);

                        await category.save();

                        resolve({
                            msg: "Exito",
                            feature
                        });
                    } else {
                        reject({
                            msg: "No ha encontrado la categoria"
                        })
                    }
                } else {
                    reject({
                        msg: "No se ha podido crear la categoria"
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

    addService(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await BusinessCategory.findById(body.id);

                if (category) {
                    const { name, duration } = body;

                    const service = await ServiceService.createOne(body);

                    if (service) {
                        category.services.push(service._id);
                        await category.save();
                        resolve({
                            msg: `El servicio ${service.name} se ha agregado a la categoria ${category.name}`,
                            service
                        });
                    } else {
                        reject({
                            msg: `No se ha podido agregar el servicio`
                        });
                    }
                } else {
                    reject({
                        msg: "No se ha podido encontrar esa categoria"
                    });
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

    changeState(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const category = await Category.findOne({ _id: params._id });

                if (category) {
                    category.isActive = !category.isActive

                    await category.save();

                    resolve({
                        msg: `${category.name} ha cambiado su estado`,
                        category
                    });
                } else {
                    reject({ data: "Usuario no registrado" });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }

        });
    }

    getAll() {

        return new Promise(async (resolve, reject) => {
            try {
                const all = await Category.find({});

                if (all.length > 0) {
                    resolve({
                        msg: "exito",
                        categories: all
                    });
                } else {
                    reject({
                        msg: "No se han encontrado resultados"
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

    getAllActive() {
        return new Promise(async (resolve, reject) => {
            try {
                const all = await Category.find({ isActive: true });

                if (all.length > 0) {
                    resolve({
                        msg: "exito",
                        categories: all
                    });
                } else {
                    reject({
                        msg: "No se han encontrado resultados"
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
                const category = await Category.findById(params._id);

                if (category) {
                    resolve({
                        msg: "Exito",
                        category
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        category: {}
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
                const category = await Category.findById(req.body.id);
                //const { name, logo } = req.body
                if (category) {
                    /*category.name = name;
                    category.logo = logo;*/

                    const newCategory = await Category.findByIdAndUpdate(req.body.id, { ...req.body });

                    if (newCategory) {
                        resolve({
                            msg: "Exito",
                            category: newCategory
                        });
                    } else {
                        reject({
                            msg: "No se ha podido actualizar el registro",
                            category
                        });
                    }
                } else {
                    reject({
                        msg: "No existe ese registro"
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
}

module.exports = new BusinessCategoryService();