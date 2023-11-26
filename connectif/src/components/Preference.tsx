import { preference_type } from "@/app/api/types";
import Image from "next/image";
import styles from "../../styles/preference.module.scss";

export default function Preference({
  preference,
}: {
  preference: preference_type;
}) {
  return (
    <div className={styles.preference}>
      <Image
        src={preference.icon}
        alt={`${preference.title}-icon`}
        width={50}
        height={50}
        quality={100}
      />
      <span>{preference.title}</span>
    </div>
  );
}
