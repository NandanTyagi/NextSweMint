import { useState } from 'react';

const Error = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <p className="error" id="error">error</p>
        </>
    );
}

export default Error;