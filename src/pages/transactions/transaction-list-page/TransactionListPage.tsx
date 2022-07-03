import { useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import { useTransactionListPage } from './state/useTransactionListPage';
import { TransactionServiceContext } from '../../../services/transaction-service/context/TransactionServiceContext';
import { Transaction } from '../../../services/transaction-service/model/Transaction';
import TableTitle from '../../../components/Table/TableTitle';
import Gap from '../../../components/Gap/Gap';
import Select from '../../../components/Select/Select';
interface UserListPageProps {}

const TransactionListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(TransactionServiceContext)!;
  const {
    state,
    loadAllTransactions,
    transactionTypes,
    handleTransactionTypeChange,
    handleOnDateChange,
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
        <Link to="/" className="button is-link is-inverted">
          Details
        </Link>
      </div>
    );
  };
  const renderFromAccountColumn = (value: Transaction) => {
    return (
      <div>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">Customer:</span>
          <Link
            to="/"
            className="is-size-6"
          >{` ${value.fromCustomer.name}`}</Link>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">
            From Account:
          </span>
          <span className="is-size-6 has-text-link">{` Account ${value.fromAccount.currency.name}`}</span>
        </p>
      </div>
    );
  };
  const renderGlobalTransferInfo = (value: Transaction) => {
    return (
      <div>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">Customer:</span>
          <span className="is-size-6 has-text-info">{` ${value.transactionInfo.name}`}</span>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">Phone:</span>
          <span className="is-size-6 has-text-info">
            {` ${value.transactionInfo.phone}`}
          </span>
        </p>
        <p>
          <span className="is-size-6 has-text-weight-semibold ">
            Bank Account:
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
      header: 'Index',
      key: 'id',
      isComputed: true,
      compute: (transaction) =>
        (state.transactions.indexOf(transaction) + 1).toString(),
    },
    { header: 'Date', key: 'date' },
    {
      header: 'From',
      key: 'id',
      isRenderable: true,
      render: renderFromAccountColumn,
    },
    {
      header: 'Transaction Type',
      key: 'transactionTypeName',
      cellClassNames: ['is-size-6'],
    },
    {
      header: 'To',
      key: 'id',
      isRenderable: true,
      render: renderToAccountColumn,
    },
    {
      header: 'Transfer Amount',
      key: 'formattedAmount',
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },
    {
      header: 'Exchange Rate',
      key: 'formattedAmount',
      isComputed: true,
      compute: (value) => value.exchangeRate.rate.toString(),
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },
    {
      header: 'Exchanged Amount',
      key: 'id',
      isComputed: true,
      compute: (value) => value.exchangeRate.formattedExchangedAmount,
      cellClassNames: ['is-size-6', 'has-text-weight-semibold'],
    },

    {
      header: 'Actions',
      key: 'id',
      isRenderable: true,
      render: renderCustomerActions,
    },
  ];
  const renderHeader = () => {
    return (
      <>
        <div style={{ backgroundColor: 'white' }}>
          <h6 className="has-text-weight-semibold p-3">Transactions</h6>
          <Gap vertical={8} />
          <div className="px-3">
            <div className="is-flex">
              <Select
                options={transactionTypes}
                labelText="Select Transaction Type"
                valueKey={'id'}
                name="transaction"
                value={state.selectedTransactionType.id}
                renderContent={(value) => <label>{value.name ?? 'N/A'}</label>}
                onChange={(e) => handleTransactionTypeChange(e.target.value)}
                errors={{}}
              />
              <Gap horizontal={16} />
              <div>
                <label
                  htmlFor="date"
                  className="label has-text-weight-semibold"
                >
                  Filter by date
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
            </div>
          </div>
          <Gap vertical={36} />
        </div>
      </>
    );
  };

  return (
    <>
      <StateContainer
        state={state}
        onReloadClick={loadAllTransactions}
        renderHeader={renderHeader}
      >
        <div className="table-container border-top-8">
          <Table columns={columns} rows={state.transactions} />
        </div>
      </StateContainer>
    </>
  );
};

export default TransactionListPage;
