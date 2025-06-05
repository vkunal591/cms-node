import Notification from "#models/notification";
import Service from "#services/base";

class NotificationService extends Service {
  static Model = Notification;
}

export default NotificationService;
