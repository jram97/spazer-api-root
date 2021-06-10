"user strict";

const Role = require("../models/Role");

class RoleService {
    constructor(){}

    create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, code } = body;

                const newRole = new Role({
                    name,
                    code
                });

                const role = await newRole.save();

                if (role) {
                    resolve({
                        msg: "El rol se ha insertado con exito",
                        role
                    });
                } else {
                    reject({
                        msg: "No se ha podido insertar el rol"
                    });
                }

            } catch (err) {
                reject({
                    msg: "Algo salio mal"
                });
            }
        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const all = await Role.find({});

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        roles: all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        roles: {}
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

module.exports = new RoleService();