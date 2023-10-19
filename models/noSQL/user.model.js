const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
UserSchema.index({ email: 1 });
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongoosePaginateAggregate);
UserSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model("User", UserSchema);
