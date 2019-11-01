#!/bin/bash

# Application ports
PORT_PRIVATE=7425
DIST_PORT=4782

# Stops and removes docker container by ID
# Param: $1 - ID
removeDockerContainerById () {
   if [[ "$1" ]]
   then # Removes container
    echo "Found Container ID: ${1}"
    echo "Stopping and removing it"
    docker container stop ${1} && docker container rm ${1}
   fi
    return 0
}

#Finds docker container by PORT assigned
# Param: $1 - PORT number
findContainerByPortNumber () {
  if [[ "$1" ]]
  echo "Searching containers by port: $1"
  then # Lists containers and finds one which is listening application port
    ID=$(\
      docker container ls --format="{{.ID}}\t{{.Ports}}" |\
      grep ${1} |\
      awk '{print $1}')
    removeDockerContainerById "${ID}"
  fi
    return 0
}

findContainerByPortNumber ${PORT_PRIVATE}
findContainerByPortNumber ${DIST_PORT}

# Cleans all useless containers and images
echo "Remove unused docker images and container"
docker system prune
echo "Building docker image..."

# Builds new container
docker build -t admin-console .

# Runs container with parameters
echo "Finished..."
echo "Executing docker container with exposed ports: ${PORT_PRIVATE}, ${DIST_PORT}..."
docker container run -d --rm -p ${PORT_PRIVATE}:${PORT_PRIVATE} -p ${DIST_PORT}:${DIST_PORT} admin-console
