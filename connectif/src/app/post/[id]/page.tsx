import { api } from "@/app/api";
import { post_type } from "@/app/api/types";
import Comment from "@/components/Comment";
import CreateCommentForm from "@/components/CreateCommentForm";
import EmptyComments from "@/components/EmptyCommments";
import Footer from "@/components/Footer";
import Post from "@/components/Post";
import { cookies } from "next/headers";
import styles from "../../../../styles/postpage.module.scss";

export default async function PostPage({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const post: post_type = response.data;
  return (
    <main className={styles.main}>
      <Post post={post} />
      {post.fullComments.length > 0 ? (
        post.fullComments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })
      ) : (
        <EmptyComments />
      )}
      <CreateCommentForm postId={id} />
      <Footer />
    </main>
  );
}
