import cheerio from 'cheerio';
import axios from 'axios';
import { removeDuplicates } from './utilts';

const getSelector = (type: 'h1' | 'h2' | 'h3') => {
  return `body ${type}`;
};

type Headers = {
  h1: string[];
  h2: string[];
  h3: string[];
};
export const main = async (url: string) => {
  const headers: Headers = {
    h1: [],
    h2: [],
    h3: [],
  };

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  $(getSelector('h1')).map(function (_, el) {
    headers.h1.push($(el).text());
  });
  $(getSelector('h2')).map(function (_, el) {
    headers.h2.push($(el).text());
  });
  $(getSelector('h3')).map(function (_, el) {
    headers.h3.push($(el).text());
  });

  headers.h1 = removeDuplicates(headers.h1);
  headers.h2 = removeDuplicates(headers.h2);
  headers.h3 = removeDuplicates(headers.h3);

  return {
    headers,
    site: url,
  };
};
