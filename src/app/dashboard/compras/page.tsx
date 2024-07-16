"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { FullScreenLoading } from "src/app/components/full-screnn-loading.component";
import { useGetPurchases } from "src/app/hooks/get-purchases.hook";
import { useUser } from "src/app/hooks/user.hook";
import { Pencil, ArrowRight, Check, List } from "lucide-react";
import { useState } from "react";
import NewRequestModal from "src/app/components/new-request-modal.component";
export interface IPurchases {
  id: string;
  listIcon: () => void;
  editIcon: () => void;
  confirmIcon: () => void;
  nextIcon: () => void;
  department: string;
  control_number: number;
  company: string;
  created_at: string;
  request_date: string;
  obs: string;
  total_price: string;
}

const columnHelper = createColumnHelper<IPurchases>();

const columns = [
  columnHelper.accessor("listIcon", {
    header: "",
    cell: () => <List />,
  }),
  columnHelper.accessor("editIcon", {
    header: "",
    cell: () => <Pencil />,
  }),
  columnHelper.accessor("confirmIcon", {
    header: "",
    cell: () => <Check />,
  }),
  columnHelper.accessor("nextIcon", {
    header: "",
    cell: () => <ArrowRight />,
  }),
  columnHelper.accessor("company", {
    cell: (info) => info.getValue(),
    header: () => "Empresa",    
  }),
  columnHelper.accessor("department", {
    cell: (info) => info.getValue(),
    header: () => "Departamento",
  }),
  columnHelper.accessor("control_number", {
    cell: (info) => info.getValue(),
    header: () => "Número de controle",
  }),
  columnHelper.accessor("created_at", {
    cell: (info) => info.getValue(),
    header: () => "Data",
  }),
  columnHelper.accessor("request_date", {
    cell: (info) => info.getValue(),
    header: () => "Data de solicitação",
  }),
  columnHelper.accessor("total_price", {
    cell: (info) => info.getValue(),
    header: () => "Preço Total",
  }),
  columnHelper.accessor("obs", {
    cell: (info) => info.getValue(),
    header: () => "Observações",
  }),
];

export default function ComprasPage() {
  const { username } = useUser();
  const [isOpenNewRequestModal, setIsOpenNewRequestModal] = useState(false);
  const { data, isLoading, isFetching, isRefetching } = useGetPurchases();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                      className="px-6 py-3 text-left text-xs uppercase whitespace-nowrap tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
