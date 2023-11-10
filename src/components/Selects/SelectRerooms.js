import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { REROOMS } from "../../utils/constants";

export default function SelectRerooms({ handleRerooms, rerooms }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select value={rerooms} onChange={(e) => handleRerooms(e.target.value)}>
        <MenuItem value={"All"}>All Rooms</MenuItem>
        {REROOMS.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
