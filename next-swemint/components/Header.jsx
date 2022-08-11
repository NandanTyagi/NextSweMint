import { Router } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link'

export const Header = ({ preamble }) => {
    const [isDashBoard, setIsDashBoard] = useState(preamble.isDashboard);
    const [isMint, setIsMint] = useState(preamble.isMint);

    useEffect(() => {
        if (Router.pathname === '/mint') {
            setIsDashBoard(preamble.isDashBoard)
            setIsMint(preamble.isMint)
        }
        if (Router.pathname === '/dashboard') {
            setIsDashBoard(preamble.isDashBoard)
            setIsMint(preamble.isMint)
        }
        if (Router.pathname === '/') {
            setIsDashBoard(preamble.isDashBoard)
            setIsMint(preamble.isMint)
        }
    }, [isDashBoard, isMint])


    return (
        <article className={styles['text-container']}>
            <Link href="/">
                <h1 className={styles['title']}>IPANEKO</h1>
            </Link>
            {!isMint ? <p className={!isDashBoard ? styles['preamble'] : [styles['preamble'], styles['size-up']].join(' ')}>
                {preamble.top}
                <br></br>
                <br></br>
                {preamble.bottom}
            </p> : <p className={[styles['preamble'], styles['size-up']].join(' ')}>
                {preamble.top}
                <br></br>
                <br></br>
                {preamble.bottom}
            </p>}
        </article>
    );
}

export default Header;