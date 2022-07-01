import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ConfirmDailog from '../../../components/ConfirmDialog/ConfirmDialog';
import FloatingActionButton from '../../../components/FloatingActionButton/FloatingActionButton';
import Gap from '../../../components/Gap/Gap';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import TableTitle from '../../../components/Table/TableTitle';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { useCustomerListPage } from './state/useCustomerListPage';
import { Customer } from '../../../services/customer-service/model/Customer';
interface UserListPageProps {}

const CustomerListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(CustomerServiceContext)!;
  const {
    state,
    loadAllCustomers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
  } = useCustomerListPage({
    service,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  const renderCustomerActions = (value: Customer) => {
    return (
      <div style={actionsStyle}>
        <Link to="/" className="button is-link is-inverted">
          Edit
        </Link>
        <Gap horizontal={16} vertical={0} />

        <Link to="/" className="button is-link is-inverted">
          Add Accounts
        </Link>
        <Gap horizontal={16} vertical={0} />
        <Button
          text="delete"
          textButton
          color="is-danger"
          onClick={(e) => showConfirmDialog(value)}
          className="is-6"
        />
      </div>
    );
  };
  const renderCustomerAccounts = (customer: Customer) => {
    return (
      <div>
        {customer.accounts.length === 0 && <p>Customer Has No accounts</p>}
        {customer.accounts.length > 0 && (
          <select
            className="select"
            style={{ width: 200, maxWidth: 200 }}
            defaultValue={customer.accounts[0].id}
          >
            {customer.accounts.map((account, index) => (
              <option key={index} value={account.id}>
                {`${account.currency.name}\n${account.formattedBalance}`}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };
  const columns: Column<Customer>[] = [
    {
      header: 'Index',
      key: 'id',
      isComputed: true,
      compute: (customer) => (state.customers.indexOf(customer) + 1).toString(),
    },
    { header: 'Name', key: 'name' },
    { header: 'Phone', key: 'phone' },
    {
      header: 'Accounts',
      key: 'id',
      isRenderable: true,
      render: renderCustomerAccounts,
    },
    {
      header: 'Actions',
      key: 'id',
      isRenderable: true,
      render: renderCustomerActions,
    },
  ];

  return (
    <>
      <StateContainer state={state} onReloadClick={loadAllCustomers}>
        <div className="table-container border-top-8 mt-4">
          <TableTitle title="Customers" />
          <Table columns={columns} rows={state.customers} />
        </div>
        <FloatingActionButton to="/" />
      </StateContainer>
      <ConfirmDailog
        showDialog={state.showDialog}
        title="Delete"
        content={`Are you sure you want to delete ${state.selectedCustomer?.name}?`}
        onConfirm={handleOnDeleteConfrim}
        onCancel={handleOnCancel}
      />
    </>
  );
};

export default CustomerListPage;
