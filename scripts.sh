#!/bin/bash

#---File configuration---
PORTS=(7425 4782) # Ports list to be exposed
CONTAINER_NAME='admin-console'
#------------------------

PORTS_STRING=''
PORTS_CONFIG=''

for PORT in "${PORTS[@]}"; do
   PORTS_STRING+=" ${PORT}";
   PORTS_CONFIG+=" -p ${PORT}:${PORT}";
done

# Stops and removes docker container by ID
# Param: $1 - ID
removeDockerContainerById () {
   if [[ "$1" ]]
   then
    # Removes container
    echo "Found Container ID: ${1}"
    echo "Stopping and removing it"
    docker container stop ${1} && docker container rm ${1}
   fi
    echo "No containers found!"
    return 0
}

# Finds docker container by PORT assigned
# Param: $1 - PORT number
findContainerByPortNumber () {
  if [[ "$1" ]]
  echo "Searching containers by port: $1"
  then
    # Lists containers and finds one which is listening application port
    ID=$(\
      docker container ls --format="{{.ID}}\t{{.Ports}}" |\
      grep ${1} |\
      awk '{print $1}')
    removeDockerContainerById "${ID}"
  fi
    return 0
}

# Pulls image and builds new container
createNewContainer () {
  # Cleans all useless containers and images
  echo "Remove unused docker images and container"
  docker system prune
  echo "Building docker image..."

  # Builds new container
  docker build --memory 2g -t ${CONTAINER_NAME} .

  # Runs container with parameters
  echo "Finished..."
  echo "Executing docker container with exposed ports: ${PORTS_STRING}..."
  docker container run -d --rm ${PORTS_CONFIG} ${CONTAINER_NAME}
}

createUserDialog() {
  # Asks if we need to remove containers listening to application ports
  read -p "Should we find and remove any containers listening to: ${PORTS_STRING} ? [y/N] " -n 1 -r
  echo    # moving to a new line

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    # Run through ports array
    for PORT in "${PORTS[@]}"; do
      findContainerByPortNumber ${PORT};
    done

    createNewContainer
  else
    createNewContainer
  fi
    return 0
}

# Run application
createUserDialog
