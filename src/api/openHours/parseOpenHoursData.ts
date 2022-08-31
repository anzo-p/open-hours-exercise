import cloneDeep from 'lodash/cloneDeep';

import input from "../../inputFiles/openHours/input-messy.json";

import {
  ExpectedInputFormat, OpenHours,
  ArrayTimeEntries
} from '../../components/openHours/Types';

import {
  openHoursTemplate,
  strWeekdayMap, intWeekdayMap
} from '../../components/openHours/util'

const oneDay: number = 60 * 60 * 24;
const minTime: number = 0;
const maxTime: number = oneDay - 1;

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

const intoSortedArrayOfEntries = (input: ExpectedInputFormat): ArrayTimeEntries => {
  var result: ArrayTimeEntries = [];

  Object.entries(input).forEach(intraday => {
    const day = intraday[0];
    const entries = intraday[1];

    entries.forEach(entry => {
      const timestamp = entry['value'] + (oneDay * strWeekdayMap[day]);
      const event = entry['type'];
      result.push([timestamp, event]);
    })
  })

  return result.sort((a, b) => { return a[0] - b[0] });
}

const removeDuplicateTimestamps = (input: ArrayTimeEntries): ArrayTimeEntries => {
  let prevEntry = input[0];
  let result: ArrayTimeEntries = [prevEntry];

  input.slice(1).forEach(entry => {
    if (entry[0] !== prevEntry[0]) {
      result.push(entry);
      prevEntry = entry;
    }
  });

  return result;
}

const removeOrphanEvents = (input: ArrayTimeEntries): ArrayTimeEntries => {
  let prevEntry = input[0];
  let result: ArrayTimeEntries = [prevEntry];

  input.slice(1).forEach(entry => {
    if (entry[1] !== prevEntry[1]) {
      result.push(entry);
      prevEntry = entry;
    }
  });

  return result;
}

const weeklyOverflowFix = (input: ArrayTimeEntries): ArrayTimeEntries => {
  const firstEventOfWeek = input[0][1];
  const lastEventOfWeek = input[input.length -1][1];

  if (lastEventOfWeek === 'open' && firstEventOfWeek === 'close') {
    const [first, ...rest] = input;
    let lastDay = intWeekdayMap[Math.floor(rest[rest.length - 1][0] / oneDay)]
    let adjusted: [string, string] = [strWeekdayMap[lastDay] * oneDay + first[0], first[1]]
    return [...rest, adjusted];
  } else {
    return input;
  }
}

const intoOpenHoursObject = (input: ArrayTimeEntries): OpenHours => {
  const result = cloneDeep(openHoursTemplate);
  let weekday = '';
  let openTime: number;
  let closeTime: number;

  input.forEach(entry => {
    if (entry[1] === 'open') {
      weekday = intWeekdayMap[Math.floor(entry[0] / oneDay)]
      openTime = entry[0]
    } else {
      // assume closing for the same day, will fix daily overflow
      closeTime = entry[0];
      result[weekday].push([openTime, closeTime]);
    }
  })

  return result;
}

export const loadParseOpenHours = () => {
  const inputData: ExpectedInputFormat = onlyLegitEntries(input);
  //console.log('initial input', inputData)

  const arrayOfEntries: ArrayTimeEntries = intoSortedArrayOfEntries(inputData)
  //console.log('into array', arrayOfEntries)

  const deduped: ArrayTimeEntries = removeDuplicateTimestamps(arrayOfEntries);
  //console.log('deduped', dedupedEntries);

  const guaranteedAlternating: ArrayTimeEntries = removeOrphanEvents(deduped);
  //console.log('alternating', guaranteedAlternating);
  
  const weekyFixed: ArrayTimeEntries = weeklyOverflowFix(guaranteedAlternating);
  //console.log('weekly fixed', weekyFixed)

  const openHoursObject: OpenHours = intoOpenHoursObject(weekyFixed);
  //console.log('final object', openHoursObject)

  return openHoursObject;
}
