import { useState } from 'react';
import ConnectBtn from './ConnectBtn';
import CountDown from './CountDown';

const Home = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <ConnectBtn />
            <CountDown />
        </>

    );
}

export default Home;