#!/bin/bash
curl --location --request POST 'http://192.168.56.101/jsonapi/node/article/field_image' \
--header 'Accept: application/vnd.api+json' \
--header 'Content-Type: application/octet-stream' \
--header 'X-CSRF-Token: ab9GUlrf7UfccnaNKSmicMF60N0TcVzoWupcA3UBv7c' \
--header 'Content-Disposition: file; filename="react-drupal-blog.png"' \
--header 'Cookie: SESS2f4ff3168b8423453fc408c2c2581ce0=z4nY3mKAsitDoNP-1jn3oIuq2SukOHBj8702fq0fWaI' \
--data-binary '@/home/ste/Pictures/react-drupal-blog.png'
