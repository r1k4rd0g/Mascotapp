
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
            console.error('entró en el catch - class.service - getAll: ' + error)

        }
    };
    //busca un item por id específico:
    getById = async (id) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) return false, console.log(`no se encontró item buscado por id ${id}`);
            else return itemSearch;
        } catch (error) {
            console.error('entró en el catch - class.service - getById: ' + error)
        }
    };
    //crea un item:
    create = async (obj) => {
        try {
            const newItem = await this.dao.create(obj);
            if (!newItem) return false;
            return newItem;
        } catch (error) {
            console.error('entró en el catch - class.service - create: ' + error)
        }
    };

    //actualizar un item:
    update = async (id, obj) => {
        try {
            const itemSearch = await this.dao.getById(id);
            if (!itemSearch) return false;
            const itemUpdate = await this.dao.update(id, obj);
            return itemUpdate
        } catch (error) {
            console.error('entró en el catch - class.service - update: ' + error)
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
            console.error('entró en el catch - class.service - delete: ' + error)
        }
    }
}