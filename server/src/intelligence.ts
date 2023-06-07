import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();


export async function fetchOpenAI(query:String):Promise<any> {
  const model = process.env.OPENAI_MODEL || '';
  const todayDate = (new Date()).toDateString();

  const prompt1 = `Parse the input message and return a JSON object with information about an expense transaction. The JSON object should include the name (a string of up to 50 characters), date (in the format YYYY-MM-DD, default:today), amount (a decimal number with two decimal places), and category. Input message: '${query}'. Example JSON object: {"name": "Water Bills", "date": "2023-06-06", "amount": "233.33", "category": "Utilities"}. Today's date is ${todayDate}.`

  const prompt = `Parse the input message and return a JSON object with information about an expense transaction. The JSON object should include the name (a string of up to 50 characters), date (in the format YYYY-MM-DD, default:today), amount (a decimal number with two decimal places), and category (chosen from the provided categories list). Input message: '${query}'. Categories list: [Groceries, Dining Out, Transportation, Utilities, Rent/Mortgage, Entertainment, Shopping, Health and Fitness, Travel, Education, Insurance, Personal Care, Home Improvement, Gifts and Donations, Taxes, Subscriptions and Memberships, Childcare, Pet Expenses, Financial Services, Miscellaneous Expenses]. Example JSON object: {"name": "Water Bills", "date": "2023-06-06", "amount": "233.33", "category": "Utilities"}. Today's date is ${todayDate}.`

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // const result = {success: true, result:"" };

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt1,
      temperature: 0,
      max_tokens: 2000,
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