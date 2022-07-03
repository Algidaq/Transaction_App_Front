import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import './ConfirmDialog.scss';
interface ConfirmDailogProps {
  onCancel?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  content?: string;
  title?: string;
  showDialog: boolean;
}

const ConfirmDailog: React.FunctionComponent<ConfirmDailogProps> = ({
  showDialog,
  onCancel,
  onConfirm,
  title,
  content,
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
          />,
          document.getElementById('dialog-root')!
        )}
    </>
  );
};

interface DialogContentProps {
  onCancel?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  content?: string;
  title?: string;
}

const DialogContent: React.FunctionComponent<DialogContentProps> = ({
  onCancel,
  onConfirm,
  content,
  title,
}) => {
  return (
    <section className="confirm-dialog container">
      <header>
        <h6>{title ?? 'Confirm'}</h6>
      </header>
      <Divider />
      <div className="content">
        <p>{content ?? 'No content'}</p>
      </div>
      <div className="buttons">
        <Button text="cancel" outlined color="is-black" onClick={onCancel} />
        <Button text="Confrim" outlined onClick={onConfirm} />
      </div>
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
