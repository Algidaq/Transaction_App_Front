import { pageStyle } from '../../../utils/utils';
import { useContext } from 'react';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { useAddCustomerAccountPage } from './state/useAddCustomerAccountPage';
import StateContainer from '../../../components/StateContainer/StateContainer';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Divider from '../../../components/Divider/Divider';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Gap from '../../../components/Gap/Gap';

interface AddCustomerAccountProps {}

const AddCustomerAccountPage: React.FunctionComponent<
  AddCustomerAccountProps
> = () => {
  const customerService = useContext(CustomerServiceContext)!;
  const currencyService = useContext(CurrencyServiceContext)!;
  const viewmodel = useAddCustomerAccountPage({
    currencyService,
    customerService,
  });
  const renderHeader = () => {
    return (
      <PageHeader
        pageTitle={`Add Account To  ${viewmodel.state.customer?.name ?? ''}`}
      >
        <Divider />
      </PageHeader>
    );
  };

  return (
    <StateContainer
      state={viewmodel.state}
      onReloadClick={viewmodel.loadAllData}
      onEmptyClick={viewmodel.handleOnEmptyClick}
      onError={viewmodel.loadAllData}
      style={pageStyle}
      renderHeader={renderHeader}
    >
      <div className="column is-6">
        <Select
          id="currency"
          name="currency"
          labelText="Select Currency"
          options={viewmodel.state.currencies}
          value={viewmodel.state.selectedCurrency?.id}
          onChange={(e) => viewmodel.handleOnCurrencyChange(e.target.value)}
          renderContent={(value) => value.name + ' ' + value.symbol}
          valueKey={'id'}
          errors={{}}
        />
        <Gap vertical={16} />
        <Button
          text="Add New Account"
          onClick={viewmodel.addCustomerAccount}
          disabled={viewmodel.state.isButtonDisabled}
          state={viewmodel.state.formState}
        />
      </div>
    </StateContainer>
  );
};

export default AddCustomerAccountPage;
