const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, },
});

userSchema.index({username},{
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model("User", userSchema);

module.exports = User;
