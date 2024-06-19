import { FaHome, FaUser, FaShoppingCart, FaRecordVinyl ,  FaPlus} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {


  return (
    <div className='header'>
      <nav className='navbar'>
        <div className='links-left'>
          <NavLink to='/'>
            <FaHome />
          </NavLink>
          <NavLink to='/records'>
            <FaRecordVinyl />
          </NavLink>
        </div>
        <div className='center'>
          <NavLink to='/records/add'>
            <FaPlus />
          </NavLink>
        </div>
        <div className='links-right'>
          <NavLink to='user'>
            <FaUser />
          </NavLink>
          <NavLink to='cart'>
            <FaShoppingCart />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
