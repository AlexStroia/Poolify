import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { PoolifyButton, PoolifyButtonSize } from "./PoolifyButton";
import { theme } from "../theme";

export const QuestionItem = () => {
  return (
    <Card sx={{ borderRadius: "16px" }}>
      <Box
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography textAlign="center">someEmail@yahoo.com</Typography>
        <Typography textAlign="center">2022 May 15</Typography>
        <Divider
          sx={{
            backgroundColor: theme.palette.background.paper,
            width: "100%",
          }}
        />
        <PoolifyButton
          buttonSize={PoolifyButtonSize.LARGE}
          title="Show"
          onTap={() => {
            throw new Error("Function not implemented.");
          }}
        />
      </Box>
    </Card>
  );
};
