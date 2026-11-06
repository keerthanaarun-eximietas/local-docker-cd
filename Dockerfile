
# Stage 1: Build the React frontend
FROM node:24-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build


# Stage 2: Compile the Flask application using Nuitka
FROM python:3.12-slim AS backend-build

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    patchelf \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir nuitka

COPY app.py .

# Compile Flask into a Linux standalone executable
RUN python -m nuitka \
    --mode=standalone \
    --output-dir=/compiled \
    app.py


# Stage 3: Create the final runtime image
FROM python:3.12-slim AS runtime

WORKDIR /app

# Copy the compiled application
COPY --from=backend-build /compiled/app.dist/ ./

# Copy the React production build
COPY --from=frontend-build /frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["./app.bin"]
