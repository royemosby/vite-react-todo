import styles from "./button.module.css";

export function Button({
  name,
  clickHandler,
  isDisabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}
