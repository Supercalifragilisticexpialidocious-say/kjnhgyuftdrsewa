const state = {
  currentUser: null,
  activeSection: 'home',
  historyFilter: 'total',
  sidebarOpen: true,
  users: {},
  patients: [],
  medicalRecords: [],
  appointments: [],
  dischargeHistory: [],
  diagnoses: [],
  doctors: [
    'Dr. Maria Santos', 'Dr. Juan Dela Cruz', 'Dr. Jose Reyes', 'Dr. Angela Cruz',
    'Dr. Sofia Garcia', 'Dr. Daniel Lim', 'Dr. Chloe Mendoza', 'Dr. Miguel Torres',
    'Dr. Adrian Villanueva', 'Dr. Isabella Ramos', 'Dr. Lucas Santos', 'Dr. Hannah Dela Cruz',
    'Dr. Ethan Cruz', 'Dr. Nicole Reyes', 'Dr. Paul Martinez', 'Dr. Patricia Garcia',
    'Dr. Sofia Lim', 'Dr. Maria Navarro', 'Dr. Carlo Mendoza', 'Dr. Jasmine Bautista',
    'Dr. Mark Fernandez', 'Dr. Alyssa Rivera', 'Dr. Kevin Aquino', 'Dr. Vincent Salvador',
    'Dr. Bea Castillo', 'Dr. Jerome Valdez', 'Dr. Angelica Flores', 'Dr. Patrick Soriano',
    'Dr. Katrina Evangelista', 'Dr. Joshua Manalo', 'Dr. Denise Mercado', 'Dr. Christian Navarro',
    'Dr. Michelle Perez', 'Dr. Ryan Dominguez', 'Dr. Erika Santos', 'Dr. Nathaniel Ramos',
    'Dr. Trisha Cabrera', 'Dr. Gabriel Ortega', 'Dr. Bianca Medina'
  ],
  schedules: [
    { department: 'Internal Medicine', doctor: 'Dr. Maria Santos', days: 'Mon–Fri', time: '9:00 AM – 5:00 PM' },
    { department: 'Pediatrics', doctor: 'Dr. Angela Cruz', days: 'Mon–Fri', time: '8:00 AM – 3:00 PM' },
    { department: 'Surgery', doctor: 'Dr. Miguel Torres', days: 'Tue–Sat', time: '9:00 AM – 5:00 PM' },
    { department: 'Cardiology', doctor: 'Dr. Isabella Ramos', days: 'Mon–Fri', time: '9:00 AM – 5:00 PM' },
    { department: 'Dermatology', doctor: 'Dr. Carlo Mendoza', days: 'Tue–Sat', time: '10:00 AM – 6:00 PM' },
    { department: 'Neurology', doctor: 'Dr. Alissa Rivera', days: 'Mon–Fri', time: '9:00 AM – 5:00 PM' },
    { department: 'Emergency Medicine', doctor: 'Dr. Erika Santos', days: 'Mon–Sun', time: '12:00 AM – 8:00 AM' },
    { department: 'Emergency Medicine', doctor: 'Dr. Nathaniel Ramos', days: 'Mon–Sun', time: '8:00 AM – 4:00 PM' }
  ]
};

const navItems = [
  { title: 'Dashboard', key: 'home', icon: 'fa-house' },
  { title: 'Admit Patient', key: 'admit', icon: 'fa-user-plus' },
  { title: 'Search Records', key: 'search', icon: 'fa-search' },
  { title: 'Medical Records', key: 'records', icon: 'fa-file-medical' },
  { title: 'Medical History', key: 'history', icon: 'fa-history' },
  { title: 'Discharged', key: 'discharge', icon: 'fa-sign-out-alt' },
  { title: 'Billing', key: 'billing', icon: 'fa-receipt' },
  { title: 'Statistics', key: 'statistics', icon: 'fa-chart-bar' },
  { title: 'Appointments', key: 'appointments', icon: 'fa-calendar-check' },
  { title: 'Schedules', key: 'schedules', icon: 'fa-calendar' },
  { title: 'Diagnoses', key: 'diagnoses', icon: 'fa-stethoscope' }
];

const sectionLabels = {
  home: 'Dashboard',
  admit: 'Admit New Patient',
  search: 'Search Patient Records',
  records: 'Medical Records',
  history: 'Patient History',
  discharge: 'Patient Discharge',
  billing: 'Billing & Invoice',
  statistics: 'Statistics',
  appointments: 'Schedule Appointments',
  schedules: 'Doctor Schedules',
  diagnoses: 'Patient Diagnoses'
};

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = state.currentUser ? renderMainShell() : renderAuthShell();
  if (state.currentUser) initializeMain(); else initializeAuth();
}

