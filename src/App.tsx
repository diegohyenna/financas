import { useState, useEffect } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
import { categories } from "./data/categories";

import {
  filterListByMonth,
  getCurrentMountAndYear,
} from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/InputArea";
import { formatForMonetary } from "./helpers/money";
import { getItems } from "./services/api";

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(
    getCurrentMountAndYear()
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getItems().then((result) => {
      setList(result.items);
    });
  }, []);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonthAndYear));
  }, [list, currentMonthAndYear]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount = formatForMonetary(expenseCount + filteredList[i].value);
      } else {
        incomeCount = formatForMonetary(incomeCount + filteredList[i].value);
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonthAndYear(newMonth);
  };

  const handleAddItem = (item: Item) => {
    getItems().then((result) => {
      let newList = [...result.items];
      newList.push(item);
      setList(newList);
    });
  };

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonthAndYear}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
};

export default App;
