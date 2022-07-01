import * as React from 'react';
import { useContext } from 'react';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { useCurrencyListPage } from './currency-list-page-state/useCurrencyListPage';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { Column } from '../../../components/Table/model/Column';
import { Currency } from '../../../services/currency-service/model/Currency';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import TableTitle from '../../../components/Table/TableTitle';
interface CurrencyListPageProps {}

const CurrencyListPage: React.FunctionComponent<CurrencyListPageProps> = () => {
  const service = useContext(CurrencyServiceContext)!;
  const { state, loadAllCurrencies } = useCurrencyListPage({ service });
  const renderTableActions = (row: Currency): React.ReactElement => {
    return (
      <div className="column">
        <Link to="/" className="">
          Edit
        </Link>
      </div>
    );
  };
  const columns: Column<Currency>[] = [
    { header: 'ID', key: 'id' },
    { header: 'Currency name', key: 'name' },
    { header: 'Currency Symbol', key: 'symbol' },
    {
      header: 'Actions',
      key: 'id',
      isRenderable: true,
      render: renderTableActions,
    },
  ];

  return (
    <StateContainer state={state} onReloadClick={loadAllCurrencies}>
      <div className="table-container" style={{ borderRadius: '8px 0px' }}>
        <TableTitle title="Currencies" />
        <Table columns={columns} rows={state.currencies} />
      </div>
    </StateContainer>
  );
};

export default CurrencyListPage;
