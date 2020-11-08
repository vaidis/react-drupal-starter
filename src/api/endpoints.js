/** BACKEND */
export const BASE = "http://192.168.56.101"
//export const BASE = "https://stevaidis.mywire.org:444"
export const BASE_API = `${BASE}/jsonapi`
export const CSRF_TOKEN = `${BASE}/session/token`

/** USER */
export const LOGIN = `${BASE}/user/login?_format=json`
export const REGISTER = `${BASE}/user/register?_format=json`
export const STATUS = `${BASE}/user/login_status?_format=json`
export const LOGOUT = `${BASE}/user/logout?_format=json`

/** ARTICLE */
export const ARTICLE = (path) => `${BASE_API}/node/article?include=field_image,field_tags,uid&filter[field_path][value]=/article/${path}`
export const POST_TAG = `${BASE_API}/taxonomy_term/tags`
export const ARTICLE_POST_FILE = `${BASE_API}/node/article/field_image`
export const ARTICLE_POST = `${BASE_API}/node/article`


/** ARTICLES */
const NODE = '/node/article'
const INCLUDE = '?query_string=&include=field_image,field_tags,uid'
const OFFSET = '&page[offset]='
const LIMIT = '&page[limit]='
const SORT = '&sort[sort-created][path]=created'
const FILTER = (term) => `&filter[taxonomy_term--tags][condition][path]=field_tags.name&filter[taxonomy_term--tags][condition][operator]=IN&filter[taxonomy_term--tags][condition][value][]=${term}`
export const ARTICLES = (params) => {
  if (params.terms !== "") {
    console.log("endpoints.js > ARTICLES > params.terms:", params.terms)
    let FILTERS = ''
    params.terms.split(',').map((term) => {
      return (
        FILTERS = FILTERS + FILTER(term)
      )
    })
    return `${BASE_API}${NODE}${INCLUDE}${SORT}${OFFSET}${params.offset}${LIMIT}${params.limit}${FILTERS}`
  }
  console.log("endpoints.js > ARTICLES > params:", params)
  return `${BASE_API}${NODE}${INCLUDE}${LIMIT}${params.limit}${OFFSET}${params.offset}`
}

/** VOCABULARY */
export const VOCABULARY = (vocabulary) => `${BASE_API}/taxonomy_term/${vocabulary}`
