import { Outlet } from 'react-router-dom';
interface CurrencyOutletProps {}

const CurrencyOutlet: React.FunctionComponent<CurrencyOutletProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CurrencyOutlet;
