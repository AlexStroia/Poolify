import { QuestionData } from "../model/QuestionData";
import { Grid, Typography, Box, Card } from "@mui/material";
import { PoolifyTextField } from "../views/PoolifyTextField";
import { PoolifyButton } from "../views/PoolifyButton";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SaveUserQuestionData,
  saveUserQuestion,
} from "../actions/SaveUserQuestion";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import { useParams } from "react-router-dom";

export const QuestionComponent = () => {
    const questionData = useParams<QuestionData>();

    return (
    <div>
      <PoolifyTabBar />
      <Card
        style={{ marginTop: "16px", borderRadius: "16px", padding: "16px" }}
      >
        <div>
          <Grid
            container
            direction="column"
            spacing={2}
            display="flex"
            alignContent="ce"
          >
            {" "}
            <Grid
              item
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              {" "}
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
              <Typography>{questionData.questionOptionFirst}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography>{questionData.questionOptionSecond}</Typography>
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
    </div>
  );
};
