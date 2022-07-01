import React from 'react';
import { Column } from '../../../components/Table/model/Column';
import { Role } from '../create-role-page/UserRoleForm';
import { useRoleListPage } from './state/useRoleListPage';
import { useContext } from 'react';
import { UserRoleServiceContext } from '../../../services/user-role-service/UserRoleServiceContext';
import TableTitle from '../../../components/Table/TableTitle';
import Table from '../../../components/Table/Table';
import StateContainer from '../../../components/StateContainer/StateContainer';
import FloatingActionButton from '../../../components/FloatingActionButton/FloatingActionButton';
import Gap from '../../../components/Gap/Gap';
import Button from '../../../components/Button/Button';
import ConfirmDailog from '../../../components/ConfirmDialog/ConfirmDialog';

interface RoleListPageProps {}

const RoleListPage: React.FunctionComponent<RoleListPageProps> = () => {
  const service = useContext(UserRoleServiceContext)!;
  const {
    state,
    loadAllRoles,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
  } = useRoleListPage({
    service,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  const columns: Column<Role>[] = [
    { header: 'ID', key: 'id' },
    {
      header: 'Role Name',
      key: 'role',
      isComputed: true,
      compute: (value) => value.role.toUpperCase(),
    },
    {
      header: 'Actions',
      key: 'id',
      isRenderable: true,
      render: (value: Role) => {
        return (
          <div style={actionsStyle}>
            {/* <Link to="/" className="button is-link is-inverted">
              Edit
            </Link> */}
            <Gap horizontal={16} vertical={0} />
            <Button
              text="delete"
              textButton
              color="is-danger"
              onClick={(e) => showConfirmDialog(value)}
              className="is-6"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <StateContainer state={state} onReloadClick={loadAllRoles}>
        <div className="table-container border-top-8 mt-4">
          <TableTitle title="User Roles" />
          <Table columns={columns} rows={state.roles} />
        </div>
        <FloatingActionButton to="/" />
      </StateContainer>
      <ConfirmDailog
        showDialog={state.showDialog}
        title="Delete"
        content={`Are you sure you want to delete ${state.selectedRole?.role}?`}
        onConfirm={handleOnDeleteConfrim}
        onCancel={handleOnCancel}
      />
    </>
  );
};

export default RoleListPage;
