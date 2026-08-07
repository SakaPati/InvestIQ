import { createSlice } from "@reduxjs/toolkit";

export type Years = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026;

interface CalendarState {
  year: number;
  month: number;
}

export interface RootState {
  monthCalendar: CalendarState;
}

export const ukrainianMonths: string[] = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];

const initialState: CalendarState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

export const monthSlice = createSlice({
  name: "monthCalendar",
  initialState,
  reducers: {
    nextMonth: (state) => {
      state.month++;
      if (state.month > 11) {
        state.month = 0;
        state.year++;
      }
    },
    prevMonth: (state) => {
      state.month--;
      if (state.month < 0) {
        state.month = 11;
        state.year--;
      }
    },
  },
});

export const selectFormattedMonth = (state: RootState): string => {
  const { year, month } = state.monthCalendar;
  const monthName = ukrainianMonths[month];
  return `${monthName}\n${year}`;
};

export const selectYear = (state: RootState): number => state.monthCalendar.year;
export const selectMonth = (state: RootState): number => state.monthCalendar.month;

export const { nextMonth, prevMonth } = monthSlice.actions;
export default monthSlice.reducer;
