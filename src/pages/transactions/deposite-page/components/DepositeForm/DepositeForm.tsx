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
          if (values.fromAccount) return;
          return { fromAccount: 'From Account is required' };
        }}
      >
        {(formik) => (
          <Form className="column is-6">
            <div className="is-fullwidth ">
              <label htmlFor="balance" className=" has-text-weight-semibold">
                Account Balance
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
                Select Account
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
                    >{`Account ${account.currency.name}`}</option>
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
              label="Amount"
              placeholder={`Enter ${state.title} Amount`}
              maxLength={56}
              minLength={1}
              inputMode="numeric"
              errors={formik.errors}
            />
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
            <Gap vertical={32} />
            <Button
              text="Deposite"
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
