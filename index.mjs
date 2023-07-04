#!/usr/bin/env node

import inquirer from "inquirer";
import {
  performTextSummarization,
  performSentimentAnalysis,
  performNamedEntityRecognition,
} from "./utils/actions.mjs";

const actionQuestion = {
  type: "list",
  name: "action",
  message: "Select the desired action:",
  choices: [
    "Text Summarization",
    "Sentiment Analysis",
    "Named Entity Recognition",
  ],
};

const textQuestion = {
  type: "input",
  name: "text",
  message: "Enter your text:",
};

const summarizePerncentageQuestion = {
  type: "list",
  name: "percentage",
  message: "Select the percentage of summarization:",
  choices: ["10%", "30%", "50%"],
  when: (answers) => answers.action === "Text Summarization",
};

const questions = [actionQuestion, textQuestion, summarizePerncentageQuestion];

inquirer
  .prompt(questions)
  .then((answers) => {
    const selectedAction = answers.action;

    // Execute specific functions based on the selected choice
    switch (selectedAction) {
      case "Text Summarization":
        performTextSummarization(answers.text, answers.percentage);
        break;
      case "Sentiment Analysis":
        performSentimentAnalysis(answers.text);
        break;
      case "Named Entity Recognition":
        performNamedEntityRecognition(answers.text);
        break;
      default:
        console.log("Invalid choice");
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