function renderAuthShell() {
  return `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-panel">
          <div class="auth-brand">
            <h1>Medical Management System</h1>
            <p>Login or register to manage patients, appointments, billing, and clinical records.</p>
          </div>
          <div class="auth-tabs">
            <button id="auth-login-btn" class="auth-tab active" type="button">Login</button>
            <button id="auth-register-btn" class="auth-tab" type="button">Register</button>
          </div>
          <div class="auth-forms">
            <form id="login-form" class="auth-form active">
              <div class="form-row">
                <label for="login-id">User ID</label>
                <input id="login-id" type="text" placeholder="Enter your ID" required />
              </div>
              <div class="form-row">
                <label for="login-password">Password</label>
                <input id="login-password" type="password" placeholder="Enter your password" required />
              </div>
              <div class="action-row">
                <button type="submit" class="button button-primary">Login</button>
                <span id="auth-message" class="message-box hidden"></span>
              </div>
            </form>
            <form id="register-form" class="auth-form">
              <div class="row-grid row-grid-2">
                <div class="form-field"><label for="register-name">Name</label><input id="register-name" type="text" placeholder="Full name" required /></div>
                <div class="form-field"><label for="register-id">User ID</label><input id="register-id" type="text" placeholder="Create an ID" required /></div>
              </div>
              <div class="row-grid row-grid-2">
                <div class="form-field"><label for="register-password">Password</label><input id="register-password" type="password" placeholder="Password" required /></div>
                <div class="form-field"><label for="register-confirm">Confirm Password</label><input id="register-confirm" type="password" placeholder="Confirm password" required /></div>
              </div>
              <div class="row-grid row-grid-3">
                <div class="form-field"><label for="register-country">Country</label><input id="register-country" type="text" placeholder="Country" /></div>
                <div class="form-field"><label for="register-state">State</label><input id="register-state" type="text" placeholder="State" /></div>
                <div class="form-field"><label for="register-phone">Phone</label><input id="register-phone" type="text" placeholder="Phone number" /></div>
              </div>
              <div class="action-row">
                <button type="submit" class="button button-secondary">Create Account</button>
                <span id="register-message" class="message-box hidden"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initializeAuth() {
  const loginTab = document.getElementById('auth-login-btn');
  const registerTab = document.getElementById('auth-register-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  loginTab.addEventListener('click', () => switchAuthTab('login'));
  registerTab.addEventListener('click', () => switchAuthTab('register'));
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(button => button.classList.toggle('active', button.id === `auth-${tab}-btn`));
  document.querySelectorAll('.auth-form').forEach(form => form.classList.toggle('active', form.id === `${tab}-form`));
  clearAuthMessages();
}

function handleLogin(event) {
  event.preventDefault();
  const id = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-password').value;
  const message = document.getElementById('auth-message');

  if (!id || !password) {
    showAuthMessage(message, 'Please enter both ID and password.', false);
    return;
  }

  if (!(id in state.users) || state.users[id].password !== password) {
    showAuthMessage(message, 'Invalid credentials. Try again.', false);
    return;
  }

  state.currentUser = id;
  state.activeSection = 'home';
  clearAuthMessages();
  renderApp();
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const id = document.getElementById('register-id').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm').value;
  const country = document.getElementById('register-country').value.trim();
  const stateName = document.getElementById('register-state').value.trim();
  const phone = document.getElementById('register-phone').value.trim();
  const message = document.getElementById('register-message');

  if (!id) {
    showAuthMessage(message, 'User ID is required.', false);
    return;
  }

  if (password.length < 1) {
    showAuthMessage(message, 'Password is required.', false);
    return;
  }

  if (password !== confirmPassword) {
    showAuthMessage(message, 'Passwords do not match.', false);
    return;
  }

  if (state.users[id]) {
    showAuthMessage(message, 'This ID already exists.', false);
    return;
  }

  state.users[id] = { name, password, country, state: stateName, phone };
  showAuthMessage(message, 'Registration successful! You can now log in.', true);
  document.getElementById('register-form').reset();
}

function showAuthMessage(element, message, success) {
  element.textContent = message;
  element.classList.remove('hidden');
  element.style.borderColor = success ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';
}

function clearAuthMessages() {
  document.querySelectorAll('#auth-message, #register-message').forEach(el => {
    el.textContent = '';
    el.classList.add('hidden');
  });
}

function renderMainShell() {
  return `
    <div class="app-shell ${state.sidebarOpen ? '' : 'collapsed'}">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div>
            <h2>MedicalUI</h2>
            <p>Welcome, ${state.users[state.currentUser]?.name || state.currentUser}</p>
          </div>
          <button id="sidebar-toggle" type="button" class="button button-secondary sidebar-toggle">
            <i class="fas ${state.sidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}"></i>
          </button>
        </div>
        <div class="nav-section">
          <h3>Patient Management</h3>
          ${navItems.slice(0, 5).map(item => `<button type="button" class="nav-link${item.key === state.activeSection ? ' active' : ''}" data-section="${item.key}"><i class="fas ${item.icon}"></i> ${item.title}</button>`).join('')}
        </div>
        <div class="nav-section">
          <h3>Records & History</h3>
          ${navItems.slice(5, 8).map(item => `<button type="button" class="nav-link${item.key === state.activeSection ? ' active' : ''}" data-section="${item.key}"><i class="fas ${item.icon}"></i> ${item.title}</button>`).join('')}
        </div>
        <div class="nav-section">
          <h3>Appointments</h3>
          ${navItems.slice(8).map(item => `<button type="button" class="nav-link${item.key === state.activeSection ? ' active' : ''}" data-section="${item.key}"><i class="fas ${item.icon}"></i> ${item.title}</button>`).join('')}
        </div>
        <button id="logout-button" type="button" class="button button-danger logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </aside>
      <main class="app-main">
        <header class="app-header">
          <div>
            <h1><i class="fas ${navItems.find(n => n.key === state.activeSection)?.icon || 'fa-dashboard'}"></i> ${sectionLabels[state.activeSection]}</h1>
            <p class="top-info">Manage patients, appointments, billing, and clinical workflows from one dashboard.</p>
          </div>
          <div>
            <button id="top-action" class="button button-secondary"><i class="fas fa-sync-alt"></i> Refresh</button>
          </div>
        </header>
        <section id="content-area" class="content-area"></section>
      </main>
    </div>
  `;
}

function initializeMain() {
  document.getElementById('logout-button').addEventListener('click', () => {
    state.currentUser = null;
    renderApp();
  });

  document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', (event) => {
      state.activeSection = event.currentTarget.dataset.section;
      renderApp();
    });
  });

  const toggleButton = document.getElementById('sidebar-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      state.sidebarOpen = !state.sidebarOpen;
      renderApp();
    });
  }

  document.getElementById('top-action').addEventListener('click', () => {
    renderApp();
  });

  renderContent();
}

function renderContent() {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;
  contentArea.innerHTML = getSectionMarkup(state.activeSection);
  attachSectionListeners(state.activeSection);
}

function getSectionMarkup(section) {
  switch (section) {
    case 'home': return renderHomePanel();
    case 'admit': return renderAdmitPanel();
    case 'search': return renderSearchPanel();
    case 'records': return renderMedicalPanel();
    case 'history': return renderHistoryPanel();
    case 'discharge': return renderDischargePanel();
    case 'billing': return renderBillingPanel();
    case 'statistics': return renderStatisticsPanel();
    case 'appointments': return renderAppointmentsPanel();
    case 'schedules': return renderSchedulesPanel();
    case 'diagnoses': return renderDiagnosesPanel();
    default: return '<div class="card card-body"><p>Section not found.</p></div>';
  }
}

function attachSectionListeners(section) {
  switch (section) {
    case 'home': attachHomeListeners(); break;
    case 'admit': attachAdmitListeners(); break;
    case 'search': attachSearchListeners(); break;
    case 'records': attachMedicalListeners(); break;
    case 'history': attachHistoryListeners(); break;
    case 'discharge': attachDischargeListeners(); break;
    case 'billing': attachBillingListeners(); break;
    case 'statistics': attachStatisticsListeners(); break;
    case 'appointments': attachAppointmentsListeners(); break;
    case 'schedules': attachSchedulesListeners(); break;
    case 'diagnoses': attachDiagnosesListeners(); break;
  }
}

function renderHomePanel() {
  const patientCount = state.patients.length;
  const discharged = state.patients.filter(p => p.status === 'Discharged').length;
  const medicalCount = state.medicalRecords.length;
  const appointmentCount = state.appointments.length;
  const activePatients = patientCount - discharged;
  
  return `
    <div class="grid-3">
      <div class="card summary-tile"><strong><i class="fas fa-users"></i> Total Patients</strong><span>${patientCount}</span></div>
      <div class="card summary-tile"><strong><i class="fas fa-user-check"></i> Active Patients</strong><span>${activePatients}</span></div>
      <div class="card summary-tile"><strong><i class="fas fa-sign-out-alt"></i> Discharged</strong><span>${discharged}</span></div>
      <div class="card summary-tile"><strong><i class="fas fa-file-medical"></i> Medical Records</strong><span>${medicalCount}</span></div>
      <div class="card summary-tile"><strong><i class="fas fa-calendar-check"></i> Appointments</strong><span>${appointmentCount}</span></div>
      <div class="card summary-tile"><strong><i class="fas fa-heart-pulse"></i> System Health</strong><span>100%</span></div>
    </div>
    <div class="grid-3">
      ${[
        { label: 'Admit Patient', icon: 'fa-user-plus', target: 'admit', desc: 'Quickly admit a new patient to the system.' },
        { label: 'Search Records', icon: 'fa-search', target: 'search', desc: 'Find and view patient records.' },
        { label: 'Medical Records', icon: 'fa-file-medical', target: 'records', desc: 'Access detailed medical records.' },
        { label: 'View History', icon: 'fa-history', target: 'history', desc: 'Check patient history and status.' },
        { label: 'Billing', icon: 'fa-receipt', target: 'billing', desc: 'Manage billing and invoices.' },
        { label: 'Statistics', icon: 'fa-chart-bar', target: 'statistics', desc: 'View system statistics and reports.' }
      ].map(item => `<div class="card card-body"><h3><i class="fas ${item.icon}"></i> ${item.label}</h3><p class="top-info">${item.desc}</p><button type="button" class="button button-primary section-button" data-target="${item.target}"><i class="fas fa-arrow-right"></i> Open</button></div>`).join('')}
    </div>
  `;
}

function getNavKeyFromLabel(label) {
  return navItems.find(item => item.title === label)?.key || 'home';
}

function attachHomeListeners() {
  document.querySelectorAll('.section-button').forEach(button => {
    button.addEventListener('click', (event) => {
      state.activeSection = event.currentTarget.dataset.target;
      renderApp();
    });
  });
}

function renderAdmitPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-user-plus"></i> Admit New Patient</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="admit-last-name"><i class="fas fa-user"></i> Last Name *</label><input id="admit-last-name" type="text" placeholder="Enter last name" /></div>
          <div class="form-field"><label for="admit-first-name"><i class="fas fa-user"></i> First Name *</label><input id="admit-first-name" type="text" placeholder="Enter first name" /></div>
          <div class="form-field"><label for="admit-middle-name"><i class="fas fa-user"></i> Middle Name</label><input id="admit-middle-name" type="text" placeholder="Enter middle name" /></div>
          <div class="form-field"><label for="admit-gender"><i class="fas fa-venus-mars"></i> Gender *</label><select id="admit-gender"><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></div>
          <div class="form-field"><label for="admit-dob"><i class="fas fa-calendar"></i> Date of Birth *</label><input id="admit-dob" type="text" placeholder="MM/DD/YYYY" /></div>
          <div class="form-field"><label for="admit-contact"><i class="fas fa-phone"></i> Contact *</label><input id="admit-contact" type="text" placeholder="Enter phone number" /></div>
          <div class="form-field"><label for="admit-address"><i class="fas fa-map-marker-alt"></i> Address *</label><input id="admit-address" type="text" placeholder="Enter address" /></div>
          <div class="form-field"><label for="admit-admission-date"><i class="fas fa-calendar-check"></i> Admission Date *</label><input id="admit-admission-date" type="text" placeholder="MM/DD/YYYY" /></div>
          <div class="form-field"><label for="admit-vitals"><i class="fas fa-heart-pulse"></i> Vital Signs</label><input id="admit-vitals" type="text" placeholder="Blood pressure, pulse" /></div>
          <div class="form-field"><label for="admit-allergies"><i class="fas fa-exclamation-triangle"></i> Allergies</label><input id="admit-allergies" type="text" placeholder="Enter allergies" /></div>
          <div class="form-field"><label for="admit-diagnosis"><i class="fas fa-stethoscope"></i> Initial Diagnosis</label><input id="admit-diagnosis" type="text" placeholder="Enter diagnosis" /></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="clear-admit" class="button button-secondary"><i class="fas fa-times"></i> Clear</button>
          <button type="button" id="save-admit" class="button button-primary"><i class="fas fa-save"></i> Save Patient</button>
        </div>
      </div>
    </div>
  `;
}

