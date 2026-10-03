import { ROUTES } from "@/shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import { App } from "./app";

export const router = createBrowserRouter([
  {
    element: <Providers><App /></Providers>,
    children: [
      {
        path: ROUTES.BOARDS,
        lazy: () => import("@/features/boards-list/boards-list.page"),
      },
      {
        path: ROUTES.BOARD,
        lazy: () => import("@/features/board/board.page"),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@/features/security/security.page"),
      },
    ],
  },
]);
