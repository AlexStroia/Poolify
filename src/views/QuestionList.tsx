import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { QuestionItem } from "./QuestionItem";

export enum QuestionListType {
  NEW = "New questions",
  Done = "Done",
}

export const QuestionList = ({
  questionListType,
}: {
  questionListType: QuestionListType;
}) => {
  const gridData = [
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
  ];
  return (
    <div>
      <Typography
        sx={{
          marginBottom: "16px",
        }}
        variant="h3"
      >
        {questionListType.valueOf()}
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        {gridData.map((element, index) => (
          <Grid item key={element.id} xs={12} sm={6} md={4}>
            <QuestionItem />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
