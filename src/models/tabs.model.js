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
  route: {
    type: String,
    required: true
  },

  subtabs: [{
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    route: {
      type: String,
      required: true
    },
  }, ],
});

export default mongoose.model("Tabs", tabsSchema);