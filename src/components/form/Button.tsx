import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import usePromise from '../../hooks/usePromise';

const CustomButton = React.forwardRef(
  ({ loading, onClick, style, ...rest }: any, ref) => {
    const [isLoading, handler] = usePromise(onClick, loading);
    return (
      <LoadingButton
        ref={ref}
        loadingPosition="start"
        loading={isLoading}
        disabled={isLoading}
        onClick={handler}
        variant="contained"
        color="primary"
        {...rest}
      />
    );
  },
);

const StyledButton = styled(CustomButton)`
  position: relative;
  button {
    margin: 8px;
  }
  .icon-left {
    margin-right: 8px;
  }
  .icon-right {
    margin-left: 8px;
  }
  .progress {
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
    color: #FFF
  }
`;

StyledButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CustomButton;