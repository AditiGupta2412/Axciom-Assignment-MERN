// =====================================================
// Transactions Module
// =====================================================

// ---- Transaction Menu ----
function buildTransMenu() {
  return `
  <div class="page-header">
    <div class="page-title">🔄 Transactions</div>
    <div class="page-subtitle">Manage book issues, returns, and fine payments</div>
  </div>
  <div class="maint-grid">
    <div class="maint-card" onclick="navigate('book-avail')">
      <div class="maint-card-icon">🔍</div>
      <div class="maint-card-title">Is book available?</div>
      <div class="maint-card-sub">Search book availability</div>
    </div>
    <div class="maint-card" onclick="navigate('book-issue')">
      <div class="maint-card-icon">📖</div>
      <div class="maint-card-title">Issue book</div>
      <div class="maint-card-sub">Issue a book to a member</div>
    </div>
    <div class="maint-card" onclick="navigate('return-book')">
      <div class="maint-card-icon">↩️</div>
      <div class="maint-card-title">Return book</div>
      <div class="maint-card-sub">Process a book return</div>
    </div>
    <div class="maint-card" onclick="navigate('pay-fine')">
      <div class="maint-card-icon">💰</div>
      <div class="maint-card-title">Pay Fine</div>
      <div class="maint-card-sub">Clear outstanding fines</div>
    </div>
  </div>`;
}
function bindTransMenu() {}

// ---- Book Availability Search ----
function buildBookAvail() {
  const books  = DB.getBooks();
  const names  = [...new Set(books.map(b => b.name))];
  const authors= [...new Set(books.map(b => b.author))];
  const nameOpts  = names.map(n=>`<option value="${n}">${n}</option>`).join('');
  const authorOpts= authors.map(a=>`<option value="${a}">${a}</option>`).join('');
  return `
  <div class="page-header">
    <div class="page-title">🔍 Book Availability</div>
    <div class="page-subtitle">Search for available books or movies</div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title"><div class="card-title-icon">📚</div>Search</div></div>
    <div class="card-body">
      <div id="avail-err" class="form-error-banner">⚠️ Please select at least one search option.</div>
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">Book / Movie Name</label>
          <select id="avail-name" class="form-control">
            <option value="">— Select Book/Movie —</option>
            ${nameOpts}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Author Name</label>
          <select id="avail-author" class="form-control">
            <option value="">— Select Author —</option>
            ${authorOpts}
          </select>
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" onclick="navigate('transactions')">← Back</button>
          <button class="btn btn-primary"   onclick="doAvailSearch()">🔍 Search</button>
        </div>
      </div>
    </div>
  </div>`;
}
function bindBookAvail() {}

let lastSearchResults = [];
function doAvailSearch() {
  const name   = document.getElementById('avail-name').value.trim();
  const author = document.getElementById('avail-author').value.trim();
  const err    = document.getElementById('avail-err');
  if (!name && !author) { 
    err.textContent = '⚠️ Please select at least one search criteria (Book/Movie Name or Author).';
    err.classList.add('show'); 
    return; 
  }
  err.classList.remove('show');
  lastSearchResults = DB.searchBooks(name, author);
  if (lastSearchResults.length === 0) {
    err.textContent = '⚠️ No books/movies found matching your search. Try different criteria.';
    err.classList.add('show');
    return;
  }
  navigate('avail-results');
}

// ---- Book Availability Results ----
function buildAvailResults() {
  const results = lastSearchResults;
  const rows = results.length === 0
    ? `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:32px">No books found matching your search.</td></tr>`
    : results.map((b,i) => `
      <tr>
        <td>${b.name}</td>
        <td>${b.author}</td>
        <td>${b.serialNo}</td>
        <td><span class="badge ${b.status==='Available'?'badge-success':'badge-warning'}">${b.status}</span></td>
        <td class="radio-cell">
          ${b.status==='Available' ? `<input type="radio" name="book-sel" value="${i}" />` : '—'}
        </td>
      </tr>`).join('');
  return `
  <div class="page-header">
    <div class="page-title">📋 Search Results</div>
    <div class="page-subtitle">${results.length} result(s) found</div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title"><div class="card-title-icon">🔍</div>Book Availability</div></div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Book Name</th><th>Author Name</th><th>Serial Number</th><th>Status</th><th>Select to Issue</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="card-body-sm">
      <div id="sel-err" class="form-error-banner" style="margin-bottom:12px">⚠️ Please select a book to issue.</div>
      <div class="form-actions" style="border:none;padding:0;margin:0">
        <button class="btn btn-secondary" onclick="navigate('book-avail')">🔍 New Search</button>
        <button class="btn btn-primary"   onclick="goToIssue()">Issue Selected Book →</button>
        <button class="btn btn-secondary" onclick="navigate('transactions')">Cancel</button>
      </div>
    </div>
  </div>`;
}
function bindAvailResults() {}

