import { api } from "@/app/api";
import { post_type } from "@/app/api/types";
import { cookies } from "next/headers";
import Image from "next/image";
import comment from "../../public/images/posts/comment.svg";
import unactiveLike from "../../public/images/posts/like-unactive.svg";
import styles from "../../styles/feed.module.scss";

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

  const handleLikePost = async (postId: string) => {
    const response = await api.post(
      "/likes",
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200 || response.status === 201) return true;
  };

  return (
    <div className={styles.feed}>
      {/* {posts.map((post) => {
        return (
          <div key={post.id} className={styles.post}>
            <div className={styles.authorArea}>
              <Image
                src={post.user.profilePic}
                alt={post.user.name}
                width={40}
                height={40}
                quality={100}
              />
              <div className={styles.authorInfos}>
                <span>{post.user.name}</span>
                <span>{post.user.userClass}</span>
              </div>
            </div>
            <img
              src={post.coverUrl}
              alt="post content"
              className={styles.postImage}
              onDoubleClick={() => handleLikePost(post.id)}
            />
            <div className={styles.interactions}>
              <div>
                <Image
                  src={unactiveLike}
                  alt="like"
                  quality={100}
                  onClick={() => handleLikePost(post.id)}
                />
                <span>{post.likes}</span>
              </div>
              <div>
                <Image src={comment} alt="comment" quality={100} />
                <span>{post.comments}</span>
              </div>
            </div>
            <div className={styles.postContent}>
              <span>
                <strong>{post.user.name}</strong>
                <span className={styles.postDescription}>{post.content}</span>
              </span>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
