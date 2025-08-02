import mongoose from "mongoose";
import BaseSchema from "#models/base";


const roleSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true

  },
  access: [{
    _id: false,
    tab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tabs",
      required: true

    },
    permissions: [{
      type: [String],
      enum: ["read", "create", "update", "delete"],
      required: true
    }, ],
  }]


});

export default mongoose.model("Role", roleSchema);