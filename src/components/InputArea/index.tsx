import { useState } from "react";
import * as C from "./styles";
import { Item } from "../../types/Item";

import { categories } from "../../data/categories";
import { newDateAdjusted } from "../../helpers/dateFilter";

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [dateField, setDateField] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [titleField, setTitleField] = useState("");
  const [valueField, setValueField] = useState("");

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if (isNaN(new Date(dateField).getTime())) {
      errors.push("Data inválida!");
    }
    if (!categoryKeys.includes(categoryField)) {
      errors.push("Categoria inválida!");
    }
    if (titleField === "") {
      errors.push("O campo Título está vazio!");
    }
    if (valueField === "" || valueField === "0,00") {
      errors.push("O campo Valor não pode ficar vázio!");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: newDateAdjusted(dateField),
        category: categoryField,
        title: titleField,
        value: sanitarizeCurrency(valueField),
      });
      clearFields();
    }
  };

  const handleKeyDownInMoney = (inputValue: any) => {
    setValueField(formatForMonetary(inputValue));
  };

  const formatForMonetary = (inputValue: any): string => {
    let value = inputValue.replace(/^0+/, "");
    let auxValue = value.replace(/\D/g, "");
    auxValue = (auxValue / 100).toFixed(2) + "";
    auxValue = auxValue.replace(".", ",");
    auxValue = auxValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return auxValue;
  };

  const sanitarizeCurrency = (money: string): number => {
    if (money.indexOf(".") !== -1) {
      return sanitarizeCurrency(money.replace(".", ""));
    }
    return parseFloat(money.replace(",", "."));
  };

  const clearFields = () => {
    setDateField("");
    setCategoryField("");
    setTitleField("");
    setValueField("");
  };

  return (
    <C.Container>
      <C.InputGroup>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input
          type="date"
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        />
      </C.InputGroup>
      <C.InputGroup>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
        >
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </>
        </C.Select>
      </C.InputGroup>
      <C.InputGroup>
        <C.InputTitle>Título</C.InputTitle>
        <C.Input
          type="text"
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
        />
      </C.InputGroup>
      <C.InputGroup>
        <C.InputTitle>Valor</C.InputTitle>
        <C.Input
          type="text"
          value={valueField}
          onChange={(e) => handleKeyDownInMoney(e.target.value)}
        />
      </C.InputGroup>
      <C.InputGroup>
        <C.InputTitle>&nbsp;</C.InputTitle>
        <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
      </C.InputGroup>
    </C.Container>
  );
};
