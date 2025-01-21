
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
<<<<<<< HEAD
            logger.error('entró en el catch - class.service - getAll: ' + error);
            throw error;
=======
            console.error('entró en el catch - class.service - getAll: ' + error)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

        }
    };
    //busca un item por id específico:
    getById = async (id) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) return false, console.log(`no se encontró item buscado por id ${id}`);
            else return itemSearch;
        } catch (error) {
<<<<<<< HEAD
            logger.error('entró en el catch - class.service - getById: ' + error);
            throw error;
=======
            console.error('entró en el catch - class.service - getById: ' + error)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
        }
    };
    //crea un item:
    create = async (obj) => {
        try {
<<<<<<< HEAD
            console.log('data en service: ' + data)
            const newItem = await this.dao.create(data);
            if (!newItem) {
                throw new Error(`no se pudo crear el item ${data}`);
            }
            return newItem;
        } catch (error) {
            logger.error('entró en el catch - class.service - create: ' + error);
            throw error;
=======
            const newItem = await this.dao.create(obj);
            if (!newItem) return false;
            return newItem;
        } catch (error) {
            console.error('entró en el catch - class.service - create: ' + error)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
        }
    };

    //actualizar un item:
    update = async (id, obj) => {
        try {
            const itemSearch = await this.dao.getById(id);
<<<<<<< HEAD
            if (!itemSearch){
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            const itemUpdate = await this.dao.update(id, data);
            if (!itemUpdate) {
                throw new Error(`no se pudo actualizar el item: ${itemUpdate}`);
            }
            return itemUpdate;
        } catch (error) {
            logger.error('entró en el catch - class.service - update: ' + error);
            throw error;
=======
            if (!itemSearch) return false;
            const itemUpdate = await this.dao.update(id, obj);
            return itemUpdate
        } catch (error) {
            console.error('entró en el catch - class.service - update: ' + error)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
        }
    };
    //borrar un item:
    delete = async (id) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) {
                return false;
            } else {
                const itemDelete = await this.dao.delete(id);
                return itemDelete;
            }
        } catch (error) {
<<<<<<< HEAD
            logger.error('entró en el catch - class.service - delete: ' + error);
            throw error;
=======
            console.error('entró en el catch - class.service - delete: ' + error)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
        }
    }
}