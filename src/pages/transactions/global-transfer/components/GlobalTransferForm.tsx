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
import { isNumOnly } from '../../../../utils/utils';

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
              labelText="اخنر الحساب"
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
              label="الملبغ"
              placeholder={`Enter Amount`}
              maxLength={56}
              minLength={1}
              inputMode="numeric"
              errors={formik.errors}
              onChange={(e) => {
                const value = e.target.value.replaceAll(',', '');
                const amount = isNumOnly(value)
                  ? parseFloat(value).toLocaleString('en')
                  : value;
                formik.setFieldValue('amount', amount);
              }}
            />
            <Gap vertical={16} />
            <Select
              value={viewmodel.state.toCurrency?.id}
              labelText="الي العملة"
              name="toCurrency"
              options={viewmodel.state.currencies}
              valueKey={'id'}
              firstOptionText="اختر العملة"
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
              label="سعر الصرف"
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
              label="التعليق"
              placeholder="Enter Comment"
              maxLength={256}
              minLength={1}
              inputMode="text"
              type="text"
              errors={formik.errors}
            />
            <Gap vertical={16} />
            <Button
              text="تحويل"
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
        رصيد الحساب
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
        <h6 className="is-3">معلومات المستلم</h6>
        <Divider
          style={{
            position: 'absolute',
            top: '50%',
            right: '0px',
            transform: 'translate(-50%,-50%)',
            height: 0.5,
            width: '70%',
            backgroundColor: '#DBDBDB',
          }}
        />
      </div>
      <div className="is-flex" style={{ flexDirection: 'row' }}>
        <Input
          id="fullName"
          name="fullName"
          label=""
          placeholder="ادخل اسم المستلم"
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
          placeholder="رقم الهاتف"
          maxLength={256}
          minLength={9}
          inputMode="text"
          type="text"
          errors={errors}
        />
      </div>
      <Gap vertical={16} />
      <div className="is-flex" style={{ flexDirection: 'row' }}>
        <Input
          id="bankAccount"
          name="bankAccount"
          label=""
          placeholder="رقم الحساب"
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
