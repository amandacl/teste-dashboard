import { Column } from "@tanstack/react-table";
import { SearchInput } from "./search-input";

export function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  switch (filterVariant) {
    case "range":
      return (
        <div>
          <div className="flex space-x-2">
            <SearchInput
              type="number"
              value={(columnFilterValue as [number, number])?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  value,
                  old?.[1],
                ])
              }
              placeholder={`Min`}
              className="w-20 border shadow rounded h-8 px-2"
            />
            <SearchInput
              type="number"
              value={(columnFilterValue as [number, number])?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  value,
                ])
              }
              placeholder={`Max`}
              className="w-20 border shadow rounded h-8 px-2"
            />
          </div>
          <div className="h-1" />
        </div>
      );
    case "date":
      return (
        <input
          className="w-36 h-8 border px-2 rounded"
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Buscar...`}
          type="date"
          value={(columnFilterValue ?? "") as string}
        />        
      );
    case "text":
      return (
        <SearchInput
          className="w-36 h-8 border px-2 rounded"
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Buscar...`}
          type="text"
          value={(columnFilterValue ?? "") as string}
        />
      );
    default:
      return <></>;
  }
}
