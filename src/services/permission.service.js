import Permission from "#models/permission";
import Service from "#services/base";

class PermissionService extends Service {
  static Model = Permission;
}

export default PermissionService;