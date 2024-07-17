"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

import { FullScreenLoading } from "src/app/components/full-screnn-loading.component";
import { useGetPurchases } from "src/app/hooks/get-purchases.hook";
import { Pencil, ArrowRight, Check, List } from "lucide-react";
import { useMemo, useState } from "react";
import NewRequestModal from "src/app/components/new-request-modal.component";
import { Filter } from "src/app/components/filter-table";
import { useGetUsername } from "src/app/hooks/get-username.hook";
export interface IPurchasesTable {
  id: string;
  listIcon?: () => void;
  editIcon?: () => void;
  confirmIcon?: () => void;
  nextIcon?: () => void;
  department: string;
  control_number: number;
  company: string;
  created_at: string;
  request_date: string;
  obs: string;
  total_price: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "date";
  }
}

export default function ComprasPage() {
  const { data: username } = useGetUsername();
  const [isOpenNewRequestModal, setIsOpenNewRequestModal] = useState(false);
  const { data = [], isLoading, isFetching, isRefetching } = useGetPurchases();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<IPurchasesTable, any>[]>(
    () => [
      {
        accessorKey: "listIcon",
        header: "",
        cell: () => <List />,
      },
      { accessorKey: "editIcon", header: "", cell: () => <Pencil /> },
      { accessorKey: "confirmIcon", header: "", cell: () => <Check /> },
      { accessorKey: "nextIcon", header: "", cell: () => <ArrowRight /> },
      {
        accessorKey: "company",
        cell: (info) => info.getValue(),
        header: () => "Empresa",
        meta: {
          filterVariant: "text",
        },
      },
      {
        accessorKey: "department",
        cell: (info) => info.getValue(),
        header: () => "Departamento",
        meta: {
          filterVariant: "text",
        },
      },
      {
        accessorKey: "control_number",
        cell: (info) => info.getValue(),
        header: () => "Número de controle",
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "created_at",
        cell: (info) => info.getValue(),
        header: () => "Data",
        meta: {
          filterVariant: "date",
        },
      },
      {
        accessorKey: "request_date",
        cell: (info) => info.getValue(),
        header: () => "Data de solicitação",
        meta: {
          filterVariant: "date",
        },
      },
      {
        accessorKey: "total_price",
        cell: (info) => info.getValue(),
        header: () => "Preço Total",
        meta: {
          filterVariant: "text",
        },
      },
      {
        accessorKey: "obs",
        cell: (info) => info.getValue(),
        header: () => "Observações",
        meta: {
          filterVariant: "text",
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data:data as IPurchasesTable[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()   
  });

  if (isLoading || isFetching || isRefetching) {
    return <FullScreenLoading isLoading={true} />;
  }
  return (
    <div className="flex-1 flex-col overflow-hidden gap-8">
      <div className="flex justify-between items-center flex-row p-8">
        <h1 className="text-3xl font-bold text-center">Olá, {username} </h1>
        <button
          onClick={() => setIsOpenNewRequestModal(true)}
          className="bg-blue-800 font-bold rounded-md text-white p-4"
        >
          Nova Requisição
        </button>
      </div>

      <nav className="border border-gray-100 flex justify-end items-center flex-row">
        <div className="flex space-x-8 px-8 py-3 text-left text-xs uppercase whitespace-nowrap tracking-wider">
          <a href="/" className="block py-2 px-4">
            Cotações
          </a>

          <a href="#" className="block py-2 px-4 ">
            Em Aberto
          </a>
          <a href="#" className="block py-2 px-4 ">
            Aprovadas
          </a>
          <a href="#" className="block py-2 px-4 ">
            Recusadas
          </a>
          <a href="#" className="block py-2 px-4 ">
            Canceladas
          </a>
        </div>
      </nav>
      <div className="flex-1 overflow-auto">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-3 space-y-2 text-left text-xs uppercase whitespace-nowrap tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewRequestModal
        isOpen={isOpenNewRequestModal}
        onClose={() => setIsOpenNewRequestModal(false)}
      />
    </div>
  );
}
