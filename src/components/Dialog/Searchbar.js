import React from "react";
import AsyncSelect from 'react-select/async';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from '@mui/material/Popover';

import { BRAND } from "../../utils/constants";
import { setBrand, setModel, setModelData } from "../../store/brandSerchSlice";
import { useDispatch } from "react-redux";

export default function Searchbar() {
  const [options, setOptions] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterBrands = (inputValue) => {
    const value = BRAND.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return value;
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterBrands(inputValue));
    }, 1000);
  };

  const styles = {
    container: base => ({
      ...base,
      minWidth: 450,
    })
  };

  const handleItem = (modal) => {
    dispatch(setModel(modal));
    dispatch(setBrand(options.value));
    dispatch(setModelData(options.modal));
    handleClose()
  }

  const open = Boolean(anchorEl);

  return (
    <div>
      <AsyncSelect
        onChange={(value) => setOptions(value)|setAnchorEl(true)}
        styles={styles}
        loadOptions={loadOptions}
        menuPosition="fixed"
      />
      <Popover
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: 60,
          left: 290
        }}
      >
      {options && <Stack sx={{
        width: 400,
        backgroundColor: "white", mt: 1, p: 1, ":hover": {
          backgroundColor: "lightgray"
        }
      }}>
        <Button
          onClick={() => dispatch(setBrand(options.value))}
          sx={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <div>{options?.label}</div>
          <Box sx={{ color: 'gray', pr: 2, fontSize: 14 }}>Make</Box>
        </Button>
      </Stack>}
      <div className="max-h-[600px]">
      {options?.modal.map((item, i) => (
        <Stack
          key={i}
          sx={{
            p: 1, flexDirection: "row", backgroundColor: "white",
            justifyContent: 'space-between', ":hover": {
              backgroundColor: "lightgray"
            },
          }}>
          {
            item.group ? (<>
              <Box sx={{ color: 'grey' }}>{item.label}</Box>
            </>) : (
              <Button onClick={() => handleItem(item.value)}
                sx={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <div>{item.label}, {" "} {options?.label}</div>
                <Box sx={{ color: 'gray', pr: 2, fontSize: 14 }}>Modal</Box>
              </Button>
            )
          }
        </Stack>
        
      ))}
      </div>
      </Popover>
    </div>
  );
}
