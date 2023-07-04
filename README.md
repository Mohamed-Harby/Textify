# Textify

Textify is a command-line application that allows you to perform various text actions such as text summarization, sentiment analysis, and named entity recognition. It leverages external APIs to analyze and process text input.

## Features

- Text summarization: Summarize a piece of text to extract the most important information.
- Sentiment analysis: Analyze the sentiment of a text and determine whether it is positive, negative, or neutral.
- Named entity recognition: Identify and extract named entities (such as people, organizations, locations) from a text.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/textify.git
   ```

2. Install the dependencies:

   ```bash
   cd textify
   npm install
   ```

3. Set up the API key:

   - Rename the `.env.example` file to `.env`.
   - Replace the `YOUR_API_KEY` placeholder with your actual API key.

## Usage

1. Make sure that [npm](https://www.npmjs.com/) is installed in you machine.

2. Open a terminal and run the following command to add textify cli to your machine:

```bash
npm i --g
```
3. Start using the CLI by typing:
```bash
textify
```

4. Follow the on-screen prompts to select the desired action and enter the required text input. The application will process the text using the respective APIs and display the results.

## API Providers

Textify uses the [text-analysis12](https://rapidapi.com/gaurmanojkumar530/api/text-analysis12/) API.

## License
This project is licensed under the [MIT License](LICENSE).

