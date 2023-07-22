import { Grid, Typography, Box } from "@mui/material";
import { PoolifyTextField } from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SaveUserQuestionData,
  saveUserQuestion,
} from "../actions/SaveUserQuestion";
import { ApplicationState } from "../state/ApplicationState";
import { SpinnerComponent } from "./SpinnerComponent";
import { PoolifyTabBar } from "../views/PoolifyTabBar";

export const NewComponent = () => {
  const dispatch = useDispatch();
  const questionTitle = useRef<HTMLInputElement>(null);
  const questionOptionFirst = useRef<HTMLInputElement>(null);
  const questionOptionSecond = useRef<HTMLInputElement>(null);
  const user = useSelector(
    (state: ApplicationState) => state.authentication.user,
  );
  const dashboardState = useSelector(
    (state: ApplicationState) => state.dashboard,
  );

  const handleTapSave = () => {
    const questionValue = questionTitle.current?.value ?? "";
    const questionOptionFirstValue = questionOptionFirst.current?.value ?? "";
    const questionOptionSecondValue = questionOptionSecond.current?.value ?? "";
    const saveUserQuestionData: SaveUserQuestionData = {
      questionTitle: questionValue,
      questionOptionFirst: questionOptionFirstValue,
      questionOptionSecond: questionOptionSecondValue,
    };
    dispatch(
      saveUserQuestion({
        userId: user?.userId,
        saveUserQuestionData: saveUserQuestionData,
      }),
    );
  };

  console.log(dashboardState.loading);
  return dashboardState.loading ? (
    <SpinnerComponent />
  ) : (
    <Grid
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignContent="center"
      alignItems="center"
      width="100%"
    >
      <PoolifyTabBar />

      <Typography variant="h4" gutterBottom>
        Enter your question
      </Typography>
      <PoolifyTextField
        label="Question"
        placeholder="How much is 2+2?"
        inputRef={questionTitle}
      />
      <Typography variant="h4" gutterBottom>
        Answers
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item>
          <PoolifyTextField
            label="First"
            placeholder="3"
            inputRef={questionOptionFirst}
          />
        </Grid>
        <Box width="2px"></Box>
        <Grid item>
          <PoolifyTextField
            label="Second"
            placeholder="3"
            inputRef={questionOptionSecond}
          />
        </Grid>
      </Grid>
      <PoolifyButton title="Save" onTap={handleTapSave} />
    </Grid>
  );
};

export default NewComponent;
