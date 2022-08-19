import { useRef, useState, useEffect } from 'react';
import styles from '../styles/LitePaper.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LitePaper = () => {
    const paperRef = useRef();
    const paper1Ref = useRef();

    return (
        <>
            <div className={styles.litePaper}>
                <div ref={paperRef} className={styles.paperContainer}alt="LitePaper1" priority="true">
                    <Image  src="/img/litepaper-page-1.jpg" width={1593}
                        height={875}
                        layout="responsive" blurDataURL="/img/litepaper-page-1.jpg" className={styles.paper} />
                </div>
                <div ref={paper1Ref} className={styles.paperContainer} alt="LitePaper2">
                    <Image  src="/img/litepaper-page-2.jpg" width={1593}
                        height={875}
                        layout="responsive" blurDataURL="/img/litepaper-page-2.jpg" className={styles.paper} alt="LitePaper2" priority="true" />
                </div>
                <div ref={paperRef} className={styles.paperContainer}>
                    <Image src="/img/litepaper-page-3.jpg" width={1593}
                        height={875}
                        layout="responsive" blurDataURL="/img/litepaper-page-3.jpg" className={styles.paper} alt="LitePaper3" priority="true" />
                </div>
                <div ref={paperRef} className={styles.paperContainer}>
                    <Image src="/img/litepaper-page-4-rm.jpg" width={1593}
                        height={875}
                        layout="responsive" blurDataURL="/img/litepaper-page-4-rm.jpg" className={styles.paper} alt="LitePaper4" />
                </div>
                <div ref={paperRef} className={styles.paperContainer}>
                    <Image src="/img/litepaper-page-5-team.jpg" width={1593}
                        height={875}
                        layout="responsive" blurDataURL="/img/litepaper-page-5-team.jpg" className={styles.paper} alt="LitePaper5" />
                </div>
            </div>
        </>
    );
}

export default LitePaper;