# syntax=docker/dockerfile:1

FROM golang:1.19 AS builder

WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-backend

FROM alpine:latest

WORKDIR /root/

# Copy the pre-built binary file from the builder stage
COPY --from=builder /go-backend .
COPY --from=builder /app/.env .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./go-backend"]
