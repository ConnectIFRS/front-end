"use client";
import Image from "next/image";
import Link from "next/link";
import { useUrl } from "nextjs-current-url";
import styles from "../../styles/footer.module.scss";

export default function UserProfilePic({ image }: { image: string }) {
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <Link href="/user" className={styles.profilePic}>
      <Image
        src={image}
        width={25}
        height={25}
        quality={100}
        alt="user"
        style={
          String(currentUrl).match("/user") ? { border: "1px solid white" } : {}
        }
      />
    </Link>
  );
}
