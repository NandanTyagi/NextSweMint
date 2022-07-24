import { useState } from 'react';
import  '../styles/CountDown.module.css';

const CountDown = () => {
    const [value, setValue] = useState('');

    return (
        <article className="countdown-article">
            <h3 className="countdown-title">TIME REMAINING</h3>
            <div className="countdown-container" id="countdown">
                <div className="glow time">
                    <h2 className="digit" id="days">27:</h2> <small>days</small>
                </div> <div className="glow time">
                    <h2 className="digit" id="hours">15:</h2> <small>hrs</small>
                </div>
                <div className="glow time">
                    <h2 className="digit" id="minutes">58:</h2> <small>min</small>
                </div>
                <div className="glow time">
                    <h2 className="digit" id="seconds">07</h2> <small>sec</small>
                </div>
            </div>
        </article>
    );
}

export default CountDown;