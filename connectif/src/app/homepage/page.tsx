import Footer from "@/components/Footer";

import HomeTop from "@/components/HomeTop";
import styles from "../../../styles/home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeTop />
      <Footer />
    </main>
  );
}
