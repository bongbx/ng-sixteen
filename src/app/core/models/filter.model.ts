export interface Filter {
  k: string;
  v: string | Date | number;
  c: string;
}

export interface Time {
  hours: number;
  minutes: number;
}
