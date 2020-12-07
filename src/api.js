import xml2js from 'xml2js';

const theverge = () => {
  fetch('https://www.theverge.com/rss/index.xml')
    .then(res => res.text())
    .then((data) => {
      return xml2js.parseString(data, (err, result) => {
        const randomArticle = Math.floor(Math.random() * result.feed.entry.length + 1);
        const article = result.feed.entry[randomArticle];
        this.articleTitle = article?.title[0] ?? '';
        this.article = article?.content[0]._ ?? '';
        this.sanitizeText();
      });
    });
};

export default theverge;