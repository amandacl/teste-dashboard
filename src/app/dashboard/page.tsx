"use client";

import { Suspense, lazy } from "react";
const RequisicoesPage = lazy(() => import("./requisicoes/page"));
import { DashboardTypePage } from "../enums/dashboard-type-page.enum";

interface PaymentTypeSelectedProps {
  pageName: DashboardTypePage;
}

const DashboardTypeSelected = ({ pageName }: PaymentTypeSelectedProps) => {
  const Page: { [key in DashboardTypePage]: JSX.Element | null } = {
    [DashboardTypePage.SHOPPING]: <RequisicoesPage />,
    [DashboardTypePage.SERVICES]: <></>,
    [DashboardTypePage.SHIPPING]: <></>,
    [DashboardTypePage.INTERNAL_MAINTENANCE]: <></>,
  };
  if (!pageName) return null;
  return <Suspense>{Page[pageName]}</Suspense>;
};

export default DashboardTypeSelected;
