import CreateUserForm from "@/components/CreateUserForm";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import styles from "../../../styles/register.module.scss";
export default function Register() {
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={68} height={68} quality={100} />
      </div>
      <CreateUserForm />
    </main>
  );
}
