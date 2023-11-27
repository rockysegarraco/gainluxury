import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MARINELENGTHS } from "../../utils/constants";

export default function SelectLength({ handleLength, length }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={length}
        onChange={(e) => handleLength(e.target.value)}
      >
        <MenuItem value={"All"}>All Lengths</MenuItem>
        {MARINELENGTHS.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
