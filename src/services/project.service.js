import Project from "#models/project";
import Service from "#services/base";

class ProjectService extends Service {
  static Model = Project;
}

export default ProjectService;
