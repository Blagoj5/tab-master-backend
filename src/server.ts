import express from 'express';
import { main } from './main';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.post('/analize', async function (req, res) {
  const { body } = req;
  if (!body.url) {
    res.status(500).send({ error: 'Url on body payload does not exist' });
    return;
  }

  const result = await main(body.url);
  res.status(200).send({ result: result.headers });
  return;
});

app.post('/analize-multiple', async function (req, res) {
  const { body } = req;
  if (!Array.isArray(body.urls)) {
    res.status(500).send({
      error: "Urls on body payload does not exist or it's not an array",
    });
    return;
  }

  const promises = (body.urls as string[]).map((url: string) => {
    return main(url);
  });
  const results = await Promise.all(promises);
  res.status(200).send({ results });
  return;
});

app.listen(5000, function () {
  console.log('Ready');
});
