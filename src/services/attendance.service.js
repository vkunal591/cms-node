import Attendance from "#models/attendance";
import Service from "#services/base";

class AttendanceService extends Service {
  static Model = Attendance;
}

export default AttendanceService;
