import { useState, useEffect } from 'react';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { DepositePageState } from './DepositePageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { useParams } from 'react-router-dom';
export const useDepositePage = ({ service }: { service: ICustomerService }) => {
  const [state, setState] = useState(new DepositePageState(StateEnum.idel));
  const params = useParams();
  const customerId = params.id ?? 'N/A';
  useEffect(() => {
    async function getData() {
      loadCustomerById();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomerById = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const customer = await service.getCustomerById(customerId);

      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.success, customer })
      );
    } catch (e: any) {
      console.error(e);
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  return { state, loadCustomerById };
};
