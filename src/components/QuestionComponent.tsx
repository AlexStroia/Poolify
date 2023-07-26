import { QuestionData } from "../model/QuestionData";
import { Grid, Typography, Box, Card, Avatar } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../actions/GetQuestionAction";
import { ApplicationState } from "../state/ApplicationState";
import { SpinnerComponent } from "./SpinnerComponent";
import ErrorComponent from "./ErrorComponent";
import { PoolifyButton } from "../views/PoolifyButton";
import { UserQuestionAnswer } from "../model/UserQuestionAnswer";
import { saveUserAnswerAction } from "../actions/SaveUserAnswer";
import { updateQuestionVotesAction } from "../actions/UpdateQuestionVotesAction";
import { getAvatarUrlAction } from "../actions/GetAvatarUrlAction";

export const QuestionComponent = () => {
  const navigator = useNavigate();
  const { question_id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => state);

  const authenticatedUser = state.authentication.user;
  const questionState = state.question;
  const questionData = questionState.question;
  const error = questionState.error;
  const avatar = state.question.avatarUrl;
  useEffect(() => {
    if (question_id !== null && question_id !== undefined) {
      dispatch(getQuestionAction(question_id!));
    }
    console.log("QuestionData user id" + questionData?.userId);
    if (questionData?.userId !== null && questionData?.userId !== undefined) {
      dispatch(getAvatarUrlAction(questionData?.userId));
    }
  }, []);

  const handleUserFirstAnswer = (value: string) => {
    if (authenticatedUser !== null || authenticatedUser !== undefined) {
      const userId = authenticatedUser?.userId!;
      const userQuestionAnswer: UserQuestionAnswer = {
        questionData: questionData!,
        questionOptionFirst: value,
        questionOptionSecond: null,
      };
      const questionId = question_id!;
      const voteOptionFirst = value;
      const voteOptionSecond = null;
      dispatch(saveUserAnswerAction({ userId, userQuestionAnswer }));
      dispatch(
        updateQuestionVotesAction({
          questionId,
          voteOptionFirst,
          voteOptionSecond,
        }),
      );
      dispatch(getQuestionAction(question_id!));
      navigator(-1);
    }
  };

  const handleUserSecondAnswer = (value: string) => {
    if (authenticatedUser !== null || authenticatedUser !== undefined) {
      const userId = authenticatedUser?.userId!;
      const userQuestionAnswer: UserQuestionAnswer = {
        questionData: questionData!,
        questionOptionSecond: value,
        questionOptionFirst: null,
      };
      const questionId = question_id!;
      const voteOptionSecond = value;
      const voteOptionFirst = null;
      dispatch(saveUserAnswerAction({ userId, userQuestionAnswer }));
      dispatch(
        updateQuestionVotesAction({
          questionId,
          voteOptionFirst,
          voteOptionSecond,
        }),
      );
      navigator(-1);
    }
  };

  return questionState.loading ? (
    <SpinnerComponent />
  ) : (
    <Grid
      container
      direction="column"
      spacing={2}
      display="flex"
      alignContent="center"
      alignItems="center"
      gap={"16px"}
    >
      <Grid item>
        <PoolifyTabBar />
      </Grid>
      <Grid item>
        <Avatar
          src={avatar as string}
          style={{
            height: "150px",
            width: "150px",
            cursor: "pointer",
          }}
        />
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
                  alignContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <PoolifyButton
                  title={questionData?.questionOptionFirst ?? ""}
                  onTap={() =>
                    handleUserFirstAnswer(
                      questionData?.questionOptionFirst ?? "",
                    )
                  }
                ></PoolifyButton>
                <Typography variant="body1">
                  {questionData?.voteOptionFirst}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <PoolifyButton
                  title={questionData?.questionOptionSecond ?? ""}
                  onTap={() =>
                    handleUserSecondAnswer(
                      questionData?.questionOptionSecond ?? "",
                    )
                  }
                ></PoolifyButton>{" "}
                <Typography variant="body1">
                  {questionData?.voteOptionSecond}
                </Typography>
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
