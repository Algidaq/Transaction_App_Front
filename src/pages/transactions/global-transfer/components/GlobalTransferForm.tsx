import { Currency } from '../../../../services/currency-service/model/Currency';
import { Customer } from '../../../../services/customer-service/model/Customer';
import { useContext } from 'react';
import { TransactionServiceContext } from '../../../../services/transaction-service/context/TransactionServiceContext';
import {
  useGlobalTransferForm,
  globalTransferValidationSchema,
  IGlobalTransferFrom,
} from './useGlobalTransferForm';
import Container from '../../../../components/Container/Container';
import { Form, Formik, FormikErrors } from 'formik';
import Button from '../../../../components/Button/Button';
import Gap from '../../../../components/Gap/Gap';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import Divider from '../../../../components/Divider/Divider';

interface GlobalTransferFormProps {
  currencies: Currency[];
  customer: Customer;
}

const GlobalTransferForm: React.FunctionComponent<GlobalTransferFormProps> = ({
  customer,
  currencies,
}) => {
  const service = useContext(TransactionServiceContext)!;
  const viewmodel = useGlobalTransferForm({ customer, service, currencies });

  return (
    <Container>
      <Formik
        initialValues={viewmodel.initialValues}
        onSubmit={viewmodel.handleOnFormSubmit}
        validationSchema={globalTransferValidationSchema}
        validate={viewmodel.handleFormValidation}
      >
        {(formik) => (
          <Form
            className="column is-6"
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <FromAccountBalance
              balance={viewmodel.state.fromAccount?.formattedBalance}
            />
            <Gap vertical={16} />
            <Select
              value={viewmodel.state.fromAccount?.id}
              labelText="Select From Account"
              name="fromAccount"
              options={customer.accounts}
              valueKey={'id'}
              renderContent={(item) => `Account ${item.currency.name}`}
              errors={formik.errors}
              errorText={'From Account is Required'}
              onChange={(e) =>
                viewmodel.handleOnFromAccountChange(e.target.value, formik)
              }
            />
            <Gap vertical={16} />
            <Input
              id="amount"
              name="amount"
              label="Amount"
              placeholder={`Enter Amount`}
              maxLength={56}
              minLength={1}
              inputMode="numeric"
              errors={formik.errors}
            />
            <Gap vertical={16} />
            <Select
              value={viewmodel.state.toCurrency?.id}
              labelText="Select To Currency"
              name="toCurrency"
              options={viewmodel.state.currencies}
              valueKey={'id'}
              renderContent={(item) => `${item.name} ${item.symbol}`}
              errors={formik.errors}
              errorText={'To Currency is Required'}
              onChange={(e) =>
                viewmodel.handleOnToCurrencyChange(
                  Number.parseInt(e.target.value),
                  formik
                )
              }
            />
            <Gap vertical={16} />

            <Input
              id="rate"
              name="rate"
              label="Exchange Rate"
              placeholder="Enter Exchange Rate"
              maxLength={56}
              minLength={1}
              inputMode="numeric"
              errors={formik.errors}
              onKeyDown={(e) =>
                viewmodel.handleExchangeRateKeyDown(e.key, formik)
              }
            />
            {
              <div>
                <span className="is-size-7">
                  {viewmodel.getExchangedAmount(formik)}
                </span>
              </div>
            }
            <Gap vertical={16} />
            <CustomerInfoForm errors={formik.errors} />
            <Gap vertical={16} />
            <Input
              id="comment"
              name="comment"
              label="Comment"
              placeholder="Enter Comment"
              maxLength={256}
              minLength={1}
              inputMode="text"
              type="text"
              errors={formik.errors}
            />
            <Gap vertical={16} />
            <Button
              text="Transfer"
              state={viewmodel.state.stateEnum}
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

interface FromAccountBalanceProps {
  balance?: string;
}

const FromAccountBalance: React.FunctionComponent<FromAccountBalanceProps> = ({
  balance,
}) => {
  return (
    <div className="is-fullwidth ">
      <label htmlFor="balance" className=" has-text-weight-semibold">
        Account Balance
      </label>
      <div className="input">{balance ?? 'N/A'}</div>
    </div>
  );
};

interface CustomerInfoFormProps {
  errors: FormikErrors<IGlobalTransferFrom>;
}

const CustomerInfoForm: React.FunctionComponent<CustomerInfoFormProps> = ({
  errors,
}) => {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <h6 className="is-3">Customer Info</h6>
        <Divider
          style={{
            position: 'absolute',
            top: '50%',
            left: 'calc(50% + 58px)',
            transform: 'translate(-50%,-50%)',
            height: 0.5,
            width: '70%',
            backgroundColor: '#DBDBDB',
          }}
        />
      </div>
      <div className="is-flex">
        <Input
          id="fullName"
          name="fullName"
          label=""
          placeholder="Enter Customer Name"
          maxLength={256}
          minLength={3}
          inputMode="text"
          type="text"
          errors={errors}
        />
        <Gap horizontal={16} />
        <Input
          id="phone"
          name="phone"
          label=""
          placeholder="Enter Customer phone"
          maxLength={256}
          minLength={9}
          inputMode="text"
          type="text"
          errors={errors}
        />
      </div>
      <Gap vertical={16} />
      <div className="is-flex">
        <Input
          id="bankAccount"
          name="bankAccount"
          label=""
          placeholder="Bank Account"
          maxLength={256}
          minLength={4}
          inputMode="text"
          type="text"
          errors={errors}
        />
      </div>
    </div>
  );
};

export default GlobalTransferForm;
