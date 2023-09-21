import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "full" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Kilometers Run"
        variant="outlined"
      />
    </Box>
  );
}
