import { useState } from 'react';
import '../styles/ConnectBtn.module.css';
import Error from './Error';

const ConnectBtn = () => {
    const [value, setValue] = useState('');

    return (
        <article className="btn-container">
            <button className="btn" id="btn">CONNECT WALLET</button>
            <Error />
        </article>
    );
}

export default ConnectBtn;