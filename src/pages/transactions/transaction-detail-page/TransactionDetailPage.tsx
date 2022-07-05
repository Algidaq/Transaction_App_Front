import { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import PageHeader from '../../../components/PageHeader/PageHeader';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { TransactionServiceContext } from '../../../services/transaction-service/context/TransactionServiceContext';
import { useTransactionDetailPage } from './state/useTransactionDetailPage';
import { pageStyle } from '../../../utils/utils';
import Gap from '../../../components/Gap/Gap';
interface TransactionDetailProps {}

const TransactionDetail: React.FunctionComponent<
  TransactionDetailProps
> = () => {
  const service = useContext(TransactionServiceContext)!;
  const viewmodel = useTransactionDetailPage({ service });
  const renderHeader = () => {
    return (
      <PageHeader
        pageTitle={`تفاصيل المعاملة #${viewmodel.state.transaction?.id ?? ''}`}
      >
        <Divder />
      </PageHeader>
    );
  };

  return (
    <StateContainer
      state={viewmodel.state}
      onError={viewmodel.loadTransaction}
      onReloadClick={viewmodel.loadTransaction}
      renderHeader={renderHeader}
      style={pageStyle}
    >
      <TransactionDetailItem
        title={'تاريخ المعملة'}
        value={`${viewmodel.state.transaction?.date ?? ''}`}
      />
      <TransactionDetailItem
        title={'إسم العميل'}
        value={`${viewmodel.state.transaction?.fromCustomer.name ?? ''}`}
      />
      <TransactionDetailItem
        title={'من حساب'}
        value={`حساب ${
          viewmodel.state.transaction?.fromAccount.currency.name ?? ''
        }`}
      />
      <TransactionDetailItem
        title={'نوع العملية'}
        value={`${viewmodel.state.transaction?.transactionTypeName ?? ''}`}
      />
      <TransactionDetailItem
        title={'الرصيد قبل المعاملة'}
        value={`${viewmodel.state.transaction?.formattedSnapshot ?? ''}`}
      />
      <TransactionDetailItem
        title={'قيمة التحويل'}
        value={`${viewmodel.state.transaction?.formattedAmount ?? ''}`}
      />

      <TransactionDetailItem
        title={'إلى العملة'}
        value={`${
          viewmodel.state.transaction?.exchangeRate.toCurrency.name ?? ''
        }`}
      />
      <TransactionDetailItem
        title={'سعر الصرف'}
        value={`${
          viewmodel.state.transaction?.exchangeRate.formattedRate ?? ''
        }`}
      />
      <TransactionDetailItem
        title={'المبلغ المتبادل'}
        value={`${
          viewmodel.state.transaction?.exchangeRate.formattedExchangedAmount ??
          ''
        }`}
      />
      {viewmodel.state.transaction?.type === 'globalTransfer' && (
        <TransactionDetailItem
          title={'إلى اسم العميل'}
          value={`${viewmodel.state.transaction?.transactionInfo.name}`}
        />
      )}
      {viewmodel.state.transaction?.type === 'globalTransfer' && (
        <TransactionDetailItem
          title={'إلى رقم الهاتف'}
          value={`${viewmodel.state.transaction?.transactionInfo.phone}`}
        />
      )}
      {viewmodel.state.transaction?.type === 'globalTransfer' && (
        <TransactionDetailItem
          title={'رقم الحساب المصرفي'}
          value={`${viewmodel.state.transaction?.transactionInfo.bankAccount}`}
        />
      )}
    </StateContainer>
  );
};

interface TransactionDetailItemProps {
  title: string;
  value: string;
}

const TransactionDetailItem: React.FunctionComponent<
  TransactionDetailItemProps
> = ({ title, value }) => {
  return (
    <>
      <div className="columns my-0">
        <div className="column is-2">
          <header className="has-text-weight-semibold">{title}</header>
        </div>
        <Gap horizontal={8} />
        <div className="column is-4">
          <p>{value}</p>
        </div>
      </div>
      {/* <div className="column is-6">
        <Divder />
      </div> */}
    </>
  );
};

export default TransactionDetail;
