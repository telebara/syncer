import React, { useState } from "react";
import styles from "./FloatingActionButton.module.css";

interface FloatingActionButtonProps {
  onClick: () => void;
  visible?: boolean;
  disabled?: boolean;
}

const FloatingActionButton = ({ onClick, visible = true, disabled = false }: FloatingActionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.fab} ${isHovered ? styles.expanded : ""} ${disabled ? styles.disabled : ""}`}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        aria-label="Создать карточку"
        disabled={disabled}
      >
        <div className={styles.icon}>+</div>
        <div className={styles.text}>Создать карточку</div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
