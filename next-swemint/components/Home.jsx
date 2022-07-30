import { useState } from 'react';
import ConnectBtn from './ConnectBtn';
import CountDown from './CountDown';

export const Home = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <ConnectBtn />
            <CountDown />
        </>

    );
}

export default Home;