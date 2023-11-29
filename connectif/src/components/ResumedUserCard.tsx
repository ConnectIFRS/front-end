"use client";
import { JWTToken, resumed_user_type } from "@/app/api/types";
import decode from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../styles/resumedusercard.module.scss";
import Follow from "./buttons/Follow";

export default function ResumedUserCard({
  user,
  token,
  userId,
  redirectUrl,
}: {
  user: resumed_user_type;
  token: string;
  userId: string;
  redirectUrl: string;
}) {
  const router = useRouter();
  const decodedToken: JWTToken = decode(token);
  return (
    <div className={styles.resumedUserCard}>
      <Image
        onClick={() => router.push(`/user/${user.id}`)}
        src={user.profilePic}
        alt={user.name}
        width={40}
        height={40}
      />
      <div
        onClick={() => router.push(`/user/${user.id}`)}
        className={styles.userData}
      >
        <span>{user.name}</span>
        <span>{user.userClass}</span>
      </div>
      {decodedToken.sub === user.id ? (
        <div style={{ width: "80px" }}>
          {" "}
          <span></span>{" "}
        </div>
      ) : (
        <div
          style={{
            width: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Follow
            followedByUser={user.followedByUser}
            token={token}
            userId={user.id}
          />
        </div>
      )}
    </div>
  );
}
