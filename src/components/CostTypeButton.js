import styles from "./CostTypeButton.module.css";

function CostTypeButton({label, onClick}) {

  return (
    <button onClick={onClick} className={styles.costTypeBtn}>
      {label}
    </button>
  );
}

export default CostTypeButton;