import cloneDeep from 'lodash/cloneDeep';

import input from "../../inputFiles/openHours/input-messy.json";

import {
  ExpectedInputFormat,
  TypeToTimeEntry, TimeToTypeEntry,
  ArrayTimeEntries
} from '../../components/openHours/Types';

import {
  openHoursTemplate,
  strWeekdayMap, intWeekdayMap
} from '../../components/openHours/util'

const oneDay: number = 60 * 60 * 24;
const minTime: number = 0;
const maxTime: number = 86399;

export const onlyLegitEntries = (externalInput: any): ExpectedInputFormat => {
  const inputData: ExpectedInputFormat = {};
  for (const key of Object.keys(openHoursTemplate)) {
    if (key in externalInput) {
      for (const entry of Object.values(externalInput[key])) {
        if (entry instanceof Object) {
          if ("type" in entry && "value" in entry) {
            if (["open", "close"].includes(entry["type"])) {
              if (Number(entry["value"]) >= minTime && Number(entry["value"]) <= maxTime) {
                if (key in inputData) {
                  inputData[key].push(entry);
                } else {
                  inputData[key] = [entry];
                }
              }
            }
          }
        }
      }
    }
    if (!(key in inputData)) {
      inputData[key] = [];
    }
  }
  return inputData;
}

export const loadParseOpenHours = () => {

  const entryObjectToArray = (entryObject: TimeToTypeEntry): ArrayTimeEntries => {
    return Object.entries(entryObject).sort((a, b): number => {
      return Number(a) - Number(b);
    })
  }

  const inputData: ExpectedInputFormat = onlyLegitEntries(input);
  // a hash from weekdays to arrays of time entry objects
  //console.log("inputData", inputData)

  const timeToTypeEntries: TimeToTypeEntry = {};
  var timeEntries: ArrayTimeEntries = [];
  const openHoursObject = cloneDeep(openHoursTemplate);

  // dedups entries over weekday and time - goes into same hashing key
  for (const [day, ix] of Object.entries(strWeekdayMap)) {
    inputData[day].forEach((time: TypeToTimeEntry) => {
      //console.log(day, ix, time)
      const key = time.value + (ix * oneDay);
      timeToTypeEntries[key] = time.type;
    })
  }
  //console.log("timeTabObj", timeToTypeEntries)

  timeEntries = entryObjectToArray(timeToTypeEntries);
  //console.log("timeEntries", timeEntries)

  // dedup entries over type: double opening? take earlier, double closing? latter
  var prevEntry = timeEntries[0];
  for (var i: number = 1; i < timeEntries.length; i++) {
    const currEntry = timeEntries[i];

    if (prevEntry[1] === currEntry[1]) {
      switch (prevEntry[1]) {
        case "open": delete timeToTypeEntries[Number(currEntry[0])]; break;
        case "close": delete timeToTypeEntries[Number(prevEntry[0])]; break;
      }
      // after this the entries are guaranteed to alternate in open-close pairs
    }
    prevEntry = currEntry;
  }
  // console.log("timeTabObj", timeToTypeEntries);

  timeEntries = entryObjectToArray(timeToTypeEntries);
  // console.log("timeEntries", timeEntries)

  // handle week overflow: eg. open: sunday - close: monday
  if (timeEntries.find(elem => elem[1] === "open")) {
    // as already deduped, expecting only 0..1 close entry @beginning
    while (timeEntries[0][1] === "close") {
      const [first, ...rest] = timeEntries;
      timeEntries = [...rest, first];
    }
  }
  //console.log("timeEntries", timeEntries)

  // handle midnight overflow, assure to open-close on the same day
  for (var prev: number = 0, curr: number = 1; prev < timeEntries.length; prev += 2, curr += 2) {
    const prevEntry = timeEntries[prev];
    const currEntry = timeEntries[curr];

    // omit entire time entry unless both open-close checks out
    if (currEntry) {
      //console.log(currEntry)
      const openDay: number = Math.floor(Number(prevEntry[0]) / oneDay);
      const closeDay: number = Math.floor(Number(currEntry[0]) / oneDay);
      const openTime: number = Number(prevEntry[0]) - (openDay * oneDay);
      const closeTime: number = Number(currEntry[0]) - (closeDay * oneDay);

      const key = intWeekdayMap[openDay];
      const value = [openTime, closeTime];
      openHoursObject[key].push(value);
    }
  }

  return openHoursObject;
}
