import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestSchema } from "../schemas/new-request-schema";
import { NumericFormat } from "react-number-format";
import {
  FileQuestion,
  FileWarning,
  X,
  Plus,
  Trash2,
  Boxes,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import {
  INewRequest,
  IProductRequest,
} from "../interfaces/new-request.interface";
import { useGetProducts } from "../hooks/get-products.hook";
import { FullScreenLoading } from "./full-screnn-loading.component";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewRequestModal({ isOpen, onClose }: IModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    resetField,
    formState: { errors, isValid },
  } = useForm<INewRequest>({
    resolver: zodResolver(requestSchema),
  });

  const { data: dataProducts, isLoading, isFetching } = useGetProducts();

  const [products, setProducts] = useState<IProductRequest[]>([]);

  const handleAddProduct = () => {
    const nameField = watch(`products.${products.length}.name`);
    const unitPriceField = watch(`products.${products.length}.unit_price`);
    const amountField = parseInt(
      watch(`products.${products.length}.amount`).toString()
    );
    if (!nameField || !unitPriceField || !amountField) {
      setError(`products.${products.length}.name`, {
        message: "preencha todos os campos do produto antes de adicionar",
      });
      return;
    }
    setProducts([
      ...products,
      {
        name: nameField,
        amount: amountField,
        unit_price: unitPriceField,
      },
    ]);
    resetField(`products.${products.length}.name`);
    resetField(`products.${products.length}.unit_price`);
    resetField(`products.${products.length}.amount`);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  const enableSubmit = isValid && products.length > 0;
  console.log(products);
  const onSubmit: SubmitHandler<INewRequest> = (data: INewRequest) => {
    console.log(data);
    //onClose(); // Fecha o modal após o envio do formulário
  };
  if (isLoading || isFetching) {
    <FullScreenLoading isLoading={true} />;
  }
  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-screen my-6 mx-auto flex items-center justify-center">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Nova Requisição</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <X />
                  </button>
                </div>

                <div className="relative p-4 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 p-4 space-y-2">
                      <input
                        id="company"
                        type="text"
                        placeholder="Empresa"
                        {...register("company")}
                        className={`mt-1 block w-full px-3 py-3 border ${
                          errors.company ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.company && (
                        <span className="text-red-500">
                          {errors.company.message}
                        </span>
                      )}
                      <input
                        id="department"
                        type="text"
                        placeholder="Departamento"
                        {...register("department")}
                        className={`mt-1 block w-full px-3 py-3 border ${
                          errors.department
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.department && (
                        <span className="text-red-500">
                          {errors.department.message}
                        </span>
                      )}
                      <input
                        id="approver"
                        type="text"
                        placeholder="Aprovador"
                        {...register("approver")}
                        className={`mt-1 block w-full px-3 py-3 border ${
                          errors.approver ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.approver && (
                        <span className="text-red-500">
                          {errors.approver.message}
                        </span>
                      )}
                      <input
                        id="need_date"
                        placeholder="Data de Necessidade"
                        type="date"
                        {...register("need_date")}
                        className={`mt-1 block w-full px-3 py-3 border ${
                          errors.need_date
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.need_date && (
                        <span className="text-red-500">
                          {errors.need_date.message}
                        </span>
                      )}
                      <div className="flex justify-start items-center relative">
                        <input
                          id="obs_intern"
                          placeholder="Obs interna (motivo da compra)"
                          type="text"
                          {...register("obs_intern")}
                          className={`mt-1 block w-full px-8 py-3 border ${
                            errors.obs_intern
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        <FileQuestion className="absolute mr-2 w-10 text-gray-500" />
                      </div>
                      {errors.obs_intern && (
                        <span className="text-red-500">
                          {errors.obs_intern.message}
                        </span>
                      )}
                      <div className="flex justify-start items-center relative">
                        <input
                          id="obs_extern"
                          placeholder="Obs externa para o fornecedor (especificação da compra/contratação)"
                          type="text"
                          {...register("obs_extern")}
                          className={`mt-1 block w-full px-8 py-3 border ${
                            errors.obs_extern
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        <FileWarning className="absolute mr-2 w-10 text-gray-500" />
                      </div>
                      {errors.obs_extern && (
                        <span className="text-red-500">
                          {errors.obs_extern.message}
                        </span>
                      )}
                      <label
                        htmlFor="need_quote"
                        className="flex items-center space-x-2"
                      >
                        <input
                          id="need_quote"
                          type="checkbox"
                          {...register("need_quote")}
                          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">
                          Precisa de cotação?
                        </span>
                      </label>
                      {errors?.need_quote && (
                        <span className="text-red-500">
                          {errors.need_quote.message}
                        </span>
                      )}
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-row items-center space-x-2">
                          <select
                            id={`products.${products.length}.name`}
                            {...register(`products.${products.length}.name`)}
                            className={`mt-1 block w-4/5 px-3 py-3 border ${
                              errors?.products?.[products.length]?.name
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          >
                            <option value="">Produto</option>

                            {dataProducts?.map((prod, index) => (
                              <option key={index} value={prod.description}>
                                {prod.description}
                              </option>
                            ))}
                          </select>

                          {errors?.products?.[products.length]?.name && (
                            <span className="text-red-500">
                              {
                                errors.products?.[products.length]?.name
                                  ?.message
                              }
                            </span>
                          )}

                          <div className="flex justify-start items-center relative">
                            {/* <input
                              id={`products.${products.length}.unit_price`}
                              placeholder="Preco Unit"
                              type="text"
                              {...register(
                                `products.${products.length}.unit_price`
                              )}
                              className={`mt-1 block w-36 px-8 py-3 border ${
                                errors?.products?.[products.length]?.unit_price
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            /> */}
                            <NumericFormat
                              id={`products.${products.length}.unit_price`}
                              name={`products.${products.length}.unit_price`}
                              placeholder="Preco Unit"
                              thousandSeparator="."
                              decimalSeparator=","
                              prefix="R$ "
                              className={`mt-1 block w-36 px-8 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                            <Banknote className="absolute mr-2 w-10 text-gray-500" />
                          </div>
                          {errors?.products?.[products.length]?.unit_price && (
                            <span className="text-red-500">
                              {
                                errors?.products?.[products.length]?.unit_price
                                  ?.message
                              }
                            </span>
                          )}
                          <div className="flex justify-start items-center relative">
                            <input
                              id={`products.${products.length}.amount`}
                              placeholder="Quant"
                              type="number"
                              {...register(
                                `products.${products.length}.amount`
                              )}
                              className={`mt-1 block w-36 px-8 py-3 border ${
                                errors.products?.[products.length]?.amount
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            <Boxes className="absolute mr-2 w-10 text-gray-500" />
                          </div>
                          {errors?.products?.[products.length]?.amount && (
                            <span className="text-red-500">
                              {
                                errors.products?.[products.length]?.amount
                                  ?.message
                              }
                            </span>
                          )}
                        </div>

                        <button
                          className="flex justify-center items-center mr-2 px-4 py-1 text-sm font-medium rounded-md w-full border border-green-500 text-green-500"
                          onClick={handleAddProduct}
                          type="button"
                        >
                          <Plus />
                        </button>
                      </div>

                      <div className="mt-4 space-y-2">
                        {products?.map((field, index) => (
                          <div
                            key={field.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              id={`products.${index}.name`}
                              placeholder="Produto"
                              type="text"
                              readOnly
                              value={field.name}
                              className={`mt-1 block w-4/5 px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />

                            <div className="flex justify-start items-center relative">
                              <input
                                id={`products.${index}.unit_price`}
                                placeholder="Preco Unit"
                                value={field.unit_price}
                                readOnly
                                type="text"
                                className={`mt-1 block w-36 px-8 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              />
                              <Banknote className="absolute mr-2 w-10 text-gray-500" />
                            </div>

                            <div className="flex justify-start items-center relative">
                              <input
                                id={`products.${index}.amount`}
                                placeholder="Quant"
                                value={field.unit_price}
                                readOnly
                                type="number"
                                className={`mt-1 block w-36 px-8 py-3 borderrounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              />
                              <Boxes className="absolute mr-2 w-10 text-gray-500" />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeProduct(index)}
                              className="px-4 py-1 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                              <Trash2 />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onClose()}
                      >
                        Cancelar
                      </button>
                      <button
                        className={`font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 
                        ${
                          !enableSubmit
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-emerald-500 text-white active:bg-emerald-600"
                        }`}
                        type="submit"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
