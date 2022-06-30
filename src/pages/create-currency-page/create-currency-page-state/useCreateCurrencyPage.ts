import { CreateCurrencyPageState } from './CreateCurrencyPageState';
import { StateEnum } from '../../../enums/StateEnum';
import { CreateCurrencyPageForm } from './CreateCurrencyPageForm';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/utils';
import React from 'react';
import { ICurrencyService } from '../../../services/currency-service/CurrencyService';
import { IPostCurrency } from '../../../services/currency-service/model/Currency';
export const useCreateCurrencyPage = ({
  service,
}: {
  service: ICurrencyService;
}) => {
  const initialValues: CreateCurrencyPageForm = { name: '', symbol: '' };
  const [state, setState] = React.useState(
    new CreateCurrencyPageState(StateEnum.idel)
  );
  const handleOnFormSubmit = async (
    values: CreateCurrencyPageForm,
    helpers: FormikHelpers<CreateCurrencyPageForm>
  ) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const postCurrency: IPostCurrency = {
        name: values.name,
        symbol: values.symbol,
      };
      const currency = await service.addNewCurrency(postCurrency);
      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));
      helpers.resetForm();
      toast.success(`Currency ${currency.name} was Created Successfull`);
    } catch (e: any) {
      toast.error(getErrorMessage(e));
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  return { state, initialValues, handleOnFormSubmit };
};
