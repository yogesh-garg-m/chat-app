const {Schema, model} = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    gender:{
        type: String,
        enum: ["male", "female"],
        required: true
    },
    profilePic:{
        type: String,
        default: ""
    },
    salt :{
        type: String,
    },

},{timestamps:true});

userSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified()) return;
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(13);
        user.salt = salt;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
})

const User = model("User", userSchema);

module.exports = User;