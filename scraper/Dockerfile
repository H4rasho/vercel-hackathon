# pull playwright docker image
# Because playwright's image has version, please pull the image that has the same version as your working playwright
FROM mcr.microsoft.com/playwright:v1.29.2-focal

# We do our dirty work inside app folder
WORKDIR /app

# You could definitely use Root user if you are confidient that your code is clean. But I highly suggest you use non-root user to operate the test
# But we make it as ARG so we can pass the --build-arg to alter the user of this image
ARG TEST_USER="playwright"

# I use pnpm so I need to add it right now. 
RUN npm install -g pnpm@7.5.0

# Copy the necessary file into image
COPY package.json pnpm-lock.yaml index.js ./

# Install
RUN pnpm install 
# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 playwright


# Setup user
USER ${TEST_USER}

RUN echo "test user: $TEST_USER"

RUN npx playwright install chromium

EXPOSE 8080

CMD ["node", "index.js"]

