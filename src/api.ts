import xml2js from 'xml2js'

/**
 * Component context for RSS article rendering.
 * Used with `theverge` function to update component state.
 */
interface Context {
  articleTitle: string
  article: string
  sanitizeText: () => void
}

/**
 * Individual RSS feed entry/article.
 * Represents a single article in an RSS feed.
 */
interface RSSEntry {
  title?: string[]
  content?: Array<{ _: string }>
}

/**
 * RSS feed structure for parsed XML.
 * Contains the feed with an array of entries.
 */
interface RSSResult {
  feed: {
    entry: RSSEntry[]
  }
}

/**
 * Wraps xml2js.parseString in a Promise for async/await support.
 * Converts callback-based parsing to a Promise-based API.
 * 
 * @param xmlString - The XML string to parse
 * @returns Promise that resolves to the parsed RSS feed structure
 * @throws Error if XML parsing fails
 * 
 * @private Internal helper function
 */
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

/**
 * Fetches a random article from The Verge RSS feed and updates component state.
 * Retrieves the RSS feed, parses it, selects a random article, and populates
 * the component's articleTitle and article properties.
 * 
 * This function should be bound to a component context that provides:
 * - articleTitle: property to store the article title
 * - article: property to store the article content
 * - sanitizeText: method to sanitize the article text
 * 
 * @returns Promise that resolves when the article has been fetched and processed
 * 
 * @example
 * // In a Vue component
 * const response = await theverge.call(this)
 * // this.articleTitle and this.article are now populated
 * 
 * @throws Logs errors to console but doesn't throw (catches all errors internally)
 * 
 * @see Context interface for required component properties
 */
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