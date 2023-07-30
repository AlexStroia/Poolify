import { _saveQuestionAnswer, Answer } from "../_DATA";
describe("_saveQuestionAnswer", () => {
  test("should return true when correctly formatted data is passed", async () => {
    // Mock the necessary data
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";

    // Call the _saveQuestionAnswer function and await the result
    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    // Verify that the result is true
    expect(result).toBe(true);
  });

  test("should return an error when incorrect data is passed", async () => {
    // Mock the necessary data with incorrect data
    const authedUser = "";
    const qid = "";
    const answer: Answer = "optionTwo";

    try {
      // Call the _saveQuestionAnswer function with incorrect data
      await _saveQuestionAnswer({
        authedUser: authedUser,
        qid: qid,
        answer: answer,
      });

      // If the function does not throw an error, fail the test
      fail("Expected _saveQuestionAnswer to throw an error, but it did not.");
    } catch (error) {
      // Verify that the error message is as expected
      expect(error).toBe("Please provide authedUser, qid, and answer");
    }
  });
});
