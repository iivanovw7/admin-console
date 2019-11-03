# Dockerfile
    # Pulling image
    FROM node:8
    # Set up work dir
    WORKDIR /app
    # Copy application data
    COPY . /app
    # Install global depencies, project depencies and pm2 globally,
    RUN node --max_old_space_size=1024 $(which npm) install
    RUN node --max_old_space_size=1024 $(which npm) install pm2 -g
    RUN node --max_old_space_size=1024 $(which npm) run install:all

    # Running all tests (regenerating snapshots)
    RUN cd client && node --max_old_space_size=1024 $(which npm) run test:silent -- -u
    RUN cd server && node --max_old_space_size=1024 $(which npm) run test:silent -- -u

    # Building client app
    RUN node --max_old_space_size=1024 $(which npm) run build

    # Exposing application ports
    EXPOSE 7425
    EXPOSE 4782

    # Executing
    CMD ["pm2-runtime", "./process.yml"]
