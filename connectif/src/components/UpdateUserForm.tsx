"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import {
  classes_type,
  preference_type,
  select_type,
  user_to_update_type,
} from "@/app/api/types";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "../../styles/edituserform.module.scss";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { MediaPicker } from "./MediaPicker";
import PhoneInput from "./PhoneInput";
import SecondarySelect from "./Select";

export default function UpdateUserForm({
  user,
  userToken,
  preferences,
  classes,
}: {
  user: user_to_update_type;
  userToken: string;
  preferences: preference_type[];
  classes: classes_type[];
}) {
  const [userPreferences, setUserPreferences] = useState<number[]>([]);

  const router = useRouter();

  const preferenceOptions: select_type[] = [];
  for (const preference of preferences) {
    preferenceOptions.push({
      value: preference.id,
      label: preference.title,
    });
  }

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
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
      const response = await api.put(
        `/users/${user.id}`,
        {
          profilePic,
          name: formData.get("name"),
          password: formData.get("password"),
          classId: Number(formData.get("classId")),
          description: formData.get("description"),
          instagramName: formData.get("instagramName"),
          whatsappNumber: formData.get("wppNumber"),
          preferences: userPreferences,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const { token } = response.data;

      if (salvarTokenNoCookie(token)) {
        router.push(`/user/${user.id}`);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleUpdateUser}>
      <DefaultInput
        type="text"
        id="name"
        name="name"
        required
        label="Nome"
        defaultValue={user.name}
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
      <DefaultInput
        type="text"
        name="description"
        id="description"
        required
        label="Descrição"
        defaultValue={user.description}
      />
      <DefaultInput
        type="text"
        name="instagramName"
        id="instagramName"
        label="@ do Instagram (opcional)"
        defaultValue={user.instagramName}
      />
      <PhoneInput
        type="tel"
        name="wppNumber"
        id="wppNumber"
        label="WhatsApp (opcional)"
        defaultValue={user.whatsappNumber}
      />
      <DefaultSelect name="classId" defaultValue={user.classId}>
        <option value="">Selecione uma turma</option>
        {classes.map((classe) => {
          return (
            <option value={classe.id} key={classe.id}>
              {classe.className}
            </option>
          );
        })}
      </DefaultSelect>
      <SecondarySelect
        onChange={(e: select_type[]) => {
          let values: number[] = [];
          e.forEach((element) => {
            values.push(element.value);
          });
          setUserPreferences(values);
        }}
        isMulti
        name="preferences"
        options={preferenceOptions}
        placeholder="Preferências"
      />

      <div className={styles.profilePic}>
        <MediaPicker defaultValue={user.profilePic} />
        <label htmlFor="media">
          <Camera /> Imagem de perfil
        </label>
      </div>
      <div className={styles.inputGroup}>
        <button type="submit">Salvar Alterações</button>
      </div>
    </form>
  );
}
