import * as React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Popover from '@mui/material/Popover';
import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from "@mui/material/Typography";
import { YEAR, YEAR2 } from "../../utils/constants";

export default function SelectYears({ handleMin, handleMax, minValue, maxValue }) {
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
          width: "130px",
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
        (<Typography>Years</Typography>) : 
        minValue !== "Min" && maxValue === "Max" ?  (<Typography>{`${minValue}+`}</Typography>) :
        minValue === "Min" && maxValue !== "Max" ? (<Typography>{` <${maxValue}`}</Typography>):
        (<Typography>{`${minValue} - ${maxValue}`}</Typography>)}

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
        <Stack direction="row" spacing={2} padding={2}>
          <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <Select
              value={minValue}
              onChange={(event) => handleMin(event.target.value)}
            >
              {YEAR.map((year, index) => (
                <MenuItem key={index} value={year.value}>{year.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <Select
              value={maxValue}
              onChange={(event) => handleMax(event.target.value)}
            >
              {YEAR2.map((year, index) => (
                <MenuItem key={index} value={year.value}>{year.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Popover>

    </div>
  );
}
