import mongoose from "mongoose";
import BaseSchema from "#models/base";


const roleSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true

  },
  access: [{
    tab: { type: mongoose.Schema.Types.ObjectId, ref: "Tabs", required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
  }]


});

export default mongoose.model("Role", roleSchema);