import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { COUNTRY } from "../../utils/constants";

export default function SelectCountry({handleCountry, country}) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={country}
        onChange={(e) => handleCountry(e.target.value)}
      >
        <MenuItem value={"All"}>All Countries</MenuItem>
        {COUNTRY.map((con, i) => (
           <MenuItem key={i} value={con.value}>{con.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