function goToIssue() {
  const sel = document.querySelector('input[name="book-sel"]:checked');
  const err = document.getElementById('sel-err');
  if (!sel) { err.classList.add('show'); return; }
  err.classList.remove('show');
  pendingIssue = lastSearchResults[parseInt(sel.value)];
  navigate('book-issue');
}

// ---- Book Issue ----
function buildBookIssue() {
  const books  = DB.getAvailableBooks();
  const nameOpts = books.map(b=>`<option value="${b.serialNo}" data-author="${b.author}">${b.name}</option>`).join('');
  const todayStr   = DB.today();
  const returnDef  = DB.addDays(todayStr, 15);
  const preBook    = pendingIssue ? `value="${pendingIssue.serialNo}"` : '';
  const preAuthor  = pendingIssue ? pendingIssue.author : '';
  return `
  <div class="page-header">
    <div class="page-title">📖 Book Issue</div>
    <div class="page-subtitle">Issue a book to a library member</div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title"><div class="card-title-icon">📖</div>Issue Form</div></div>
    <div class="card-body">
      <div id="issue-err" class="form-error-banner">⚠️ Please fill all required fields correctly.</div>
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">Book / Movie Name <span class="req">*</span></label>
          <select id="iss-book" class="form-control" onchange="onIssueBookChange()" required>
            <option value="">— Select Book or Movie —</option>
            ${nameOpts}
          </select>
          <div class="error-msg" id="iss-book-err">⚠ Book name is required.</div>
        </div>
        <div class="form-group">
          <label class="form-label">Author Name</label>
          <input id="iss-author" class="form-control" readonly placeholder="Auto-filled from book selection" value="${preAuthor}"/>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Issue Date <span class="req">*</span></label>
            <input id="iss-date" class="form-control" type="date" value="${todayStr}" min="${todayStr}" required/>
            <div class="error-msg" id="iss-date-err">⚠ Issue date cannot be less than today.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Return Date <span class="req">*</span></label>
            <input id="iss-ret" class="form-control" type="date" value="${returnDef}" required/>
            <div class="error-msg" id="iss-ret-err">⚠ Return date must be within 15 days of issue date.</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Remarks <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
          <textarea id="iss-remarks" class="form-control" placeholder="Any additional notes..."></textarea>
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" onclick="navigate('tx-cancel')">Cancel</button>
          <button class="btn btn-primary"   onclick="doIssueBook()">✅ Confirm Issue</button>
        </div>
      </div>
    </div>
  </div>`;
}
function bindBookIssue() {
  if (pendingIssue) {
    const sel = document.getElementById('iss-book');
    sel.value = pendingIssue.serialNo;
    document.getElementById('iss-author').value = pendingIssue.author;
  }
  document.getElementById('iss-date').addEventListener('change', updateReturnDate);
}
function onIssueBookChange() {
  const sel    = document.getElementById('iss-book');
  const opt    = sel.options[sel.selectedIndex];
  document.getElementById('iss-author').value = opt ? (opt.getAttribute('data-author') || '') : '';
}
function updateReturnDate() {
  const id  = document.getElementById('iss-date').value;
  const ret = document.getElementById('iss-ret');
  if (id) { ret.value = DB.addDays(id, 15); ret.max = DB.addDays(id, 15); ret.min = id; }
}
function doIssueBook() {
  const book    = document.getElementById('iss-book').value.trim();
  const issDate = document.getElementById('iss-date').value;
  const retDate = document.getElementById('iss-ret').value;
  let ok = true;
  
  document.getElementById('iss-book-err').classList.toggle('show', !book); 
  if (!book) ok = false;
  
  const today = DB.today();
  const issDateError = issDate < today || !issDate;
  document.getElementById('iss-date-err').classList.toggle('show', issDateError); 
  if (issDateError) ok = false;
  
  const maxRet = DB.addDays(issDate, 15);
  const retErr = retDate > maxRet || retDate < issDate || !retDate;
  document.getElementById('iss-ret-err').classList.toggle('show', retErr); 
  if (retErr) ok = false;
  
  document.getElementById('issue-err').classList.toggle('show', !ok);
  if (!ok) return;
  
  const bk = DB.getBooks().find(b => b.serialNo === book);
  if (!bk) { alert('Error: Book not found'); return; }
  
  // Get the logged-in user's membership (if applicable)
  const sess = DB.getSession();
  let membershipId = 'MEM001'; // Default admin test member
  const mems = DB.getMemberships();
  if (mems.length > 0) membershipId = mems[0].membershipId;
  
  DB.issueBook({ serialNo: book, bookName: bk.name, author: bk.author, membershipId, issueDate: issDate, returnDate: retDate });
  pendingIssue = null;
  navigate('tx-success');
}

