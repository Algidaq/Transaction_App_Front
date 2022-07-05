import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ConfirmDailog from '../../../components/ConfirmDialog/ConfirmDialog';
import Gap from '../../../components/Gap/Gap';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import Table from '../../../components/Table/Table';
import { useUserListPage } from './state/useUserListPage';
import { UserServiceContext } from '../../../services/user-service/context/UserServiceContext';
import { User } from '../../../services/user-service/model/User';
import { pageStyle } from '../../../utils/utils';
import { UserRoleServiceContext } from '../../../services/user-role-service/UserRoleServiceContext';
import Select from '../../../components/Select/Select';
import SearchInput from '../../../components/Search/SearchInput';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Pagination from '../../../components/Pagination/Pagination';
interface UserListPageProps {}

const UserListPage: React.FunctionComponent<UserListPageProps> = () => {
  const service = useContext(UserServiceContext)!;
  const roleService = useContext(UserRoleServiceContext)!;
  const {
    state,
    showConfirmDialog,
    handleOnDeleteConfrim,
    handleOnCancel,
    handleOnRoleChange,
    loadAllData,
    handleOnSearchSubmit,
    handleNavigationToAddUserPage,
    handleOnPrePage,
    handleOnNextPage,
  } = useUserListPage({
    service,
    roleService,
  });
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  };
  const columns: Column<User>[] = [
    {
      header: 'فهرس',
      key: 'id',
      isComputed: true,
      compute: (user) => (state.users.indexOf(user) + 1).toString(),
    },
    { header: 'الاسم', key: 'name' },
    { header: 'رقمم الهاتف', key: 'phone' },
    {
      header: 'المسؤلية',
      key: 'role',
      isComputed: true,
      compute: (user) => (user.role.role !== 'N/A' ? user.role.role : 'لايوجد'),
    },
    {
      header: 'العمليات',
      key: 'id',
      isRenderable: true,
      render: (value: User) => {
        return (
          <div style={actionsStyle}>
            <Link to="/" className="button is-link is-inverted">
              تعديل
            </Link>
            <Gap horizontal={16} vertical={0} />
            <Button
              text="حذف"
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

  const renderHeader = (): React.ReactNode => {
    return (
      <PageHeader pageTitle="قائمة المستخدمين">
        <div className="is-flex">
          <Select
            id="role"
            name="role"
            labelText="التصفية حسب المسؤلية"
            options={state.roles}
            value={state.selectedRole?.id}
            renderContent={(item) => item.role}
            valueKey={'id'}
            errors={{}}
            onChange={(e) => handleOnRoleChange(e.target.value)}
            style={{ width: '200px' }}
          />
          <Gap horizontal={16} />
          <SearchInput onSubmitSearch={handleOnSearchSubmit} />
        </div>
        <Gap vertical={36} />
      </PageHeader>
    );
  };

  return (
    <>
      <StateContainer
        state={state}
        onReloadClick={loadAllData}
        style={pageStyle}
        renderHeader={renderHeader}
        onEmptyClick={handleNavigationToAddUserPage}
      >
        <Table columns={columns} rows={state.users} />
        <Gap vertical={16} />
        <Pagination
          onNext={handleOnNextPage}
          onPrev={handleOnPrePage}
          isNextDisabled={state.isNextPageDisabled}
          isPrevDisabled={state.isPreviousePageDisabled}
        />
      </StateContainer>
      <ConfirmDailog
        showDialog={state.showDialog}
        title="حذف"
        content={`هل تريد حذف ${state.selectedUser?.name ?? ''} ?`}
        onConfirm={handleOnDeleteConfrim}
        onCancel={handleOnCancel}
      />
    </>
  );
};

export default UserListPage;
