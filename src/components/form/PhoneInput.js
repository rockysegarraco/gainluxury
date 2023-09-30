import React, { useEffect } from 'react';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import noop from 'lodash/noop';
import TextInput from './TextInput';

const normalizePhone = (v, prev) => {
  if (v === prev) return v;
  let phone = v.replace(/\D/g, '');
  // Check if the phone number starts with a country code
  if (phone.startsWith('1')) {
    // Remove the country code prefix
    phone = phone.slice(1);
  }

  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

const PhoneInput = React.forwardRef(
  ({ onChange = noop, prependIcon = true, ...rest }, ref) => {
    useEffect(() => {
      if (rest.value) {
        const normalized = normalizePhone(rest.value, '');
        onChange(normalized ?? '');
      }
    }, []);

    const handleChange = (e) => {
      const { value } = e.target;
      if (value.length < rest.value?.length) {
        onChange(value);
      } else {
        onChange(normalizePhone(value, rest.value) ?? value);
      }
    };

    return (
      <TextInput
        {...rest}
        ref={ref}
        onChange={handleChange}
        startAdornment={
          prependIcon ? (
            <PhoneIphoneIcon sx={{ color: 'text.primary' }} fontSize="small" />
          ) : null
        }
      />
    );
  },
);

export default PhoneInput;
