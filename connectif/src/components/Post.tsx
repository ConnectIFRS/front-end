"use client";
import { api } from "@/app/api";
import { post_type } from "@/app/api/types";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import comment from "../../public/images/posts/comment.svg";
import activeLike from "../../public/images/posts/like-active.svg";
import unactiveLike from "../../public/images/posts/like-unactive.svg";
import styles from "../../styles/post.module.scss";

dayjs.locale(ptBr);

export default function Post({ post }: { post: post_type }) {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(post.likedByUser);
  const [serverPost, setServerPost] = useState<post_type>(post);
  const token = Cookie.get("user_token");
  const imageRegex =
    /\.(gif|jpg|jpeg|tiff|png|webp|bmp|raws|exif|ppm|pgm|pbm|pnm|svg)$/i;
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
    if (response.status == 200 || response.status === 201) {
      setLiked(!liked);
      setServerPost(response.data);
    }
  };
  return (
    <div className={styles.post}>
      <div className={styles.authorArea}>
        <Link href={`/user/${serverPost.user.id}`}>
          <Image
            src={serverPost.user.profilePic}
            alt={serverPost.user.name}
            width={40}
            height={40}
            quality={100}
            style={{ aspectRatio: "1/1" }}
          />
        </Link>
        <Link href={`/user/${serverPost.user.id}`}>
          <div className={styles.authorInfos}>
            <span>{serverPost.user.name}</span>
            <span>{serverPost.user.userClass}</span>
          </div>
        </Link>
      </div>
      {imageRegex.test(serverPost.coverUrl) ? (
        <img
          src={serverPost.coverUrl}
          alt="post content"
          className={styles.postImage}
          onDoubleClick={() => handleLikePost(post.id)}
        />
      ) : (
        <video
          controls
          width="100%"
          height="auto"
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        >
          <source src={serverPost.coverUrl ?? ""} />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      )}
      <div className={styles.interactions}>
        <div>
          {!liked ? (
            <Image
              src={unactiveLike}
              alt="like"
              quality={100}
              onClick={() => handleLikePost(post.id)}
            />
          ) : (
            <Image
              src={activeLike}
              alt="like"
              quality={100}
              onClick={() => handleLikePost(post.id)}
            />
          )}
          <span>{serverPost.likes}</span>
        </div>
        <div>
          <Link href={`/post/comments/${serverPost.id}`}>
            <Image src={comment} alt="comment" quality={100} />
          </Link>
          <Link href={`/post/comments/${serverPost.id}`}>
            <span>{post.comments}</span>
          </Link>
        </div>
      </div>
      <div
        className={styles.postContent}
        onClick={() => router.push(`/post/${post.id}`)}
      >
        <span>
          <strong>{serverPost.user.name}</strong>
          <span className={styles.postDescription}>{serverPost.content}</span>
        </span>
      </div>
      <time onClick={() => router.push(`/post/${post.id}`)}>
        {dayjs(serverPost.createdAt).format(
          "D[ de ]MMMM[ de ]YYYY,[ às ]H[:]mm"
        )}
      </time>
    </div>
  );
}
