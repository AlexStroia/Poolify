import { Button} from "@mui/material";


interface PoolifyButtonsProps {
  title: String;
  onTap: () => {};
}

export const PoolifyButton: React.FC<PoolifyButtonsProps> = ({
  title,
  onTap,
}) => {
  return <Button

  onClick={onTap}>{title}</Button>;
};
