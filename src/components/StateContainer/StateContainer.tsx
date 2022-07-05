import Container from '../Container/Container';
import React, { MouseEventHandler } from 'react';
import { BaseState } from '../../base/BaseState';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { getErrorMessage } from '../../utils/utils';
import Button from '../Button/Button';
interface StateContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  state: BaseState;
  renderOnError?: () => React.ReactNode;
  renderOnEmpty?: () => React.ReactNode;
  renderOnBusy?: () => React.ReactNode;
  onReloadClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  emptyText?: string;
  emptyButtonText?: string;
  onEmptyClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  renderHeader?: () => React.ReactNode;
}

const StateContainer: React.FunctionComponent<StateContainerProps> = ({
  state,
  emptyText,
  emptyButtonText,
  renderOnError,
  renderOnEmpty,
  renderOnBusy,
  onReloadClick,
  onEmptyClick,
  renderHeader,
  children,
  ...rest
}) => {
  const renderErrorState = (): React.ReactNode => {
    if (renderOnError) {
      return renderOnError();
    }
    return (
      <div className="flex-center is-fullheight">
        <p className="has-text-danger is-size-6">
          {getErrorMessage(state.error)}
        </p>
        <Button
          text="إعادة تحميل"
          className="mx-2"
          textButton
          onClick={onReloadClick}
        />
      </div>
    );
  };

  const renderOnEmptyState = () => {
    if (renderOnEmpty) {
      return renderOnEmpty();
    }
    return (
      <div className="flex-center is-fullheight">
        <p className="is-size-6">{emptyText ?? 'لايوجد محتوى'}</p>
        <Button
          text={emptyButtonText ?? 'إضافة'}
          className="mx-2"
          textButton
          onClick={onEmptyClick}
        />
      </div>
    );
  };
  return (
    <Container className={`is-fullheight `} {...rest}>
      {renderHeader?.call(this)}
      {state.isBusy && (
        <div className="table-container is-fullwidth is-fullheight flex-center">
          <LoadingIndicator />
        </div>
      )}
      {state.isError && renderErrorState()}
      {state.isEmpty && renderOnEmptyState()}
      {state.isSuccess && children}
    </Container>
  );
};

export default StateContainer;
