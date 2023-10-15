import { api } from "@/app/api";
import { post_type } from "@/app/api/types";
import Footer from "@/components/Footer";
import Post from "@/components/Post";
import { cookies } from "next/headers";

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
    <main>
      <Post post={post} />
      <Footer />
    </main>
  );
}
