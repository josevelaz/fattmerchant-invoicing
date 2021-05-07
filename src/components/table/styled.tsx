import styled from "styled-components";

export const DataViewTable = styled.table`
  border-spacing: 0;
  border: solid 1px #d2d6dd;
  border-radius: 14px;
  width: 100%;
  border-collapse: separate;
  overflow: hidden;
  thead {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 900;
    text-align: left;
    color: #6b7280;
    background-color: #f9fafb;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  tbody {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
`;
