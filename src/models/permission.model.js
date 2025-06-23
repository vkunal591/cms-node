  import mongoose from "mongoose";
  import BaseSchema from "#models/base";


  const permissionSchema = new BaseSchema({
    name: { type: String, required: true },
    route: { type: String, required: true},
    action: { type: String, enum: ["read", "create", "update", "delete"], required: true },
    label: String,     // e.g., 'View Users'
    group: String,     // e.g., 'User Management'
  });


  export default mongoose.model("Permission", permissionSchema);