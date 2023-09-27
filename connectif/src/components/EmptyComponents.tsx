import Link from "next/link";

export default function EmptyComments({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  return (
    <div>
      <p>Este post não possui nenhum comentário.</p>
      <p>
        Seja o primeiro a adicionar um comentário no post de{" "}
        <Link href={`/user/${userId}`}>{userName}</Link>
      </p>
    </div>
  );
}
