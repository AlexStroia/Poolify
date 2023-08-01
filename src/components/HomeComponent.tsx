import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import QuestionList, { QuestionListType } from "../views/QuestionList";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { useNavigate } from "react-router-dom";
import { SpinnerComponent } from "./SpinnerComponent";
import { getUserQuestions } from "../actions/GetUserQuestions";
import { getAllQuestions } from "../actions/GetAllQuestions";

export const HomeComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const state = useSelector((state: ApplicationState) => state);
  const dashboardState = state.dashboard;
  const user = state.authentication.user;
  const [isToggle, setIsToggle] = React.useState<"new" | "done">("new");

  useEffect(() => {
    function getUserDataAllQuestions() {
      dispatch(getAllQuestions());
    }

    function getUserDataQuestions() {
      if (user?.userId !== null) {
        dispatch(getUserQuestions(user!.userId!));
      }
    }

    getUserDataAllQuestions();
    getUserDataQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              new Date(second.date).getTime() - new Date(first.date).getTime(),
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
              new Date(second.date).getTime() - new Date(first.date).getTime(),
          )
      : [];

  return (
    <div>
      <PoolifyTabBar />
      <Container
        sx={{
          flexDirection: "column",
          gap: "24px", // Increase the spacing between elements to 24px
        }}
      >
        <Box height="32px" />
        {dashboardState.loadingNewQuestions ? (
          <SpinnerComponent />
        ) : (
          <Grid>
            <Grid item>
              <div>
                <input
                  type="radio"
                  id="newQuestions"
                  name="toggle"
                  value="new"
                  checked={isToggle === "new"}
                  onChange={() => setIsToggle("new")}
                />
                <label htmlFor="newQuestions">New Questions</label>
                <input
                  type="radio"
                  id="doneQuestions"
                  name="toggle"
                  value="done"
                  checked={isToggle === "done"}
                  onChange={() => setIsToggle("done")}
                />
                <label htmlFor="doneQuestions">Done Questions</label>
              </div>
            </Grid>
            <Grid data-test-id="questions-list-new" item>
              {/* Render the New or Done Questions list based on the selected toggle */}
              <QuestionList
                questionListType={
                  isToggle === "new"
                    ? QuestionListType.NEW
                    : QuestionListType.DONE
                }
                questionDataList={
                  isToggle === "new"
                    ? questionsNewOrdered
                    : questionAnsweredOrdered
                }
                onTapQuestion={handleOnTapQuestion}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default HomeComponent;
