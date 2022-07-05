import Button from '../Button/Button';
import Gap from '../Gap/Gap';

interface PaginationProps {
  onNext: () => void;
  isNextDisabled: boolean;
  onPrev: () => void;
  isPrevDisabled: boolean;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({
  onNext,
  isNextDisabled,
  onPrev,
  isPrevDisabled,
}) => {
  return (
    <div className="is-flex">
      <Button
        textButton
        text="الصفه السابقة"
        disabled={isPrevDisabled}
        onClick={(e) => onPrev()}
      />
      <Gap horizontal={16.0} />
      <Button
        text="الصفحه التالية"
        disabled={isNextDisabled}
        onClick={(e) => onNext()}
      />
      <Gap vertical={16} />
    </div>
  );
};

export default Pagination;
