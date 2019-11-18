#!/bin/bash

# build.sh File configuration
# Relates to main application docker container and image
PORTS=(7425 4782) # Ports list to be exposed
CONTAINER_NAME='admin-console'

# swagger.sh File configuration
# relates to Swagger docker container and image
PORT=80 # PORT documentation will be served on

# Ending of Base API path
# 'admin-console.cf'
DOCS_CONTAINER_NAME='admin-console-swagger'
API_PATH='localhost:7425'

DOCS_PATH='/server/docs' # Swagger conf filepath
DOCS_BASE_URL='/swagger' # Base docs URL

# Listing all swagger configuration files
DOCS_PRIVATE_API='private.json'
DOCS_PUBLIC_API='public.json'
DOCS_PETSTORE='swagger.json'
