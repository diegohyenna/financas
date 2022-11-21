import * as C from "./styles";
import { Item } from "../../types/Item";
import { formatDate } from "../../helpers/dateFilter";
import { categories } from "../../data/categories";

type Props = {
  item: Item;
};

export const TableItem = ({ item }: Props) => {
  return (
    <C.TableLine>
      <C.TableColumn width={"30%"} minWidth={"100px"}>
        {formatDate(item.date)}
      </C.TableColumn>
      <C.TableColumn width={"20%"} minWidth={"100px"}>
        <C.Category color={categories[item.category].color}>
          {categories[item.category].title}
        </C.Category>
      </C.TableColumn>
      <C.TableColumn width={"30%"} minWidth={"120px"}>
        {item.title}
      </C.TableColumn>
      <C.TableColumn width={"20%"} minWidth={"100px"}>
        <C.Value color={categories[item.category].expense ? "red" : "green"}>
          R$ {item.value}
        </C.Value>
      </C.TableColumn>
    </C.TableLine>
  );
};
