import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import QuestionList, { QuestionListType } from "../views/QuestionList";
import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../actions/GetAllQuestions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { useNavigate } from "react-router-dom";
import { SpinnerComponent } from "./SpinnerComponent";
import { getUserQuestions } from "../actions/GetUserQuestions";

export const HomeComponent = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const state = useSelector((state: ApplicationState) => state);
  const dashboardState = state.dashboard;
  const user = state.authentication.user;

  useEffect(() => {
    dispatch(getAllQuestions());
    if (user?.userId !== null) {
      dispatch(getUserQuestions(user!.userId!));
    }
  }, []);

  const handleOnTapQuestion = (questionId: string) => {
    navigator(`/questions/${questionId}`);
  };

  const questionsNewOrdered =
    dashboardState.userNewQuestions !== undefined &&
    Array.isArray(dashboardState.userNewQuestions) &&
    dashboardState.userNewQuestions.length > 0
      ? dashboardState.userNewQuestions
          .slice()
          .sort(
            (first, second) =>
              new Date(second.date).getTime() - new Date(first.date).getTime()
          )
      : [];

  const questionAnsweredOrdered =
    dashboardState.userAnsweredQuestions !== undefined &&
    Array.isArray(dashboardState.userAnsweredQuestions) &&
    dashboardState.userAnsweredQuestions.length > 0
      ? dashboardState.userAnsweredQuestions
          .slice()
          .sort(
            (first, second) =>
              new Date(second.date).getTime() - new Date(first.date).getTime()
          )
      : [];

  console.log("============");
  console.log(questionAnsweredOrdered.length > 0);
  console.log("new");
  console.log(questionsNewOrdered.length > 0);

  return (
    <div>
      <PoolifyTabBar />
      <Container
        sx={{
          flexDirection: "column",
          gap: "124px", // Increase the spacing between elements to 24px
        }}
      >
        <Box height="32px" />
        {dashboardState.loadingNewQuestions ? (
          <SpinnerComponent />
        ) : (
          <Grid>
            <Grid item>
              <QuestionList
                questionListType={QuestionListType.NEW}
                questionDataList={questionsNewOrdered}
                onTapQuestion={handleOnTapQuestion}
              />
            </Grid>

            <Grid item>
              <QuestionList
                questionListType={QuestionListType.DONE}
                questionDataList={questionAnsweredOrdered}
                onTapQuestion={handleOnTapQuestion}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};
