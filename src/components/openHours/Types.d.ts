export type IntToStringWeekday = {
  [key: number]: string
};

export type StringToIntWeekday = {
  [key: string]: number
};

export type TypeToTimeEntry = {
  type: string;
  value: number;
};

export type TimeToTypeEntry = {
  [key: number]: string
};

export type ExpectedInputFormat = {
  [key: string]: TypeToTimeEntry[]
};

export type ArrayTimeEntries = [string, string][];

export type OpenHours = {
  [key: string]: number[][]
};
