import React, { useState } from "react";
import styles from "./FloatingActionButton.module.css";

interface FloatingActionButtonProps {
  onClick: () => void;
  visible?: boolean;
}

const FloatingActionButton = ({ onClick, visible = true }: FloatingActionButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.fab} ${isHovered ? styles.expanded : ""}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Создать карточку"
      >
        <div className={styles.icon}>+</div>
        <div className={styles.text}>Создать карточку</div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
