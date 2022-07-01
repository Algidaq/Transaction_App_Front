import {
  ITransactionService,
  IPostDeposite,
} from '../../../../../../services/transaction-service/TransactionService';
import { CustomerAccount } from '../../../../../../services/customer-service/model/Account';
import * as Yup from 'yup';
import { Customer } from '../../../../../../services/customer-service/model/Customer';
import { FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import { DepositeFormState } from './DepositeFormState';
import { StateEnum } from '../../../../../../enums/StateEnum';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../../../utils/utils';
import { TransactionType } from '../../../../../../types/TransactionType';
import { Transaction } from '../../../../../../services/transaction-service/model/Transaction';
export const useDepositeForm = ({
  service,
  customer,
  transactionType,
}: {
  service: ITransactionService;
  customer: Customer;
  transactionType: TransactionType;
}) => {
  let title = transactionType === 'deposite' && 'Deposite';
  title = transactionType === 'withdraw' && 'WithDraw';
  // handle form state
  const [state, setState] = useState(
    new DepositeFormState(StateEnum.idel, customer)
  );
  // handle selected from account state
  const [selectedFromAccount, setSelectedFromAccount] = useState({
    fromAccount:
      customer.accounts.length > 0 ? customer.accounts[0] : undefined,
  });
  // initializing Form
  const initialValues: IDepositeForm = {
    fromAccount:
      customer.accounts.length > 0 ? customer.accounts[0] : undefined,
    amount: 0,
    comment: '',
  };
  const getDeposite = (values: IDepositeForm): IPostDeposite => {
    return {
      amount: values.amount,
      customer: customer.toGetJson(),
      fromAccount: values.fromAccount!.toGetJson(),
      comment:
        values.comment === '' || !values.comment ? 'N/A' : values.comment,
    };
  };
  // handle form Submition
  const handleOnFormSubmit = async (
    values: IDepositeForm,
    helpers: FormikHelpers<IDepositeForm>
  ) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const deposite: IPostDeposite = getDeposite(values);
      if (transactionType === 'deposite') await handleDeposite(deposite);
      if (transactionType === 'withdraw') await handleWithdraw(deposite);
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
    } finally {
      helpers.resetForm();
    }
  };

  const handleDeposite = async (deposite: IPostDeposite) => {
    try {
      let transaction: Transaction = await service.handleDeposite(deposite);
      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));
      toast.success(
        `${deposite.amount.toLocaleString()} was ${title} successfuly from Customer Account`
      );
      setSelectedFromAccount({ fromAccount: transaction.fromAccount });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const handleWithdraw = async (deposite: IPostDeposite) => {
    try {
      let transaction: Transaction = await service.handleWithdraw(deposite);
      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));
      toast.success(
        `${deposite.amount.toLocaleString()} was ${title} successfuly from Customer Account`
      );
      setSelectedFromAccount({ fromAccount: transaction.fromAccount });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /// handle selected account changes
  const handleOnAccountChange = (
    id: string,
    formik: FormikProps<IDepositeForm>
  ) => {
    const account = customer.accounts.find((element) => element.id === id);
    if (!account) return;
    formik.setFieldValue('fromAccount', account);
    setSelectedFromAccount({ fromAccount: account });
  };
  return {
    initialValues,
    state,
    selectedFromAccount,
    title,
    handleOnFormSubmit,
    handleOnAccountChange,
  };
};

export interface IDepositeForm {
  fromAccount?: CustomerAccount;
  amount: number;
  comment?: string;
}

export const validateDepositeSchema = Yup.object({
  fromAccount: Yup.object({ id: Yup.string().required() }),
  amount: Yup.number()
    .required('Amount is required')
    .moreThan(0, 'Can not be less than 0'),
  comment: Yup.string(),
});
