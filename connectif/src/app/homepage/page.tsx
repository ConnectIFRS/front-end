import Footer from "@/components/Footer";

import Feed from "@/components/Feed";
import HomeTop from "@/components/HomeTop";
import styles from "../../../styles/home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeTop />
      <Feed />
      <Footer />
    </main>
  );
}
