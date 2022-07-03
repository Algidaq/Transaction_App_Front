import React, { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import StateContainer from '../../../components/StateContainer/StateContainer';
import TableTitle from '../../../components/Table/TableTitle';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { useGlobalTransferPage } from './state/useGlobalTransferPage';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import GlobalTransferForm from './components/GlobalTransferForm';
interface GlobalTransferPageProps {}

const GlobalTransferPage: React.FunctionComponent<
  GlobalTransferPageProps
> = () => {
  const service = useContext(CustomerServiceContext)!;
  const customerId = '9eadcd96-9ce8-454f-ae1b-44dab2f509cf';
  const currencyService = useContext(CurrencyServiceContext)!;
  const { state, loadCustomerAndCurrencies } = useGlobalTransferPage({
    service,
    customerId,
    currencyService,
  });

  return (
    <StateContainer state={state} onReloadClick={loadCustomerAndCurrencies}>
      <div
        className="table border-top-8 mt-4"
        style={{ borderRadius: 16, padding: 16 }}
      >
        <TableTitle
          title={`Global Transfer from ${state.customer?.name ?? ''} '`}
          style={{ borderRadius: 16 }}
          verticalGap={8}
        />
        <Divder />
        <GlobalTransferForm
          customer={state.customer!}
          currencies={state.currencies}
        />
      </div>
    </StateContainer>
  );
};

export default GlobalTransferPage;
