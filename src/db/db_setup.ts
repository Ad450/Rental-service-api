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
        required: true
    }
})

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
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    isRented: {
        type: Boolean,
        required: true,
    },
    rentedBy: {
        type: String,
        required: true
    },
})

export const BookModel = mongoose.model("Book", bookSchema)
export const UserModel = mongoose.model("User", userSchema);