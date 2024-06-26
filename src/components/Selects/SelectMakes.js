import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from '@mui/material/ListSubheader';
import { BRAND } from "../../utils/constants";

export default function SelectBrand({handleBrand, brand}) {
  
  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        value={brand}
        onChange={(e) => handleBrand(e.target.value)}
      >
        <MenuItem value={"All"}>All Makes</MenuItem>
        {BRAND.map((brand, index) =>  brand.group ? (
          <ListSubheader key={index}>{brand.label}</ListSubheader>
        ) : (<MenuItem key={index} value={brand.value}>{brand.label}</MenuItem>))}
      </Select>
    </FormControl>
  );
}
