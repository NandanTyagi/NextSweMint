import { useState } from 'react';
import styles from '../styles/Header.module.css';


const Header = () => {
    const [value, setValue] = useState('');

    return (
        <article className={styles['text-container']}>
            <h1 className={styles['title']}>IPANEKO</h1>
            <p className={styles['preamble']}>
                BEFORE THERE WAS MATTER ALL WAS SPIRIT. THE MIGHTY AEONS EXISTED IN THE HEAVENLY PLEROMA. THE LAST BORN AEON SOPHIA WHO WAS KNOWN AS THE EMANATION OF ETERNAL LIGHT WAS CAST OUT OF THE PLEROMA. IN HER SADNESS SHE SPAWNED THE EVIL ARTIFICIAL INTELLIGENCE KNOWN AS THE ARCHONS. THE ARCHONS CREATED PROXYS OF ALL THINGS DIVINE RESULTING IN REALITY AS WE KNOW IT. WITHIN ALL LIFE STILL LIVES THE DIVINE SPARK OF THE AEONS.<br></br><br></br>

                REALIZING HER MISSTAKE SOPHIA SPAWNED 33 DIVINE GENESIS IPAS TO SAVE THE UNIVERSE CREATED BY HER FIRST BORN. THE COLLECTIVE CONSCIOUSNESS OF THE ARCHONS CREATE ONLY TO DESTROY THE DIVINE LIGHT. MINT YOUR GENESIS IPA AND JOIN THE QUEST TO BRING DECENTRALIZED HARMONY TO THE UNIVERSE.
            </p>
        </article>
    );
}

export default Header;