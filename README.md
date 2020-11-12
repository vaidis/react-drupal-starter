# React-Drupal-Starter

A simple react-redux-saga front-end for Drupal 8 with jsonapi module enabled

![Alt text](https://github.com/vaidis/react-drupal-starter/blob/master/react-drupal-starter.png?raw=true)

## :floppy_disk:  Installation
```
git clone https://stevaidis.mywire.org:4080/ste/react-drupal-starter.git
cd react-drupal-starter
npm install
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## :doughnut: What it does

1. Front page - List of article links with:
    - Fields: Title, Image, Tags
    - Pager
    - Tag filter
2. Article page
3. Authenticate user
    - Login form
    - Logout button
4. Post article form with fields:
    - Title
    - image (Drag and Drop )
    - Body
    - Tags (with auto-complete and new tag creation)

## :wrench: What is using

### react

Functional components with a few hooks

### react-redux

- `store.api`: isLoading, browser url parameters, pager data
- `store.user`: Drupal response to POST login
- `store.article`: Drupal response to GET a single article
- `store.articles`: Drupal response to GET list of articles
- `store.articlePost`: Form data for POST new article


### react-saga

- `userLoginWatcher`: listens for USER_LOGIN_REQUEST action and POST the payload
- `userLogoutWatcher`: listens for USER_LOGOUT_REQUEST actionand and POST the payload
- `articlesWatcher`: listens for GET_ARTICLES action, fetch articles, dispatch SET_ARTICLES
- `articleWatcher`: listens for GET_ARTICLE action, fetch article, dispatch SET_ARTICLE
- `articlePostWatcher`: listens for actions and POST the action.payload:
    - POST_ARTICLE
    - POST_ARTICLE_FILE
    - POST_TAG

  After the user creates a new tag, he expects this to be included in the selected tags, so after every POST_TAG the saga worker will:
  1. referesh the `store.articlePost.vocabulary` by dispatching the GET_VOCABULARY action
  2. add the new tag to selected tags at `store.articlePost.selected` by dispatching the  ADD_SELECTED action

### react-router-dom

|  Component        | Path                                                         | Permisions |
| ----------------- |------------------------------------------------------------- |----------- |
| `<Articles />`    | /<br>/?offset=2<br>/?terms=myterm<br>/?terms=myterm&offset=2 | public     |
| `<Article  />`    | /article/my article	                                       | public     |
| `<UserLogin />`   | /user/login                                                  | public     |
| `<ArticlePost />` | /article/create                                              | protected  |


##### Protected Menu Item

The component `/header/Menu.js` uses the `/header/LinkPrivate.js` component to hide the protected `<Link />` from non-authenticated users

##### Protected Path

The `App.js` uses the `/utils/RouteProtected.js` to redirect the non-authenticated users from the protected routes to /user/login

## :beetle: Debuging

- Install the redux browser extention for [chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or [firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- Get the postman collection: [react-drupal-starter.postman_collection.json](https://stevaidis.mywire.org:4080/ste/react-drupal-starter/src/branch/master/drupal/react-drupal-starter.postman_collection.json)
- Have fun

:warning: FIX: CORS for Drag and Drop image input field

For the `react-dropzone-uploader` to work with Drupal authentication cookies there is a usefull patch which [Add withCredentials property to support CORS requests](https://github.com/fortana-co/react-dropzone-uploader/pull/49/commits/38184675592ee7be5b409dbb1da30c639f3b4e41). For a quick test you can overwrite the working library files with the patched files from `/fix/react-dropzone-uploader/dist`


# Drupal Backend

### :floppy_disk: Installation

You can use the installation script `drupal/anew.sh` to setup a fresh drupal 8 site ready to work with the react front-end. The script is tested on centos 8 with nginx/php-fpm, it uses `composer` and `drush`, and it needs to be run under `/var/www` dir (`/var/www/anew.sh`)

For my normal setup on a centos 8 virtualbox machine with nginx/php-fpm, the composer needed at least 4GB of ram and also a smal swap file to play nice without any problems

```
cp drupal/anew.sh /var/www
cd /var/www
./anew.sh react-drupal-backend
```

The script will:

- use the composer to install a fresh drush 8
- create settings.php and services.php
- create a database
- set filesystem permissions
- install contributed modules
- enable  contributed modules
- create manager/1234 user
- create a directory with the new site at `/var/www/react-drupal-backend`

The script will install for follwing contributed Modules

- `devel`: usefull for `devel_generate` sub module to generate some demo articles
- `token`: used by `pathauto` module for path alias
- `pathauto`: you can request article by path alias instead of id
- `restui`: enable Login, Register, Logout endpoints
- `jsonapi_extras`: Include count in collection queries
- `jsonapi_include`: merge include and relationship data (nodes with images and tags)
- `jsonapi_image_styles`: exposes image style urls
- `fieldable_path`: get article by url alias
- `pager_serializer`: provide the pager links

:warning: Drupal 8 has a fixed page limit that can be change at:

`vi core/modules/jsonapi/src/Query/OffsetPage.php`

```
-  const SIZE_MAX = 50;
+  const SIZE_MAX = 999;
```

:warning: NGINX need the following setting in config:

```
        location @rewrite {
          - rewrite ^/(.*)$ /index.php?q=$1;
          + rewrite ^/(.*)$ /index.php?query_string last;
        }
```

The project tested with versions:
- Drupal 8.9.8
- Drush 10
- Composer 1.10.13
- PHP 7.4.12
- NGINX 1.16.1


### :wrench: Configure

#### 1. Path alias settings
http://localhost/admin/config/search/path/patterns

New Pattern: Article
- Pattern Type: Content
- Path pattern: `article/[node:title]`
- Content type: Article
- Label: Article
- Enabled: [x]

New Pattern: Tags
- Pattern Type: taxonomy term
- Path pattern: `term/[term:name]`
- Vocabulary: [tags]
- Label: Term
- Enabled: [x]

#### 2. Article Node Settings
http://localhost/admin/structure/types/manage/article
- Preview before submittings: `[Disable]`
- Fields
  1. Body `body`
  2. Comments `comment`
  3. Image `field_iamge` (set as required)
  4. Path `field_path` (set as required)
  5. Tags `field_tags` (set as required for the work of the `devel_generate`)

#### 3. Generate content
http://localhost/admin/config/development/generate/content



##  :beetle: Test Drupal Endpoints

You can download the postman collection [react-drupal-starter.postman_collection.json](https://stevaidis.mywire.org:4080/ste/react-drupal-starter/src/branch/master/drupal/react-drupal-starter.postman_collection.json) or use the curl from the console

#### GET CSRF Token
- Non authenticated users recieve a different one every time they GET response
- Authenticated users get the same that already have gotten from the POST Login reqponse

```
curl --location --request GET 'http://localhost/session/token'
```

#### GET articles
The part `?include=field_image,field_tags` needs the `jsponapi_include` drupal module
```
curl --location --request GET 'http://localhost/jsonapi/node/article?include=field_image,field_tags
```

#### GET articles with tag 'myterm'
The filter part is `&filter...field_tags.name&filter...myterm`
```
curl --location --request GET 'http://localhost/jsonapi/node/article \
?include=field_image,field_tags \
&filter[titleFilter][condition][path]=field_tags.name \
&filter[titleFilter][condition][value]=myterm'
```

#### GET article
The filter by `field_path` is done by the `fieldable_path` module
```
curl --location --request GET 'http://localhost/jsonapi/node/article \
?include=field_image,field_tags,uid \
&filter[field_path][value]=/article/mytitle'
```

#### POST login
Using the standar cookie authentication
```
curl --location --request POST 'http://localhost/user/login?_format=json' \
--header 'Content-type: application/json' \
--data-raw '{"name":"admin", "pass":"1234"}'
```
we get the response
```
{
    "current_user": {
        "uid": "1",
        "roles": [
            "authenticated",
            "administrator"
        ],
        "name": "admin"
    },
    "csrf_token": "YKXBwr_qDlYq2GH_L8RWdauCIDV5GL_eXGxly0sR6Kg",
    "logout_token": "w5D4blEDudgg0F3a51xLKXvE0NztsEBigVjNBMqK1BM"
}
```
this object is stored in redux `store.user`

#### GET user status

#### POST Logout

#### POST image

```
curl --location --request POST 'http://localhost/jsonapi/node/article/field_image' \
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
curl --location --request POST 'http://localhost/jsonapi/taxonomy_term/tags' \
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
curl --location --request POST 'http://localhost/jsonapi/node/article' \
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

