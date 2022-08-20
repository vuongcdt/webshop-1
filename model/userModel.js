const { default: mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         trim: true,
         required: [true, "Invalid Email"],
         minlength: [8, "Name can not be less than 8 characters"],
         maxlength: [50, "Name can not be more than 50 characters"],
         validate: {
            validator: function (email) {
               return isEmail(email, { allow_utf8_local_part: false });
            },
            message: "Invalid Email",
         },
      },
      password: {
         type: String,
         trim: true,
         required: [true, "Invalid Password"],
         minlength: [8, "Name can not be less than 8 characters"],
         maxlength: [50, "Name can not be more than 50 characters"],
         validate: {
            validator: (password) => {
               return /^(?=\S*[a-z]|\d)(?=\S*[A-Z])(?=\S*[^\w\s])\S{8,}$/.test(password);
            },
            message: "A password containing at least 1 uppercase, 1 lowercase, 1 special character",
         },
      },
      salt: { type: String, required: true },
      hashedPassword: { type: String, required: true },
   },
   { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
