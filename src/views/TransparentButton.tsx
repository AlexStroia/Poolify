import { Typography } from "@mui/material";
import { theme } from "../theme";

interface TransparentButtonProps {
  title: String;
  onTap: () => void;
}

export const TransparentButton: React.FC<TransparentButtonProps> = ({
  title,
  onTap,
}) => {
  return (
    <button
      style={{
        background: "transparent",
        border: "none",
      }}
      onClick={onTap}
    >
      <Typography
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
    </button>
  );
};
