import Task from "#models/task";
import Service from "#services/base";

class TaskService extends Service {
  static Model = Task;
}

export default TaskService;
