import { useState, useEffect } from 'react';
import {
  ITransactionService,
  TransactionQueryParams,
} from '../../../../services/transaction-service/TransactionService';
import { TransactionListPageState } from './TransactionListPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { TransactionType } from '../../../../types/TransactionType';

export const useTransactionListPage = ({
  service,
}: {
  service: ITransactionService;
}) => {
  const [state, setState] = useState(
    new TransactionListPageState(StateEnum.idel)
  );
  const transactionTypes: { id: number; name: string }[] = [
    { id: 10, name: 'all' },
    { id: 1, name: 'Deposite' },
    { id: 2, name: 'Withdraw' },
    { id: 3, name: 'Global Transfer' },
    { id: 4, name: 'Local Transfer' },
  ];
  useEffect(() => {
    async function getData() {
      loadAllTransactions();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAllTransactions(params?: TransactionQueryParams) {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const { list: transactions } = await service.getAllTransactions(
        params ?? {}
      );
      setState((state) =>
        state.copyWith({
          stateEnum:
            transactions.length > 0 ? StateEnum.success : StateEnum.empty,
          transactions: transactions,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }
  const handleTransactionTypeChange = async (id: string) => {
    const transactionType = transactionTypes.find(
      (element) => element.id === Number.parseInt(id)
    );
    if (!transactionType) return;
    const type = getTransactionTypeFromSelection(transactionType);

    setState((state) =>
      state.copyWith({
        selectedTransactionType: transactionType,
        queryParams: { ...state.queryParams, type: type },
      })
    );
    await loadAllTransactions({ ...state.queryParams, type: type });
  };
  const handleOnDateChange = async (value: string) => {
    setState((state) =>
      state.copyWith({
        queryParams: { ...state.queryParams, date: value },
      })
    );
    await loadAllTransactions({ ...state.queryParams, date: value });
  };

  function getTransactionTypeFromSelection(type: {
    id: number;
    name: string;
  }): TransactionType | undefined {
    switch (type.id) {
      case 10:
        return;
      case 1:
        return 'deposite';
      case 2:
        return 'withdraw';
      case 3:
        return 'globalTransfer';
      case 4:
        return 'localeTransfer';
      default:
        return;
    }
  }

  return {
    state,
    loadAllTransactions,
    transactionTypes,
    handleTransactionTypeChange,
    handleOnDateChange,
  };
};
