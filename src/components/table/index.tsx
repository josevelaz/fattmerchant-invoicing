import React, { ReactNode } from "react";
import { DataViewTable } from "./styled";
type Column = {
  key: string;
  label?: string;
  component?: ReactNode;
  classes: string;
  formatter?: () => any;
};

interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table: React.FC<TableProps> = props => {
  const { columns, data } = props;
  return (
    <DataViewTable>
      <thead>
        <tr>
          {columns.map(col => (
            <th className={col.classes}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr>
            {columns.map(col => (
              <td className={col.classes}>{d[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </DataViewTable>
  );
};
