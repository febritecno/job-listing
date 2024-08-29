import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        phone: {
            type: Number,
            required: false,
        },
    }, { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;