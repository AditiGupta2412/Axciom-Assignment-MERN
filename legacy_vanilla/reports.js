// =====================================================
// Reports Module
// =====================================================

function buildReportsList() {
  const items = [
    { icon:'📚', label:'Master List of Books',       page:'rpt-books'    },
    { icon:'🎬', label:'Master List of Movies',      page:'rpt-movies'   },
    { icon:'👥', label:'Master List of Memberships', page:'rpt-members'  },
    { icon:'🔄', label:'Active Issues',              page:'rpt-active'   },
    { icon:'⚠️', label:'Overdue Returns',            page:'rpt-overdue'  },
    { icon:'📋', label:'Pending Issue Requests',     page:'rpt-requests' },
  ];
  return `
  <div class="page-header">
    <div class="page-title">📋 Reports</div>
    <div class="page-subtitle">Available reports for the library system</div>
  </div>
  <div class="report-list-grid">
    ${items.map(r=>`
    <div class="report-list-item" onclick="navigate('${r.page}')">
      <div class="report-item-icon">${r.icon}</div>
      <div class="report-item-label">${r.label}</div>
    </div>`).join('')}
  </div>`;
}
function bindReportsList() {}

function buildRptBooks() {
  const books = DB.getBookItems('book');
  const rows  = books.length
    ? books.map(b=>`<tr><td>${b.serialNo}</td><td>${b.name}</td><td>${b.author}</td><td>${b.category}</td><td><span class="badge ${b.status==='Available'?'badge-success':'badge-warning'}">${b.status}</span></td><td>₹${b.cost}</td><td>${DB.formatDate(b.procurementDate)}</td></tr>`).join('')
    : `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">No books found.</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">📚 Master List of Books</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Serial No</th><th>Name of Book</th><th>Author Name</th><th>Category</th><th>Status</th><th>Cost</th><th>Procurement Date</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

function buildRptMovies() {
  const movies = DB.getBookItems('movie');
  const rows   = movies.length
    ? movies.map(b=>`<tr><td>${b.serialNo}</td><td>${b.name}</td><td>${b.author}</td><td>${b.category}</td><td><span class="badge ${b.status==='Available'?'badge-success':'badge-warning'}">${b.status}</span></td><td>₹${b.cost}</td><td>${DB.formatDate(b.procurementDate)}</td></tr>`).join('')
    : `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">No movies found.</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">🎬 Master List of Movies</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Serial No</th><th>Name of Movie</th><th>Author Name</th><th>Category</th><th>Status</th><th>Cost</th><th>Procurement Date</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

function buildRptMembers() {
  const mems = DB.getMemberships();
  const rows = mems.length
    ? mems.map(m=>`<tr><td>${m.membershipId}</td><td>${m.firstName} ${m.lastName}</td><td>${m.contactNumber}</td><td>${m.contactAddress}</td><td>${m.aadhaarCardNo}</td><td>${DB.formatDate(m.startDate)}</td><td>${DB.formatDate(m.endDate)}</td><td><span class="badge ${m.status==='Active'?'badge-success':'badge-danger'}">${m.status}</span></td><td>₹${m.amountPending}</td></tr>`).join('')
    : `<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-muted)">No memberships found.</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">👥 Master List of Memberships</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Membership Id</th><th>Name</th><th>Contact</th><th>Address</th><th>Aadhar No</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Fine Pending</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

function buildRptActive() {
  const issues = DB.getActiveIssues();
  const rows   = issues.length
    ? issues.map(i=>`<tr><td>${i.serialNo}</td><td>${i.bookName}</td><td>${i.membershipId}</td><td>${DB.formatDate(i.issueDate)}</td><td>${DB.formatDate(i.returnDate)}</td></tr>`).join('')
    : `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted)">No active issues.</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">🔄 Active Issues</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Serial No Book/Movie</th><th>Name of Book/Movie</th><th>Membership Id</th><th>Date of Issue</th><th>Date of Return</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

function buildRptOverdue() {
  const overdue = DB.getOverdueIssues();
  const rows    = overdue.length
    ? overdue.map(i=>{
        const fine = DB.calcFine(i.returnDate, null);
        return `<tr><td>${i.serialNo}</td><td>${i.bookName}</td><td>${i.membershipId}</td><td>${DB.formatDate(i.issueDate)}</td><td>${DB.formatDate(i.returnDate)}</td><td><span class="badge badge-danger">₹${fine}</span></td></tr>`;
      }).join('')
    : `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted)">No overdue returns. 🎉</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">⚠️ Overdue Returns</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Serial No</th><th>Name of Book</th><th>Membership Id</th><th>Date of Issue</th><th>Date of Return</th><th>Fine Calculations</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

function buildRptRequests() {
  const reqs = DB.getIssueRequests();
  const rows = reqs.length
    ? reqs.map(r=>`<tr><td>${r.membershipId}</td><td>${r.bookName}</td><td>${DB.formatDate(r.requestedDate)}</td><td>${r.fulfilledDate ? DB.formatDate(r.fulfilledDate) : '<span class="badge badge-warning">Pending</span>'}</td></tr>`).join('')
    : `<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-muted)">No issue requests.</td></tr>`;
  return `
  <div class="page-header"><div class="page-title">📋 Issue Requests</div></div>
  <div class="card">
    <div class="card-body-sm" style="display:flex;justify-content:flex-end">
      <button class="btn btn-secondary btn-sm" onclick="navigate('reports')">← Back</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Membership Id</th><th>Name of Book/Movie</th><th>Requested Date</th><th>Request Fulfilled Date</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}
