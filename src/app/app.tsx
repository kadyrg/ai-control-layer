import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "@/features/header";
import { ROUTES } from "@/shared/model/routes";

export function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;
  if (pathname === ROUTES.HOME) return <Outlet />;
  return <div className="mx-auto max-w-4xl p-6">{!isAuthPage && <AppHeader />}<Outlet /></div>;
}
