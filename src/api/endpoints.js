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
// export const ALIAS2UUID = (alias) => `${BASE}/router/translate-path?path=/article/${alias}`
// export const ARTICLE = (uuid) => `${BASE_API}/node/article/${uuid}?include=field_image,field_tags`
export const ARTICLE = (path) => `${BASE_API}/node/article?include=field_image,field_tags,uid&filter[field_path][value]=${path}`

// ARTICLES
const NODE = '/node/article'
const INCLUDE = '?query_string=&include=field_image,field_tags,uid'
const OFFSET = '&page[offset]='
const LIMIT = '&page[limit]='
const SORT = '&sort[sort-created][path]=created'
const FILTER = (term) => `&filter[taxonomy_term--tags][condition][path]=field_tags.name&filter[taxonomy_term--tags][condition][operator]=IN&filter[taxonomy_term--tags][condition][value][]=${term}`

export const ARTICLES = (params) => {
    if (params.terms !== "") {
        console.log("API endpoints.ARTICLES params.terms:", params.terms) 
        let FILTERS = ''
        params.terms.split(',').map((term) => {
            return (
                FILTERS = FILTERS + FILTER(term)
            )
        })
        return `${BASE_API}${NODE}${INCLUDE}${SORT}${OFFSET}${params.offset}${LIMIT}${params.limit}${FILTERS}`
    }
    console.log("API endpoints.ARTICLES params:", params)
    return `${BASE_API}${NODE}${INCLUDE}${LIMIT}${params.limit}${OFFSET}${params.offset}`
}
