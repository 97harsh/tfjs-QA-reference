import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";

let modelPromise;
let search;
let STATUS;
let input;
let contextDiv;
let answerDiv;

const process = async () => {
  answerDiv.innerHTML = `Loading...`;

  const model = await modelPromise;
  const answers = await model(input.value, contextDiv.value);
  answerDiv.innerHTML = `A: ${answers.answer} <br> score=${answers.score}`;

};

window.onload = () => {
  modelPromise = pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
// Let's test the model
  STATUS = document.getElementById('status');
  STATUS.innerText = 'DistilBERT loaded successfully!';
  input = document.getElementById('question');
  search = document.getElementById('search');
  contextDiv = document.getElementById('context');
  answerDiv = document.getElementById('answer');
  search.onclick = process;

  input.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      process();
    }
  });
};
