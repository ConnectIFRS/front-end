import Image from "next/image";
import Link from "next/link";
import instagram from "../../public/socialMedia/instagram.svg";
import styles from "../../styles/defaultcard.module.scss";

export default function InstagramCard({
  instagramName,
}: {
  instagramName: string;
}) {
  const instagramURL = `https://www.instagram.com/${instagramName}`;

  return (
    <Link target="_blank" href={instagramURL}>
      <div className={styles.cardContent}>
        <Image
          src={instagram}
          alt="Instagram"
          height={35}
          width={35}
          quality={100}
        />
        <span>Instagram</span>
      </div>
    </Link>
  );
}
