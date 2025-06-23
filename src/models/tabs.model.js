import mongoose from "mongoose";
import BaseSchema from "#models/base";



const tabsSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission"
  }],

});

export default mongoose.model("Tabs", tabsSchema);