import StateContainer from '../../components/StateContainer/StateContainer';
import { usePrintPage } from './state/usePrintPage';
import { useContext } from 'react';
import { TransactionServiceContext } from '../../services/transaction-service/context/TransactionServiceContext';
import Table from '../../components/Table/Table';
import { Column } from '../../components/Table/model/Column';
import { Transaction } from '../../services/transaction-service/model/Transaction';
import PageHeader from '../../components/PageHeader/PageHeader';
import Gap from '../../components/Gap/Gap';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';

interface PrintPageProps {}

const PrintPage: React.FunctionComponent<PrintPageProps> = () => {
  const service = useContext(TransactionServiceContext)!;
  const { state, loadStatementData, fromDate, toDate } = usePrintPage({
    service,
  });
  const columns: Column<Transaction>[] = [
    {
      header: 'فهرس',
      key: 'id',
      isComputed: true,
      compute: (transaction) =>
        (state.transactions.indexOf(transaction) + 1).toString(),
    },
    {
      header: 'التاريخ',
      key: 'date',
    },
    {
      header: 'الرصيد قبل المعاملة',
      key: 'formattedSnapshot',
    },
    {
      header: 'نوع المعاملة',
      key: 'transactionTypeName',
      cellClassNames: ['has-text-weight-bold'],
    },
    {
      header: 'المبلغ',
      key: 'formattedAmount',
    },
    {
      header: 'الرصيد بعد المعاملة',
      key: 'formattedSnapshot',
      isComputed: true,
      compute: (transaction) => {
        let balance = 0;
        if (transaction.type === 'deposite') {
          balance = transaction.amount + transaction.balanceSnapshot;
        } else {
          balance = transaction.balanceSnapshot - transaction.amount;
        }

        return (
          balance.toLocaleString('en', {}) +
          ' ' +
          transaction.fromAccount.currency.symbol
        );
      },
    },
  ];
  const renderHeader = () => {
    return (
      <PageHeader pageTitle="كشف حساب">
        <Gap vertical={16} />
        <p>
          <span className="has-text-weight-bold">الاسم</span>
          <span>
            {' : '}
            {state.customer && state.customer!.name}
          </span>
        </p>
        <Gap vertical={8} />
        <p>
          <span className="has-text-weight-bold">التاريخ</span>
          <span>
            {' : '}
            {fromDate}-{toDate}
          </span>
        </p>
        <Gap vertical={8} />

        <p>
          <span className="has-text-weight-bold">الرصيد الحالي</span>
          <span>
            {' : '}
            {state.customer &&
              state.customer!.accounts.length > 0 &&
              state.customer!.accounts[0].formattedBalance}
          </span>
        </p>
        <Gap vertical={16} />
      </PageHeader>
    );
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <StateContainer
        state={state}
        onReloadClick={loadStatementData}
        onError={loadStatementData}
        renderHeader={renderHeader}
      >
        <Table
          columns={columns}
          rows={state.transactions}
          className="is-bordered is-striped is-narrow is-striped"
        />
        <button
          className="floating-button is-primary button"
          onClick={(e) => {
            window.print();
          }}
        >
          print
        </button>
      </StateContainer>
    </div>
  );
};

export default PrintPage;
