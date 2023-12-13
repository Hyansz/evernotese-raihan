import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    token: {
      type: String,
      default:'',
    },
  });

  let userModel;
  // fix overwrite user
  if (mongoose.models.Users) {
    userModel = mongoose.model('Users');
  } else {
    userModel = mongoose.model('Users', userSchema);
  }

export default userModel