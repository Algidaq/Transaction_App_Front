import Container from '../Container/Container';
import React, { MouseEventHandler } from 'react';
import { BaseState } from '../../base/BaseState';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { getErrorMessage } from '../../utils/utils';
import Button from '../Button/Button';
interface StateContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  state: BaseState;
  onReloadClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  emptyText?: string;
  emptyButtonText?: string;
  onEmptyClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const StateContainer: React.FunctionComponent<StateContainerProps> = ({
  state,
  onReloadClick,
  emptyText,
  emptyButtonText,
  onEmptyClick,
  children,
  ...rest
}) => {
  return (
    <Container
      className={`is-fullheight ${state.isBusy ? 'flex-center' : ''}`}
      {...rest}
    >
      {state.isBusy && <LoadingIndicator />}
      {state.isError && (
        <div className="flex-center is-fullheight">
          <p className="has-text-danger is-size-6">
            {getErrorMessage(state.error)}
          </p>
          <Button
            text="Reload"
            className="mx-2"
            textButton
            onClick={onReloadClick}
          />
        </div>
      )}
      {state.isEmpty && (
        <div className="flex-center is-fullheight">
          <p className="is-size-6">{emptyText ?? 'Empty'}</p>
          <Button
            text={emptyButtonText ?? 'Add'}
            className="mx-2"
            textButton
            onClick={onEmptyClick}
          />
        </div>
      )}
      {state.isSuccess && children}
    </Container>
  );
};

export default StateContainer;
