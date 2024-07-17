export interface IPurchases {
  id: string;
  requester: {
    id: string;
    name: string;
    email: string;
  };
  approver: {
    id: string;
    name: string;
    email: string;
  };
  department: {
    id: string;
    name: string;
  };
  products: [
    {
      product: {
        id: string;
        code: string;
        un: string;
        description: string;
      };
      quantity: string;
      price: string;
      status: string;
    }
  ];
  company: string;
  created_at: string;
  request_date: string;
  motive: string;
  obs: string;
  status: string;
  approval_date: string;
  has_quotation: boolean;
  quotation_emails: string;
  quotation_date: string;
  control_number: number;
}
