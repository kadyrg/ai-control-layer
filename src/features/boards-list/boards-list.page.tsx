import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, href } from "react-router-dom";
import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";

function BoardsListPage() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");
  const invalidate = () => queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
  const createBoard = rqClient.useMutation("post", "/boards", {
    onSuccess: () => setName(""), onSettled: invalidate,
  });
  const deleteBoard = rqClient.useMutation("delete", "/boards/{boardId}", { onSettled: invalidate });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim()) createBoard.mutate({ body: { name: name.trim() } });
  }
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Boards list</h1>
      <form onSubmit={submit} className="flex gap-2">
        <input aria-label="Board name" placeholder="Board name" value={name} onChange={(event) => setName(event.target.value)} className="rounded-md border px-3 py-2" />
        <Button disabled={!name.trim() || createBoard.isPending}>Create board</Button>
      </form>
      {boardsQuery.isPending && <p>Loading boards…</p>}
      {boardsQuery.isError && <p role="alert">Could not load boards.</p>}
      {(createBoard.isError || deleteBoard.isError) && <p role="alert">Could not save changes. Please try again.</p>}
      {boardsQuery.data?.length === 0 && <p>No boards yet.</p>}
      <ul className="space-y-2">
        {boardsQuery.data?.map((board) => (
          <li key={board.id} className="flex items-center justify-between rounded-md border p-3">
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>{board.name}</Link>
            <Button variant="outline" disabled={deleteBoard.isPending} onClick={() => deleteBoard.mutate({ params: { path: { boardId: board.id } } })}>Delete</Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
export const Component = BoardsListPage;
