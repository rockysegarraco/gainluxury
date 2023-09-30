import React from 'react';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from './Button';
import usePromise from '../hooks/usePromise';

const StyledPopover = styled('div')`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  padding: 10px;
`;

type Props = {
  title: string;
  onCancel?: () => void;
  onConfirm: () => Promise<any> | void;
  disabled?: boolean;
  icon?: React.ReactElement;
  okType?: any;
  cancelText?: string;
  okText?: string;
  placement?: any;
  children: React.ReactElement;
};

const Popconfirm = ({
  title,
  onCancel,
  onConfirm,
  disabled,
  icon,
  okText = 'Yes',
  cancelText = 'No',
  okType = 'contained',
  placement = 'auto',
  children,
}: Props) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popconfirm',
  });

  const [loading, handler] = usePromise(onConfirm, false);
  const onOK = () => {
    popupState.close();
    handler();
  };

  const onClose = () => {
    popupState.close();
    onCancel && onCancel();
  };

  const popover = (
    <Popover {...bindPopover(popupState)}>
      <StyledPopover>
        <Box>
          <Box display="flex" alignItems="center" mb={3}>
            <ErrorOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography fontWeight={500}>{title}</Typography>
          </Box>
          <Box textAlign="right">
            <Button
              size="small"
              variant="outlined"
              onClick={onClose}
              sx={{ mr: 1 }}
            >
              {cancelText}
            </Button>
            <Button size="small" variant={okType} onClick={onOK}>
              {okText}
            </Button>
          </Box>
        </Box>
      </StyledPopover>
    </Popover>
  );

  if (disabled) return <>{children}</>;

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { loading, ...bindTrigger(popupState) }),
      )}
      {popover}
    </>
  );
};

export default Popconfirm;
