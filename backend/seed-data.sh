#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

BASE_URL="http://localhost:5000"
TOKEN=""

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}📚 Library Management - Seed Data${NC}"
echo -e "${BLUE}========================================${NC}"

# ===== USERS =====
echo -e "\n${YELLOW}[1/6] Creating users...${NC}"

# Admin User
ADMIN=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","name":"Administrator","isAdmin":true}')

# Regular User
USER=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"user123","name":"John Member","isAdmin":false}')

echo -e "${GREEN}✅ Users created${NC}"

# Login to get token
LOGIN=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

TOKEN=$(echo "$LOGIN" | grep -o '"token":"[^"]*' | head -1 | cut -d'"' -f4)
echo -e "${GREEN}✅ Admin token obtained${NC}"

# ===== BOOKS =====
echo -e "\n${YELLOW}[2/6] Adding books...${NC}"

BOOKS=(
  '{"serialNo":"SC(B)000001","name":"A Brief History of Time","author":"Stephen Hawking","category":"Science","type":"book","cost":450,"procurementDate":"2024-01-15","quantity":3}'
  '{"serialNo":"SC(B)000002","name":"The Selfish Gene","author":"Richard Dawkins","category":"Science","type":"book","cost":380,"procurementDate":"2024-02-10","quantity":2}'
  '{"serialNo":"EC(B)000001","name":"Thinking, Fast and Slow","author":"Daniel Kahneman","category":"Economics","type":"book","cost":520,"procurementDate":"2024-01-20","quantity":2}'
  '{"serialNo":"EC(B)000002","name":"The Wealth of Nations","author":"Adam Smith","category":"Economics","type":"book","cost":600,"procurementDate":"2024-11-05","quantity":1}'
  '{"serialNo":"FC(B)000001","name":"The Alchemist","author":"Paulo Coelho","category":"Fiction","type":"book","cost":299,"procurementDate":"2024-03-01","quantity":4}'
  '{"serialNo":"FC(B)000002","name":"To Kill a Mockingbird","author":"Harper Lee","category":"Fiction","type":"book","cost":350,"procurementDate":"2024-01-08","quantity":3}'
  '{"serialNo":"CH(B)000001","name":"Charlotte Web","author":"E.B. White","category":"Children","type":"book","cost":220,"procurementDate":"2024-02-20","quantity":5}'
  '{"serialNo":"PD(B)000001","name":"Atomic Habits","author":"James Clear","category":"Personal Development","type":"book","cost":499,"procurementDate":"2024-04-01","quantity":3}'
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

# ===== MOVIES =====
echo -e "\n${YELLOW}[3/6] Adding movies...${NC}"

MOVIES=(
  '{"serialNo":"SC(M)000001","name":"Interstellar","author":"Christopher Nolan","category":"Science","type":"movie","cost":800,"procurementDate":"2024-12-01","quantity":2}'
  '{"serialNo":"FC(M)000001","name":"The Dark Knight","author":"Christopher Nolan","category":"Fiction","type":"movie","cost":750,"procurementDate":"2024-10-15","quantity":2}'
  '{"serialNo":"FC(M)000002","name":"Inception","author":"Christopher Nolan","category":"Fiction","type":"movie","cost":700,"procurementDate":"2024-11-01","quantity":2}'
  '{"serialNo":"AC(M)000001","name":"Avengers Endgame","author":"Anthony Russo","category":"Action","type":"movie","cost":900,"procurementDate":"2024-09-15","quantity":1}'
)

for MOVIE in "${MOVIES[@]}"; do
  RESULT=$(curl -s -X POST "$BASE_URL/api/books" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$MOVIE")
  
  NAME=$(echo "$MOVIE" | grep -o '"name":"[^"]*' | head -1 | cut -d'"' -f4)
  
  if echo "$RESULT" | grep -q '"_id"'; then
    echo -e "${GREEN}  ✅ Added: $NAME${NC}"
  else
    echo -e "${GREEN}  ℹ️  Exists: $NAME${NC}"
  fi
done

# ===== MEMBERSHIPS =====
echo -e "\n${YELLOW}[4/6] Adding memberships...${NC}"

MEMBERSHIPS=(
  '{"membershipId":"MEM001","firstName":"Alice","lastName":"Smith","contactNumber":"9876543210","aadhaarCardNo":"1234-5678-9012","contactAddress":"12 MG Road, Bangalore","startDate":"2024-01-01","endDate":"2024-07-01","duration":"6months","status":"Active","amountPending":0}'
  '{"membershipId":"MEM002","firstName":"Bob","lastName":"Johnson","contactNumber":"9123456789","aadhaarCardNo":"2345-6789-0123","contactAddress":"45 Park Street, Mumbai","startDate":"2024-02-01","endDate":"2025-02-01","duration":"1year","status":"Active","amountPending":50}'
  '{"membershipId":"MEM003","firstName":"Carol","lastName":"Dave","contactNumber":"9988776655","aadhaarCardNo":"3456-7890-1234","contactAddress":"7 Anna Nagar, Chennai","startDate":"2024-05-01","endDate":"2026-05-01","duration":"2years","status":"Active","amountPending":0}'
  '{"membershipId":"MEM004","firstName":"Deepak","lastName":"Kumar","contactNumber":"8877665544","aadhaarCardNo":"4567-8901-2345","contactAddress":"99 Sector 18, Noida","startDate":"2024-01-01","endDate":"2025-01-01","duration":"1year","status":"Inactive","amountPending":100}'
)

for MEMBERSHIP in "${MEMBERSHIPS[@]}"; do
  RESULT=$(curl -s -X POST "$BASE_URL/api/memberships" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$MEMBERSHIP")
  
  FIRST=$(echo "$MEMBERSHIP" | grep -o '"firstName":"[^"]*' | head -1 | cut -d'"' -f4)
  LAST=$(echo "$MEMBERSHIP" | grep -o '"lastName":"[^"]*' | head -1 | cut -d'"' -f4)
  
  if echo "$RESULT" | grep -q '"_id"'; then
    echo -e "${GREEN}  ✅ Added: $FIRST $LAST${NC}"
  else
    echo -e "${GREEN}  ℹ️  Exists: $FIRST $LAST${NC}"
  fi
done

# ===== GET STATS =====
echo -e "\n${YELLOW}[5/6] Fetching statistics...${NC}"

BOOKS_COUNT=$(curl -s "$BASE_URL/api/books" | grep -o '"_id"' | wc -l)
MEMBERS_COUNT=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/memberships" | grep -o '"_id"' | wc -l)

echo -e "${GREEN}  ✅ Total Books/Movies: $BOOKS_COUNT${NC}"
echo -e "${GREEN}  ✅ Total Members: $MEMBERS_COUNT${NC}"

# ===== SAMPLE QUERIES =====
echo -e "\n${YELLOW}[6/6] Sample data queries...${NC}"

echo -e "\n${BLUE}Books by Science:${NC}"
curl -s "http://localhost:5000/api/books/search?category=Science" | python3 -m json.tool 2>/dev/null | head -15

echo -e "\n${BLUE}All Movies:${NC}"
curl -s "http://localhost:5000/api/books/search?type=movie" | python3 -m json.tool 2>/dev/null | head -15

echo -e "\n${BLUE}Dashboard Stats:${NC}"
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/reports/dashboard" | python3 -m json.tool

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}✅ All seed data added successfully!${NC}"
echo -e "${BLUE}========================================${NC}"

echo -e "\n${YELLOW}API Endpoints Ready:${NC}"
echo -e "  📚 Books:         GET $BASE_URL/api/books"
echo -e "  👥 Members:       GET $BASE_URL/api/memberships"
echo -e "  🔍 Search:        GET $BASE_URL/api/books/search?name=..."
echo -e "  📊 Dashboard:     GET $BASE_URL/api/reports/dashboard"
echo -e "  🔑 Token:         $TOKEN"
echo ""
