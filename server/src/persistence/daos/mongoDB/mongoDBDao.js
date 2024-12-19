

export default class MongoDBDao {
    constructor(model){
        this.model = model
    }

    //Crud:
    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - mongoDB.dao - create' + error)
        }
    }
    async getAll(){
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - mongoDB.dao - create' + error)
        }
    }
    async getById(id){
        try {
            const response = await this.model.findById(id);
            return response
        } catch (error) {
            console.error('entró en catch: mongoDB - mongoDB.dao - create' + error)
        }
    }
    async update(id, data){
        try {
            const response = await this.model.updateOne({_id: id}, data);
            return response
        } catch (error) {
            console.error('entró en catch: mongoDB - mongoDB.dao - create' + error)
        }
    }
    async delete (id){
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response
        } catch (error) {
            console.error('entró en catch: mongoDB - mongoDB.dao - create' + error)
        }
    }
}