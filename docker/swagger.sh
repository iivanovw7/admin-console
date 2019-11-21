#!/usr/bin/env bash
. config.sh --source-only
. helpers.sh --source-only

# Combining absolute PATHS
DOCS_DIR=`pwd`/..${DOCS_PATH}
DOCS_ABS_PATH=`eval "cd ${DOCS_DIR};pwd;cd - > /dev/null"`

DOCS_ABS_PRIVATE_API=${DOCS_ABS_PATH}/${DOCS_PRIVATE_API}
DOCS_ABS_PUBLIC_API=${DOCS_ABS_PATH}/${DOCS_PUBLIC_API}
DOCS_ABS_PETSTORE=${DOCS_ABS_PATH}/${DOCS_PETSTORE}

createSwaggerContainer() {
  # Cleans all useless containers and images
  echo "Remove unused docker images and container"
  docker system prune
  echo "Building docker image..."

  # Replaces HOST value in swagger config file
  jq --arg prefix "${API_PATH}" '.host = $prefix' ${DOCS_ABS_PRIVATE_API}|sponge ${DOCS_ABS_PRIVATE_API}
  jq --arg prefix "${API_PATH}" '.host = $prefix' ${DOCS_ABS_PUBLIC_API}|sponge ${DOCS_ABS_PUBLIC_API}
  jq --arg prefix "${API_PATH}" '.host = $prefix' ${DOCS_ABS_PETSTORE}|sponge ${DOCS_ABS_PETSTORE}

  # Pulls swagger image
  docker pull swaggerapi/swagger-ui

  # Creates docker container with predefined default documentation file
  # Uses DOCS_ABS_PATH variable to combine filepath
  docker run -d --rm --name ${DOCS_CONTAINER_NAME} \
    -p ${PORT}:8080 \
    -e BASE_URL=${DOCS_BASE_URL} \
    -e URLS_PRIMARY_NAME='Private API' \
    -e SUPPORTED_SUBMIT_METHODS=[] \
    -e URLS="[ \
         {url:'docs/${DOCS_PRIVATE_API}', name:'Private API'}, \
         {url:'docs/${DOCS_PUBLIC_API}', name:'Public API'}, \
         {url:'docs/${DOCS_PETSTORE}', name:'Swagger Petstore'} \
       ]" \
    -v ${DOCS_ABS_PATH}:/usr/share/nginx/html/docs/ swaggerapi/swagger-ui
}

runSwaggerContainer() {
  read -p "Should we find and remove any containers listening to: ${PORT} ? [y/N] " -n 1 -r
  echo    # moving to a new line

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    removeByPortNumber ${PORT} container;
  else
    removeContainerByName ${DOCS_CONTAINER_NAME}
    echo    # moving to a new line
  fi
    createSwaggerContainer
    return 0
}

sudo apt-get install jq
sudo apt-get install moreutils
runSwaggerContainer
