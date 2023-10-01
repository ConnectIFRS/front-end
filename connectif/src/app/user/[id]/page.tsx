import Footer from "@/components/Footer";
import User from "@/components/User";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import styles from "../../../../styles/userpage.module.scss";

export default function UserPage({ params }: { params: { id: string } }) {
  const id: string = params.id;
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image
          src={logo}
          alt="ConnectIF"
          quality={100}
          height={56}
          width={56}
        />
      </div>
      <User id={id} />
      <Footer />
    </main>
  );
}
