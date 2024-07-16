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
              className="w-20 border shadow rounded h-8"
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
              className="w-20 border shadow rounded h-8"
            />
          </div>
          <div className="h-1" />
        </div>
      );
    case "date":
      return (
        <input
          className="w-36 h-8 border  rounded"
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Buscar...`}
          type="date"
          value={(columnFilterValue ?? "") as string}
        />
      );

      return (
        <select
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue?.toString()}
        >
          <option value="">All</option>
          <option value="complicated">complicated</option>
          <option value="relationship">relationship</option>
          <option value="single">single</option>
        </select>
      );
    case "text":
      return (
        <SearchInput
          className="w-36 h-8 border  rounded"
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
