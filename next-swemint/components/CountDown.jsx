import { useState } from 'react';
import styles from '../styles/CountDown.module.css';

const CountDown = () => {
    const [value, setValue] = useState('');

    return (
        <article className={styles["countdown-article"]}>
            <h3 className={styles["countdown-title"]}>TIME REMAINING</h3>
            <img
            src="./img/spinner.gif"
            alt="loading..."
            id="loading"
            className={styles["loading"]}
          />
            <div className={styles["countdown-container"]} id="countdown">
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="days">27:</h2> <small className={styles["small"]}>days</small>
                </div> <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="hours">15:</h2> <small className={styles["small"]}>hrs</small>
                </div>
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="minutes">58:</h2> <small className={styles["small"]}>min</small>
                </div>
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="seconds">07</h2> <small className={styles["small"]}>sec</small>
                </div>
            </div>
        </article>
    );
}

export default CountDown;