// Fetch data from data.json and populate data list
async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  populateDataList(data);
  populateTagFilter(data);
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
          <p><strong>Date:</strong> ${item.date}</p>
          <p><strong>Tags:</strong> ${item.tags.join(", ")}</p>
          <a href="${
            item.download_link
          }" class="btn btn-success mt-2" download>Download</a>
        </div>
      </div>
    `;
    dataList.appendChild(dataItem);
  });
}

// Populate tag filter options
function populateTagFilter(data) {
  const tagSet = new Set();
  data.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));

  const tagFilter = document.getElementById("tag-filter");
  tagSet.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

// Filter data by selected tag
async function filterData() {
  const selectedTag = document.getElementById("tag-filter").value;
  const response = await fetch("data.json");
  const data = await response.json();

  if (selectedTag) {
    const filteredData = data.filter((item) => item.tags.includes(selectedTag));
    populateDataList(filteredData);
  } else {
    populateDataList(data); // Show all data if no filter is selected
  }
}

// Load data on page load
fetchData();
