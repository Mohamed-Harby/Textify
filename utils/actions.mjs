import fetch from "cross-fetch";
import retry from "retry";

import ora from "ora";
import Table from "cli-table3";

const urls = {
  summerizationUrl:
    "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1",
  sentimentAnalysisUrl:
    "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
  namedEntityRecognitionUrl:
    "https://text-analysis12.p.rapidapi.com/ner/api/v1.1",
};

import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.API_KEY;

export async function performTextSummarization(text, percentage) {
  const loader = ora("Performing text summarization...").start();
  const operation = retry.operation();

  operation.attempt(async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: "english",
        summary_percent: parseInt(percentage),
        text: text,
      }),
    };

    try {
      const response = await fetch(urls.summerizationUrl, options);
      const result = await response.text();
      const parsedResult = JSON.parse(result);
      console.log("\n");
      console.log(clc.green(parsedResult.summary));
      loader.succeed("Text summarization completed");
    } catch (error) {
      if (operation.retry(error)) {
        return;
      }
      console.error("Error: Failed to perform text summarization", error);
    }
  });
}

export async function performSentimentAnalysis(text) {
  const loader = ora("Performing sentiment analysis...").start();
  const operation = retry.operation();

  operation.attempt(async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: "english",
        text: text,
      }),
    };

    try {
      const response = await fetch(urls.sentimentAnalysisUrl, options);
      const result = await response.text();
      const parsedResult = JSON.parse(result);
      console.log("\n");
      console.log(
        "Sentiment Analysis Result:",
        clc.green(parsedResult.sentiment)
      );
      loader.succeed("Sentiment analysis completed");
    } catch (error) {
      if (operation.retry(error)) {
        return;
      }
      console.error("Error: Failed to perform sentiment analysis", error);
    }
  });
}

export async function performNamedEntityRecognition(text) {
  const loader = ora("Performing named entity recognition...").start();
  const operation = retry.operation();

  operation.attempt(async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: "english",
        text: text,
      }),
    };

    try {
      const response = await fetch(urls.namedEntityRecognitionUrl, options);
      const result = await response.text();
      const parsedResult = JSON.parse(result);

      const table = new Table({
        head: ["Entity", "Type"],
      });

      parsedResult.ner.forEach((entity) => {
        table.push([entity.entity, entity.label]);
      });

      console.log("\n");
      console.log(table.toString());
      loader.succeed("Named entity recognition completed");
    } catch (error) {
      if (operation.retry(error)) {
        return;
      }
      console.error("Error: Failed to perform named entity recognition", error);
    }
  });
}
