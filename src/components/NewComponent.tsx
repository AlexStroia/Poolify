import { Grid, Typography, Box, Card } from "@mui/material";
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
    (state: ApplicationState) => state.authentication.user
  );
  const dashboardState = useSelector(
    (state: ApplicationState) => state.dashboard
  );

  const handleTapSave = () => {
    const questionOptionFirstValue = questionOptionFirst.current?.value ?? "";
    const questionOptionSecondValue = questionOptionSecond.current?.value ?? "";
    const saveUserQuestionData: SaveUserQuestionData = {
      questionOptionFirst: questionOptionFirstValue,
      questionOptionSecond: questionOptionSecondValue,
    };
    dispatch(
      saveUserQuestion({
        userId: user?.userId,
        saveUserQuestionData: saveUserQuestionData,
      })
    );
  };

  return dashboardState.loading ? (
    <SpinnerComponent />
  ) : (
    <div>
      <PoolifyTabBar />
        <Card
          style={{ marginTop: "16px", borderRadius: "16px", padding: "16px",
         }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              Would you rather?
            </Typography>
            <Grid container direction="column" spacing={2}
            display="flex"
            alignContent="ce"
            >
              <Grid item>
                <PoolifyTextField
                  label="First"
                  placeholder="3"
                  inputRef={questionOptionFirst}
                />
              </Grid>
              <Grid item>
                <PoolifyTextField
                  label="Second"
                  placeholder="3"
                  inputRef={questionOptionSecond}
                />
              </Grid>
            </Grid>
            <PoolifyButton title="Save" onTap={handleTapSave} />
          </div>
        </Card>
    </div>
  );
};

export default NewComponent;
