import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { REBATHS } from "../../utils/constants";

export default function SelectRerooms({ handleRebaths, rebaths }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select value={rebaths} onChange={(e) => handleRebaths(e.target.value)}>
        <MenuItem value={"All"}>All Baths</MenuItem>
        {REBATHS.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
