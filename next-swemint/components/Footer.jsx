import { useState } from 'react';
import Nav from './Nav';
import styles from '../styles/Footer.module.css';

export const Footer = () => {
    const [value, setValue] = useState('');

    return (
        <footer className={styles["footer-container"]}>
            <a href="https://nandantyagi.com" className={styles["link"]}> ALL MATERIAL IS ARTIFICIAL | ALL INTELLIGENCE IS DIVINE </a>
            <Nav/>
        </footer>
    );
}

export default Footer;