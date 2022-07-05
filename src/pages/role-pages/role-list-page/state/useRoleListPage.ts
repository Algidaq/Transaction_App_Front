import { IUserRoleService } from '../../../../services/user-role-service/UserRoleService';
import { useEffect, useState } from 'react';
import { RoleListPageState } from './RoleListPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Role } from '../../create-role-page/UserRoleForm';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { useNavigate } from 'react-router-dom';

export const useRoleListPage = ({ service }: { service: IUserRoleService }) => {
  const [state, setState] = useState(new RoleListPageState(StateEnum.idel));
  const navigateTo = useNavigate();
  useEffect(() => {
    async function getData() {
      await loadAllRoles();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllRoles = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const roles = await service.getAllRoles();
      setState((state) =>
        state.copyWith({
          stateEnum: roles.length > 0 ? StateEnum.success : StateEnum.empty,
          roles: roles,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  const showConfirmDialog = (role: Role) => {
    setState((state) =>
      state.copyWith({ showDialog: true, selectedRole: role })
    );
  };
  const handleOnDeleteConfrim = async () => {
    const oldRoles = [...state.roles];
    const role = oldRoles.find(
      (element) => element.id === state.selectedRole?.id
    );
    try {
      if (!role) return;
      const newRolesList = oldRoles.filter((element) => element.id !== role.id);
      setState((state) =>
        state.copyWith({
          roles: newRolesList,
          showDialog: false,
          stateEnum:
            newRolesList.length > 0 ? state.stateEnum : StateEnum.empty,
        })
      );
      const removedRole = await service.deleteRole(role.id);
      toast.success(`${removedRole.role} تم حذف `);
    } catch (e) {
      toast.error(getErrorMessage(e));
      console.log(e);
      setState((state) =>
        state.copyWith({
          roles: oldRoles,
          showDialog: false,
          stateEnum: StateEnum.success,
        })
      );
    }
  };
  const handleOnCancel = () => {
    setState((state) =>
      state.copyWith({ showDialog: false, selectedRole: undefined })
    );
  };
  const handleOnEmptyClick = () => {
    navigateTo('/users/roles/add');
  };
  return {
    state,
    loadAllRoles,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
    handleOnEmptyClick,
  };
};
