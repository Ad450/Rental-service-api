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
        let usersArray;
        try {
            const users = await this.mongoModel.find().lean();
            return users
                .map((user) => {
                return {
                    id: user._id,
                    name: user.name,
                    password: user.password,
                    email: user.email,
                };
            })
                .toList();
        }
        catch (error) {
            console.log(error);
        }
    }
    retrieveOne(id) {
        throw new Error("Method not implemented.");
    }
}
exports.default = UserDatabaseMongo;
