import CreateUserForm from "@/components/CreateUserForm";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import styles from "../../../styles/register.module.scss";
import { api } from "../api";
import { preference_type } from "../api/types";
export default async function Register() {
  const preferencesResponse = await api.get("/preferences");
  const preferences: preference_type[] = preferencesResponse.data;
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={68} height={68} quality={100} />
      </div>
      <CreateUserForm preferences={preferences} />
    </main>
  );
}
