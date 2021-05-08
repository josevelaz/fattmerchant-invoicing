import React, { ReactNode } from "react";
import { DataViewTable } from "./styled";
export type Column<T = any> = {
  key: string;
  label?: string;
  classes?: string;
  formatter?: (v: T) => string | ReactNode;
};

interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table: React.FC<TableProps> = (props) => {
  const { columns, data } = props;

  return (
    <DataViewTable className="shadow">
      <thead>
        <tr>
          {columns.map((col) => (
            <th className={col.classes}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr className="py-2">
            {columns.map((col) => (
              <td className={`px-2  ${col.classes}`}>
                {col.formatter ? col.formatter(d[col.key]) : d[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DataViewTable>
  );
};
