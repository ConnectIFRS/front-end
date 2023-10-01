"use client";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";
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
  return (
    <button
      style={followedByUser ? { backgroundColor: "#272323" } : {}}
      className={styles.button}
      type="button"
      onClick={async () => {
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
          router.push(`/user/${userId}`);
        }
      }}
    >
      {followedByUser ? "Seguindo" : "Seguir"}
    </button>
  );
}