function attachAdmitListeners() {
  document.getElementById('save-admit').addEventListener('click', () => {
    const lastName = document.getElementById('admit-last-name').value.trim();
    const firstName = document.getElementById('admit-first-name').value.trim();
    const middleName = document.getElementById('admit-middle-name').value.trim();
    const gender = document.getElementById('admit-gender').value;
    const dob = document.getElementById('admit-dob').value.trim();
    const contact = document.getElementById('admit-contact').value.trim();
    const address = document.getElementById('admit-address').value.trim();
    const admissionDate = document.getElementById('admit-admission-date').value.trim();
    const vitals = document.getElementById('admit-vitals').value.trim();
    const allergies = document.getElementById('admit-allergies').value.trim();
    const diagnosis = document.getElementById('admit-diagnosis').value.trim();

    if (!lastName || !firstName || !gender) {
      alert('Please fill last name, first name, and gender.');
      return;
    }

    state.patients.push({
      lastName,
      firstName,
      middleName,
      fullName: `${lastName}, ${firstName} ${middleName}`.trim(),
      gender,
      dob,
      contact,
      address,
      admissionDate,
      vitals,
      allergies,
      diagnosis,
      status: 'Admitted'
    });

    alert('Patient admitted successfully.');
    resetAdmitForm();
  });

  document.getElementById('clear-admit').addEventListener('click', resetAdmitForm);
}

