const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");

const StorageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" });
StorageSchema.plugin(mongoosePaginateAggregate);
StorageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Storage", StorageSchema);
