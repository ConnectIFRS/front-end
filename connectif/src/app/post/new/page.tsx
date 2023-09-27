import Footer from "@/components/Footer";
import NewPostForm from "@/components/NewPost";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import styles from "../../../../styles/newpost.module.scss";

export default function CreatePost() {
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
      <NewPostForm />
      <Footer />
    </main>
  );
}