function resetAdmitForm() {
  ['admit-last-name', 'admit-first-name', 'admit-middle-name', 'admit-dob', 'admit-contact', 'admit-address', 'admit-admission-date', 'admit-vitals', 'admit-allergies', 'admit-diagnosis'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('admit-gender').value = '';
}

function renderSearchPanel() {
  return `
    <div class="card card-body">
      <div class="action-row" style="margin-bottom: 1.5rem;">
        <div class="form-field" style="flex: 1;">
          <label for="patient-search"><i class="fas fa-search"></i> Search patients by name</label>
          <input id="patient-search" type="text" placeholder="Type a name to filter" />
        </div>
        <button type="button" id="reset-search" class="button button-secondary" style="align-self: flex-end;"><i class="fas fa-times"></i> Reset</button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-user"></i> Name</th><th><i class="fas fa-venus-mars"></i> Gender</th><th><i class="fas fa-calendar"></i> DOB</th><th><i class="fas fa-phone"></i> Contact</th><th><i class="fas fa-map-marker-alt"></i> Address</th><th><i class="fas fa-calendar-check"></i> Admission</th><th><i class="fas fa-heart-pulse"></i> Vitals</th><th><i class="fas fa-exclamation-triangle"></i> Allergies</th><th><i class="fas fa-stethoscope"></i> Diagnosis</th><th><i class="fas fa-info-circle"></i> Status</th></tr>
          </thead>
          <tbody id="patient-table-body">
            ${renderPatientRows(state.patients)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function attachSearchListeners() {
  const searchInput = document.getElementById('patient-search');
  const resetButton = document.getElementById('reset-search');
  const tableBody = document.getElementById('patient-table-body');

  searchInput.addEventListener('input', () => {
    const filtered = filterPatients(searchInput.value);
    tableBody.innerHTML = renderPatientRows(filtered);
  });

  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    tableBody.innerHTML = renderPatientRows(state.patients);
  });
}

function filterPatients(keyword) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) return state.patients;
  return state.patients.filter(patient => patient.fullName.toLowerCase().includes(normalized));
}

function renderPatientRows(patients) {
  if (!patients.length) {
    return '<tr class="table-empty"><td colspan="10"><i class="fas fa-inbox"></i> No patients found.</td></tr>';
  }
  return patients.map(patient => `
    <tr>
      <td><strong>${patient.fullName}</strong></td>
      <td>${patient.gender}</td>
      <td>${patient.dob}</td>
      <td>${patient.contact}</td>
      <td>${patient.address}</td>
      <td>${patient.admissionDate}</td>
      <td><span class="badge badge-info">${patient.vitals || 'N/A'}</span></td>
      <td>${patient.allergies || 'None'}</td>
      <td>${patient.diagnosis}</td>
      <td><span class="badge ${patient.status === 'Discharged' ? 'badge-success' : 'badge-warning'}">${patient.status}</span></td>
    </tr>
  `).join('');
}

function renderMedicalPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-file-medical"></i> Medical Records</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="record-patient-name"><i class="fas fa-user"></i> Patient Name</label><input id="record-patient-name" type="text" placeholder="Enter patient name" /></div>
          <div class="form-field"><label for="record-dob"><i class="fas fa-calendar"></i> Date of Birth</label><input id="record-dob" type="text" placeholder="MM/DD/YYYY" /></div>
          <div class="form-field"><label for="record-age"><i class="fas fa-user-clock"></i> Age</label><input id="record-age" type="text" placeholder="Enter age" /></div>
          <div class="form-field"><label for="record-visit"><i class="fas fa-calendar-check"></i> Visit Info</label><input id="record-visit" type="text" placeholder="Enter visit information" /></div>
          <div class="form-field"><label for="record-diagnosis"><i class="fas fa-stethoscope"></i> Diagnosis</label><input id="record-diagnosis" type="text" placeholder="Enter diagnosis" /></div>
          <div class="form-field"><label for="record-treatment"><i class="fas fa-pills"></i> Treatment</label><input id="record-treatment" type="text" placeholder="Enter treatment" /></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="add-medical" class="button button-primary"><i class="fas fa-plus"></i> Add Record</button>
          <button type="button" id="view-medical" class="button button-secondary"><i class="fas fa-eye"></i> View All Records</button>
        </div>
      </div>
    </div>
    <div class="card card-body">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-user"></i> Patient</th><th><i class="fas fa-calendar"></i> DOB</th><th><i class="fas fa-user-clock"></i> Age</th><th><i class="fas fa-hospital-user"></i> Visit</th><th><i class="fas fa-stethoscope"></i> Diagnosis</th><th><i class="fas fa-pills"></i> Treatment</th></tr>
          </thead>
          <tbody id="medical-table-body">
            ${renderMedicalRecordsRows()}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderMedicalRecordsRows() {
  if (!state.medicalRecords.length) {
    return '<tr class="table-empty"><td colspan="6">No medical records added.</td></tr>';
  }
  return state.medicalRecords.map(record => `
    <tr>
      <td>${record.patientName}</td>
      <td>${record.dob}</td>
      <td>${record.age}</td>
      <td>${record.visitInfo}</td>
      <td>${record.diagnosis}</td>
      <td>${record.treatment}</td>
    </tr>
  `).join('');
}

function attachMedicalListeners() {
  document.getElementById('add-medical').addEventListener('click', () => {
    const patientName = document.getElementById('record-patient-name').value.trim();
    const dob = document.getElementById('record-dob').value.trim();
    const age = document.getElementById('record-age').value.trim();
    const visitInfo = document.getElementById('record-visit').value.trim();
    const diagnosis = document.getElementById('record-diagnosis').value.trim();
    const treatment = document.getElementById('record-treatment').value.trim();

    if (!patientName || !age) {
      alert('Please enter patient name and age.');
      return;
    }

    state.medicalRecords.push({ patientName, dob, age, visitInfo, diagnosis, treatment });
    renderContent();
  });

  document.getElementById('view-medical').addEventListener('click', () => {
    if (!state.medicalRecords.length) {
      alert('No medical records available.');
      return;
    }
    alert('Medical records loaded in the table below.');
  });
}

function renderHistoryPanel() {
  const total = state.patients.length;
  const discharged = state.patients.filter(p => p.status === 'Discharged').length;
  const active = total - discharged;
  const rows = renderHistoryRows();

  return `
    <div class="grid-3">
      ${renderHistoryStatCard('Total Patients', total, 'total', 'fa-users')}
      ${renderHistoryStatCard('Active Patients', active, 'active', 'fa-user-check')}
      ${renderHistoryStatCard('Discharged', discharged, 'discharged', 'fa-sign-out-alt')}
    </div>
    <div class="card card-body">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-user"></i> Name</th><th><i class="fas fa-venus-mars"></i> Gender</th><th><i class="fas fa-calendar"></i> DOB</th><th><i class="fas fa-phone"></i> Contact</th><th><i class="fas fa-map-marker-alt"></i> Address</th><th><i class="fas fa-calendar-check"></i> Admission</th><th><i class="fas fa-heart-pulse"></i> Vitals</th><th><i class="fas fa-exclamation-triangle"></i> Allergies</th><th><i class="fas fa-stethoscope"></i> Diagnosis</th><th><i class="fas fa-info-circle"></i> Status</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderHistoryStatCard(label, value, filterKey, icon) {
  return `
    <div class="card summary-tile" data-filter="${filterKey}">
      <strong><i class="fas ${icon}"></i> ${label}</strong>
      <span>${value}</span>
    </div>
  `;
}

function renderHistoryRows() {
  const rows = state.patients.filter(patient => {
    if (state.historyFilter === 'active') return patient.status !== 'Discharged';
    if (state.historyFilter === 'discharged') return patient.status === 'Discharged';
    return true;
  });

  if (!rows.length) {
    return '<tr class="table-empty"><td colspan="10"><i class="fas fa-inbox"></i> No history records to display.</td></tr>';
  }

  return rows.map(patient => `
    <tr>
      <td><strong>${patient.fullName}</strong></td>
      <td>${patient.gender}</td>
      <td>${patient.dob}</td>
      <td>${patient.contact}</td>
      <td>${patient.address}</td>
      <td>${patient.admissionDate}</td>
      <td><span class="badge badge-info">${patient.vitals || 'N/A'}</span></td>
      <td>${patient.allergies || 'None'}</td>
      <td>${patient.diagnosis}</td>
      <td><span class="badge ${patient.status === 'Discharged' ? 'badge-success' : 'badge-warning'}">${patient.status}</span></td>
    </tr>
  `).join('');
}

function attachHistoryListeners() {
  document.querySelectorAll('.summary-tile[data-filter]').forEach(card => {
    card.addEventListener('click', (event) => {
      state.historyFilter = event.currentTarget.dataset.filter;
      renderContent();
    });
  });
}

function renderDischargePanel() {
  const patientOptions = state.patients.filter(p => p.status !== 'Discharged').map(patient => `<option value="${patient.fullName}">${patient.fullName}</option>`).join('');
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-sign-out-alt"></i> Patient Discharge</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="discharge-patient"><i class="fas fa-user"></i> Select Patient</label><select id="discharge-patient"><option value="">Choose patient</option>${patientOptions}</select></div>
          <div class="form-field"><label for="discharge-date"><i class="fas fa-calendar"></i> Discharge Date</label><input id="discharge-date" type="text" placeholder="MM/DD/YYYY" /></div>
          <div class="form-field"><label for="discharge-reason"><i class="fas fa-info-circle"></i> Reason</label><input id="discharge-reason" type="text" /></div>
          <div class="form-field"><label for="discharge-notes"><i class="fas fa-sticky-note"></i> Notes</label><textarea id="discharge-notes"></textarea></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="confirm-discharge" class="button button-success"><i class="fas fa-check"></i> Confirm Discharge</button>
          <button type="button" id="reload-discharge" class="button button-secondary"><i class="fas fa-sync-alt"></i> Load Patients</button>
        </div>
      </div>
    </div>
  `;
}

function attachDischargeListeners() {
  document.getElementById('confirm-discharge').addEventListener('click', () => {
    const selected = document.getElementById('discharge-patient').value;
    const dischargeDate = document.getElementById('discharge-date').value.trim();
    const reason = document.getElementById('discharge-reason').value.trim();
    const notes = document.getElementById('discharge-notes').value.trim();

    if (!selected) {
      alert('Choose a patient to discharge.');
      return;
    }

    const patient = state.patients.find(p => p.fullName === selected);
    if (!patient) return;

    patient.status = 'Discharged';
    state.dischargeHistory.push({ patient: selected, dischargeDate, reason, notes });
    alert('Patient discharged successfully.');
    renderContent();
  });

  document.getElementById('reload-discharge').addEventListener('click', () => {
    renderContent();
  });
}

function renderBillingPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-receipt"></i> Billing & Invoice</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="billing-patient"><i class="fas fa-user"></i> Patient ID</label><input id="billing-patient" type="text" /></div>
          <div class="form-field"><label for="billing-days"><i class="fas fa-calendar-days"></i> Days Stayed</label><input id="billing-days" type="number" min="0" /></div>
          <div class="form-field"><label for="billing-rate"><i class="fas fa-dollar-sign"></i> Daily Rate ($)</label><input id="billing-rate" type="number" min="0" value="100" /></div>
          <div class="form-field"><label for="billing-total"><i class="fas fa-calculator"></i> Total Bill ($)</label><input id="billing-total" type="text" readonly /></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="calculate-bill" class="button button-success"><i class="fas fa-calculator"></i> Calculate Bill</button>
          <button type="button" id="print-invoice" class="button button-secondary"><i class="fas fa-print"></i> Print Invoice</button>
        </div>
      </div>
    </div>
  `;
}

function attachBillingListeners() {
  document.getElementById('calculate-bill').addEventListener('click', () => {
    const days = Number(document.getElementById('billing-days').value);
    const rate = Number(document.getElementById('billing-rate').value);
    const patientId = document.getElementById('billing-patient').value.trim();
    if (!Number.isFinite(days) || !Number.isFinite(rate)) {
      alert('Enter valid numeric values for days and rate.');
      return;
    }
    const total = days * rate;
    document.getElementById('billing-total').value = `$${total}`;
    alert(`Bill calculated for ${patientId || 'selected patient'}: $${total}`);
  });

  document.getElementById('print-invoice').addEventListener('click', () => {
    const total = document.getElementById('billing-total').value;
    if (!total) {
      alert('Calculate the bill first.');
      return;
    }
    alert(`Invoice printed successfully. Total due: ${total}`);
  });
}

function renderStatisticsPanel() {
  const patientCount = state.patients.length;
  const medicalCount = state.medicalRecords.length;
  const appointmentCount = state.appointments.length;
  const diagnosisCount = state.diagnoses.length;
  
  return `
    <div class="grid-2">
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-users"></i> Total Patients</strong><span>${patientCount}</span></div>
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-file-medical"></i> Medical Records</strong><span>${medicalCount}</span></div>
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-calendar-check"></i> Appointments</strong><span>${appointmentCount}</span></div>
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-stethoscope"></i> Diagnoses</strong><span>${diagnosisCount}</span></div>
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-sign-out-alt"></i> Discharged</strong><span>${state.patients.filter(p => p.status === 'Discharged').length}</span></div>
      <div class="card summary-tile" style="cursor: default;"><strong><i class="fas fa-heart-pulse"></i> System Health</strong><span>100%</span></div>
    </div>
    <div class="grid-2">
      <div class="card card-body">
        <h3><i class="fas fa-info-circle"></i> System Overview</h3>
        <p>Your medical management system is running smoothly with all functions operational.</p>
        <ul style="margin-top: 1rem; padding-left: 1.5rem;">
          <li>✓ Patient Database: Active</li>
          <li>✓ Appointment Scheduling: Active</li>
          <li>✓ Medical Records: Active</li>
          <li>✓ Billing System: Active</li>
        </ul>
      </div>
      <div class="card card-body">
        <h3><i class="fas fa-chart-bar"></i> Quick Stats</h3>
        <p>Last 24 Hour Activity</p>
        <ul style="margin-top: 1rem; padding-left: 1.5rem;">
          <li>New Admissions: ${state.patients.length}</li>
          <li>New Appointments: ${appointmentCount}</li>
          <li>Records Updated: ${medicalCount}</li>
          <li>System Uptime: 100%</li>
        </ul>
      </div>
    </div>
  `;
}

function attachStatisticsListeners() {
  // No additional actions required for static statistics.
}

function renderAppointmentsPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-calendar-check"></i> Schedule Appointments</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="appointment-name"><i class="fas fa-user"></i> Patient Name</label><input id="appointment-name" type="text" /></div>
          <div class="form-field"><label for="appointment-dob"><i class="fas fa-calendar"></i> Date of Birth</label><input id="appointment-dob" type="text" /></div>
          <div class="form-field"><label for="appointment-age"><i class="fas fa-hashtag"></i> Age</label><input id="appointment-age" type="text" /></div>
          <div class="form-field"><label for="appointment-doctor"><i class="fas fa-stethoscope"></i> Doctor Name</label><select id="appointment-doctor"><option value="">Select doctor</option>${state.doctors.map(doc => `<option>${doc}</option>`).join('')}</select></div>
          <div class="form-field"><label for="appointment-date"><i class="fas fa-calendar"></i> Date (MM/DD/YYYY)</label><input id="appointment-date" type="text" /></div>
          <div class="form-field"><label for="appointment-time"><i class="fas fa-clock"></i> Time (HH:MM)</label><input id="appointment-time" type="text" /></div>
          <div class="form-field" style="grid-column: span 2;"><label for="appointment-reason"><i class="fas fa-info-circle"></i> Reason</label><input id="appointment-reason" type="text" /></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="schedule-appointment" class="button button-success"><i class="fas fa-plus"></i> Schedule Appointment</button>
          <button type="button" id="clear-appointment" class="button button-secondary"><i class="fas fa-times"></i> Clear</button>
        </div>
      </div>
    </div>
    <div class="card card-body">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-user"></i> Patient</th><th><i class="fas fa-calendar"></i> DOB</th><th><i class="fas fa-hashtag"></i> Age</th><th><i class="fas fa-stethoscope"></i> Doctor</th><th><i class="fas fa-calendar"></i> Date</th><th><i class="fas fa-clock"></i> Time</th><th><i class="fas fa-info-circle"></i> Reason</th></tr>
          </thead>
          <tbody>${renderAppointmentRows()}</tbody>
        </table>
      </div>
    </div>
  `;
}

function attachAppointmentsListeners() {
  document.getElementById('schedule-appointment').addEventListener('click', () => {
    const patientName = document.getElementById('appointment-name').value.trim();
    const dob = document.getElementById('appointment-dob').value.trim();
    const age = document.getElementById('appointment-age').value.trim();
    const doctor = document.getElementById('appointment-doctor').value;
    const date = document.getElementById('appointment-date').value.trim();
    const time = document.getElementById('appointment-time').value.trim();
    const reason = document.getElementById('appointment-reason').value.trim();

    if (!patientName || !doctor) {
      alert('Please enter a patient name and select a doctor.');
      return;
    }

    state.appointments.push({ patientName, dob, age, doctor, date, time, reason });
    alert('Appointment scheduled successfully.');
    renderContent();
  });

  document.getElementById('clear-appointment').addEventListener('click', () => {
    ['appointment-name','appointment-dob','appointment-age','appointment-doctor','appointment-date','appointment-time','appointment-reason'].forEach(id => {
      document.getElementById(id).value = '';
    });
  });
}

function renderAppointmentRows() {
  if (!state.appointments.length) {
    return '<tr class="table-empty"><td colspan="7">No appointments scheduled.</td></tr>';
  }
  return state.appointments.map(appointment => `
    <tr>
      <td>${appointment.patientName}</td>
      <td>${appointment.dob}</td>
      <td>${appointment.age}</td>
      <td>${appointment.doctor}</td>
      <td>${appointment.date}</td>
      <td>${appointment.time}</td>
      <td>${appointment.reason}</td>
    </tr>
  `).join('');
}

function renderSchedulesPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-calendar"></i> Doctor Schedules</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="schedule-department"><i class="fas fa-building"></i> Department</label><select id="schedule-department"><option value="">All departments</option>${[...new Set(state.schedules.map(row => row.department))].map(dept => `<option>${dept}</option>`).join('')}</select></div>
          <button type="button" id="filter-schedule" class="button button-primary" style="align-self:end;"><i class="fas fa-search"></i> Filter</button>
        </div>
      </div>
    </div>
    <div class="card card-body">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-building"></i> Department</th><th><i class="fas fa-stethoscope"></i> Doctor</th><th><i class="fas fa-calendar-days"></i> Days</th><th><i class="fas fa-clock"></i> Time</th></tr>
          </thead>
          <tbody id="schedule-table-body">${renderScheduleRows(state.schedules)}</tbody>
        </table>
      </div>
    </div>
  `;
}

