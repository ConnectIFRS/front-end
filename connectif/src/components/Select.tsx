import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #101efc",
    borderRadius: "3px",
    backgroundColor: "transparent",
    marginBottom: "20px",
    color: "white",
    fontFamily: "nunito",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: "#ffffff",
    fontFamily: "nunito",
    backgroundColor: state.isSelected
      ? "#101efc"
      : state.isFocused
      ? "#101efc50"
      : "#2f2a2a",
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    color: "#ffffff",
    backgroundColor: "#101efc",
    fontFamily: "nunito",
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#101efc",
    color: "white",
    ":hover": {
      backgroundColor: "#101efc50",
    },
  }),
};

const SecondarySelect = ({
  options,
  placeholder,
  isMulti,
  name,
  onChange,
}: {
  options: any[];
  placeholder: string;
  isMulti: boolean;
  name: string;
  onChange: (e: any) => void;
}) => {
  return (
    <div style={{ width: "100%" }}>
      <Select
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        styles={customStyles}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default SecondarySelect;
