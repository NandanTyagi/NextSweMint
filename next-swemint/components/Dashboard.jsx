import { useState } from 'react';
import NftCard from './NftCard';

 
const Dashboard = () => {
const [value, setValue] = useState('');
 
    return (
        <NftCard/>
      );
}
 
export default Dashboard;