function attachSchedulesListeners() {
  document.getElementById('filter-schedule').addEventListener('click', () => {
    const department = document.getElementById('schedule-department').value;
    const rows = department ? state.schedules.filter(row => row.department === department) : state.schedules;
    document.getElementById('schedule-table-body').innerHTML = renderScheduleRows(rows);
  });
}

function renderScheduleRows(rows) {
  if (!rows.length) {
    return '<tr class="table-empty"><td colspan="4">No schedules matched your filter.</td></tr>';
  }
  return rows.map(row => `
    <tr>
      <td>${row.department}</td>
      <td>${row.doctor}</td>
      <td>${row.days}</td>
      <td>${row.time}</td>
    </tr>
  `).join('');
}

function renderDiagnosesPanel() {
  return `
    <div class="card">
      <div class="card-header"><h2><i class="fas fa-stethoscope"></i> Patient Diagnoses</h2></div>
      <div class="card-body">
        <div class="form-grid form-grid-2">
          <div class="form-field"><label for="diagnosis-lastname"><i class="fas fa-user"></i> Last Name</label><input id="diagnosis-lastname" type="text" /></div>
          <div class="form-field"><label for="diagnosis-firstname"><i class="fas fa-user"></i> First Name</label><input id="diagnosis-firstname" type="text" /></div>
          <div class="form-field"><label for="diagnosis-middlename"><i class="fas fa-user"></i> Middle Name</label><input id="diagnosis-middlename" type="text" /></div>
          <div class="form-field"><label for="diagnosis-condition"><i class="fas fa-stethoscope"></i> Diagnosis</label><input id="diagnosis-condition" type="text" /></div>
          <div class="form-field"><label for="diagnosis-date"><i class="fas fa-calendar"></i> Date</label><input id="diagnosis-date" type="text" placeholder="MM/DD/YYYY" /></div>
          <div class="form-field"><label for="diagnosis-doctor"><i class="fas fa-user-md"></i> Doctor</label><select id="diagnosis-doctor"><option value="">Select doctor</option>${state.doctors.map(doc => `<option>${doc}</option>`).join('')}</select></div>
          <div class="form-field"><label for="diagnosis-status"><i class="fas fa-info-circle"></i> Status</label><select id="diagnosis-status"><option>In Patient</option><option>Out Patient</option><option>Discharged</option></select></div>
        </div>
        <div class="action-row" style="margin-top: 1.5rem;">
          <button type="button" id="add-diagnosis" class="button button-success"><i class="fas fa-plus"></i> Add Diagnosis</button>
          <button type="button" id="clear-diagnosis" class="button button-secondary"><i class="fas fa-times"></i> Clear</button>
        </div>
      </div>
    </div>
    <div class="card card-body">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th><i class="fas fa-user"></i> Patient Name</th><th><i class="fas fa-stethoscope"></i> Diagnosis</th><th><i class="fas fa-calendar"></i> Date</th><th><i class="fas fa-user-md"></i> Doctor</th><th><i class="fas fa-info-circle"></i> Status</th></tr>
          </thead>
          <tbody>${renderDiagnosisRows()}</tbody>
        </table>
      </div>
    </div>
  `;
}

