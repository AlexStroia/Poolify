import { Button, Typography } from "@mui/material";
import { theme } from "../theme";

interface PoolifyButtonsProps {
  title: String;
  onTap: () => void;
}

export const PoolifyButton: React.FC<PoolifyButtonsProps> = ({
  title,
  onTap,
}) => {
  const appTheme = theme;
  return (
    <Button
      sx={{
        width: "50%",
        backgroundColor: appTheme.palette.primary.main,
        color: "white",
        marginTop: "2px",
        marginBottom: "2px",
        marginLeft: "30px",
        marginRight: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onTap}
    >
      <Typography variant="button" color="inherit">
        {title}
      </Typography>
    </Button>
  );
};
