import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ARTSIZE } from "../../utils/constants";

export default function SelectArtsize({ handleArtsize, artsize }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select value={artsize} onChange={(e) => handleArtsize(e.target.value)}>
        <MenuItem value={"All"}>All Sizes</MenuItem>
        {ARTSIZE.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
