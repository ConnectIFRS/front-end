import Image from "next/image";
import unactiveHome from "../../public/images/footer/home-unactive.svg";
import styles from "../../styles/footer.module.scss";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image
          src={unactiveHome}
          width={20}
          height={20}
          quality={100}
          alt="home"
        />
      </div>
    </footer>
  );
}
