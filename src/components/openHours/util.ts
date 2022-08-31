import { IntToStringWeekday, StringToIntWeekday, OpenHours } from "./Types";

export const openHoursTemplate: OpenHours = {
  "monday": [],
  "tuesday": [],
  "wednesday": [],
  "thursday": [],
  "friday": [],
  "saturday": [],
  "sunday": []
}

export const intWeekdayMap: IntToStringWeekday = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday",
  7: "sunday"
}

export const strWeekdayMap: StringToIntWeekday = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7,
};

export const initcap = (s: string) => {
  return s[0].toUpperCase() + s.substring(1, s.length).toLowerCase();
}

export const isToday = (compareToWeekday: number): boolean => {
  const day: number = new Date().getDay();
  const weekdayNow: number = (day === 0) ? 7 : day;   // sunday 0 and 7
  return (weekdayNow === compareToWeekday);
}

export const secondsToTime = (secondsSinceMidnight: number): string => {

  const secTime = new Date(secondsSinceMidnight * 1000);
  const hours = secTime.getUTCHours();
  const minutes = secTime.getUTCMinutes();
  const ampm = (hours >= 12) ? "PM" : "AM";
  const showHours = ((hours % 12 === 0) ? 12 : hours % 12).toString();
  const showMinutes = (minutes > 0) ? minutes.toString().padStart(2, '0'): ""
  const timeStr = (showHours + " " + showMinutes + " " + ampm).replace(/ +/g, " ")

  return timeStr;
}
