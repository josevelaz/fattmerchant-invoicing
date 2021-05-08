import styled from "styled-components";

export const DataViewTable = styled.table`
  border-spacing: 0;
  border: solid 1px #d2d6dd;
  border-radius: 10px;
  width: 100%;
  border-collapse: separate;

  thead {
    font-size: 14px;
    height: 3rem;
    text-align: left;
    color: #5f5f5f;
    background-color: #f9fafb;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }

  tbody {
    display: flex;
    flex-direction: column;

    tr {
      transition: all 0.25s ease-in-out;
      &:hover {
        background-color: rgba(237, 237, 237, 0.2);
      }
    }
  }
`;
