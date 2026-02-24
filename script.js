// ===========================
// STEP 2 — Execution Context & Scope
// ===========================
console.log("App Start");

let appName = "Mini Dashboard"; // global scope

function showAppName() {
  let version = "1.0"; // function scope
  console.log(appName);
  console.log(version);
}

showAppName();

// console.log(version); // error — version tidak bisa diakses di luar function

// ===========================
// STEP 3 — Data Dummy (Simulasi Database)
// ===========================
const transactions = [
  { id: 1, customer: "Andi", total: 200000, status: "paid" },
  { id: 2, customer: "Budi", total: 150000, status: "unpaid" },
  { id: 3, customer: "Citra", total: 300000, status: "paid" },
];

// ===========================
// STEP 4 — Array Method (map, filter, reduce)
// ===========================

// ✅ 1. map() → tampilkan data
function renderData(data) {
  const list = document.getElementById("list");
  const emptyState = document.getElementById("empty-state");
  list.innerHTML = "";

  if (emptyState) emptyState.style.display = "none";

  data.map((item) => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.className = "customer-name";
    name.textContent = item.customer;

    const amount = document.createElement("span");
    amount.className = "amount";
    amount.textContent = `Rp ${item.total.toLocaleString("id-ID")}`;

    const badge = document.createElement("span");
    badge.className = `status-badge ${item.status}`;
    badge.textContent = item.status.toUpperCase();

    li.appendChild(name);
    li.appendChild(amount);
    li.appendChild(badge);
    list.appendChild(li);
  });
}

// ✅ 2. filter() → hanya paid
function filterPaid() {
  const paidTransactions = transactions.filter(
    (item) => item.status === "paid",
  );
  renderData(paidTransactions);
  calculateTotal(paidTransactions);
}

// ✅ filter() → hanya unpaid
function filterUnpaid() {
  const unpaidTransactions = transactions.filter(
    (item) => item.status === "unpaid",
  );
  renderData(unpaidTransactions);
  calculateTotal(unpaidTransactions);
}

// ✅ showAll() → tampilkan semua transaksi
function showAll() {
  renderData(transactions);
  calculateTotal(transactions);
}

// ✅ 3. reduce() → hitung total omzet
function calculateTotal(data) {
  const total = data.reduce((acc, item) => acc + item.total, 0);
  document.getElementById("total").innerText = "Total: Rp " + total.toLocaleString("id-ID");
}

// ===========================
// STEP 5 — Konsep Callback
// ===========================
function processTransactions(callback) {
  callback(transactions);
}

processTransactions(function (data) {
  console.log("Data diterima:", data);
});

// ===========================
// STEP 6 — Promise (Simulasi API delay 2 detik)
// ===========================
function fetchTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve(transactions);
      } else {
        reject("Gagal ambil data");
      }
    }, 1000);
  });
}

// ===========================
// Loading Animation Helper
// ===========================
function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

// ===========================
// STEP 7 — Async/Await
// ===========================
async function loadData() {
  showLoading();
  try {
    const data = await fetchTransactions();
    renderData(data);
    calculateTotal(data);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
}

// ===========================
// Hubungkan Button
// ===========================
document.getElementById("loadBtn").addEventListener("click", loadData);

document.getElementById("filterBtn").addEventListener("click", function () {
  filterPaid();
});

document.getElementById("filterUnpaidBtn").addEventListener("click", function () {
  filterUnpaid();
});

document.getElementById("showAllBtn").addEventListener("click", function () {
  showAll();
});

// ===========================
// BONUS — Perbandingan Cara Asynchronous
// ===========================

// 1️⃣ Callback (Old Style)
function fetchWithCallback(callback) {
  setTimeout(() => {
    callback(transactions);
  }, 2000);
}

// 2️⃣ Promise
fetchTransactions()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// 3️⃣ Async/Await (Best Practice)
// const data = await fetchTransactions();
