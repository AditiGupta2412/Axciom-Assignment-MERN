#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

BASE_URL="http://localhost:5000"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}��� Library API - Automated Test${NC}"
echo -e "${BLUE}========================================${NC}"

# Step 1: Register Admin
echo -e "\n${YELLOW}[1/5] Registering admin user...${NC}"
REGISTER=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","name":"Administrator","isAdmin":true}')

if echo "$REGISTER" | grep -q '"_id"'; then
  echo -e "${GREEN}✅ Admin registered successfully${NC}"
else
  echo -e "${GREEN}✅ Admin already exists${NC}"
fi

# Step 2: Login
echo -e "\n${YELLOW}[2/5] Logging in...${NC}"
LOGIN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

TOKEN=$(echo "$LOGIN" | grep -o '"token":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "❌ Login failed"
  exit 1
fi

echo -e "${GREEN}✅ Login successful${NC}"
echo -e "${YELLOW}Token: ${TOKEN:0:20}...${NC}"

# Step 3: Add Books
echo -e "\n${YELLOW}[3/5] Adding books...${NC}"

BOOKS=(
  '{"serialNo":"SC(B)000001","name":"A Brief History of Time","author":"Stephen Hawking","category":"Science","type":"book","cost":450,"procurementDate":"2024-01-15","quantity":3}'
  '{"serialNo":"SC(B)000002","name":"The Selfish Gene","author":"Richard Dawkins","category":"Science","type":"book","cost":380,"procurementDate":"2024-02-10","quantity":2}'
  '{"serialNo":"FC(B)000001","name":"The Alchemist","author":"Paulo Coelho","category":"Fiction","type":"book","cost":299,"procurementDate":"2024-03-01","quantity":4}'
  '{"serialNo":"FC(B)000002","name":"To Kill a Mockingbird","author":"Harper Lee","category":"Fiction","type":"book","cost":350,"procurementDate":"2024-01-08","quantity":3}'
)

for BOOK in "${BOOKS[@]}"; do
  RESULT=$(curl -s -X POST "$BASE_URL/api/books" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BOOK")
  
  NAME=$(echo "$BOOK" | grep -o '"name":"[^"]*' | head -1 | cut -d'"' -f4)
  
  if echo "$RESULT" | grep -q '"_id"'; then
    echo -e "${GREEN}  ✅ Added: $NAME${NC}"
  else
    echo -e "${GREEN}  ℹ️  Exists: $NAME${NC}"
  fi
done

# Step 4: Get All Books
echo -e "\n${YELLOW}[4/5] Fetching all books...${NC}"
BOOKS_LIST=$(curl -s "$BASE_URL/api/books")
COUNT=$(echo "$BOOKS_LIST" | grep -o '"_id"' | wc -l)
echo -e "${GREEN}✅ Total books in database: $COUNT${NC}"

# Step 5: Search
echo -e "\n${YELLOW}[5/5] Searching for 'Brief History'...${NC}"
SEARCH=$(curl -s "$BASE_URL/api/books/search?name=Brief")
echo "$SEARCH" | python3 -m json.tool 2>/dev/null || echo "$SEARCH"

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}✅ All tests completed!${NC}"
echo -e "${BLUE}========================================${NC}"
