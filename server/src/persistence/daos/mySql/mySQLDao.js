
export default class MySQLDao {
    constructor(model, sequelize) {
        this.model = model;
        this.sequelize = sequelize
    }

    //Crud:
    async create(data) {
        try {
            //const datos= data;
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - create: ' + error);
        }
    }
    async getAll() {
        try {
            const response = await this.model.findAll({});
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - getAll: ' + error);
        }
    }
    async getById(id) {
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - getById: ' + error);
        }
    }
    async update(id, data) {
        try {
            const instance = await this.model.findByPk(id);
            if(!instance){
                throw new Error(`No se encontró el item con id: ${id}`)
            }
            instance.set(data);
            const response = await instance.save();
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - update: ' + error);
        }
    }
    async delete(id) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - delete: ' + error);
        }
    }
    async getByName(name) {
        try {
            const response = await this.model.findOne({
                where: {
                    name: name
                }
            });
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - getByName: ' + error);
        }
    }
}