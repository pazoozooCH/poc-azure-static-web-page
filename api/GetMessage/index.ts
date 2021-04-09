import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const mongoUrl = process.env.APP_MONGO_URL;
    console.log('from process: ', mongoUrl);

    const client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let text;
    try {
      await client.connect();
      const database = client.db('mme-test');
      const foo = database.collection('foo');
      // Query for a movie that has the title 'Back to the Future'
      const query = {};// { title: 'Back to the Future' };
      const res = await foo.findOne(query);
      console.log('result', res);
      text = "Hello from the API " + JSON.stringify(res);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    context.res = {
        body: {
          text
        }
    };
};

export default httpTrigger;
