import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ARTSUBJECT } from "../../utils/constants";

export default function SelectArtsubject({ handleArtsubject, artsubject }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={artsubject}
        onChange={(e) => handleArtsubject(e.target.value)}
      >
        <MenuItem value={"All"}>All Subjects</MenuItem>
        {ARTSUBJECT.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
