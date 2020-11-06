#!/bin/sh

name="$1"
newdir="/var/www/$1"
memlimit="2G"

if [ "$#" -eq 0 ]
then
    echo
    echo -e "\e[0;37m Create new site with latest drupal version\e[0m"
    echo -e "\e[0;37m Download basic modules\e[0m"
    echo -e "\e[0;37m Enable some modules\e[0m"
    echo
    echo -e " Usage: \e[1;32m anew mysitename \e[0m"
    echo
    exit
fi

echo

check_system() {
    disk_space=$(df -m | grep "^/" | awk {'print $4'})
    printf " [+] Disk space: $disk_space MB available (200Mb min)"
    if [ $disk_space -gt 200 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;32m [FAIL] \e[0m"
        return 1
    fi

    printf " [+] Directory \e[1;97m$newdir\e[m available"
    if [ ! -d "$newdir" ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    printf " [+] Composer and Drush installed"
    commands=(composer drush)
    for command in "${commands[@]}"
    do
        if ! command -v ${command} > /dev/null; then
            echo -e "\e[1;31m [FAIL] \e[0m"
            echo -e " [!] Command \e[96m$command\e[39m not found"
            return 1
        fi
    done
    echo -e "\e[1;32m [ OK ] \e[0m"

    printf " [+] Ping to drupal.org "
    ping drupal.org -c2 &> /dev/null
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    return 0
}

download_drupal() {
    printf " [+] Download drupal on \e[1;97m $newdir \e[m"
    composer -q create-project drupal/recommended-project:8.x $name
    if [ -d "$newdir" ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    mkdir -m 777 $newdir/web/sites/default/files
    printf " [+] Create drupal\e[1;97m sites/default/files \e[mpublic dir"
    if [ -d "$newdir" ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi
    return 0
}

create_link() {
    printf " [+] Create link html -> $name"
    rm /var/www/html -f
    ln -s $newdir/web /var/www/html

    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
        return 0
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi
}

create_configs() {
    printf " [+] Create \e[1;97msettings.php\e[m and \e[1;97mservices.yml\e[m config files"
    cd $newdir
    [ -f web/sites/default/default.settings.php ] &&
    [ -f web/sites/default/default.services.yml ] &&
    cp web/sites/default/default.settings.php web/sites/default/settings.php -p &&
    cp web/sites/default/default.services.yml web/sites/default/services.yml -p &&
    chmod 777 web/sites/default/settings.php &&
    cat <<'EOF'>>web/sites/default/services.yml
  cors.config:
    enabled: true
    allowedHeaders: ['*']
    allowedMethods: ['POST', 'GET', 'OPTIONS', 'PATCH', 'DELETE']
    allowedOrigins: ['*']
    exposedHeaders: true
    maxAge: false
    supportsCredentials: true
EOF

    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
        return 0
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi
}

create_database() {
    printf " [+] Create database:\e[1;34m $name\e[0m"
    mysql -uroot -p1234 -e "Create database $name"
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
        return 0
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi
}

web_install() {
    printf " [+] Go to web ui to continue the installation: \n"
    echo
    for address in `ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'`; do echo -e "\e[96m     http://"$address "\e[m"; done
    echo
    #echo -e "     and press [ENTER] \e[101m\e[1m\e[30m ONLY \e[0m\e[m after web installation is finished"
    echo -e "     and press [ENTER] \e[1;41;97m ONLY \e[0m\e[m after web installation is finished"
    read -rs
}

add_modules() {
    printf " [+] Add jsonapi modules"

    php -dmemory_limit=$memlimit /usr/local/bin/composer -q require \
    drupal/devel \
    drupal/token \
    drupal/pathauto \
    drupal/jsonapi_extras \
    drupal/jsonapi_views \
    drupal/jsonapi_include \
    drupal/jsonapi_page_limit \
    drupal/jsonapi_hypermedia \
    drupal/jsonapi_image_styles \
    drupal/image_url_formatter \
    drupal/pager_serializer \
    drupal/fieldable_path

    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    printf " [+] Enable some jsonapi modules"

    drush en \
    rest \
    token \
    pathauto \
    jsonapi \
    jsonapi_include \
    jsonapi_extras \
    jsonapi_views \
    jsonapi_image_styles \
    image_url_formatter \
    fieldable_path \
    pager_serializer \
    devel_generate -y &> /dev/null

    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    return 0
}

fix_permissions() {
    cd $newdir/web

    printf " [+] chmod 755 \e[1;97msites/default/\e[0m"
    chmod 755 sites/default/
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    printf " [+] chmod 400 \e[1;97msites/default/settings.php\e[0m"
    chmod 400 sites/default/settings.php
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi


    printf " [+] chown -R  nginx:nginx \e[1;97m$newdir\e[0m"
    chown -R nginx:nginx $newdir
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi

    # mkdir web/sites/all/modules -p &&
    # mkdir web/sites/all/libraries -p

    return 0
}

create_user() {
    printf " [+] Create user 'manager with password '1234'"
    drush user-create manager --mail="manager@local" --password="1234" 2> /dev/null
    if [ $? -eq 0 ]; then
        echo -e "\e[1;32m [ OK ] \e[0m"
        return 0
    else
        echo -e "\e[1;31m [FAIL] \e[0m"
        return 1
    fi
}

main() {
   if check_system; then
       if download_drupal; then
           if create_link; then
               if create_configs; then
                   if create_database; then
                       web_install
                       add_modules
                       fix_permissions
                       create_user
                   fi
               fi
           fi
       fi
   fi
}

main
echo

