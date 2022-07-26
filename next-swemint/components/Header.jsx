import { Router } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';


const Header = ({preamble}) => {
    const [isDashBoard, setIsDashBoard] = useState(false);
    
   useEffect(()=> {
       if(Router.pathname === '/dashboard'){
           setIsDashBoard(true)
           console.log('in header preamble', isDashBoard)
           }
           if(Router.pathname === '/'){
               setIsDashBoard(false)
           }

   },[])
    

    return (
        <article className={styles['text-container']}>
            <h1 className={styles['title']}>IPANEKO</h1>
            <p className={!isDashBoard ? styles['preamble']:[styles['preamble'], styles['size-up']].join(' ')}>
                {preamble.top} 
                <br></br>
                <br></br>
                {preamble.bottom}
            </p>
        </article>
    );
}

export default Header;