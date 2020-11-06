# React-Drupal-Starter

A simple react-redux-saga front-end for Drupal 8 with jsonapi module enabled

## What this front-end can do
1. Front page with list of articles links with:
    - fields: Title, Image, Tags
    - pager
    - tag filter
2. Article page
3. Authenticate user
    - Login form
    - Logout button
4. Post article form without validation with fieds:
    - Title
    - Drah and Drop image
    - Body
    - Tags with auto-complete and create new tags

## What this front-end use
#### react
Functional components with a few hooks

### redux
- store.api: isLoading, POST and GET responces, browser url parameters, pager data
- store.user: Drupal response to POST login
- store.article: Drupal response to GET a single article
- store.articles: Drupal response to GET list of articles
- store.articlePost: Form data for POST new article

### saga
Cocmmunicate with the api.js

- userLoginWatcher: listens for USER_LOGIN_REQUEST and POST the action.payload
- userLogoutWatcher: listens for USER_LOGOUT_REQUEST and POST the logout token
- articlesWatcher: listen for GET_ARTICLES, fetch, execute SET_ARTICLES
- articleWatcher: listen for GET_ARTICLE, fetch, execute SET_ARTICLE
- articlePostWatcher: listen for actions:
    - POST_ARTICLE
    - POST_ARTICLE_FILE
    - POST_TAG
    - GET_VOCABULARY
    and POST the action.payload. After of every POST_TAG then GET_VOCABULARY to include the new tag into local vocabulary and also add the new tag to selected tags

### router
- Header menu
- Hide 'New Article' menu item from non authenticated users
- Protecting the 'article/create/ router from non authenticated users

Routes

- /
- /?offset=2
- /?terms=myterm
- /?terms=myterm&offset=2
- /article/my article
- /user/login
- /article/create


### debuging
- ready for the redux browser extention






## Configure Drupal Backend

### Installation
./anew.sh mybackend

### Generate Content
1. Make image field required
http://192.168.56.101/admin/structure/types/manage/article/fields/node.article.field_image

2. Generate Articles
http://192.168.56.101/admin/config/development/generate/content

### Get Articles
```
curl http://192.168.56.101/jsonapi/views/frontpage/page_1
```




## Test Drupal Endpoints

#### GET CSRF Token
Non authenticated users recieve a different one every time they GET request
Authenticated users get the same that already have stored from the POST Login reqponse
```
curl --location --request GET 'http://192.168.56.101/session/token'
```

#### GET articles
The part `?include=field_image,field_tags` needs the jsponapi_include drupal module
```
curl --location --request GET 'http://192.168.56.101/jsonapi/node/article?include=field_image,field_tags
```

#### GET articles with tag 'myterm'
The filter part is `&filter...field_tags.name&filter...myterm`
```
curl --location --request GET 'http://192.168.56.101/jsonapi/node/article?include=field_image,field_tags&filter[titleFilter][condition][path]=field_tags.name&filter[titleFilter][condition][value]=myterm'
```


#### POST image
The `react-dropzone-uploader` needs a patch to include `xhr.withCredentials = true`

```
curl --location --request POST 'http://192.168.56.101/jsonapi/node/article/field_image' \
--header 'Accept: application/vnd.api+json' \
--header 'Content-Type: application/octet-stream' \
--header 'X-CSRF-Token: QtqRwdIdCxl2rPZezdUAelvTzghLQjF_pm3xb7j8_LI' \
--header 'Content-Disposition: file; filename="156696.jpg"' \
--header 'X-Requested-With: XMLHttpRequest' \
--header 'Accept-Encoding: gzip, deflate' \
--header 'Cookie: SESS2f4ff3168b8423453fc408c2c2581ce0=FFZMHxxhCcxP4AoU99WTuS0lfZ3k8uBMTRiTd_7ht2Y' \
--data-binary '@/home/ste/Pictures/wallpapers/156696.jpg'
```

#### POST tag
The user can create new tags in the same input with `<CreatableSelect ... />` from `react-select`
```
curl --location --request POST 'http://192.168.56.101/jsonapi/taxonomy_term/tags' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Accept: application/vnd.api+json' \
--header 'Authorization: Basic YWRtaW46MTIzNA==' \
--header 'X-CSRF-Token: ab9GUlrf7UfccnaNKSmicMF60N0TcVzoWupcA3UBv7c' \
--data-raw '{
    "data": {
        "type": "taxonomy_term--tags",
        "attributes": {
            "name": "latest term"
        }
    }
}'
```



## Installation
```
git clone https://stevaidis.mywire.org:4080/ste/react-drupal-starter.git
cd react-drupal-starter
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
