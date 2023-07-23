import { Card, Divider, Grid, Typography } from "@mui/material";
import { PoolifyButton, PoolifyButtonSize } from "./PoolifyButton";
import { theme } from "../theme";
import { QuestionData } from "../model/QuestionData";

export const QuestionItem = ({
  questionData,
  onTapQuestion,
}: {
  questionData: QuestionData;
  onTapQuestion: (questionId: string) => {};
}) => {
  const handleOnTapQuestion = (questionId: string) => {
    onTapQuestion(questionId);
  };

  return (
    <Card sx={{ borderRadius: "16px" }}>
      <Grid
        sx={{
          display: "grid",
          padding: "16px",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Grid item>
          <Typography textAlign="center">{questionData.email}</Typography>
        </Grid>
        <Grid item>
          <Typography textAlign="center">{questionData.date}</Typography>
        </Grid>
        <Grid item>
          <Divider
            sx={{
              backgroundColor: theme.palette.background.paper,
              width: "100%",
            }}
          />
        </Grid>
        <Grid item>
          <PoolifyButton
            buttonSize={PoolifyButtonSize.LARGE}
            title="Show"
            onTap={() => handleOnTapQuestion(questionData.id)}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
