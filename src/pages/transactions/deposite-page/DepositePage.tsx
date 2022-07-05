import React, { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import PageHeader from '../../../components/PageHeader/PageHeader';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { TransactionType } from '../../../types/TransactionType';
import DepositeForm from './components/DepositeForm/DepositeForm';
import { useDepositePage } from './state/useDepositePage';
import { pageStyle } from '../../../utils/utils';
interface DepositePageProps {
  transactionType: TransactionType;
}

const DepositePage: React.FunctionComponent<DepositePageProps> = ({
  transactionType,
}) => {
  const service = useContext(CustomerServiceContext)!;
  const { state, loadCustomerById } = useDepositePage({ service });
  let title = '';
  if (transactionType === 'deposite') title = 'إيداع';
  if (transactionType === 'withdraw') title = 'سحب/خصم';
  let context = '';
  if (transactionType === 'deposite') context = 'الى';
  if (transactionType === 'withdraw') context = 'من';
  const renderHeader = () => {
    return (
      <PageHeader
        pageTitle={`${title} ${context} ${state.customer?.name ?? ''}`}
      >
        <Divder />
      </PageHeader>
    );
  };
  return (
    <StateContainer
      state={state}
      onReloadClick={loadCustomerById}
      renderHeader={renderHeader}
      style={pageStyle}
    >
      <DepositeForm
        customer={state.customer!}
        transactionType={transactionType}
      />
    </StateContainer>
  );
};

export default DepositePage;
