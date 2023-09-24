"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import { classes_type } from "@/app/api/types";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "../../styles/register.module.scss";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { MediaPicker } from "./MediaPicker";

export default async function CreateUserForm() {
  const router = useRouter();
  const response = await api.get("/classes");
  const classes: classes_type[] = response.data;

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl");
    let profilePic = "";
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post(
        "/upload/profilePics",
        uploadFormData
      );
      profilePic = uploadResponse.data.fileURL;
    }
    if (formData.get("password") === formData.get("confirmPassword")) {
      const response = await api.post("/users", {
        profilePic,
        name: formData.get("name"),
        login: formData.get("email"),
        password: formData.get("password"),
        class: Number(formData.get("classId")),
      });
      const { token } = response.data;
      if (salvarTokenNoCookie(token)) {
        router.push("/homepage");
      }
    }
  };
  return (
    <form onSubmit={handleCreateUser}>
      <DefaultInput type="text" name="name" id="name" required label="Nome" />
      <DefaultInput
        type="text"
        name="email"
        id="email"
        required
        label="E-mail"
      />
      <DefaultInput
        type="password"
        name="password"
        id="password"
        required
        label="Senha"
      />
      <DefaultInput
        type="password"
        name="confirmPassword"
        id="password"
        required
        label="Confirme a senha"
      />
      <DefaultSelect name="classId">
        <option value="">Selecione uma turma</option>
        {classes.map((classe) => {
          return (
            <option value={classe.id} key={classe.id}>
              {classe.className}
            </option>
          );
        })}
      </DefaultSelect>
      <div className={styles.profilePic}>
        <MediaPicker />
        <label htmlFor="media">
          <Camera /> Imagem de perfil
        </label>
      </div>
      <div className={styles.inputGroup}>
        <button type="submit">Entrar</button>
      </div>
    </form>
  );
}
