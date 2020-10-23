// DRUPAL BACKEND
export const BASE = "http://192.168.56.101"
export const BASE_API = `${BASE}/jsonapi`
export const CSRF_TOKEN = `${BASE}/session/token`
export const TRANSLATE = (alias) => `${BASE}/router/translate-path?path=${alias}`

// USER
export const LOGIN = `${BASE}/user/login?_format=json`
export const REGISTER = `${BASE}/user/register?_format=json`
export const STATUS = `${BASE}/user/login_status?_format=json`
export const LOGOUT = `${BASE}/user/logout?_format=json`

// ARTICLE
export const ALIAS2UUID = (alias) => `${BASE}/router/translate-path?path=/article/${alias}`
export const ARTICLE = (uuid) => `${BASE_API}/node/article/${uuid}?include=field_image,field_tags`

// TAXONOMY
// export const TERMS        = (uuid) => `${BASE_API}/taxonomy_term/tags/${uuid}`
export const TERMS = (name) => `${BASE_API}/node/article?include=field_image,field_tags&filter[titleFilter][condition][path]=field_tags.name&filter[titleFilter][condition][value]=${name}`

// ARTICLES
const NODE = '/node/article'
const INCLUDE = '?query_string=&include=field_image,field_tags,uid'
const OFFSET = '&page[offset]='
const LIMIT = '&page[limit]='
const PAGE = '&page[page]='
const SORT = '&sort[sort-created][path]=created'
const FILTER = (term) => `&filter[taxonomy_term--tags][condition][path]=field_tags.name&filter[taxonomy_term--tags][condition][operator]=IN&filter[taxonomy_term--tags][condition][value][]=${term}`

export const ARTICLES = (params) => {
    if (params.terms !== "") {
        console.log("API call with terms ----------------------------: ", params.terms)
        let FILTERS = ''
        params.terms.map((term) => {
          return (
            FILTERS = FILTERS + FILTER(term)
            )
        })
        // return `${BASE_API}${NODE}${INCLUDE}${SORT}${FILTERS}${OFFSET}${params.pager.offset}${LIMIT}${params.pager.limit}${PAGE}${params.pager.page}`
        return `${BASE_API}${NODE}${INCLUDE}${SORT}${FILTERS}${OFFSET}${params.pager.offset}${PAGE}${params.pager.page}`
    }
    // console.log("API call ----------------------------")
    // return `${BASE_API}${NODE}${INCLUDE}${SORT}${OFFSET}${params.pager.offset}${PAGE}${params.pager.page}`
    return `${BASE_API}${NODE}${INCLUDE}${LIMIT}${params.pager.limit}${OFFSET}${params.pager.offset}`
    // return `${BASE_API}${NODE}${INCLUDE}${SORT}${OFFSET}${params.pager.offset}${LIMIT}${params.pager.limit}${PAGE}${params.pager.page}`
}