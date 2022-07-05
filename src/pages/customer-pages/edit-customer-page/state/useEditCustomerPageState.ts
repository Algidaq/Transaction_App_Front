/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import {
  EditCustomerPageState,
  EditCustomerForm,
} from './EditCustomerPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { getErrorMessage } from '../../../../utils/utils';
import { toast } from 'react-toastify';

export const useEditCustomerPage = ({
  service,
}: {
  service: ICustomerService;
}) => {
  const [state, setState] = useState(
    new EditCustomerPageState(StateEnum.idel, StateEnum.idel)
  );
  const [initialValues, setInitialValues] = useState<EditCustomerForm>({
    fullName: '',
    phone: '',
  });
  const customerId = useParams().id ?? 'N/A';
  useEffect(() => {
    async function getData() {
      await loadCustomer();
    }
    getData();
  }, []);

  async function loadCustomer() {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const customer = await service.getCustomerById(customerId);
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.success, customer })
      );
      setInitialValues({ fullName: customer.name, phone: customer.phone });
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }

  async function handleFormSubmit(
    values: EditCustomerForm,
    helpers: FormikHelpers<EditCustomerForm>
  ) {
    try {
      const body: EditCustomerForm = {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
      };
      setState((state) => state.copyWith({ formState: StateEnum.busy }));
      const customer = await service.updateCustomer(customerId, body);
      setState((state) =>
        state.copyWith({ formState: StateEnum.success, customer })
      );
      toast.success(`Customer ${customer.name} update successfully`);
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ formState: StateEnum.error, error: e })
      );
      toast.error(getErrorMessage(e));
    }
  }

  return { state, loadCustomer, initialValues, handleFormSubmit };
};
