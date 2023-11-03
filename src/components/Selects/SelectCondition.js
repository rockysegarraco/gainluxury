import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CONDITION } from "../../utils/constants";

export default function SelectCondition({handleCondition, condition}) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={condition}
        onChange={(e) => handleCondition(e.target.value)}
      >
        <MenuItem value={"All"}>All Condition</MenuItem>
        {CONDITION.map((con, i) => (
           <MenuItem key={i} value={con.value}>{con.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
