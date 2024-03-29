import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  startDate: {
    type: String, // will be update to Date type
    required: false,
  },
  endDate: {
    type: String, // will be update to Date type
    required: false,
  },
  isRented: {
    type: Boolean,
    required: true,
  },
  rentedBy: {
    type: String,
    required: true,
  },
});

export const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

export const BookModel = mongoose.model("Book", bookSchema);
export const UserModel = mongoose.model("User", userSchema);

export interface MongoUser {
  email: string;
  name: string;
  password: string;
}
