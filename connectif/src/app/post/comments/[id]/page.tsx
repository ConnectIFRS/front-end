import { api } from "@/app/api";
import { comment_type } from "@/app/api/types";
import EmptyComments from "@/components/EmptyComponents";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function Comments({ params }: { params: { id: string } }) {
  const id: string = params.id;

  let commentsList: comment_type[] = [];

  const token = cookies().get("user_token")?.value;
  const comments = await api.get(`/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  commentsList = comments.data;

  return (
    <main>
      {commentsList.length === 0 ? (
        <EmptyComments userId="438597" userName="Fulano" />
      ) : (
        <>
          {commentsList.map((comment) => {
            return <div key={comment.id}></div>;
          })}
        </>
      )}
      <Footer />
    </main>
  );
}
