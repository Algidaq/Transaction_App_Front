import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import Gap from '../Gap/Gap';
import './ConfirmDialog.scss';
interface ConfirmDailogProps {
  onCancel?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  showActions?: boolean;
  content?: string;
  title?: string;
  showDialog: boolean;
  children?: React.ReactNode;
}

const ConfirmDailog: React.FunctionComponent<ConfirmDailogProps> = ({
  showDialog,
  onCancel,
  onConfirm,
  showActions = true,
  title,
  content,
  children,
}) => {
  return (
    <>
      {showDialog &&
        ReactDOM.createPortal(
          <BackDrop onCancel={onCancel} />,
          document.getElementById('backdrop-root')!
        )}
      {showDialog &&
        ReactDOM.createPortal(
          <DialogContent
            onCancel={onCancel}
            title={title}
            content={content}
            onConfirm={onConfirm}
            children={children}
            showActions={showActions}
          />,
          document.getElementById('dialog-root')!
        )}
    </>
  );
};

interface DialogContentProps extends React.AllHTMLAttributes<HTMLDivElement> {
  onCancel?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  content?: string;
  showActions: boolean;
  title?: string;
}

const DialogContent: React.FunctionComponent<DialogContentProps> = ({
  onCancel,
  onConfirm,
  content,
  showActions,
  title,
  children,
}) => {
  return (
    <section className="confirm-dialog container">
      <header>
        <h6>{title ?? 'Confirm'}</h6>
      </header>
      <Divider />
      <div className="content">
        {content && <p>{content ?? 'No content'}</p>}
        {children}
      </div>
      {showActions && (
        <div className="buttons">
          <Button text="تاكيد" outlined onClick={onConfirm} />
          <Gap horizontal={16} />
          <Button text="إلغاء" outlined color="is-black" onClick={onCancel} />
        </div>
      )}
    </section>
  );
};

interface BackDropProps {
  onCancel?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const BackDrop: React.FunctionComponent<BackDropProps> = ({ onCancel }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: '100',
  };
  return <div style={style} onClick={onCancel}></div>;
};

export default ConfirmDailog;
