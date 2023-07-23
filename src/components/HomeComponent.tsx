import { Box, Container, Divider } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import QuestionList, { QuestionListType } from "../views/QuestionList";
import { useEffect } from "react";
import { getNewQuestionsAction } from "../actions/GetNewQuestionsAction";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../state/ApplicationState";
import { useNavigate } from "react-router-dom";

export const HomeComponent = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const state = useSelector((state: ApplicationState) => state.dashboard);

  useEffect(() => {
    dispatch(getNewQuestionsAction());
  }, []);
  console.log(state);

  const handleOnTapQuestion = (questionId: string) => {
    navigator(`/questions/${questionId}`)
  }

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

        <QuestionList
          questionListType={QuestionListType.NEW}
          questionDataList={state.questions}
          onTapQuestion={handleOnTapQuestion}
        />
        <Box height="32px" />
        <QuestionList questionListType={QuestionListType.DONE}
        onTapQuestion={(questionId) => {}}/>
      </Container>
    </div>
  );
};
