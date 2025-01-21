
export default class MySQLDao {
    constructor(model) {
        this.model = model;
    }

    //Crud:
    async create(data) {
        try {
            //const datos= data;
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
        }
    }
    async getAll() {
        try {
            const response = await this.model.findAll({});
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
        }
    }
    async getById(id) {
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
        }
    }
    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
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
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
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
            console.error('entró en catch: mySQL - mySQL.dao - create' + error);
        }
    }
}