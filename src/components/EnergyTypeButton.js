import styles from './EnergyTypeButton.module.css'

function EnergyTypeButton({label, onClick}) {

  return (
      <button onClick={onClick} className={styles.energyTypeBtn}>
        {label}
      </button>
  )
}

export default EnergyTypeButton;