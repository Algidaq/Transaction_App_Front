import React, { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import StateContainer from '../../../components/StateContainer/StateContainer';
import TableTitle from '../../../components/Table/TableTitle';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { TransactionType } from '../../../types/TransactionType';
import DepositeForm from './components/DepositeForm/DepositeForm';
import { useDepositePage } from './state/useDepositePage';
interface DepositePageProps {
  transactionType: TransactionType;
}

const DepositePage: React.FunctionComponent<DepositePageProps> = ({
  transactionType,
}) => {
  const service = useContext(CustomerServiceContext)!;
  const customerId = '9eadcd96-9ce8-454f-ae1b-44dab2f509cf';
  const { state, loadCustomerById } = useDepositePage({ service, customerId });
  let title = '';
  if (transactionType === 'deposite') title = 'Deposite';
  if (transactionType === 'withdraw') title = 'WithDraw';
  return (
    <StateContainer state={state} onReloadClick={loadCustomerById}>
      <div
        className="table border-top-8 mt-4"
        style={{ borderRadius: 16, padding: 16 }}
      >
        <TableTitle
          title={`${title} for ${state.customer?.name ?? ''} '`}
          style={{ borderRadius: 16 }}
          verticalGap={8}
        />
        <Divder />

        <DepositeForm
          customer={state.customer!}
          transactionType={transactionType}
        />
      </div>
    </StateContainer>
  );
};

export default DepositePage;
