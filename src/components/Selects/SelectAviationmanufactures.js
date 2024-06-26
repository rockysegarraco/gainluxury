import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectAviationmanufactures({
  handleAviationmanufactures,
  aviationmanufactures,
  manufectureData
}) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={aviationmanufactures}
        onChange={(e) => handleAviationmanufactures(e.target.value)}
      >
        <MenuItem value={"All"}>All Manufactures</MenuItem>
        {manufectureData.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
