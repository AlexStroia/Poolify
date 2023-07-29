import { Card, Divider, Grid, Typography } from "@mui/material";
import { PoolifyButton, PoolifyButtonSize } from "./PoolifyButton";
import { theme } from "../theme";
import { QuestionData } from "../model/QuestionData";
import React from "react";

export const QuestionItem = ({
  questionData,
  onTapQuestion,
}: {
  questionData: QuestionData;
  onTapQuestion: (questionId: string) => {};
}) => {
  const handleOnTapQuestion = (questionId: string) => {
    console.log("Question id is " + questionId);
    onTapQuestion(questionId);
  };
  const date: Date = new Date(questionData.date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };

  const formattedDate: string = date.toLocaleString("en-US", options);
  return (
    <Card 
    // onClick={() => handleOnTapQuestion(questionData.id)}
    sx={{ borderRadius: "16px" }}>
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
          <Typography textAlign="center">{formattedDate}</Typography>
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
            onTap={ 
              () => handleOnTapQuestion(questionData.id)
            }
          />
        </Grid>
      </Grid>
    </Card>
  );
};
