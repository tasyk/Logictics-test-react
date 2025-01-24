


interface MenuItem {
  title: string;
  url: string;
}

interface Activity {
  startTime: string;
  type: string;
  duration: number;
}

interface Trace {
  date: string;
  activity: Activity[];
}

interface Driver {
  driverID: number;
  surname: string;
  forename: string;
  vehicleRegistration: string;
  traces: Trace[];
}