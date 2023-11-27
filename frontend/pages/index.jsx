import React from 'react';
import {Button, Container} from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Button variant={"contained"} href="/boards">Start App</Button>
    </Container>
  );
}
