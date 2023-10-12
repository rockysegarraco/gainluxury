import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AsyncSelect from 'react-select/async';
import { BRAND } from "../../utils/constants";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog({ open, setOpen, handleClick, handleOption }) {
  const [options, setOptions] = React.useState(null);

  const filterColors = (inputValue) => {
    return BRAND.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const styles = {
    container: base => ({
      ...base,
      width: 500,
    }),
  };

  const handleItem = (modal) => {
    handleClick(modal, options.value)
  }

  return (
    <>
      <Dialog
        sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
        fullScreen
        maxWidth
        open={open}
        onClose={setOpen}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: "none"
          },
        }}
      >

        <AsyncSelect
          onChange={(value) => setOptions(value)}
          styles={styles}
          cacheOptions
          loadOptions={loadOptions}
        />
        <Stack sx={{backgroundColor: "white", mt: 1, p: 1, ":hover": {
                backgroundColor: "lightgray"
              },}}>
        {options && <Button 
        onClick={() => handleOption(options.value)}
        sx={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <div>{options?.label}</div>
          <Box sx={{ color: 'gray', pr: 2, fontSize: 14 }}>Make</Box>
        </Button>}
        </Stack>
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
      </Dialog>
    </>
  );
}
