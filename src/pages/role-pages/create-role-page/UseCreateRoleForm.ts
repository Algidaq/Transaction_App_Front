import { useState } from 'react';
import { FormikHelpers } from 'formik';
import { CreateUserRoleForm, Role } from './UserRoleForm';
import { StateEnum } from '../../../enums/StateEnum';

import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/utils';
import { BaseState } from '../../../base/BaseState';
import { IUserRoleService } from '../../../services/user-role-service/UserRoleService';

export const useCreateRoleForm = (roleService: IUserRoleService) => {
  const [state, setState] = useState<CreateUserRoleState>(
    new CreateUserRoleState(StateEnum.idel)
  );
  const initialValues: CreateUserRoleForm = { role: '' };
  const handleFormSubmit = async (
    values: CreateUserRoleForm,
    helpers: FormikHelpers<CreateUserRoleForm>
  ) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const role = await roleService.createUserRole(values);
      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));

      toast.success(`Role ${role.role} was created successfully`);
      helpers.resetForm();
    } catch (e: any) {
      const message = getErrorMessage(e);
      toast.error(message ?? 'An Error Occured');
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
    }
  };

  return { initialValues, handleFormSubmit, state };
};
useCreateRoleForm.prototype = function getData() {
  console.log('Data');
};

class CreateUserRoleState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly role?: Role,
    error?: Object
  ) {
    super(stateEnum, error);
  }

  copyWith({
    stateEnum,
    role,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    role?: Role;
    error?: Object | undefined;
  }): CreateUserRoleState {
    return new CreateUserRoleState(
      stateEnum ?? this.stateEnum,
      role ?? this.role,
      error ?? this.error
    );
  }
}
