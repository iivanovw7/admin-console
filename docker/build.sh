#!/bin/bash
. config.sh --source-only
. helpers.sh --source-only

PORTS_STRING=''
PORTS_CONFIG=''

for PORT in "${PORTS[@]}"; do
   PORTS_STRING+=" ${PORT}";
   PORTS_CONFIG+=" -p ${PORT}:${PORT}";
done

runAdminConsoleContainer () {
  # Runs container with parameters
  echo "Finished..."
  echo "Executing docker container with exposed ports: ${PORTS_STRING}..."
  docker container run -d --rm ${PORTS_CONFIG} ${CONTAINER_NAME}
}

# Pulls image and builds new container
createAdminConsoleImage () {
  # Cleans all useless containers and images
  echo "Remove unused docker images and container"
  docker system prune
  echo "Building docker image..."

  # Builds new container
  cd ..
  docker build --memory 2g -t ${CONTAINER_NAME} .

  runAdminConsoleContainer
}

startBuilding() {
  # Asks if we need to remove containers listening to application ports
  read -p "Should we find and remove any containers listening to: ${PORTS_STRING} ? [y/N] " -n 1 -r
  echo    # moving to a new line

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    # Run through ports array
    for PORT in "${PORTS[@]}"; do
      removeByPortNumber ${PORT} container;
    done
  else
    removeContainerByName ${CONTAINER_NAME}
    echo    # moving to a new line
  fi
    removeImageByName ${CONTAINER_NAME}
    createAdminConsoleImage
    return 0
}

# Builds and runs application container
startBuilding
