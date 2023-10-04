"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUrl } from "nextjs-current-url";
import styles from "../../styles/secondaryheader.module.scss";
import UserField from "./UserField";

export default function FollowingAndFollowersHeader({
  userName,
  followers,
  following,
}: {
  userName: string;
  followers: number;
  following: number;
}) {
  const router = useRouter();
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <header className={styles.header}>
      <div className={styles.topPart}>
        <ArrowLeft height={20} width={20} onClick={() => router.back()} />{" "}
        <span onClick={() => router.back()}>{userName}</span>
      </div>
      <div className={styles.followersArea}>
        <div
          style={
            String(currentUrl).match("followers")
              ? { borderBottom: "2px solid #101efc", paddingBottom: "3px" }
              : { borderBottom: "2px solid transparent", paddingBottom: "3px" }
          }
        >
          <UserField dataToShow={followers} text="Seguidores" />
        </div>
        <div
          style={
            String(currentUrl).match("following")
              ? { borderBottom: "2px solid #101efc", paddingBottom: "3px" }
              : { borderBottom: "2px solid transparent", paddingBottom: "3px" }
          }
        >
          <UserField dataToShow={following} text="Seguindo" />
        </div>
      </div>
    </header>
  );
}
