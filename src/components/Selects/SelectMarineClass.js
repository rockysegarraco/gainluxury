import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MARINECLASS } from "../../utils/constants";

export default function SelectMarineClass({ handleClass, marineClass }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={marineClass}
        onChange={(e) => handleClass(e.target.value)}
      >
        <MenuItem value={"All"}>All Class</MenuItem>
        {MARINECLASS.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
