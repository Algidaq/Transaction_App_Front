import Container from '../../../../../components/Container/Container';
import { Customer } from '../../../../../services/customer-service/model/Customer';
import {
  useDepositeForm,
  validateDepositeSchema,
} from './state/useDepositeForm';
import React, { useContext } from 'react';
import { TransactionServiceContext } from '../../../../../services/transaction-service/context/TransactionServiceContext';
import { Form, Formik } from 'formik';
import Input from '../../../../../components/Input/Input';
import Gap from '../../../../../components/Gap/Gap';
import Button from '../../../../../components/Button/Button';
import { TransactionType } from '../../../../../types/TransactionType';
import { isNumOnly } from '../../../../../utils/utils';
interface DepositeFormProps {
  customer: Customer;
  transactionType: TransactionType;
}

const DepositeForm: React.FunctionComponent<DepositeFormProps> = ({
  customer,
  transactionType,
}) => {
  const service = useContext(TransactionServiceContext)!;
  const state = useDepositeForm({
    customer,
    service,
    transactionType,
  });
  return (
    <Container>
      <Formik
        initialValues={state.initialValues}
        onSubmit={state.handleOnFormSubmit}
        validationSchema={validateDepositeSchema}
        validate={(values) => {
          if (!values.fromAccount) return { fromAccount: 'اختر الحساب' };
          if (transactionType === 'deposite') {
            if (values.from === undefined || values.from?.trim().length < 3) {
              return { from: 'الحقل مطلوب' };
            }
          }
          return;
        }}
      >
        {(formik) => (
          <Form className="column is-6">
            <div className="is-fullwidth ">
              <label htmlFor="balance" className=" has-text-weight-semibold">
                رصيد الحساب
              </label>
              <div className="input">
                {state.selectedFromAccount.fromAccount?.formattedBalance}
              </div>
            </div>
            <Gap vertical={16} />
            <div className="is-fullwidth">
              <label
                htmlFor="fromAccount"
                className="label has-text-weight-semibold"
              >
                من/الى حساب
              </label>
              <select
                value={formik.values.fromAccount?.id}
                onChange={(e) =>
                  state.handleOnAccountChange(e.target.value, formik)
                }
                className="select is-block is-fullwidth"
              >
                {customer.accounts.map((account, index) => {
                  return (
                    <option
                      key={index}
                      value={account.id}
                    >{`حساب ${account.currency.name} `}</option>
                  );
                })}
              </select>

              {formik.errors.fromAccount && (
                <div>
                  <span className="is-size-6 has-text-danger">
                    please select account
                  </span>
                </div>
              )}
            </div>
            <Gap vertical={16} />
            <Input
              id="amount"
              name="amount"
              label="المبلغ"
              // placeholder={`Enter ${state.title} Amount`}
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
            {transactionType === 'deposite' && (
              <>
                <Gap vertical={16} />
                <Input
                  id="from"
                  name="from"
                  label="من"
                  placeholder="من"
                  maxLength={256}
                  minLength={1}
                  inputMode="text"
                  type="text"
                  errors={formik.errors}
                />
              </>
            )}
            <Gap vertical={16} />
            <Input
              id="comment"
              name="comment"
              label="التعليق"
              placeholder="التعليق"
              maxLength={256}
              minLength={1}
              inputMode="text"
              type="text"
              errors={formik.errors}
            />
            <Gap vertical={32} />
            <Button
              text={transactionType === 'deposite' ? 'إيداع' : 'سحب'}
              state={state.state.stateEnum}
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DepositeForm;
