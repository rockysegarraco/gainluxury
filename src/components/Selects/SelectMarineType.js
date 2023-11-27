import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MARINETYPE } from "../../utils/constants";

export default function SelectMarineType({ handleType, type }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={type}
        onChange={(e) => handleType(e.target.value)}
      >
        <MenuItem value={"All"}>All Type</MenuItem>
        {MARINETYPE.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
