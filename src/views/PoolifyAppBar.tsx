import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface PoolifyAppBarProps {
  title: string;
}

export const PoolifyAppBar: React.FC<PoolifyAppBarProps> = ({ title }) => {
  const navigator = useNavigate();
  const pathName = useLocation().pathname;
  const showBackButton = navigator.length > 1 && pathName !== "/";
  const handleGoBack = () => {
    navigator(-1);
  };

  console.log("Value is " + showBackButton + "....length" + navigator.length);

  return (
    <AppBar position="fixed">
      <Toolbar>
        {showBackButton && (
          <IconButton
            edge="start"
            style={{ color: "white" }}
            onClick={handleGoBack}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
