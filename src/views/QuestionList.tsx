import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { QuestionItem } from "./QuestionItem";
import { QuestionData } from "../model/QuestionData";

export enum QuestionListType {
  NEW = "New questions",
  DONE = "Done",
}

const QuestionList = ({
  questionListType,
  questionDataList = [],
  onTapQuestion,
}: {
  questionListType: QuestionListType;
  questionDataList?: QuestionData[];
  onTapQuestion: (questionId: string) => void;
}) => {
  const handleOnTapQuestion = (questionId: string) => {
    onTapQuestion(questionId);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "grid",
        padding: "16px",
        alignContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h3">{questionListType}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {questionDataList.map((element) => (
            <Grid item key={element.id} xs={12} sm={6} md={4}>
              <QuestionItem
                questionData={element}
                onTapQuestion={async () => handleOnTapQuestion(element.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionList;
