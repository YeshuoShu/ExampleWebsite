let itemsPerPage = 10; // Number of items to show per page
let currentPage = 1; // Current page number

// Fetch data from data.csv and populate data list
window.originalData = [];
window.filteredData = [];

// Fetch data from data.csv and populate data list
async function fetchData() {
  try {
    const response = await fetch("data.csv");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    console.log("CSV Text:", csvText); // 调试信息
    const data = parseCSV(csvText);
    console.log("Parsed Data:", data); // 调试信息
    window.originalData = data;
    window.filteredData = data; // Initially, filteredData equals originalData
    populateTagFilter(data);
    displayPage(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const item = {};
    headers.forEach((header, index) => {
      item[header.trim()] = values[index].trim();
    });
    return item;
  });
}

// Populate data list
function populateDataList(data) {
  const dataList = document.getElementById("data-list");
  dataList.innerHTML = ""; // Clear existing content

  data.forEach((item) => {
    const dataItem = document.createElement("div");
    dataItem.className = "col-md-6 mb-4";
    dataItem.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title"><a href="${
            item.details_link
          }" class="text-decoration-none">${item.name}</a></h5>
          <p class="card-text">${item.description}</p>
          <p><strong>Source:</strong> ${item.source}</p>
          <p><strong>Publication Date:</strong> ${item.publication_date}</p>
          <p><strong>Tags:</strong> ${item.tags.split(",").join(", ")}</p>
          <p><strong>Geographic Extent:</strong> ${item.geographic_extent}</p>
          <p><strong>Temporal Extent:</strong> ${item.temporal_extent}</p>
          <p><strong>File Size:</strong> ${item.file_size}</p>
          <a href="${
            item.original_link
          }" class="btn btn-success mt-2" download>Original Link</a>
        </div>
      </div>
    `;
    dataList.appendChild(dataItem);
  });
}

// Populate tag filter options
function populateTagFilter(data) {
  const tagFilter = document.getElementById("tag-filter");
  if (!tagFilter) {
    console.error("Tag filter element not found");
    return;
  }

  const tagSet = new Set();
  data.forEach((item) =>
    item.tags.split(",").forEach((tag) => tagSet.add(tag.trim()))
  );

  tagSet.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

// Display data for the current page and render pagination
function displayPage(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  populateDataList(paginatedData); // Display data for the current page
  renderPagination(data.length); // Render pagination based on data length
}

// Render pagination buttons
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = ""; // Clear pagination navigation

  // Previous page button
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.className = "btn btn-secondary me-1";
    prevButton.innerText = "Previous";
    prevButton.onclick = () => {
      currentPage--;
      displayPage(window.filteredData);
    };
    paginationContainer.appendChild(prevButton);
  }

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `btn ${
      i === currentPage ? "btn-primary" : "btn-light"
    } me-1`;
    pageButton.innerText = i;
    pageButton.onclick = () => {
      currentPage = i;
      displayPage(window.filteredData);
    };
    paginationContainer.appendChild(pageButton);
  }

  // Next page button
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.className = "btn btn-secondary";
    nextButton.innerText = "Next";
    nextButton.onclick = () => {
      currentPage++;
      displayPage(window.filteredData);
    };
    paginationContainer.appendChild(nextButton);
  }
}

// Filter data by selected tag
async function filterData() {
  const selectedTag = document.getElementById("tag-filter").value;
  window.filteredData = selectedTag
    ? window.originalData.filter((item) =>
        item.tags
          .split(",")
          .map((tag) => tag.trim())
          .includes(selectedTag)
      )
    : window.originalData;

  currentPage = 1; // Reset to the first page
  const sortOrder = document.getElementById("sort-order").value;
  window.filteredData = sortData(window.filteredData, sortOrder);
  displayPage(window.filteredData);
}

// Sort data by date based on selected sort order
function sortDataByDate() {
  const sortOrder = document.getElementById("sort-order").value;
  window.filteredData = sortData(window.filteredData, sortOrder);
  displayPage(window.filteredData);
}

// Utility function to sort data based on date
function sortData(data, order) {
  return data.slice().sort((a, b) => {
    const dateA = new Date(a.publication_date);
    const dateB = new Date(b.publication_date);
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

// Search data by name or description
async function searchData() {
  const query = document.getElementById("search-box").value.toLowerCase();
  window.filteredData = window.originalData.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  currentPage = 1; // Reset to the first page
  const sortOrder = document.getElementById("sort-order").value;
  window.filteredData = sortData(window.filteredData, sortOrder);
  displayPage(window.filteredData);
}

// Handle Enter key press in search box
function handleSearchKey(event) {
  if (event.key === "Enter") {
    searchData();
  }
}

// Reset data to show all items
function resetData() {
  document.getElementById("search-box").value = ""; // Clear search box
  document.getElementById("tag-filter").value = ""; // Reset tag filter
  document.getElementById("sort-order").value = "desc"; // Reset sort order
  window.filteredData = window.originalData; // Reset data to original data
  currentPage = 1; // Reset to the first page
  displayPage(window.filteredData); // Display all data
}

// Load data on page load
fetchData();
