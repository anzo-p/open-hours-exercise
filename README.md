## Usage

This App takes the file `input.json` from folder `/src/inputFiles/openHours/` into a timetable view of open-close times for a service

- Go to /src/inputFiles/openHours

- Edit the input.json file - sample files exists from which you may copy the content

- Launch the App into dev mode with `yarn install` then `yarn start` (in production we would have a file upload page which would then trigger required effects)

- Edit mockdata entries and see the changes being renderd into the App

- The width of the card expands to accommodate minutes, if applicable

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

---

## Corner cases

Below is map of the 'illegal' and 'funny' entries in the `input-messy.json`

We do not want the App to crash easily, but instead to show whatever it can and let the User experiment in a feedback loop, while getting familiar with how the file's structure and content becomes the information shown on the Card View.

A list of handled corner cases when parsin the JSON
- various illegal keys/values
- content is missing, such as weekday or its values
- time entries have failed weekdays
- intraday time entries are not ordered
- daily overflow - open-close over midnight
- week overflow, ie. daily overflow over weekend
- duplicate time entries for the same date, type, and time
- consecutive entries (after sorting) have duplicate type, eg. close-close
- time entry as sedconds past midnight does not fit into a day

```
export const mockdata: any = {
  "mdonya": [                              // key violation
    { "type": "close", "value": 6000 }
  ],
  "monday": [
    { "type": "close", "value": 6000 }     // week overflow
  ],
  "tuesday": [
    { "type": "close", "value": 64800 },   // failed ordering
    { "type": "open", "value": 36000 },
    { "type": "close", "value": 40001 },   // unexpected precision on value
    { "type": "close", "value": 50000 },   // duplicate consecutive type
    { "type": "open", "value": 60000 },
    
    { "tpy": "close", "value": 40000 },    // key and value violations
    { "type": "colace", "value": 40000 },
    { "type": "close", "vaule": 50000 },
    { "type": "close", "value": -1 },
    { "type": "close", "value": 900000 },
    { "type": "close", "value": "@@@" },
    { "type": 123456, "value": 10000 },
    { "type": "open", "value": [1,2] },
    { "oops": 123, "foo": "bar" },
    {}
  ],
  "wednesday": [],                         // no entries
  "friday": [                              // missing weekday
    { "type": "open", "value": 36000 },
    { "type": "open", "value": 36000 },    // full duplicate
    { "type": "open", "value": 40000 }
  ],
  "saturday": [
    { "type": "close", "value": 3600 },    // midnight overflow
    { "type": "open", "value": 36000 }
  ],
  "sunday": [
    { "type": "close", "value": 3600 },    // midnight overflow both ways
    { "type": "open", "value": 43200 },
    { "type": "open", "value": 43200 },
    { "type": "close", "value": 75600 },
    { "type": "open", "value": 85950 }
  ]
}
```
