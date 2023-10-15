"use client";
import { api } from "@/app/api";
import Cookie from "js-cookie";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "../../styles/newpostform.module.scss";
import { PostPicker } from "./PostFilePicker";

export default function NewPostForm() {
  const router = useRouter();
  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl");
    let media = "";
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post("/upload/posts", uploadFormData);
      media = uploadResponse.data.fileURL;
    }
    const token = Cookie.get("user_token");
    const response = await api.post(
      "/posts",
      {
        coverUrl: media,
        content: `${formData.get("content")}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      router.push("/homepage");
    }
  };
  return (
    <form onSubmit={handleCreatePost} className={styles.form}>
      <textarea
        name="content"
        id="content"
        placeholder="Insira uma descrição à sua postagem"
      />
      <label htmlFor="media">
        <Camera /> Selecione um arquivo
      </label>
      <PostPicker />
      <button type="submit">Criar</button>
    </form>
  );
}
