let selectedFilters = [];
let StoreData = [];

// Fetch data from the JSON file and store it in StoreData
async function fetchData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    StoreData = await response.json();
    renderData(); // Render data after fetching
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function filterData(filters) {
  selectedFilters = filters;
  renderData();
}

function clearFilters() {
  selectedFilters = [];
  renderData();
}

function renderData() {
  const jobListings = document.getElementById("job-listings");
  jobListings.innerHTML = ""; // Clear previous listings

  const filteredData =
    selectedFilters.length === 0
      ? StoreData
      : StoreData.filter(({ position, role, level }) => {
          return (
            selectedFilters.includes(position) ||
            selectedFilters.includes(role) ||
            selectedFilters.includes(level)
          );
        });

  filteredData.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = `card ${job.featured ? "featured-card" : ""}`;
    if (job.featured) {
      jobCard.style.borderLeft = "5px solid lightskyblue";
    }

    jobCard.innerHTML = `
        <img src="${job.logo}" alt="Company Logo" id="cardimg" />
        <div class="left">
          <div class="top">
            <h4 class="companyName">${job.company}</h4>
            ${job.current ? '<p class="current">New!</p>' : ""}
            ${job.featured ? '<p class="featured">Featured</p>' : ""}
          </div>
          <div class="middle">
            <h3 class="position">${job.position}</h3>
            <div class="right">
              <h5 class="role">${job.role}</h5>
              <h5 class="level">${job.level}</h5>
              <h5 class="languages">${job.languages.join(", ")}</h5>
              <h5 class="tools">${job.tools.join(", ")}</h5>
            </div>
          </div>
          <div class="bottom">
            <p class="postedAt">${job.postedAt}</p>
            <p class="fulltime">${job.contract}</p>
            <p class="location">${job.location}</p>
          </div>
        </div>
      `;
    jobListings.appendChild(jobCard);
  });
}

// Fetch data and render on initial load
fetchData();
