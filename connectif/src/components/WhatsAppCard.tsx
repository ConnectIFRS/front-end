import Image from "next/image";
import Link from "next/link";
import whatsapp from "../../public/socialMedia/whatsapp.svg";
import styles from "../../styles/defaultcard.module.scss";

export default function WhatsAppCard({ wppNumber }: { wppNumber: string }) {
  const formattedNumber = wppNumber.replace(/\D/g, "");
  const whatsappURL = `https://wa.me/55${formattedNumber}`;

  return (
    <Link target="_blank" href={whatsappURL}>
      <div className={styles.cardContent}>
        <Image
          src={whatsapp}
          alt="WhatsApp"
          height={35}
          width={35}
          quality={100}
        />
        <span>WhatsApp</span>
      </div>
    </Link>
  );
}
