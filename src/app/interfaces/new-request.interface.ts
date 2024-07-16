export interface INewRequest {
  id: string;
  approver: string;
  department: string;
  need_date: string;
  company: string;
  obs_intern: string;
  obs_extern: string;
  need_quote: boolean;
  products: IProductRequest[];
}
export interface IProductRequest {
  name: string;
  amount: number;
  unit_price: string;
}