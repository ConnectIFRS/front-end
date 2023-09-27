"use client";
import Select from "react-select";
import styles from "../../styles/hometop.module.scss";
export default function HomeTop() {
  const options = [
    { value: "following", label: "Seguindo" },
    { value: "preferences", label: "Preferências" },
    { value: "course", label: "Curso" },
    { value: "year", label: "Ano" },
  ];
  return (
    <div className={styles.topArea}>
      <h1>ConnectIF</h1>
      <Select
        // placeholder=""
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: "none",
            backgroundColor: "transparent",
            fontFamily: "Oswald",
          }),
          option: (provided, state) => ({
            ...provided,
            fontFamily: "Oswald",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          spacing: 10,
          colors: {
            neutral80: "white",
          },
        })}
        options={options}
      />
    </div>
  );
}
