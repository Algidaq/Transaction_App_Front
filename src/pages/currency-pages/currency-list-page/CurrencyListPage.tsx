import * as React from 'react';
import { useContext } from 'react';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { useCurrencyListPage } from './currency-list-page-state/useCurrencyListPage';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import { Currency } from '../../../services/currency-service/model/Currency';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
interface CurrencyListPageProps {}

const CurrencyListPage: React.FunctionComponent<CurrencyListPageProps> = () => {
  const service = useContext(CurrencyServiceContext)!;
  const { state, loadAllCurrencies } = useCurrencyListPage({ service });
  const renderTableActions = (row: Currency): React.ReactElement => {
    return (
      <div className="column">
        {/* <Link to="/" className="">
          Edit
        </Link> */}
      </div>
    );
  };
  const columns: Column<Currency>[] = [
    { header: 'فهررس', key: 'id' },
    { header: 'إسم العملة', key: 'name' },
    { header: 'رمز العملة', key: 'symbol' },
    {
      header: 'العمليات',
      key: 'id',
      isRenderable: true,
      render: renderTableActions,
    },
  ];

  return (
    <StateContainer
      state={state}
      onReloadClick={loadAllCurrencies}
      style={pageStyle}
      renderHeader={() => <PageHeader pageTitle="قائمة العملات" />}
    >
      <Table columns={columns} rows={state.currencies} />
    </StateContainer>
  );
};

export default CurrencyListPage;
