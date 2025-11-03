#!/bin/bash

# Script to insert data into PostgreSQL database running in Docker

# Configuration
CONTAINER_NAME="postgres-db"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="mydatabase"
SCRIPT_FILE="script.sql"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "================================================"
echo "PostgreSQL Data Insertion Script"
echo "================================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if container exists
if ! docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Error: Container '${CONTAINER_NAME}' does not exist."
    echo "Please run 'docker-compose up -d' first."
    exit 1
fi

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Warning: Container '${CONTAINER_NAME}' is not running."
    echo "Starting container..."
    docker start ${CONTAINER_NAME}
    echo "Waiting for PostgreSQL to be ready..."
    sleep 5
fi

# Verify script file exists
if [ ! -f "${SCRIPT_DIR}/${SCRIPT_FILE}" ]; then
    echo "Error: Script file '${SCRIPT_FILE}' not found in ${SCRIPT_DIR}"
    exit 1
fi

echo "Docker container is running"
echo "Script file found: ${SCRIPT_FILE}"
echo ""
echo "Copying SQL script to container..."

# Copy script to container
docker cp "${SCRIPT_DIR}/${SCRIPT_FILE}" ${CONTAINER_NAME}:/tmp/script.sql

if [ $? -ne 0 ]; then
    echo "Error: Failed to copy script to container"
    exit 1
fi

echo "Script copied successfully"
echo ""
echo "Executing SQL script..."
echo ""

# Execute the SQL script using cat and pipe to avoid path issues
docker exec -i ${CONTAINER_NAME} bash -c "psql -U ${DB_USER} -d ${DB_NAME} < /tmp/script.sql"

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "Data inserted successfully!"
    echo "================================================"
    echo ""
    echo "Database: ${DB_NAME}"
    echo "Container: ${CONTAINER_NAME}"
    echo ""
    
    # Show table counts
    echo "Record counts:"
    docker exec -i ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} -c "SELECT 'Authors' as table_name, COUNT(*) as count FROM authors UNION ALL SELECT 'Posts' as table_name, COUNT(*) as count FROM posts;"
    
    echo ""
    echo "All done!"
else
    echo ""
    echo "Error: Failed to execute SQL script"
    echo "Please check the script for errors"
    exit 1
fi

# Cleanup
echo ""
echo "Cleaning up..."
docker exec -i ${CONTAINER_NAME} bash -c "rm -f /tmp/script.sql"
echo "Cleanup complete"

