import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectState({handleState, state, stateData}) {
  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        value={state}
        onChange={(e) => handleState(e.target.value)}
      >
        <MenuItem value={'All'}>All States</MenuItem>
        {stateData.map((state, index) => (
          <MenuItem key={index} value={state.value}>{state.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}