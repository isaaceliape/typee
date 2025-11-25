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

const parseXmlString = (xmlString: string): Promise<RSSResult> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlString, (_err: Error | null, result: unknown) => {
      if (_err) {
        reject(_err)
      } else {
        resolve(result as RSSResult)
      }
    })
  })
}

const theverge = async function(this: Context): Promise<void> {
  try {
    const response = await fetch('https://www.theverge.com/rss/index.xml')
    const data = await response.text()
    const result = await parseXmlString(data)
    const randomArticle = Math.floor(Math.random() * result.feed.entry.length + 1)
    const article = result.feed.entry[randomArticle]
    this.articleTitle = article?.title?.[0] ?? ''
    this.article = article?.content?.[0]._ ?? ''
    this.sanitizeText()
  } catch (err) {
    console.error('Error fetching or parsing RSS:', err)
  }
}

export default theverge