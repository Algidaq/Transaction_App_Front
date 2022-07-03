import { useEffect, useState } from 'react';
import { UserListPageState } from './UserListPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import {
  IUserService,
  UserQueryParams,
} from '../../../../services/user-service/UserService';
import { User } from '../../../../services/user-service/model/User';
import { IUserRoleService } from '../../../../services/user-role-service/UserRoleService';
import { useSearchParams } from 'react-router-dom';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';

export const useUserListPage = ({
  service,
  roleService,
}: {
  service: IUserService;
  roleService: IUserRoleService;
}) => {
  const [state, setState] = useState(new UserListPageState(StateEnum.idel));

  useEffect(() => {
    async function getData() {
      await loadAllData();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAllData() {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const [{ list: users }, roles] = await Promise.all([
        service.getAllUsers({}),
        roleService.getAllRoles(),
      ]);
      const allRole = Role.fromJson({ id: -1, role: 'all' });
      setState((state) =>
        state.copyWith({
          stateEnum: users.length > 0 ? StateEnum.success : StateEnum.empty,
          users: users,
          roles: [allRole, ...roles],
          selectedRole: allRole,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }

  const loadAllUsers = async (params: UserQueryParams = {}) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const { list: users } = await service.getAllUsers({ ...params });
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

  const handleOnRoleChange = async (id: string) => {
    const roleId = Number.parseInt(id ?? '-1');
    const role = state.roles.find((element) => element.id === roleId);
    if (!role) return;
    setState((state) => state.copyWith({ selectedRole: role }));
    await loadAllUsers({ roleId: id === '-1' ? undefined : id });
  };

  const handleOnSearchSubmit = (search: string) => {
    const roleId =
      state.selectedRole?.id === -1 ? undefined : state.selectedRole?.id;
    loadAllUsers({
      roleId: roleId?.toString(),
      fullname: search,
      phone: search,
    });
  };
  return {
    state,
    loadAllUsers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
    handleOnRoleChange,
    loadAllData,
    handleOnSearchSubmit,
  };
};
