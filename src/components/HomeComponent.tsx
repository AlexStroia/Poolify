import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { PoolifyTabBar } from "../views/PoolifyTabBar";
import { QuestionList, QuestionListType } from "../views/QuestionList";

export const HomeComponent = () => {
  const gridData = [
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
    { id: 1, email: "email1@yahoo.com", date: "2022 May 15" },
    { id: 2, email: "email2@gmail.com", date: "2022 June 22" },
    { id: 3, email: "email3@hotmail.com", date: "2022 July 10" },
  ];
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

        <QuestionList questionListType={QuestionListType.NEW} />
        <Box height="32px" />
        <QuestionList questionListType={QuestionListType.Done} />
      </Container>
    </div>
  );
};
