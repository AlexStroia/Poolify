import { Button, Typography } from "@mui/material";
import { theme } from "../theme";

interface PoolifyButtonsProps {
  title: String;
  onTap: () => {};
}

export const PoolifyButton: React.FC<PoolifyButtonsProps> = ({
  title,
  onTap,
}) => {
  const appTheme = theme;
  return (
    <Button
      style={{
        width: "50%",
        display: "inline",
        backgroundColor: appTheme.palette.primary.main,
        color: "white",
        marginTop: "2px",
        marginBottom: "2px",
        marginLeft: "30px",
        marginRight: "30px",
      }}
      onClick={onTap}
    >
      <Typography variant="button" color="inherit">
        {title}
      </Typography>
    </Button>
  );
};
