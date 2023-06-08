import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();


export async function fetchOpenAI(query:String):Promise<any> {
  const model = process.env.OPENAI_MODEL || '';
  const todayDate = new Date().toISOString().split('T')[0];

  const prompt = `Parse the input message and return a JSON object with information about an expense transaction. The JSON object should include the name (up to 50 characters), date (in the format YYYY-MM-DD), amount (decimal number with two decimal places), and category (chosen from provided categories list). Input message: '${query}'. Categories list: [Groceries, Dining Out, Transportation, Utilities, Rent/Mortgage, Entertainment, Shopping, Health and Fitness, Travel, Education, Insurance, Personal Care, Home Improvement, Gifts and Donations, Taxes, Subscriptions and Memberships, Childcare, Pet Expenses, Financial Services, Miscellaneous Expenses]. Example JSON object: {"name": "Invalid Input", "date": "2023-01-01", "amount": "0.00", "category": "Utilities"}. Today's date is ${todayDate}.`
  console.log('Prompt: ', prompt);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\"\"\""],
    });

    const { data } = response;

    if (data && data.choices && data.choices.length) {
      const result = JSON.parse(data.choices[0].text!.replace(/\n/g, ""));
      // console.log('Result', result);
      // console.log('type', typeof result);
      return result;
    } else {
      console.log('\nno result: \n', JSON.stringify(data));
      return null;
    }

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
    throw error;
    // throw "Server is busy, please try again later.";
  }
}

// const query = "Yesterday I spent $30 on groceries at the local supermarket";
// fetchOpenAI(query)
// .then(result => {
//   console.log("🥳", result);
//   // Handle the result
// })
// .catch(error => {
//   // Handle the error
//   console.log("😩", error);
// });