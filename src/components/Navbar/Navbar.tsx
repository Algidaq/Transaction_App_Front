import './Navbar.scss';
import { routes } from '../../routes/routes';
import NabarItem from './components/NavbarItem';
interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
  return (
    <nav className="nav">
      <nav className="nav-container">
        {routes.map((item, index) => (
          <NabarItem key={index} item={item} />
        ))}
      </nav>
    </nav>
  );
};

export default Navbar;
