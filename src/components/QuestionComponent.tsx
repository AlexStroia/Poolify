import { Grid, Typography, Card, Avatar } from "@mui/material";
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
import { getUserQuestionAnswerById } from "../actions/GetUserQuestionAnswerById";
import React from "react";
import ArrowDown from "../views/ArrowDown";

export const QuestionComponent = () => {
  const navigate = useNavigate();
  const { question_id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => state);

  const authenticatedUser = state.authentication.user;
  const questionState = state.question;
  const questionData = questionState.question;
  const error = questionState.error;
  const avatar = state.question.avatarUrl;
  console.log("Question boss is " + state.question.question);
  if (state.question.question === null) {
    navigate("/error");
  }

  const handlePercentageVotes = (
    firstOptionVotes: number,
    secondOptionVotes: number,
  ) => {
    const totalVotes = firstOptionVotes + secondOptionVotes;
    const percentageFirstOption = Math.round(
      (firstOptionVotes / totalVotes) * 100,
    );
    const percentageSecondOption = Math.round(
      (secondOptionVotes / totalVotes) * 100,
    );
    return { percentageFirstOption, percentageSecondOption };
  };

  const { percentageFirstOption, percentageSecondOption } =
    handlePercentageVotes(
      parseInt(questionData?.voteOptionFirst! ?? 0, 10),
      parseInt(questionData?.voteOptionSecond! ?? 0, 10),
    );

  useEffect(() => {
    function getUserInformation() {
      if (question_id !== null && question_id !== undefined) {
        dispatch(getQuestionAction(question_id!));
      }
      if (questionData?.userId !== null && questionData?.userId !== undefined) {
        dispatch(getAvatarUrlAction(questionData?.userId));
      }

      if (authenticatedUser?.userId !== null && questionData?.id !== null) {
        dispatch(
          getUserQuestionAnswerById({
            userId: authenticatedUser!.userId!,
            questionId: question_id!,
          }),
        );
      }
    }

    getUserInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    questionData?.id,
    dispatch,
    authenticatedUser,
    question_id,
    authenticatedUser?.userId,
    questionData?.userId,
    questionState.userAnswer,
  ]);

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
      const voteOptionSecond = "0";
      dispatch(saveUserAnswerAction({ userId, userQuestionAnswer }));
      dispatch(
        updateQuestionVotesAction({
          questionId,
          voteOptionFirst,
          voteOptionSecond,
        }),
      );
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
      const voteOptionSecond = "0";
      const voteOptionFirst = null;
      dispatch(saveUserAnswerAction({ userId, userQuestionAnswer }));
      dispatch(
        updateQuestionVotesAction({
          questionId,
          voteOptionFirst,
          voteOptionSecond,
        }),
      );
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
                  {" "}
                  Votes: {questionData?.voteOptionFirst} -{" "}
                  {percentageFirstOption}%
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
                  Votes: {questionData?.voteOptionSecond} -{" "}
                  {percentageSecondOption}%
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
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {questionState &&
                questionState.userAnswer &&
                questionState.userAnswer?.length > 0 ? (
                  <Typography variant="h2">{`You have voted ${
                    questionState.userAnswer ===
                    questionData?.questionOptionSecond
                      ? "Option Second"
                      : "Optione One"
                  }`}</Typography>
                ) : (
                  <div></div>
                )}
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {questionState.userAnswer?.length ?? 0 > 0 ? (
                  <ArrowDown />
                ) : (
                  <div></div>
                )}
              </Grid>
              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PoolifyButton
                  title={questionState.userAnswer?.toString() ?? ""}
                  onTap={() => {}}
                ></PoolifyButton>
              </Grid>

              <Grid
                item
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              ></Grid>
            </Grid>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};
