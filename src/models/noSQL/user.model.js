const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    ownBusiness: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      trim: true,
    },
    role: {
      type: ["user", "admin"],
      default: "admin",
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
