import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ConfirmDailog from '../../../components/ConfirmDialog/ConfirmDialog';
import FloatingActionButton from '../../../components/FloatingActionButton/FloatingActionButton';
import Gap from '../../../components/Gap/Gap';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import TableTitle from '../../../components/Table/TableTitle';
import { useUserListPage } from './state/useUserListPage';
import { UserServiceContext } from '../../../services/user-service/context/UserServiceContext';
import { User } from '../../../services/user-service/model/User';
interface UserListPageProps {}

const UserListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(UserServiceContext)!;
  const {
    state,
    loadAllUsers,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
  } = useUserListPage({
    service,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  const columns: Column<User>[] = [
    {
      header: 'Index',
      key: 'id',
      isComputed: true,
      compute: (user) => (state.users.indexOf(user) + 1).toString(),
    },
    { header: 'Name', key: 'name' },
    { header: 'Phone', key: 'phone' },
    {
      header: 'Role',
      key: 'role',
      isComputed: true,
      compute: (user) =>
        user.role.role !== 'N/A' ? user.role.role : 'User has no roles',
    },
    {
      header: 'Actions',
      key: 'id',
      isRenderable: true,
      render: (value: User) => {
        return (
          <div style={actionsStyle}>
            <Link to="/" className="button is-link is-inverted">
              Edit
            </Link>
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
      <StateContainer state={state} onReloadClick={loadAllUsers}>
        <div className="table-container border-top-8 mt-4">
          <TableTitle title="User Roles" />
          <Table columns={columns} rows={state.users} />
        </div>
        <FloatingActionButton to="/" />
      </StateContainer>
      <ConfirmDailog
        showDialog={state.showDialog}
        title="Delete"
        content={`Are you sure you want to delete ${state.selectedUser?.name}?`}
        onConfirm={handleOnDeleteConfrim}
        onCancel={handleOnCancel}
      />
    </>
  );
};

export default UserListPage;
