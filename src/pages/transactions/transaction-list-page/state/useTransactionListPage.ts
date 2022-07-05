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
    { id: 10, name: 'الكل' },
    { id: 1, name: 'إيداع' },
    { id: 2, name: 'سحب/خصم' },
    { id: 3, name: 'نحويل' },
    { id: 4, name: 'Local Transfer' },
  ];
  useEffect(() => {
    async function getData() {
      loadAllTransactions();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAllTransactions(params: TransactionQueryParams = {}) {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const { list: transactions, queryParams } =
        await service.getAllTransactions(params);
      setState((state) =>
        state.copyWith({
          stateEnum:
            transactions.length > 0 ? StateEnum.success : StateEnum.empty,
          transactions: transactions,
          queryParams: { ...params, ...queryParams },
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }

  /// handle transaction type change
  const handleTransactionTypeChange = async (id: string) => {
    const transactionType = transactionTypes.find(
      (element) => element.id === Number.parseInt(id)
    );
    if (!transactionType) return;
    const type = getTransactionTypeFromSelection(transactionType);

    setState((state) =>
      state.copyWith({
        selectedTransactionType: transactionType,
      })
    );
    await loadAllTransactions({ ...state.queryParams, type: type, page: 1 });
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
  // handle on Date Change
  const handleOnDateChange = async (value: string) => {
    await loadAllTransactions({
      ...state.queryParams,
      date: value === '' ? undefined : value,
      page: 1,
    });
  };
  //handle onprev button taap
  const handleOnPrevClick = async () => {
    await loadAllTransactions({
      ...state.queryParams,
      page: (state.queryParams.currentPage ?? 2) - 1,
    });
  };
  //handle onnext button taap
  const handleOnNextClick = async () => {
    await loadAllTransactions({
      ...state.queryParams,
      page: state.queryParams.nextPage,
    });
  };

  return {
    state,
    loadAllTransactions,
    transactionTypes,
    handleTransactionTypeChange,
    handleOnDateChange,
    handleOnPrevClick,
    handleOnNextClick,
  };
};
