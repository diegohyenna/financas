import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;
  display: block;
  overflow: auto;
`;

export const TableHeadColumn = styled.th<{ width?: string }>`
  width: ${(props) => (props.width ? `${props.width}` : "auto")};
  padding: 10px 0;
  text-align: left;
`;
