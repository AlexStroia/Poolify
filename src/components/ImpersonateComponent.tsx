import { Typography, Grid, Card } from "@mui/material";
import { PoolifyButton } from "../views/PoolifyButton";

export const ImpersonateComponent = ({
  onTapUdacityAccount,
  onTapAlexAccount,
}: {
  onTapUdacityAccount: () => void;
  onTapAlexAccount: () => void;
}) => {
  const handleOnTapUdacityAccount = () => {
    onTapUdacityAccount();
  };

  const handleOnTapAlexAccount = () => {
    onTapAlexAccount();
  };

  return (
    <Card
      sx={{
        padding: "16px",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        style={{
          gap: "16px",
        }}
      >
        <Grid item>
          <Typography>Choose an account from below</Typography>
        </Grid>
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
          item
        >
          <PoolifyButton title="Udacity" onTap={handleOnTapUdacityAccount} />
        </Grid>
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
          item
          onClick={onTapAlexAccount}
        >
          <PoolifyButton title="Alex" onTap={handleOnTapAlexAccount} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ImpersonateComponent;
