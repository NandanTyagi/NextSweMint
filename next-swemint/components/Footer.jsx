import { useState } from 'react';

const Footer = () => {
    const [value, setValue] = useState('');

    return (
        <footer className="footer-container">
            <a href="https://nandantyagi.com" className="link"> ALL MATERIAL IS ARTIFICIAL | ALL INTELLIGENCE IS DIVINE </a>
            <div className="nav-footer">
                <a href="/html/litepaper.html" className="blue link nav-footer__link"> LITEPAPER </a>
                <a href="/html/mint.html" className="blue link nav-footer__link"> MINT </a>
                <a href="/html/dashboard.html" className="blue link nav-footer__link"> DASHBOARD </a>
            </div>
        </footer>
    );
}

export default Footer;