import Company from "#models/company";
import Service from "#services/base";

class CompanyService extends Service {
  static Model = Company;
}

export default CompanyService;
