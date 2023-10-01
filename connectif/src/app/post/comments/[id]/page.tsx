import { api } from "@/app/api";
import { comment_type } from "@/app/api/types";
import CreateCommentForm from "@/components/CreateCommentForm";
import EmptyComments from "@/components/EmptyCommments";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "../../../../../styles/comments.module.scss";

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
    <main className={styles.main}>
      <div className={styles.commentsHeader}>
        <p>Comentários</p>
      </div>
      {commentsList.length === 0 ? (
        <EmptyComments />
      ) : (
        <>
          {commentsList.map((comment) => {
            return (
              <div key={comment.id} className={styles.comment}>
                <Image
                  src={comment.user.profilePic}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  quality={100}
                  className={styles.image}
                />
                <div>
                  <p>
                    <strong>{comment.user.name}</strong>
                  </p>
                  <p>{comment.content}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
      <CreateCommentForm postId={id} />
      <Footer />
    </main>
  );
}
