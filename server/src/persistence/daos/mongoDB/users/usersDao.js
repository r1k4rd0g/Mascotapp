import { UserModel } from "./usersModel.js";
import MongoDBDao from "../mongoDBDao.js";



export default class UserMongoDBDao extends MongoDBDao {
    constructor() {
        super(UserModel);
    }
    async create(data) {
        try {
            const response = await UserModel.create(data);
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - users - users.dao - create' + error)
        }
    }
    async create(data) {
        try {
            const response = await UserModel.create(data);
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - users - users.dao - create' + error)
        }
    }
    async userSearch({ email, password }) {
        try {
            const response = await UserModel.findOne({ email, password });
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - users - users.dao - userSearch' + error)
        }
    }
    async searchByEmail(email) {
        try {
            const response = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
            return response;
        } catch (error) {
            console.error('entró en catch: mongoDB - users - users.dao - searchByEmail' + error)
        }
    }
}