import React, { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { useGlobalTransferPage } from './state/useGlobalTransferPage';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import GlobalTransferForm from './components/GlobalTransferForm';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { pageStyle } from '../../../utils/utils';
interface GlobalTransferPageProps {}

const GlobalTransferPage: React.FunctionComponent<
  GlobalTransferPageProps
> = () => {
  const service = useContext(CustomerServiceContext)!;
  const currencyService = useContext(CurrencyServiceContext)!;
  const { state, loadCustomerAndCurrencies } = useGlobalTransferPage({
    service,
    currencyService,
  });
  const renderHeader = () => {
    return (
      <PageHeader pageTitle={`تحويل من العميل ${state.customer?.name ?? ''}`}>
        <Divder />
      </PageHeader>
    );
  };
  return (
    <StateContainer
      state={state}
      onReloadClick={loadCustomerAndCurrencies}
      renderHeader={renderHeader}
      style={pageStyle}
    >
      <GlobalTransferForm
        customer={state.customer!}
        currencies={state.currencies}
      />
    </StateContainer>
  );
};

export default GlobalTransferPage;
