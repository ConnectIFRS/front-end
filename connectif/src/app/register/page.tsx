import CreateUserForm from "@/components/CreateUserForm";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import styles from "../../../styles/register.module.scss";
import { api } from "../api";
import { classes_type, preference_type } from "../api/types";
export default async function Register() {
  const preferencesResponse = await api.get("/preferences");
  const preferences: preference_type[] = preferencesResponse.data;
  let classes: classes_type[] = [];
  const response = await api.get("/classes");
  classes = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={68} height={68} quality={100} />
      </div>
      <CreateUserForm preferences={preferences} classes={classes} />
    </main>
  );
}
