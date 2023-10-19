"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUrl } from "nextjs-current-url";
import styles from "../../styles/secondaryheader.module.scss";

export default function MessageHeader({
  userName,
  userId,
}: {
  userName: string;
  userId: string;
}) {
  const router = useRouter();
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <header className={styles.header}>
      <div className={styles.topPart}>
        <ArrowLeft
          height={20}
          width={20}
          onClick={() => router.push("/homepage")}
        />{" "}
        <span onClick={() => router.push("/homepage")}>{userName}</span>
      </div>
      <div className={styles.followersArea}>
        <Link
          href={`/message/talking/${userId}`}
          style={
            String(currentUrl).match("talking")
              ? { borderBottom: "2px solid #101efc", paddingBottom: "3px" }
              : { borderBottom: "2px solid transparent", paddingBottom: "3px" }
          }
        >
          <p>Conversas</p>
        </Link>
      </div>
    </header>
  );
}
