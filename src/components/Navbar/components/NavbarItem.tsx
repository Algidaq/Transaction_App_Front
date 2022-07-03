import { createRef, useState, useEffect, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarItem } from '../model/INavbarItem';

interface NabarItemProps {
  item: INavbarItem;
}

const NabarItem: FunctionComponent<NabarItemProps> = ({ item }) => {
  const ref = createRef<HTMLAnchorElement>();
  const [isChecked, toggleCheckbox] = useState(false);
  useEffect(() => {
    if (ref.current?.classList?.contains('active') && !isChecked) {
      toggleCheckbox(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return (
    <label className="link-group" htmlFor="checkbox">
      <header className="link-header">
        <NavLink
          to={item.groupPath}
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            toggleCheckbox(!isChecked);
            console.log(isChecked);
          }}
        >
          <strong>{item.groupName}</strong>
        </NavLink>
      </header>
      <ul
        className="link-list"
        style={{ display: isChecked ? 'block' : 'none' }}
      >
        {item.navLinks.map((navItem, key) => {
          return (
            <li className="link-item" key={key}>
              <NavLink
                to={`${item.groupPath}${navItem.navPath}`}
                className="link"
                end
              >
                {navItem.navName}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </label>
  );
};

export default NabarItem;
