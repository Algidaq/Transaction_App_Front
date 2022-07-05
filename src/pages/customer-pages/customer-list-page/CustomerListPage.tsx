import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ConfirmDailog from '../../../components/ConfirmDialog/ConfirmDialog';
import Gap from '../../../components/Gap/Gap';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { useCustomerListPage } from './state/useCustomerListPage';
import { Customer } from '../../../services/customer-service/model/Customer';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
import SearchInput from '../../../components/Search/SearchInput';
import Pagination from '../../../components/Pagination/Pagination';
interface UserListPageProps {}

const CustomerListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(CustomerServiceContext)!;
  const {
    state,
    loadAllCustomers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
    handleOnSearchSubmit,
    handleOnNextClick,
    handleOnPrevClick,
  } = useCustomerListPage({
    service,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };
  const renderCustomerActions = (value: Customer) => {
    return (
      <div style={actionsStyle}>
        <Link
          to={{
            pathname: `/customers/${value.id}/edit`,
          }}
          className="button is-link is-inverted  mt-2"
        >
          تعديل
        </Link>
        <Gap horizontal={8} vertical={0} />

        <Link
          to={{
            pathname: `/customers/${value.id}/accounts/add`,
          }}
          className="button is-link is-inverted  mt-2"
        >
           إضافة حساب
        </Link>
        <Gap horizontal={8} vertical={0} />
        <Button
          text="حذف"
          textButton
          color="is-danger"
          onClick={(e) => showConfirmDialog(value)}
          className="is-6 mt-2"
        />
      </div>
    );
  };

  const renderCustomerTransferAction = (value: Customer) => {
    if (value.accounts.length <= 0) return <div></div>;
    return (
      <div style={actionsStyle}>
        <Link
          to={`/transfer/deposite/${value.id}`}
          className="button is-link is-inverted  mt-2"
        >
          إيداع
        </Link>
        <Gap horizontal={8} vertical={0} />

        <Link
          to={`/transfer/withdraw/${value.id}`}
          className="button is-link is-inverted  mt-2"
        >
          سحب/خصم
        </Link>
        <Gap horizontal={8} vertical={0} />
        <Link
          to={`/transfer/global-transfer/${value.id}`}
          className="button is-link is-inverted mt-2"
        >
          تحويل
        </Link>
        <Gap horizontal={8} vertical={0} />
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
      header: 'فهرس',
      key: 'id',
      isComputed: true,
      compute: (customer) => (state.customers.indexOf(customer) + 1).toString(),
    },
    { header: 'اسم العميل', key: 'name' },
    { header: 'رقم الهاتف', key: 'phone' },
    {
      header: 'حسابات العميل',
      key: 'id',
      isRenderable: true,
      render: renderCustomerAccounts,
    },
    {
      header: 'تحويل',
      key: 'id',
      isRenderable: true,
      render: renderCustomerTransferAction,
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
      <PageHeader pageTitle="قائمة العملاء">
        <div className="is-flex">
          <SearchInput onSubmitSearch={handleOnSearchSubmit} />
        </div>
        <Gap horizontal={16} />

        <div style={{ position: 'fixed', right: '56px', top: '16px' }}>
          <Button
            textButton
            text="Referesh"
            onClick={(e) => loadAllCustomers()}
          />
        </div>
      </PageHeader>
    );
  };

  return (
    <>
      <StateContainer
        state={state}
        onReloadClick={(e) => loadAllCustomers()}
        style={pageStyle}
        className="is-fullheight"
        renderHeader={renderHeader}
      >
        <Table columns={columns} rows={state.customers} />
        <Pagination
          onNext={handleOnNextClick}
          onPrev={handleOnPrevClick}
          isNextDisabled={state.isNextDisabled}
          isPrevDisabled={state.isPrevDisabled}
        />
      </StateContainer>
      <ConfirmDailog
        showDialog={state.showDialog}
        title="حذف"
        content={`هل تريدد حذف العميل ${state.selectedCustomer?.name ?? ''} ?`}
        onConfirm={handleOnDeleteConfrim}
        onCancel={handleOnCancel}
      />
    </>
  );
};

export default CustomerListPage;
