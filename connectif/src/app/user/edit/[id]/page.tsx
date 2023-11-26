import { api } from "@/app/api";
import {
  classes_type,
  preference_type,
  user_to_update_type,
} from "@/app/api/types";
import Footer from "@/components/Footer";
import UpdateUserForm from "@/components/UpdateUserForm";
import { cookies } from "next/headers";
import styles from "../../../../../styles/edituser.module.scss";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: user_to_update_type = response.data;

  const preferencesResponse = await api.get("/preferences");
  const preferences: preference_type[] = preferencesResponse.data;

  const classesResponse = await api.get("/classes");
  const classes: classes_type[] = classesResponse.data;

  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <h2>Editar Perfil</h2>
      </div>
      <UpdateUserForm
        classes={classes}
        preferences={preferences}
        user={user}
        userToken={token ?? ""}
      />
      <Footer />
    </main>
  );
}
