import React from "react";
import { useTheme } from "@mui/material/styles";
import cx from "classnames";
import Typography from "@mui/material/Typography";
import Select, { components } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import AsyncSelect from "react-select/async";
import PropTypes from "prop-types";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const MultiValue = (props) => {
  const maxToShow = props.selectProps.maxToShow || 3;

  if (props.index > maxToShow) return null;
  else if (props.index < maxToShow) {
    return <components.MultiValue {...props} />;
  }

  const length = props.getValue().length;
  const shouldBadgeShow = length > maxToShow;
  const displayLength = length - maxToShow;

  if (shouldBadgeShow) {
    const { children, ...rest } = props;
    return (
      <components.MultiValueLabel {...rest}>
        <Typography variant="caption">{`+${displayLength} more`}</Typography>
      </components.MultiValueLabel>
    );
  }
  return <components.MultiValue {...props} />;
};

const getTheme = (muiTheme) => (theme) => {
  return {
    ...theme,
    borderRadius: 15,
    spacing: {
      baseUnit: 4,
      controlHeight: 42,
      menuGutter: 8,
    },
    colors: {
      ...theme.colors,
      danger: muiTheme.palette.error.main,
      neutral0: muiTheme.palette.background.paper,
      neutral5: muiTheme.palette.action.disabledBackground,
      neutral10: muiTheme.palette.grey["100"],
      primary: `#FFF`,
      primary25: muiTheme.palette.action.hover,
      neutral30: muiTheme.palette.grey["300"],
      neutral20: muiTheme.palette.grey["200"],
      neutral80: muiTheme.palette.text.primary,
      selected: muiTheme.palette.action.selected,
    },
  };
};

const customStyles = {
  container: (provided) => ({
    ...provided,
    "label + &": {
      marginTop: 5,
    },
  }),
  control: (provided, { theme, selectProps }) => ({
    ...provided,
    border: "1px solid lightgray",
    borderRadius: "5px",
    width: "100%",    
    padding: "5px 0px",
    color: "#000",
    backgroundColor: 'transparent',
    maxHeight: 44,
    '&:hover': {
      borderColor: '#5E6F86'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "4px 10px",
    fontSize: 14,
  }),
  placeholder: (provided, { theme }) => ({
    ...provided,
    fontWeight: 400,
    opacity: 0.42,
    color: 'gray'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    color: 'gray',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: "6px",
    maxHeight: 32
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 99,
    overflow: "hidden",
    backgroundColor: 'white',
    borderRadius: '10px',
  }),
  option: (provided, { isSelected, isDisabled, theme }) => ({
    ...provided,
    backgroundColor: isSelected ? theme.colors.selected : null,
    color: isDisabled ? 'grey' : 'black',
    fontSize: 14,
    '&:hover': {
      backgroundColor: !isDisabled && '#F5F5F5'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "inherit",
    fontWeight: 400,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: '#000',
  }),
};

const CustomSelect = React.forwardRef(
  (
    {
      className,
      placeholder = "Please select",
      label,
      hint,
      options,
      value,
      onChange,
      hasError,
      helpText,
      loadOptions,
      paginate,
      transformValue,
      isMulti = false,
      cacheOptions = true,
      size,
      disabled = false,
      styles,
      sx,
      fullWidth,
      margin = "normal",
      ...rest
    },
    ref
  ) => {
    const muiTheme = useTheme();

    const AsyncComponent = paginate ? AsyncPaginate : AsyncSelect;

    const handleChange = (value, action) => {
      if (transformValue) {
        onChange(value?.value, action);
      } else {
        onChange(value, action);
      }
    };

    const getValue = () => {
      if (transformValue && options) {
        let option = null;
        options.find((i) => {
          if (i.options) {
            const isMatch = i.options.find((i) => i.value === value);
            if (isMatch) {
              option = isMatch;
            }
            return isMatch;
          }
          const isMatch = i.value === value;
          if (isMatch) {
            option = i;
          }
          return isMatch;
        });
        return option;
      } else {
        return value;
      }
    };

    const Components = {
      IndicatorSeparator: null,
    };
    if (rest.maxToShow) {
      Components.MultiValue = MultiValue;
    }

    return (
      <FormControl
        size={size}
        variant="standard"
        margin="dense"
        className={className}
        sx={sx}
        fullWidth={fullWidth}
        error={hasError}
      >
        {label && <FormLabel sx={{fontWeight: 500}}>{label}</FormLabel>}
        {loadOptions ? (
          <AsyncComponent
            ref={ref}
            size={size}
            theme={getTheme(muiTheme)}
            className={cx("react-select", size)}
            components={Components}
            cacheOptions={cacheOptions}
            loadOptions={loadOptions}
            defaultOptions={options}
            placeholder={placeholder}
            onChange={handleChange}
            isMulti={isMulti}
            closeMenuOnSelect={!isMulti}
            styles={customStyles}
            value={getValue()}
            hasError={hasError}
            hideSelectedOptions={!Components.MultiValue}
            {...rest}
          />
        ) : (
          <Select
            isDisabled={disabled}
            ref={ref}
            size={size}
            hasError={hasError}
            theme={getTheme(muiTheme)}
            className={cx("react-select", size)}
            components={Components}
            placeholder={placeholder}
            options={options}
            value={getValue()}
            onChange={handleChange}
            isMulti={isMulti}
            hideSelectedOptions={!Components.MultiValue}
            closeMenuOnSelect={!isMulti}
            styles={styles ? styles : customStyles}         
            {...rest}
          />
        )}
        {hint && (
          <Typography variant="caption" color="textSecondary">
            {hint}
          </Typography>
        )}
        {hasError && <FormHelperText>{helpText}</FormHelperText>}
      </FormControl>
    );
  }
);

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  transformValue: PropTypes.bool,
};

export default CustomSelect;