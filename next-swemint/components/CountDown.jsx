import { useState, useEffect } from 'react';
import styles from '../styles/CountDown.module.css';
import Loading from './Loading';
import countDownTo from '../utils/countDownTo.js';

export const CountDown = () => {
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState('27');
    const [hrs, setHrs] = useState('15');
    const [min, setMin] = useState('59');
    const [sec, setSec] = useState('08');


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }, [])

    useEffect(() => {
        setInterval(() => {
            const deadLine = countDownTo('2022', 'August', '20', '18:00:00')
            setDays(deadLine.d)
            setHrs(deadLine.h)
            setMin(deadLine.m)
            setSec(deadLine.s)
        }, 1000);
    }, [sec])

    return (
        <article className={styles["countdown-article"]}>
            <h3 className={styles["countdown-title"]}>TIME REMAINING</h3>
            {loading ? <div className={styles["countdown-container"]} id="countdown">
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="days">{days}:</h2> <small className={styles["small"]}>days</small>
                </div> <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="hours">{hrs}:</h2> <small className={styles["small"]}>hrs</small>
                </div>
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="minutes">{min}:</h2> <small className={styles["small"]}>min</small>
                </div>
                <div className={[styles.glow, styles.time].join(" ")}>
                    <h2 className={styles["digit"]} id="seconds">{sec}</h2> <small className={styles["small"]}>sec</small>
                </div>

            </div> : <div className={styles["countdown-container"]} id="countdown"><Loading /></div>}
        </article>
    );
}

export default CountDown;