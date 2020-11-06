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

`store.api`: isLoading, browser url parameters, pager data

`store.user`: Drupal response to POST login

`store.article`: Drupal response to GET a single article

`store.articles`: Drupal response to GET list of articles

`store.articlePost`: Form data for POST new article


### saga
Cocmmunicate with the api.js

 `userLoginWatcher`: listens for USER_LOGIN_REQUEST and POST the action.payload

 `userLogoutWatcher`: listens for USER_LOGOUT_REQUEST and POST the logout token

 `articlesWatcher`: listen for GET_ARTICLES, fetch, execute SET_ARTICLES

 `articleWatcher`: listen for GET_ARTICLE, fetch, execute SET_ARTICLE

 `articlePostWatcher`: listen for actions:

 POST_ARTICLE
 
 POST_ARTICLE




    POST_ARTICLE
    POST_ARTICLE_FILE
    POST_TAG
    GET_VOCABULARY
    and POST the action.payload.


  After every POST_TAG the saga worker will:
    1. referesh the local vocabulary with GET_VOCABULARY action
    2. add new tag to selected from user  tags with ADD_SELECTED action

### router
- Header menu
- Hide 'New Article' menu item from non authenticated users
- Protecting the 'article/create/ router from non authenticated users

Routes

|  Cocmponent       | Path                                                         |
| ----------------- |------------------------------------------------------------- |
| `<Articles />`    | /<br>/?offset=2<br>/?terms=myterm<br>/?terms=myterm&offset=2 |
| `<Article  />`    | /article/my article	                                         |
| `<UserLogin />`   | /user/login                                                  |
| `<ArticlePost />` | /article/create                                              |



## Debuging
- Uncomment `console.log` comments in the code
- Install the redux browser extention for [chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or [firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- Get the postman collection: [react-drupal-starter.postman_collection.json](https://stevaidis.mywire.org:4080/ste/react-drupal-starter/src/branch/master/drupal/react-drupal-starter.postman_collection.json)
- Have fun






## Configure Drupal Backend

### Installation
./anew.sh mybackend

### Generate Content
1. Make image field required
http://192.168.56.101/admin/structure/types/manage/article/fields/node.article.field_image

2. Generate Articles
http://192.168.56.101/admin/config/development/generate/content



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
curl --location --request GET 'http://192.168.56.101/jsonapi/node/article \
?include=field_image,field_tags \
&filter[titleFilter][condition][path]=field_tags.name \
&filter[titleFilter][condition][value]=myterm'
```

#### GET article
```
curl --location --request GET 'http://192.168.56.101/jsonapi/node/article \
?include=field_image,field_tags,uid \
&filter[field_path][value]=/article/mytitle'
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


#### POST article with image and tag
```
curl --location --request POST 'http://192.168.56.101/jsonapi/node/article' \
--header 'Content-Type: application/vnd.api+json' \
--header 'X-CSRF-Token: ab9GUlrf7UfccnaNKSmicMF60N0TcVzoWupcA3UBv7c' \
--data-raw '{
    "data": {
        "type": "node--article",
            "attributes": {
            "title": "from postman title with image",
            "body": {
                "value": "from postman body",
                "format": "plain_text"
            }
        },
        "relationships": {
            "field_image": {
                "data": {
                    "type": "file--file",
                    "id": "a59d672b-07d8-42d4-b716-bb3fb8b565e5",
                    "meta": {
                        "alt": "Json Uploaded Testing1",
                        "title": "Json Uploaded Testing1",
                        "width": null,
                        "height": null
                    }
                }
            },
            "field_tags": {
                "data": [{
                    "type": "taxonomy_term--tags",
                    "id": "fc5fd77d-1672-49fa-97a8-f84af218c90b"
                }]
            }
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
