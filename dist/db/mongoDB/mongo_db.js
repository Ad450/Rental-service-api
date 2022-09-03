"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDatabaseMongo {
    constructor(mongoModel) {
        this.mongoModel = mongoModel;
    }
    async create(param) {
        const { name, password, email } = param;
        try {
            await this.mongoModel.create({
                name: name,
                password: password,
                email: email,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(param) {
        const { name, password, email } = param;
        try {
            await this.mongoModel.updateOne({ email: email }, { email: email, name: name, password: password });
        }
        catch (error) {
            console.log(error);
        }
    }
    async delete(param) {
        const { name, password, email } = param;
        try {
            await this.mongoModel.deleteOne({ email: email });
        }
        catch (error) {
            console.log(error);
        }
    }
    async retrieve() {
        let usersArray = [];
        try {
            const users = await this.mongoModel.find().lean();
            users.forEach((user) => {
                usersArray.push({
                    name: user.name,
                    password: user.password,
                    email: user.email,
                });
            });
            return usersArray;
        }
        catch (error) {
            console.log(error);
            throw new Error("mongo user retrieval failed");
        }
    }
    async retrieveOne(id) {
        try {
            const user = await this.mongoModel.findOne({ email: id }).lean();
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("mongo user retrieval failed");
        }
    }
}
exports.default = UserDatabaseMongo;
