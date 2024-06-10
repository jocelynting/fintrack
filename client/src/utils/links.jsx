import { LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { BiCategory } from 'react-icons/bi';
import { FaChartLine } from 'react-icons/fa';
import { BiSolidUserAccount } from 'react-icons/bi';

const links = [
  {
    text: 'bills',
    path: '.',
    icon: <LiaMoneyCheckAltSolid />,
  },
  { text: 'category', path: 'category', icon: <BiCategory /> },
  { text: 'statistics', path: 'statistics', icon: <FaChartLine /> },
  { text: 'profile', path: 'profile', icon: <BiSolidUserAccount /> },
];

export default links;
