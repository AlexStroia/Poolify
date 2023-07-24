import { Box, Container, Divider } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import QuestionList, { QuestionListType } from "../views/QuestionList";
import { useEffect, useState } from "react";
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
          <QuestionList
            questionListType={QuestionListType.NEW}
            questionDataList={dashboardState.userNewQuestions}
            onTapQuestion={handleOnTapQuestion}
          />
        )}
        <Box height="32px" />
        <QuestionList
          questionListType={QuestionListType.DONE}
          questionDataList={dashboardState.userAnsweredQuestions}
          onTapQuestion={handleOnTapQuestion}
        />
      </Container>
    </div>
  );
};
