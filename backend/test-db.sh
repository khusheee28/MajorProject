#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Testing database connection..."

# Test MySQL connection
if mysql -u root -proot@123 -e "SELECT 1;" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ MySQL connection successful${NC}"
    
    # Check if database exists
    if mysql -u root -proot@123 -e "USE umeedfund;" >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Database 'umeedfund' exists${NC}"
        
        # Check tables
        TABLES=$(mysql -u root -proot@123 -e "SHOW TABLES FROM umeedfund;" | grep -E "campaigns|donations")
        if [ ! -z "$TABLES" ]; then
            echo -e "${GREEN}✓ Required tables exist${NC}"
            
            # Test API endpoint
            echo "Testing API endpoint..."
            RESPONSE=$(curl -s -X POST http://localhost:8081/api/campaigns/test)
            if [[ $RESPONSE == *"Database connection successful"* ]]; then
                echo -e "${GREEN}✓ API test successful${NC}"
                echo "Response: $RESPONSE"
            else
                echo -e "${RED}✗ API test failed${NC}"
                echo "Response: $RESPONSE"
            fi
        else
            echo -e "${RED}✗ Required tables not found${NC}"
        fi
    else
        echo -e "${RED}✗ Database 'umeedfund' does not exist${NC}"
    fi
else
    echo -e "${RED}✗ MySQL connection failed${NC}"
fi 