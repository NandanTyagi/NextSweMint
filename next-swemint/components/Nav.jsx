import { useState } from 'react';
import Link from 'next/link'
import styles from '../styles/Nav.module.css';

export const Nav = () => {
    const [value, setValue] = useState('');

    return (
        <div className={styles["nav-footer"]}>
            <Link href="/litepaper">
            <a  className={[styles.blue, styles.link, styles.nav_footer__link].join(" ")}> LITEPAPER </a>
            </Link>
            <Link href="/mint">
            <a  className={[styles.blue, styles.link, styles.nav_footer__link].join(" ")}> MINT </a>
            </Link>
            <Link href="/dashboard">
            <a  className={[styles.blue, styles.link, styles.nav_footer__link].join(" ")}> DASHBOARD </a>
            </Link>
        </div>
    );
}

export default Nav;