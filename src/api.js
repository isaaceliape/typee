import xml2js from 'xml2js'

const theverge = async () => {
  const response = await fetch('https://www.theverge.com/rss/index.xml')
  const data =await response.text()
  return xml2js.parseString(data, (err, result) => {
    const randomArticle = Math.floor(Math.random() * result.feed.entry.length + 1)
    const article = result.feed.entry[randomArticle]
    this.articleTitle = article?.title[0] ?? ''
    this.article = article?.content[0]._ ?? ''
    this.sanitizeText()
  });
};

export default theverge