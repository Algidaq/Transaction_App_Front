import { useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import { useTransactionListPage } from './state/useTransactionListPage';
import { TransactionServiceContext } from '../../../services/transaction-service/context/TransactionServiceContext';
import { Transaction } from '../../../services/transaction-service/model/Transaction';
import Gap from '../../../components/Gap/Gap';
import Select from '../../../components/Select/Select';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Pagination from '../../../components/Pagination/Pagination';
import SearchInput from '../../../components/Search/SearchInput';
interface UserListPageProps {}

const TransactionListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(TransactionServiceContext)!;
  const {
    state,
    loadAllTransactions,
    transactionTypes,
    handleTransactionTypeChange,
    handleOnDateChange,
    handleOnNextClick,
    handleOnPrevClick,
    handleOnSearchSubmit,
  } = useTransactionListPage({
    service,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };
  const renderCustomerActions = (value: Transaction) => {
    return (
      <div style={actionsStyle}>
        <Link
          to={`/transactions/${value.id}`}
          className="button is-link is-inverted"
        >
          تفاصيل المعاملة
        </Link>
      </div>
    );
  };
  const renderFromAccountColumn = (value: Transaction) => {
    return (
      <div>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">العميل :</span>
          <span className="is-size-6 has-text-link">{` ${value.fromCustomer.name}`}</span>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">من :</span>
          <span className="is-size-6 has-text-link">{` حساب ${value.fromAccount.currency.name}`}</span>
        </p>
      </div>
    );
  };
  const renderGlobalTransferInfo = (value: Transaction) => {
    return (
      <div>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">المستلم :</span>
          <span className="is-size-6 has-text-info">{` ${value.transactionInfo.name}`}</span>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">
            رقم الهاتف :
          </span>
          <span className="is-size-6 has-text-info">
            {` ${value.transactionInfo.phone}`}
          </span>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">
            رقم الحساب
          </span>
          <span className="is-size-6 has-text-info">
            {` ${value.transactionInfo.bankAccount}`}
          </span>
        </p>
      </div>
    );
  };
  const renderToAccountColumn = (value: Transaction) => {
    if (value.type === 'deposite') return renderFromAccountColumn(value);
    if (value.type === 'withdraw') return renderFromAccountColumn(value);
    if (value.type === 'globalTransfer') return renderGlobalTransferInfo(value);
    return <div></div>;
  };

  const columns: Column<Transaction>[] = [
    {
      header: 'فهرس',
      key: 'id',
      isComputed: true,
      compute: (transaction) =>
        (state.transactions.indexOf(transaction) + 1).toString(),
    },
    { header: 'التاريخ', key: 'date' },
    {
      header: 'من',
      key: 'id',
      isRenderable: true,
      render: renderFromAccountColumn,
    },
    {
      header: 'نوع العملية',
      key: 'transactionTypeName',
      cellClassNames: ['is-size-6'],
    },
    {
      header: 'الى',
      key: 'id',
      isRenderable: true,
      render: renderToAccountColumn,
    },
    {
      header: 'المبلغ',
      key: 'formattedAmount',
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },
    {
      header: 'سعر الصرف',
      key: 'formattedAmount',
      isComputed: true,
      compute: (value) => value.exchangeRate.rate.toString(),
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },
    {
      header: 'المبلغ المتبادل',
      key: 'id',
      isComputed: true,
      compute: (value) => value.exchangeRate.formattedExchangedAmount,
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },
    {
      header: 'التعليق',
      key: 'comment',
      isComputed: true,
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },

    {
      header: 'العمليات',
      key: 'id',
      isRenderable: true,
      render: renderCustomerActions,
    },
  ];
  const renderHeader = () => {
    return (
      <PageHeader pageTitle="قائمةالمعاملات">
        <div className="is-flex is-fullwidth" style={{ flexDirection: 'row' }}>
          <Select
            options={transactionTypes}
            labelText="تصفية حسب نوع المعاملة"
            valueKey={'id'}
            name="transaction"
            value={state.selectedTransactionType.id}
            renderContent={(value) => value.name ?? 'N/A'}
            onChange={(e) => handleTransactionTypeChange(e.target.value)}
            errors={{}}
          />
          <Gap horizontal={16} />
          <div>
            <label htmlFor="date" className="label has-text-weight-semibold">
              تصفية حسب التارييخ
            </label>
            <input
              name="date"
              id="date"
              type="date"
              className="input"
              style={{ height: 33.3 }}
              onChange={(e) => handleOnDateChange(e.target.value)}
            />
          </div>
          <Gap horizontal={16} />
          <SearchInput onSubmitSearch={handleOnSearchSubmit} />
        </div>
        <Gap vertical={16} />
      </PageHeader>
    );
  };

  return (
    <>
      <StateContainer
        state={state}
        onReloadClick={(e) => loadAllTransactions()}
        renderHeader={renderHeader}
        style={pageStyle}
      >
        <Table columns={columns} rows={state.transactions} />
        <Pagination
          onNext={handleOnNextClick}
          onPrev={handleOnPrevClick}
          isPrevDisabled={state.isPrevDisabled}
          isNextDisabled={state.isNextDisabled}
        />
      </StateContainer>
    </>
  );
};

export default TransactionListPage;
