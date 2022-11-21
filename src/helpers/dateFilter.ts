import { Item } from "../types/Item";
import dayjs from "dayjs";

export const getCurrentMonth = () => {
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const filterListByMonth = (list: Item[], date: string): Item[] => {
  let newList: Item[] = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    if (
      list[i].date.getFullYear() === parseInt(year) &&
      list[i].date.getMonth() + 1 === parseInt(month)
    ) {
      newList.push(list[i]);
    }
  }

  return ascendingSortedList(newList);
};

const ascendingSortedList = (list: Item[]): Item[] => {
  return list.sort((a: Item, b: Item) => {
    if (dayjs(a.date).isBefore(dayjs(b.date))) {
      return -1;
    } else {
      return +1;
    }
  });
};

export const formatDate = (date: Date): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
};
const addZeroToDate = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const formatCurrentMonth = (currentMonth: string): string => {
  let [year, month] = currentMonth.split("-");
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[parseInt(month) - 1]} de ${year}`;
};

export const newDateAdjusted = (dateField: string) => {
  let [year, month, day] = dateField.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export const addOnDate = (date: Date, operator: string, unit: number) => {
  let operatorConstants = [
    "day",
    "month",
    "quarter",
    "year",
    "hour",
    "minute",
    "second",
    "millisecond",
    "week",
  ];

  let operatorSelected = (operatorConstants.find((op) => op === operator) ||
    operator) as any;
  return dayjs(date).add(unit, operatorSelected).toDate();
};

export const subtractOnDate = (date: Date, operator: string, unit: number) => {
  let operatorConstants = [
    "day",
    "month",
    "quarter",
    "year",
    "hour",
    "minute",
    "second",
    "millisecond",
    "week",
  ];

  let operatorSelected = (operatorConstants.find((op) => op === operator) ||
    operator) as any;
  return dayjs(date).subtract(unit, operatorSelected).toDate();
};
