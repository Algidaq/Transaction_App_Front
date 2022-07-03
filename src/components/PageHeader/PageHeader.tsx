import Gap from '../Gap/Gap';
import SearchInput from '../Search/SearchInput';
import Select from '../Select/Select';

interface PageHeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {
  pageTitle: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  pageTitle,
  children,
}) => {
  return (
    <header className="p-3">
      <Gap vertical={16} />
      <h6>{pageTitle}</h6>
      <Gap vertical={16} />
      {children}
    </header>
  );
};

export default PageHeader;