function attachDiagnosesListeners() {
  document.getElementById('add-diagnosis').addEventListener('click', () => {
    const lastName = document.getElementById('diagnosis-lastname').value.trim();
    const firstName = document.getElementById('diagnosis-firstname').value.trim();
    const middleName = document.getElementById('diagnosis-middlename').value.trim();
    const diagnosis = document.getElementById('diagnosis-condition').value.trim();
    const date = document.getElementById('diagnosis-date').value.trim();
    const doctor = document.getElementById('diagnosis-doctor').value;
    const status = document.getElementById('diagnosis-status').value;

    if (!lastName || !firstName || !diagnosis) {
      alert('Please fill the required patient and diagnosis fields.');
      return;
    }

    const patientName = `${lastName}, ${firstName} ${middleName}`.trim();
    state.diagnoses.push({ patientName, diagnosis, date, doctor, status });
    renderContent();
  });

  document.getElementById('clear-diagnosis').addEventListener('click', () => {
    ['diagnosis-lastname','diagnosis-firstname','diagnosis-middlename','diagnosis-condition','diagnosis-date','diagnosis-doctor','diagnosis-status'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('diagnosis-status').value = 'In Patient';
  });
}

function renderDiagnosisRows() {
  if (!state.diagnoses.length) {
    return '<tr class="table-empty"><td colspan="5"><i class="fas fa-inbox"></i> No diagnoses recorded yet.</td></tr>';
  }
  return state.diagnoses.map(item => `
    <tr>
      <td><strong>${item.patientName}</strong></td>
      <td>${item.diagnosis}</td>
      <td>${item.date}</td>
      <td>${item.doctor}</td>
      <td><span class="badge ${item.status === 'Discharged' ? 'badge-success' : item.status === 'In Patient' ? 'badge-warning' : 'badge-info'}">${item.status}</span></td>
    </tr>
  `).join('');
}
