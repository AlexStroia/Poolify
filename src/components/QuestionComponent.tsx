import { QuestionData } from "../model/QuestionData";
import { Grid, Typography, Box, Card } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../actions/GetQuestionAction";
import { ApplicationState } from "../state/ApplicationState";
import { SpinnerComponent } from "./SpinnerComponent";
import ErrorComponent from "./ErrorComponent";
import { PoolifyButton } from "../views/PoolifyButton";

export const QuestionComponent = () => {
  const { question_id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => state.question);
  const questionData = state.question;
  const error = state.error;
  console.log("Question data boss is " + questionData);

  useEffect(() => {
    if (question_id !== null && question_id !== undefined) {
      dispatch(getQuestionAction(question_id!));
    }
  }, []);

  return state.loading ? (
    <SpinnerComponent />
  ) : (
    <Grid
      container
      direction="column"
      spacing={2}
      display="flex"
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <PoolifyTabBar />
      </Grid>
      <Grid item>
        <Card
          style={{ marginTop: "16px", borderRadius: "16px", padding: "16px" }}
        >
          <div>
            <Grid container direction="column" spacing={2} display="flex">
              <ErrorComponent message={error ?? ""} />
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Would you rather?
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PoolifyButton
                  title={questionData?.questionOptionFirst ?? ""}
                  onTap={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                ></PoolifyButton>
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PoolifyButton
                  title={questionData?.questionOptionSecond ?? ""}
                  onTap={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                ></PoolifyButton>{" "}
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Typography>Choose an option</Typography>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};
