import { Model, Schema } from "mongoose";
import { Database, UserType } from "../db_interface";
import { UserModel, MongoUser } from "./mongo_db_setup";

export default class UserDatabaseMongo
  implements Database<UserType, MongoUser>
{
  mongoModel: typeof UserModel;
  constructor(mongoModel: typeof UserModel) {
    this.mongoModel = mongoModel;
  }

  async create<T extends UserType>(param: T): Promise<void> {
    const { name, password, email } = param;
    try {
      await this.mongoModel.create({
        name: name,
        password: password,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async update<T extends UserType>(param: T): Promise<void> {
    const { name, password, email } = param;
    try {
      await this.mongoModel.updateOne(
        { email: email },
        { email: email, name: name, password: password }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async delete<T extends UserType>(param: T): Promise<void> {
    const { name, password, email } = param;
    try {
      await this.mongoModel.deleteOne({ email: email });
    } catch (error) {
      console.log(error);
    }
  }
  async retrieve(): Promise<MongoUser[] | null> {
    let usersArray: MongoUser[] = [];
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
    } catch (error) {
      console.log(error);
      throw new Error("mongo user retrieval failed");
    }
  }
  async retrieveOne(id: string | number): Promise<MongoUser | null> {
    try {
      const user = await this.mongoModel.findOne({ email: id }).lean();

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("mongo user retrieval failed");
    }
  }
}
