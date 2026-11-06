
# Stage 1: Build the React frontend
FROM node:24-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build


# Stage 2: Prepare the Flask application
FROM python:3.12-slim AS backend

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Copy the production React build from Stage 1
COPY --from=frontend-build /frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["python", "app.py"]
