import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const boards: ApiSchemas["Board"][] = [
  { id: "board-1", name: "Marketing Campaign" },
  { id: "board-2", name: "Product Roadmap" },
];

export const handlers = [
  http.get("/boards", () => HttpResponse.json<ApiSchemas["Board"][]>(boards)),
  http.post("/boards", async ({ request }) => {
    const { name } = await request.json();
    const board = { id: crypto.randomUUID(), name };
    boards.push(board);
    return HttpResponse.json<ApiSchemas["Board"]>(board, { status: 201 });
  }),
  http.delete("/boards/{boardId}", ({ params }) => {
    const index = boards.findIndex((board) => board.id === params.boardId);
    if (index === -1) return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" }, { status: 404 });
    boards.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
