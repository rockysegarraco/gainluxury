import * as React from "react";
import Stack from "@mui/material/Stack";
import Popover from '@mui/material/Popover';
import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function SelectPrice({ handleMin, handleMax, minValue, maxValue }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="relative">

      <Button
        id={id}
        onClick={handleClick}
        variant="outlined"
        size="medium"
        endIcon={<ArrowDropDownIcon />}
        sx={{
          width: "160px",
          justifyContent: "space-between",
          padding: "7px",
          border: "1px solid lightgray",
          color: 'black',
          ":hover": {
            border: "1px solid black"
          },
          textTransform: "none"
        }}
      >
        {minValue === "Min" && maxValue === "Max" ?
          (<Typography>Price</Typography>) : 
          minValue !== "Min" && maxValue === "Max" ?  (<Typography>{`${minValue}K+`}</Typography>) :
          minValue === "Min" && maxValue !== "Max" ? (<Typography>{` <${maxValue}K`}</Typography>):
           (<Typography>{`${minValue}K - ${maxValue}K`}</Typography>)}

      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack margin={2} gap={2}>
          <Stack direction="row" spacing={2}>

            <TextField 
            value={minValue}
            onChange={(e) => handleMin(e.target.value ? e.target.value : "Min")}
            type="number" size="small" placeholder="Min" InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              )
            }} />


            <TextField 
              value={maxValue}
              onChange={(e) => handleMax(e.target.value ? e.target.value : "Max")}
              type="number" size="small" placeholder="Max" InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              )
            }} />

          </Stack>
          {/* <Button variant="contained">
            <Typography>Done</Typography>
          </Button> */}
        </Stack>

      </Popover>

    </div>
  );
}
