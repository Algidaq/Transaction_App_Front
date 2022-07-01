import { useEffect, useState } from 'react';
import { UserListPageState } from './UserListPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { IUserService } from '../../../../services/user-service/UserService';
import { User } from '../../../../services/user-service/model/User';

export const useUserListPage = ({ service }: { service: IUserService }) => {
  const [state, setState] = useState(new UserListPageState(StateEnum.idel));
  useEffect(() => {
    async function getData() {
      await loadAllUsers();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllUsers = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const { list: users } = await service.getAllUsers({});
      setState((state) =>
        state.copyWith({
          stateEnum: users.length > 0 ? StateEnum.success : StateEnum.empty,
          users: users,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  const showConfirmDialog = (user: User) => {
    setState((state) =>
      state.copyWith({ showDialog: true, selectedUser: user })
    );
  };
  const handleOnDeleteConfrim = async () => {
    const oldUsers = [...state.users];
    const user = oldUsers.find(
      (element) => element.id === state.selectedUser?.id
    );
    try {
      if (!user) return;
      const newUserList = oldUsers.filter((element) => element.id !== user.id);
      setState((state) =>
        state.copyWith({
          users: newUserList,
          showDialog: false,
          stateEnum: newUserList.length > 0 ? state.stateEnum : StateEnum.empty,
        })
      );
      const removedUser = await service.deleteUser(user.id);
      toast.success(`User ${removedUser.name} delete successfuly`);
    } catch (e) {
      toast.error(getErrorMessage(e));
      console.log(e);
      setState((state) =>
        state.copyWith({
          users: oldUsers,
          showDialog: false,
          stateEnum: StateEnum.success,
        })
      );
    }
  };
  const handleOnCancel = () => {
    setState((state) =>
      state.copyWith({ showDialog: false, selectedUser: undefined })
    );
  };
  return {
    state,
    loadAllUsers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
  };
};
