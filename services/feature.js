"user strict";

    const Feature = require("../models/Feature");
    const BusinessCategory = require("../models/BusinessCategory");

class FeatureService {
    constructor() { }

    create(body) {

        return new Promise(async (resolve, reject) => {
            try {
                const feature = await this.createOne(body);

                if (feature) {
                    resolve({
                        msg: "Exito",
                        feature
                    });
                } else {
                    reject({
                        msg: "No se ha podido crear"
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
            const { name, description, icon, iconSource, detail } = body;

            const newFeature = new Feature({
                name,
                description,
                icon,
                iconSource,
                detail
            })

            const feature = await newFeature.save();

            return feature;
        } catch (err) {
            console.log("Error", err);
            return {err};
        }
    }

    /*async createMany(features) {

        try {
            const retorno = await Feature.collection.insertMany(features);
            return retorno.ops

        } catch (err) {
            reject({ err });
        }

    }*/

    /*changeState(req) {

        return new Promise(async (resolve, reject) => {
            try {

            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }

        });
    };*/

    getAll() {

        return new Promise(async (resolve, reject) => {
            try {
                const all = await Feature.find({});

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        features: all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados"
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
                const feature = await Feature.findById(params._id);

                if (feature) {
                    resolve({
                        msg: "Exito",
                        feature
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados"
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

    getByCategoryId(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const general= await BusinessCategory.findOne({name: "General"}).populate('features');
                const category = await BusinessCategory.findById(params._id).populate('features');

                var result = [];

                if(general.features.length > 0 || category.features.length > 0){
                    result = result.concat(general.features);
                    result = result.concat(category.features);

                    resolve({
                        msg: "Exito",
                        features: result
                    });
                }else{
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

    update(req) {

        return new Promise(async (resolve, reject) => {
            try {
                const feature = await Feature.findById(req.body.id);

                if (feature) {
                    /*const { name, description, icon, detail } = req.body;

                    feature.name = name;
                    feature.description = description;
                    feature.icon = icon;
                    feature.iconSource = iconSource;
                    feature.detail = detail;*/

                    const newFeature = await Feature.findByIdAndUpdate(req.body.id,{...req.body});;

                    if (newFeature) {
                        resolve({
                            msg: `${feature.name} ha sido guardado con exito`,
                            newFeature
                        });
                    } else {
                        reject({
                            msg: `No se ha podido guardar ${feature.name}`
                        });
                    }
                } else {
                    reject({
                        msg: "No se ha encontrado ese registro"
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

    delete(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const feature = await Feature.deleteOne({ _id: params._id });

                if (feature) {
                    resolve({
                        msg: `${feature.name} ha sido borrado con exito`
                    });
                } else {
                    reject({
                        msg: `No se ha podido borrar ${feature.name}`
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

module.exports = new FeatureService();