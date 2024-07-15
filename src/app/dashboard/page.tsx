"use client";

import { Suspense, lazy } from "react";
const ComprasPage = lazy(() => import("./compras/page"));
import { DashboardTypePage } from "../enums/dashboard-type-page.enum";

interface PaymentTypeSelectedProps {
  pageName: DashboardTypePage;
}

const DashboardTypeSelected = ({ pageName }: PaymentTypeSelectedProps) => {
  const Page: { [key in DashboardTypePage]: JSX.Element | null } = {
    [DashboardTypePage.SHOPPING]: <ComprasPage />,
    [DashboardTypePage.SERVICES]: <></>,
    [DashboardTypePage.SHIPPING]: <></>,
    [DashboardTypePage.INTERNAL_MAINTENANCE]: <></>,
  };
  if (!pageName) return null;
  return <Suspense>{Page[pageName]}</Suspense>;
};

export default DashboardTypeSelected;
