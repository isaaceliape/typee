import xml2js from 'xml2js'

interface Context {
  articleTitle: string
  article: string
  sanitizeText: () => void
}

interface RSSEntry {
  title?: string[]
  content?: Array<{ _: string }>
}

interface RSSResult {
  feed: {
    entry: RSSEntry[]
  }
}

const theverge = async function(this: Context): Promise<void> {
  const response = await fetch('https://www.theverge.com/rss/index.xml')
  const data = await response.text()
  xml2js.parseString(data, (_err: Error | null, result: RSSResult) => {
    if (_err) {
      console.error('Error parsing XML:', _err)
      return
    }
    const randomArticle = Math.floor(Math.random() * result.feed.entry.length + 1)
    const article = result.feed.entry[randomArticle]
    this.articleTitle = article?.title?.[0] ?? ''
    this.article = article?.content?.[0]._ ?? ''
    this.sanitizeText()
  })
}

export default theverge