// ---- Return Book ----
function buildReturnBook() {
  const issued = DB.getIssues().filter(i => !i.actualReturnDate);
  const bookOpts = [...new Set(issued.map(i=>i.bookName))].map(n=>`<option value="${n}">${n}</option>`).join('');
  return `
  <div class="page-header">
    <div class="page-title">↩️ Return Book</div>
    <div class="page-subtitle">Process a book return</div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title"><div class="card-title-icon">↩️</div>Return Form</div></div>
    <div class="card-body">
      <div id="ret-err" class="form-error-banner">⚠️ Please fill all required fields.</div>
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">Book Name <span class="req">*</span></label>
          <select id="ret-book" class="form-control" onchange="onReturnBookChange()">
            <option value="">— Select Book —</option>
            ${bookOpts}
          </select>
          <div class="error-msg" id="ret-book-err">⚠ Book name is required.</div>
        </div>
        <div class="form-group">
          <label class="form-label">Author Name</label>
          <input id="ret-author" class="form-control" readonly placeholder="Auto-filled"/>
        </div>
        <div class="form-group">
          <label class="form-label">Serial No <span class="req">*</span></label>
          <select id="ret-serial" class="form-control" onchange="onReturnSerialChange()">
            <option value="">— Select Serial No —</option>
          </select>
          <div class="error-msg" id="ret-serial-err">⚠ Serial number is required.</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Issue Date</label>
            <input id="ret-issue-date" class="form-control" readonly placeholder="Auto-filled"/>
          </div>
          <div class="form-group">
            <label class="form-label">Return Date <span class="req">*</span></label>
            <input id="ret-ret-date" class="form-control" type="date" value="${DB.today()}"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Remarks <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
          <textarea id="ret-remarks" class="form-control" placeholder="Any notes..."></textarea>
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" onclick="navigate('tx-cancel')">Cancel</button>
          <button class="btn btn-primary"   onclick="doReturnBook()">✅ Confirm Return</button>
        </div>
      </div>
    </div>
  </div>`;
}
function bindReturnBook() {}
function onReturnBookChange() {
  const bookName = document.getElementById('ret-book').value;
  const issued   = DB.getIssues().filter(i => i.bookName === bookName && !i.actualReturnDate);
  const sel      = document.getElementById('ret-serial');
  sel.innerHTML  = '<option value="">— Select Serial No —</option>' + issued.map(i=>`<option value="${i.issueId}">${i.serialNo}</option>`).join('');
  document.getElementById('ret-author').value     = issued[0]?.author || '';
  document.getElementById('ret-issue-date').value = issued[0]?.issueDate || '';
}
function onReturnSerialChange() {
  const issueId = document.getElementById('ret-serial').value;
  const issue   = DB.getIssues().find(i => i.issueId === issueId);
  if (issue) {
    document.getElementById('ret-author').value     = issue.author;
    document.getElementById('ret-issue-date').value = issue.issueDate;
  }
}
function doReturnBook() {
  const book   = document.getElementById('ret-book').value.trim();
  const serial = document.getElementById('ret-serial').value.trim();
  const retDt  = document.getElementById('ret-ret-date').value;
  
  let ok = true;
  if (!book) {
    document.getElementById('ret-book-err').textContent = '⚠ Book name is required. Please select from the dropdown.';
    document.getElementById('ret-book-err').classList.add('show');
    ok = false;
  } else {
    document.getElementById('ret-book-err').classList.remove('show');
  }
  
  if (!serial) {
    document.getElementById('ret-serial-err').textContent = '⚠ Serial number is required. Please select a serial number.';
    document.getElementById('ret-serial-err').classList.add('show');
    ok = false;
  } else {
    document.getElementById('ret-serial-err').classList.remove('show');
  }
  
  if (!retDt) {
    document.getElementById('ret-err').textContent = '⚠️ Return date is required.';
    document.getElementById('ret-err').classList.add('show');
    ok = false;
  } else {
    document.getElementById('ret-err').classList.remove('show');
  }
  
  if (!ok) return;
  
  const issue = DB.getIssues().find(i => i.issueId === serial);
  if (!issue) {
    document.getElementById('ret-err').textContent = '⚠️ Issue record not found.';
    document.getElementById('ret-err').classList.add('show');
    return;
  }
  
  const updated = DB.returnBook(serial, retDt || DB.today());
  pendingReturn = updated;
  navigate('pay-fine');
}

