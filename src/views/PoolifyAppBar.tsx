import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface PoolifyAppBarProps {
  title: string;
}

export const PoolifyAppBar: React.FC<PoolifyAppBarProps> = ({ title }) => {
  const navigator = useNavigate();
  const showBackButton = navigator.length > 1;
  const handleGoBack = () => {
    navigator(-1);
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        {showBackButton ??  <IconButton edge="start" color="inherit" onClick={handleGoBack}>
            <ArrowBack />
          </IconButton>}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

