export type IntToStringWeekday = {
  [key: number]: string
};

export type StringToIntWeekday = {
  [key: string]: number
};

export type ExpectedInputFormat = {
  [key: string]: TypeToTimeEntry[]
};

export type ArrayTimeEntries = [int, string][];

export type OpenHours = {
  [key: string]: number[][]
};
