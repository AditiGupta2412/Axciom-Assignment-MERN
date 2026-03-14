// =====================================================
// Library Management System — Data Layer (Backend)
// =====================================================

const DB = (() => {

  // ---- Seed Data ----
  const SEED = {
    users: [
      { id: 'U001', username: 'adm',  password: 'adm',  name: 'Administrator', isAdmin: true,  isActive: true },
      { id: 'U002', username: 'user', password: 'user', name: 'John Member',   isAdmin: false, isActive: true },
    ],
    books: [
      { serialNo: 'SC(B)000001', name: 'A Brief History of Time', author: 'Stephen Hawking',  category: 'Science',              type: 'book',  status: 'Available', cost: 450,  procurementDate: '2023-01-15', quantity: 3 },
      { serialNo: 'SC(B)000002', name: 'The Selfish Gene',        author: 'Richard Dawkins',  category: 'Science',              type: 'book',  status: 'Available', cost: 380,  procurementDate: '2023-02-10', quantity: 2 },
      { serialNo: 'EC(B)000001', name: 'Thinking, Fast and Slow', author: 'Daniel Kahneman',  category: 'Economics',            type: 'book',  status: 'Issued',    cost: 520,  procurementDate: '2023-01-20', quantity: 2 },
      { serialNo: 'EC(B)000002', name: 'The Wealth of Nations',   author: 'Adam Smith',       category: 'Economics',            type: 'book',  status: 'Available', cost: 600,  procurementDate: '2022-11-05', quantity: 1 },
      { serialNo: 'FC(B)000001', name: 'The Alchemist',           author: 'Paulo Coelho',     category: 'Fiction',              type: 'book',  status: 'Available', cost: 299,  procurementDate: '2023-03-01', quantity: 4 },
      { serialNo: 'FC(B)000002', name: 'To Kill a Mockingbird',   author: 'Harper Lee',       category: 'Fiction',              type: 'book',  status: 'Available', cost: 350,  procurementDate: '2023-01-08', quantity: 3 },
      { serialNo: 'CH(B)000001', name: 'Charlotte\'s Web',        author: 'E.B. White',       category: 'Children',             type: 'book',  status: 'Available', cost: 220,  procurementDate: '2023-02-20', quantity: 5 },
      { serialNo: 'PD(B)000001', name: 'Atomic Habits',           author: 'James Clear',      category: 'Personal Development', type: 'book',  status: 'Available', cost: 499,  procurementDate: '2023-04-01', quantity: 3 },
      { serialNo: 'SC(M)000001', name: 'Interstellar',            author: 'Christopher Nolan','category': 'Science',            type: 'movie', status: 'Available', cost: 800,  procurementDate: '2022-12-01', quantity: 2 },
      { serialNo: 'FC(M)000001', name: 'The Dark Knight',         author: 'Christopher Nolan','category': 'Fiction',            type: 'movie', status: 'Available', cost: 750,  procurementDate: '2022-10-15', quantity: 2 },
    ],
    memberships: [
      { membershipId: 'MEM001', firstName: 'Alice',   lastName: 'Smith',   contactNumber: '9876543210', contactAddress: '12 MG Road, Bangalore', aadhaarCardNo: '1234-5678-9012', startDate: '2024-01-01', endDate: '2024-07-01', duration: '6months', status: 'Active',   amountPending: 0   },
      { membershipId: 'MEM002', firstName: 'Bob',     lastName: 'Johnson', contactNumber: '9123456789', contactAddress: '45 Park Street, Mumbai',  aadhaarCardNo: '2345-6789-0123', startDate: '2024-02-01', endDate: '2025-02-01', duration: '1year',   status: 'Active',   amountPending: 50  },
      { membershipId: 'MEM003', firstName: 'Carol',   lastName: 'Dave',    contactNumber: '9988776655', contactAddress: '7 Anna Nagar, Chennai',   aadhaarCardNo: '3456-7890-1234', startDate: '2023-05-01', endDate: '2025-05-01', duration: '2years',  status: 'Active',   amountPending: 0   },
      { membershipId: 'MEM004', firstName: 'Deepak',  lastName: 'Kumar',   contactNumber: '8877665544', contactAddress: '99 Sector 18, Noida',     aadhaarCardNo: '4567-8901-2345', startDate: '2022-01-01', endDate: '2023-01-01', duration: '1year',   status: 'Inactive', amountPending: 100 },
    ],
    issues: [
      { issueId: 'ISS001', serialNo: 'EC(B)000001', bookName: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', membershipId: 'MEM001', issueDate: '2024-02-15', returnDate: '2024-03-01', actualReturnDate: null, fine: 0,  status: 'Active'   },
      { issueId: 'ISS002', serialNo: 'FC(B)000002', bookName: 'To Kill a Mockingbird',   author: 'Harper Lee',      membershipId: 'MEM002', issueDate: '2024-01-10', returnDate: '2024-01-25', actualReturnDate: null, fine: 50, status: 'Overdue'  },
    ],
    issueRequests: [
      { requestId: 'REQ001', membershipId: 'MEM003', bookName: 'Atomic Habits', requestedDate: '2024-02-20', fulfilledDate: '2024-02-22' },
      { requestId: 'REQ002', membershipId: 'MEM002', bookName: 'Interstellar',  requestedDate: '2024-03-01', fulfilledDate: null },
    ]
  };

  const KEYS = {
    users:         'lms_users',
    books:         'lms_books',
    memberships:   'lms_memberships',
    issues:        'lms_issues',
    issueRequests: 'lms_issue_requests',
    session:       'lms_session',
  };

  // ---- Storage Helpers ----
  function load(key)       { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
  function loadObj(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } }

  // ---- Init (seed on first load) ----
  function init() {
    if (!localStorage.getItem(KEYS.users)) {
      save(KEYS.users,         SEED.users);
      save(KEYS.books,         SEED.books);
      save(KEYS.memberships,   SEED.memberships);
      save(KEYS.issues,        SEED.issues);
      save(KEYS.issueRequests, SEED.issueRequests);
    }
  }

  // ---- Session ----
  function setSession(user)  { localStorage.setItem(KEYS.session, JSON.stringify(user)); }
  function getSession()      { return loadObj(KEYS.session, null); }
  function clearSession()    { localStorage.removeItem(KEYS.session); }
  function isAdmin()         { const s = getSession(); return s && s.isAdmin; }

  // ---- Users CRUD ----
  function getUsers()        { return load(KEYS.users); }
  function saveUsers(u)      { save(KEYS.users, u); }
  function getUserByUsername(uname) { return getUsers().find(u => u.username === uname) || null; }

  function login(username, password) {
    const u = getUserByUsername(username);
    if (u && u.password === password && u.isActive) { setSession(u); return u; }
    return null;
  }

  function addUser(userData) {
    const users = getUsers();
    const id    = 'U' + String(users.length + 1).padStart(3, '0');
    const newU  = { id, ...userData };
    users.push(newU);
    saveUsers(users);
    return newU;
  }

  function updateUser(username, updates) {
    const users = getUsers();
    const idx   = users.findIndex(u => u.username === username);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    return users[idx];
  }

  // ---- Books CRUD ----
  function getBooks()       { return load(KEYS.books); }
  function saveBooks(b)     { save(KEYS.books, b); }
  function getBookItems(type) { return getBooks().filter(b => !type || b.type === type); }

  function addBook(data) {
    const books = getBooks();
    const prefix = data.category.substring(0,2).toUpperCase();
    const tCode  = data.type === 'book' ? 'B' : 'M';
    const same   = books.filter(b => b.serialNo.startsWith(`${prefix}(${tCode})`));
    const num    = String(same.length + 1).padStart(6, '0');
    const sn     = `${prefix}(${tCode})${num}`;
    const nb     = { serialNo: sn, ...data, status: 'Available', id: Date.now().toString() };
    books.push(nb);
    saveBooks(books);
    return nb;
  }

  function updateBook(serialNo, updates) {
    const books = getBooks();
    const idx   = books.findIndex(b => b.serialNo === serialNo);
    if (idx === -1) return null;
    books[idx] = { ...books[idx], ...updates };
    saveBooks(books);
    return books[idx];
  }

  function searchBooks(name, author) {
    return getBooks().filter(b => {
      const nMatch = !name   || b.name.toLowerCase().includes(name.toLowerCase());
      const aMatch = !author || b.author.toLowerCase().includes(author.toLowerCase());
      return nMatch && aMatch;
    });
  }

  function getAvailableBooks() { return getBooks().filter(b => b.status === 'Available'); }

  // ---- Memberships CRUD ----
  function getMemberships()      { return load(KEYS.memberships); }
  function saveMemberships(m)    { save(KEYS.memberships, m); }
  function getMembershipById(id) { return getMemberships().find(m => m.membershipId === id) || null; }

  function addMembership(data) {
    const list = getMemberships();
    const id   = 'MEM' + String(list.length + 1).padStart(3, '0');
    const nm   = { membershipId: id, ...data, status: 'Active', amountPending: 0 };
    list.push(nm);
    saveMemberships(list);
    return nm;
  }

  function updateMembership(membershipId, updates) {
    const list = getMemberships();
    const idx  = list.findIndex(m => m.membershipId === membershipId);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    saveMemberships(list);
    return list[idx];
  }

  // ---- Issues CRUD ----
  function getIssues()        { return load(KEYS.issues); }
  function saveIssues(i)      { save(KEYS.issues, i); }
  function getActiveIssues()  { return getIssues().filter(i => i.status === 'Active' || i.status === 'Overdue'); }
  function getOverdueIssues() {
    const today = new Date(); today.setHours(0,0,0,0);
    return getIssues().filter(i => {
      if (i.actualReturnDate) return false;
      return new Date(i.returnDate) < today;
    });
  }
  function getIssueBySerial(sn) { return getIssues().find(i => i.serialNo === sn && !i.actualReturnDate) || null; }

  function issueBook(data) {
    const issues = getIssues();
    const id     = 'ISS' + String(issues.length + 1).padStart(3, '0');
    const ni     = { issueId: id, ...data, actualReturnDate: null, fine: 0, status: 'Active' };
    issues.push(ni);
    saveIssues(issues);
    // mark book as issued
    updateBook(data.serialNo, { status: 'Issued' });
    return ni;
  }

  function returnBook(issueId, actualReturnDate) {
    const issues = getIssues();
    const idx    = issues.findIndex(i => i.issueId === issueId);
    if (idx === -1) return null;
    const issue  = issues[idx];
    // calculate fine: Rs 10 per day overdue
    const ret    = new Date(issue.returnDate);
    const act    = new Date(actualReturnDate);
    let fine     = 0;
    if (act > ret) {
      const days = Math.ceil((act - ret) / (1000 * 60 * 60 * 24));
      fine = days * 10;
    }
    issues[idx] = { ...issue, actualReturnDate, fine, status: 'Returned' };
    saveIssues(issues);
    updateBook(issue.serialNo, { status: 'Available' });
    return issues[idx];
  }

  function completeFinePayment(issueId) {
    const issues = getIssues();
    const idx    = issues.findIndex(i => i.issueId === issueId);
    if (idx === -1) return null;
    issues[idx].finePaid = true;
    saveIssues(issues);
    return issues[idx];
  }

  // ---- Issue Requests ----
  function getIssueRequests() { return load(KEYS.issueRequests); }
  function addIssueRequest(data) {
    const list = getIssueRequests();
    const id   = 'REQ' + String(list.length + 1).padStart(3, '0');
    list.push({ requestId: id, ...data, fulfilledDate: null });
    save(KEYS.issueRequests, list);
  }

  // ---- Fine Calculation Helper ----
  function calcFine(returnDate, actualReturnDate) {
    const ret = new Date(returnDate);
    const act = new Date(actualReturnDate || new Date());
    if (act <= ret) return 0;
    return Math.ceil((act - ret) / (1000 * 60 * 60 * 24)) * 10;
  }

  // ---- Formatting Helpers ----
  function formatCurrency(amt) { return '₹' + Number(amt || 0).toLocaleString('en-IN'); }
  function formatDate(d) {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  }

  // ---- Date Helpers ----
  function today()      { return new Date().toISOString().split('T')[0]; }
  function addDays(d,n) {
    const dt = new Date(d);
    dt.setDate(dt.getDate() + n);
    return dt.toISOString().split('T')[0];
  }

  // ---- Categories ----
  const CATEGORIES = [
    { codeFrom: 'SC(B/M)000001', codeTo: 'SC(B/M)000004', label: 'Science' },
    { codeFrom: 'EC(B/M)000001', codeTo: 'EC(B/M)000004', label: 'Economics' },
    { codeFrom: 'FC(B/M)000001', codeTo: 'FC(B/M)000004', label: 'Fiction' },
    { codeFrom: 'CH(B/M)000001', codeTo: 'CH(B/M)000004', label: 'Children' },
    { codeFrom: 'PD(B/M)000001', codeTo: 'PD(B/M)000004', label: 'Personal Development' },
  ];

  const CATEGORY_NAMES = ['Science','Economics','Fiction','Children','Personal Development'];

  // Public API
  return {
    init,
    // session
    login, getSession, clearSession, isAdmin,
    // users
    getUsers, addUser, updateUser, getUserByUsername,
    // books
    getBooks, getBookItems, addBook, updateBook, searchBooks, getAvailableBooks,
    // memberships
    getMemberships, getMembershipById, addMembership, updateMembership,
    // issues
    getIssues, getActiveIssues, getOverdueIssues, getIssueBySerial, issueBook, returnBook, completeFinePayment,
    // requests
    getIssueRequests, addIssueRequest,
    // helpers
    calcFine, today, addDays, formatDate, formatCurrency,
    CATEGORIES, CATEGORY_NAMES,
  };
})();
