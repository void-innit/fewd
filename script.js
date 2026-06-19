// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeBtn');

// Check saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeBtn.textContent = '☀️ Light Mode';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    themeBtn.textContent = '☀️ Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeBtn.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});


// ===== TABLE DATA =====
const customers = [
  { name: 'John Doe',    revenue: '$4,200', orders: 12, status: 'Active',   region: 'North' },
  { name: 'Jane Smith',  revenue: '$3,800', orders: 9,  status: 'Inactive', region: 'South' },
  { name: 'Ali Hassan',  revenue: '$5,100', orders: 15, status: 'Active',   region: 'East'  },
  { name: 'Sara Lee',    revenue: '$2,900', orders: 7,  status: 'Active',   region: 'West'  },
  { name: 'Mike Brown',  revenue: '$6,300', orders: 20, status: 'Inactive', region: 'North' },
  { name: 'Amina Yusuf', revenue: '$4,700', orders: 11, status: 'Active',   region: 'East'  },
];


// ===== RENDER TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#aaa;">No results found</td></tr>';
    return;
  }

  data.forEach(customer => {
    const row = `
      <tr>
        <td>${customer.name}</td>
        <td>${customer.revenue}</td>
        <td>${customer.orders}</td>
        <td>
          <span class="status ${customer.status.toLowerCase()}">
            ${customer.status}
          </span>
        </td>
        <td>${customer.region}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Render on load
renderTable(customers);


// ===== SEARCH =====
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.region.toLowerCase().includes(query) ||
    c.status.toLowerCase().includes(query)
  );

  renderTable(filtered);
});


// ===== TABLE SORTING =====
let sortDirection = {};

document.querySelectorAll('th').forEach((th, index) => {
  const baseLabel = th.textContent.trim();
  th.dataset.baseLabel = baseLabel;

  th.addEventListener('click', () => {
    const keys = ['name', 'revenue', 'orders', 'status', 'region'];
    const key = keys[index];

    sortDirection[key] = !sortDirection[key];

    const sorted = [...customers].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      // Numeric sorting for orders
      if (key === 'orders') {
        return sortDirection[key] ? valA - valB : valB - valA;
      }

      // Revenue (strip $ and commas)
      if (key === 'revenue') {
        valA = parseFloat(valA.replace(/[$,]/g, ''));
        valB = parseFloat(valB.replace(/[$,]/g, ''));
        return sortDirection[key] ? valA - valB : valB - valA;
      }

      // Text sorting
      return sortDirection[key]
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    renderTable(sorted);

    // Reset all header labels, then show arrow on the active one
    document.querySelectorAll('th').forEach(t => {
      t.textContent = t.dataset.baseLabel;
    });
    th.textContent = th.dataset.baseLabel + (sortDirection[key] ? ' ↑' : ' ↓');
  });
});


// ===== REVENUE TREND CHART =====
const revenueCtx = document.getElementById('revenueChart').getContext('2d');

new Chart(revenueCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [18000, 22000, 19500, 27000, 24000, 31000],
      borderColor: '#4ecca3',
      backgroundColor: 'rgba(78, 204, 163, 0.1)',
      borderWidth: 2,
      pointBackgroundColor: '#4ecca3',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});


// ===== SALES COMPARISON CHART =====
const salesCtx = document.getElementById('salesChart').getContext('2d');

new Chart(salesCtx, {
  type: 'bar',
  data: {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Sales by Region',
      data: [42, 28, 35, 19],
      backgroundColor: [
        'rgba(78, 204, 163, 0.8)',
        'rgba(26, 26, 46, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// ===== CUSTOMER GROWTH CHART =====
const customerCtx = document.getElementById('customerChart').getContext('2d');

new Chart(customerCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Customers',
      data: [320, 450, 390, 520, 480, 610],
      borderColor: '#f6ad55',
      backgroundColor: 'rgba(246, 173, 85, 0.1)',
      borderWidth: 2,
      pointBackgroundColor: '#f6ad55',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  }
});


// ===== CATEGORY DISTRIBUTION CHART =====
const categoryCtx = document.getElementById('categoryChart').getContext('2d');

new Chart(categoryCtx, {
  type: 'doughnut',
  data: {
    labels: ['Electronics', 'Clothing', 'Food', 'Services', 'Other'],
    datasets: [{
      data: [35, 25, 18, 14, 8],
      backgroundColor: [
        '#4ecca3',
        '#f6ad55',
        '#fc8181',
        '#76e4f7',
        '#b794f4'
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});
