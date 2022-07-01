import { FunctionComponent } from 'react';
import './LoadingIndicator.scss';

interface LoadingIndicatorProps {}
const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
