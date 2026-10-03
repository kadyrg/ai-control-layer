import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
export function AppHeader() {
  return <nav className="mb-6 flex gap-4"><Link to={ROUTES.BOARDS}>Boards</Link><Link to={ROUTES.LOGIN}>Login</Link><Link to={ROUTES.REGISTER}>Register</Link></nav>;
}
