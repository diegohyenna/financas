import styled from "styled-components";

export const TableLine = styled.tr``;

export const TableColumn = styled.td<{ width?: string; minWidth?: string }>`
  width: ${(props) => (props.width ? `${props.width}` : "auto")};
  padding: 10px 0;
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}` : "auto")};
`;

export const Category = styled.div<{ color: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => props.color};
`;

export const Value = styled.div<{ color: string }>`
  color: ${(props) => props.color};
`;
