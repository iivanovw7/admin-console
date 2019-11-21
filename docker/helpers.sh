#!/bin/bash

# Helper functions used in build.sh and swagger.sh
# Stops and removes docker container by ID
# Param: $1 - ID
removeById () {
   if [[ "$1" ]]
   then
    # Removes container
    echo "Found ${2} ID: ${1}"
    echo "Stopping and removing it"
    docker ${2} stop ${1} && docker ${2} rm ${1}
   fi
    echo "No containers found!"
    return 0
}

# Finds docker container by PORT assigned
# Param: $1 - PORT number
removeByPortNumber () {
  if [[ "$1" ]]
  echo "Searching containers by port: ${1}"
  then
    # Lists containers and finds one which is listening application port
    ID=$(\
      docker ${2} ls --format="{{.ID}}\t{{.Ports}}" |\
      grep ${1} |\
      awk '{print $1}')
    removeById "${ID}" "${2}"
  fi
    return 0
}

# Removes docker image by image name
# Param: $1 - image NAME
removeImageByName () {
  echo "Removing Docker image ${1}"
  docker rmi $(docker images --format '{{.Repository}}:{{.Tag}}' | grep ${1})
}

# Removes docker container by image name
# Param: $1 - image NAME
removeContainerByName () {
  echo "Removing Docker container ${1}"
  docker rm $(docker stop $(docker ps -a -q --filter ancestor=${1} --format="{{.ID}}"))
}



