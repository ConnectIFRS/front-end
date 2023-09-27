"use client";
import styles from "../../styles/mediapicker.module.scss";

import { ChangeEvent, useState } from "react";

export function PostPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"video" | "image" | null>(
    null
  );
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const file = files[0];

    if (file.type.startsWith("video/")) {
      // É um arquivo de vídeo
      setPreviewType("video");
    } else {
      setPreviewType("image");
    }
    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  };
  return (
    <div className={styles.mediaPicker}>
      <input
        type="file"
        name="coverUrl"
        id="media"
        accept="image/* video/*"
        onChange={onFileSelected}
      />
      {/* FAZER PREVIEW DE VÍDEO com a tag <video> */}
      {preview && previewType === "image" && (
        <img
          src={preview}
          alt=""
          style={{
            aspectRatio: "16/9",
            width: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {preview && previewType === "video" && (
        <video
          controls
          width="100%"
          height="auto"
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        >
          <source src={preview ?? ""} />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      )}
    </div>
  );
}
