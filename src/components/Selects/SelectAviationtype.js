import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AVIATIONTYPE } from "../../utils/constants";

export default function SelectAviationtype({
  handleAviationtype,
  aviationtype,
}) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={aviationtype}
        onChange={(e) => handleAviationtype(e.target.value)}
      >
        <MenuItem value={"All"}>All Categories</MenuItem>
        {AVIATIONTYPE.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
