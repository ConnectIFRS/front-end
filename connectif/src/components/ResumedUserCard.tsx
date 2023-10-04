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
}: {
  user: resumed_user_type;
  token: string;
  userId: string;
}) {
  const router = useRouter();
  const decodedToken: JWTToken = decode(token);
  return (
    <div className={styles.resumedUserCard}>
      <Image src={user.profilePic} alt={user.name} width={40} height={40} />
      <div className={styles.userData}>
        <span>{user.name}</span>
        <span>{user.userClass}</span>
      </div>
      {decodedToken.sub === user.id ? (
        <div style={{ width: "60.39px" }}></div>
      ) : (
        <Follow
          followedByUser={user.followedByUser}
          token={token}
          userId={userId}
        />
      )}
    </div>
  );
}
