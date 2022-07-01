import React, { useEffect, useState } from 'react';
import { IUserRoleService } from '../../../../services/user-role-service/UserRoleService';
import { StateEnum } from '../../../../enums/StateEnum';
import { CreateUserPageState } from './UseCreateUserPageState';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { CreateUserPageForm } from './CreateUserPageForm';
import { FormikHelpers } from 'formik';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
import { IUserService } from '../../../../services/user-service/UserService';
import { IPostUser } from '../../../../services/user-service/model/User';

export const useCreateUserPageState = ({
  roleService,
  userService,
}: {
  roleService: IUserRoleService;
  userService: IUserService;
}) => {
  const initialValues: CreateUserPageForm = {
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: undefined,
  };
  const [state, setState] = useState<CreateUserPageState>(
    new CreateUserPageState(StateEnum.idel)
  );

  const componentWillMount = (): void => {
    loadUserRoles();
  };
  useEffect(componentWillMount, []);

  const loadUserRoles = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const roles = await roleService.getAllRoles();
      setState((state) =>
        state.copyWith({
          stateEnum: roles.length > 0 ? StateEnum.success : StateEnum.empty,
          roles: roles,
        })
      );
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
      console.error(e);
    }
  };
  const handleFormSubmit = async (
    values: CreateUserPageForm,
    helpers: FormikHelpers<CreateUserPageForm>
  ) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));

      const postUser: IPostUser = {
        fullName: values.fullName,
        password: values.password,
        phone: values.phone,
        role: values.role!.toJson(),
      };
      const user = await userService.addNewUser(postUser);
      helpers.resetForm();
      toast.success(`User ${user.name} has been created successfully`);
      setTimeout(
        () =>
          setState((state) => state.copyWith({ stateEnum: StateEnum.success })),
        2000
      );
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleOnRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Role | undefined => {
    const selectedRoleId = Number.parseInt(e.target.value ?? '-1');
    const role = state.roles.find((role) => role.id === selectedRoleId);
    if (!role) return;
    return role;
  };

  return { state, initialValues, handleFormSubmit, handleOnRoleChange };
};
