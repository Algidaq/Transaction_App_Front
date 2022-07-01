import { useEffect, useState } from 'react';
import { CustomerListPageState } from './CustomerListPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { Customer } from '../../../../services/customer-service/model/Customer';

export const useCustomerListPage = ({
  service,
}: {
  service: ICustomerService;
}) => {
  const [state, setState] = useState(new CustomerListPageState(StateEnum.idel));
  useEffect(() => {
    async function getData() {
      await loadAllCustomers();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllCustomers = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const { list: customers } = await service.getAllCustomers({});
      setState((state) =>
        state.copyWith({
          stateEnum: customers.length > 0 ? StateEnum.success : StateEnum.empty,
          customers: customers,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  const showConfirmDialog = (user: Customer) => {
    setState((state) =>
      state.copyWith({ showDialog: true, selectedCustomer: user })
    );
  };
  const handleOnDeleteConfrim = async () => {
    const oldCustomers = [...state.customers];
    const customer = oldCustomers.find(
      (element) => element.id === state.selectedCustomer?.id
    );
    try {
      if (!customer) return;
      const newCustomersList = oldCustomers.filter(
        (element) => element.id !== customer.id
      );
      setState((state) =>
        state.copyWith({
          customers: newCustomersList,
          showDialog: false,
          stateEnum:
            newCustomersList.length > 0 ? state.stateEnum : StateEnum.empty,
        })
      );
      const removedCustomer = await service.deleteCustomer(customer.id);
      toast.success(`Customer ${removedCustomer.name} delete successfuly`);
    } catch (e) {
      toast.error(getErrorMessage(e));
      console.log(e);
      setState((state) =>
        state.copyWith({
          customers: oldCustomers,
          showDialog: false,
          stateEnum: StateEnum.success,
        })
      );
    }
  };
  const handleOnCancel = () => {
    setState((state) =>
      state.copyWith({ showDialog: false, selectedCustomer: undefined })
    );
  };
  return {
    state,
    loadAllCustomers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
  };
};
