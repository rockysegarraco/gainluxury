import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListSubheader from '@mui/material/ListSubheader';
import Select from "@mui/material/Select";

export default function SelectModel({handleModel, model, modelData}) {
  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        value={model}
        onChange={(e) => handleModel(e.target.value)}
      >
        <MenuItem value={'All'}>All Model</MenuItem>
        {modelData.map((modal, index) => modal.group ? 
        (<ListSubheader key={index}>{modal.label}</ListSubheader>) :
         (<MenuItem key={index} value={modal.value}>{modal.label}</MenuItem>)
         )}
      </Select>
    </FormControl>
  );
}