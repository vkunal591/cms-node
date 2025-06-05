import Branch from "#models/branch";
import Service from "#services/base";

class BranchService extends Service {
  static Model = Branch;
}

export default BranchService;
