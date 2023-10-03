"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/userfield.module.scss";
export default function UserField({
  dataToShow,
  text,
  url,
}: {
  dataToShow: number;
  text: string;
  url: string;
}) {
  const router = useRouter();
  return (
    <div
      className={styles.userInfo}
      onClick={() => {
        router.push(url);
      }}
    >
      <span>{dataToShow}</span>
      <span>{text}</span>
    </div>
  );
}
