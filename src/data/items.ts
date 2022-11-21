import { addOnDate, subtractOnDate } from "../helpers/dateFilter";
import { Item } from "../types/Item";

export const items: Item[] = [
  {
    date: addOnDate(new Date(Date.now()), "day", 1),
    category: "food",
    title: "McDonalds",
    value: 32.12,
  },
  {
    date: addOnDate(new Date(Date.now()), "day", 2),
    category: "food",
    title: "Burger King",
    value: 28,
  },
  {
    date: addOnDate(new Date(Date.now()), "day", 2),
    category: "rent",
    title: "Aluguel Apt",
    value: 2300,
  },
  {
    date: addOnDate(new Date(Date.now()), "day", 5),
    category: "salary",
    title: "Salário ACME",
    value: 4500,
  },
  {
    date: subtractOnDate(new Date(Date.now()), "day", 5),
    category: "food",
    title: "ifood",
    value: 567.98,
  },
  {
    date: addOnDate(new Date(Date.now()), "month", 1),
    category: "salary",
    title: "Salário ACME",
    value: 4500,
  },
];
