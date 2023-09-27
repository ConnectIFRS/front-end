import { api } from "@/app/api";
import { post_type } from "@/app/api/types";
import { cookies } from "next/headers";

import styles from "../../styles/feed.module.scss";
import Post from "./Post";

export default async function Feed() {
  let posts: post_type[] = [];
  const token = cookies().get("user_token")?.value;
  const feed = await api.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  posts = feed.data;

  if (posts.length === 0 || feed.status === 401 || feed.status === 500) {
    return "nenhum post";
  }

  return (
    <div className={styles.feed}>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}
