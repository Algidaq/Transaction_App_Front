import { Outlet } from 'react-router-dom';
interface CustomerOutletProps {}

const CustomerOutlet: React.FunctionComponent<CustomerOutletProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CustomerOutlet;
