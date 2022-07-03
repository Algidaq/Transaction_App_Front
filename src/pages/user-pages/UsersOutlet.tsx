import { Outlet } from 'react-router-dom';
import { FunctionComponent } from 'react';

interface UsersOutletProps {}

const UsersOutlet: FunctionComponent<UsersOutletProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default UsersOutlet;
