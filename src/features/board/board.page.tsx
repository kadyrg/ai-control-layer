import { useParams } from "react-router-dom";
import { ROUTES, type PathParams } from "@/shared/model/routes";
function BoardPage() {
  const { boardId } = useParams<PathParams[typeof ROUTES.BOARD]>();
  return <h1>Board: {boardId}</h1>;
}
export const Component = BoardPage;
