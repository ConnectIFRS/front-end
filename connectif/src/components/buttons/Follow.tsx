"use client";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../styles/buttons.module.scss";
export default function Follow({
  userId,
  token,
  followedByUser,
}: {
  userId: string;
  token: string;
  followedByUser: boolean;
}) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(followedByUser);
  const handleFollow = async () => {
    try {
      const response = await api.post(
        "/follow",
        {
          toFollow: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setIsFollowing(response.data.followedByUser);
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao seguir:", error);
    }
  };
  return (
    <button
      style={isFollowing ? { backgroundColor: "#272323" } : {}}
      className={styles.button}
      type="button"
      onClick={handleFollow}
    >
      {isFollowing ? "Seguindo" : "Seguir"}
    </button>
  );
}