// ---- Pay Fine ----
function buildPayFine() {
  const issue = pendingReturn || {};
  const fine  = issue.fine || 0;
  return `
  <div class="page-header">
    <div class="page-title">💰 Pay Fine</div>
    <div class="page-subtitle">Review and complete fine payment</div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title"><div class="card-title-icon">💰</div>Fine Details</div></div>
    <div class="card-body">
      <div id="fine-err" class="form-error-banner">⚠️ Please check the "Fine Paid" checkbox before confirming.</div>
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Book Name</label>
            <input class="form-control" readonly value="${issue.bookName||''}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Author</label>
            <input class="form-control" readonly value="${issue.author||''}"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Serial No</label>
            <input class="form-control" readonly value="${issue.serialNo||''}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Membership ID</label>
            <input class="form-control" readonly value="${issue.membershipId||''}"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Issue Date</label>
            <input class="form-control" readonly value="${DB.formatDate(issue.issueDate)}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Return Date</label>
            <input class="form-control" readonly value="${DB.formatDate(issue.returnDate)}"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Actual Return Date</label>
          <input class="form-control" readonly value="${DB.formatDate(issue.actualReturnDate)}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Fine Calculated (₹)</label>
          <input class="form-control" readonly value="${fine}" style="font-weight:700;color:${fine>0?'var(--danger)':'var(--success)'}"/>
        </div>
        ${fine > 0 ? `
        <div class="form-group">
          <label class="form-label">Fine Paid <span class="req">*</span></label>
          <div class="check-group">
            <label class="check-option" id="fine-paid-label">
              <input type="checkbox" id="fine-paid" onchange="this.closest('.check-option').classList.toggle('checked',this.checked)"/>
              Mark as Paid (₹${fine})
            </label>
          </div>
          <div class="error-msg" id="fine-paid-err">⚠ Fine must be marked as paid to proceed.</div>
        </div>` : `<div style="background:var(--success-bg);color:var(--success);padding:12px 16px;border-radius:8px;font-weight:600;margin-bottom:16px">✅ No fine applicable — you may confirm directly.</div>`}
        <div class="form-group">
          <label class="form-label">Remarks <span style="color:var(--text-muted);font-weight:400">(optional)</span></label>
          <textarea id="fine-remarks" class="form-control" placeholder="Any notes..."></textarea>
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" onclick="navigate('tx-cancel')">Cancel</button>
          <button class="btn btn-primary"   onclick="doPayFine(${fine})">✅ Confirm Payment</button>
        </div>
      </div>
    </div>
  </div>`;
}
function bindPayFine() {}
function doPayFine(fine) {
  const err = document.getElementById('fine-err');
  if (fine > 0) {
    const paid = document.getElementById('fine-paid')?.checked;
    const pErr = document.getElementById('fine-paid-err');
    if (!paid) { err.classList.add('show'); pErr.classList.add('show'); return; }
    pErr.classList.remove('show');
  }
  err.classList.remove('show');
  if (pendingReturn) DB.completeFinePayment(pendingReturn.issueId);
  pendingReturn = null;
  navigate('tx-success');
}
