import logger from "../utils/logger/loggerWinston.js";

export default class Services {
    constructor(dao) {
        this.dao = dao;
    }
    //funciones simples:

    //busca todos los items:
    getAll = async () => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            logger.error('entró en el catch - class.service - getAll: ' + error)

        }
    };
    //busca un item por id específico:
    getById = async (id) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - class.service - getById: ' + error)
        }
    };
    //crea un item:
    create = async (data) => {
        try {
            const newItem = await this.dao.create(data);
            if (!newItem) {
                throw new Error(`no se pudo crear el item ${data}`)
            }
            return newItem;
        } catch (error) {
            logger.error('entró en el catch - class.service - create: ' + error)
        }
    };

    //actualizar un item:
    update = async (id, data) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch){
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            const itemUpdate = await this.dao.update(id, data);
            if (!itemUpdate) {
                throw new Error(`no se pudo actualizar el item: ${itemUpdate}`);
            }
            return itemUpdate
        } catch (error) {
            logger.error('entró en el catch - class.service - update: ' + error)
        }
    };
    //borrar un item:
    delete = async (id) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            } else {
                const itemDelete = await this.dao.delete(id);
                return itemDelete;
            }
        } catch (error) {
            logger.error('entró en el catch - class.service - delete: ' + error)
        }
    }
}