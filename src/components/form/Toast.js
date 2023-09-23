import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import Button from '@mui/material/Button';

const ICONS = {
  success: CheckCircleOutlineIcon,
  error: ErrorOutlineIcon,
  info: InfoOutlinedIcon,
  loading: CircularProgress,
};

const StyledRoot = styled('div')`
  display: flex;

  .icon {
    margin-right: 16px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #323f4b;
    margin-bottom: 8px;
  }
  .message {
    margin-bottom: 15px;
  }
`;

const Toast = ({ message, title, type, customButton, customIcon }) => {
  let icon = <InfoOutlinedIcon />;
  let button = <Button variant="contained">Ok, great</Button>;
  if (customButton) {
    button = customButton;
  } else if (type === 'success') {
    icon = <CheckCircleOutlineIcon />;
    button = <Button variant="contained">Ok, great</Button>;
  } else if (type === 'error') {
    icon = <ErrorOutlineIcon />;
    button = <Button variant="contained">Ok</Button>;
  } else if (type === 'warn') {
    icon = <WarningAmberOutlinedIcon />;
    button = <Button variant="contained">Ok</Button>;
  }
  if (customIcon) {
    icon = customIcon;
  }
  // const theme = themes[type];

  return (
    <StyledRoot>
      <div className="icon">
        <div>{icon}</div>
      </div>
      <div>
        {title && <div className="title">{title}</div>}
        <p className="message">{message}</p>
        {button}
      </div>
    </StyledRoot>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
};

const StyledSnack = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  &.success {
    color: #67c51d;
  }
  &.error {
    color: #ea474c;
  }
  &.loading {
    color: #2186eb;
  }
  &.info {
    color: #2186eb;
  }
  svg {
    font-size: 16px;
  }
  span {
    color: #323f4b;
    padding-left: 8px;
  }
`;

export const Snack = ({ message, type, iconProps = {} }) => {
  const Icon = ICONS[type];
  return (
    <StyledSnack className={type}>
      <Icon />
      <span>{message}</span>
    </StyledSnack>
  );
};

export default Toast;