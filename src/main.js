const users = [
  {
    userName: "Musah Kusi Hussein mkhstar",
  },
  {
    userName: "Mohammed SharifDeen",
  },
  {
    userName: "Vandana Saifullah",
  },
  {
    userName: "Yusif Mustapha",
  },
  {
    userName: "Umar Sharif Asumah Paper",
  },
];

const startDate = new Date("11 July 2020").getTime();
const todaysDate = new Date().getTime();
const weekInterval = 604800000;

const dutyPlaces = [
  "BATHROOM",
  "FRIDGE AND FLOOR (KITCHEN AND ITS BALCONY)",
  "COOKING AREA AND WOODWORK",
  "TOILET",
  "CORRIDOR",
];

const tbody = document.querySelector(".duty-content tbody");
const dayDate = document.querySelector(".day-and-date");
const searchInput = document.querySelector("#searchDuty");

if (dayDate) {
  dayDate.innerHTML =
    new Date().toDateString() + ", " + new Date().toLocaleTimeString();
}
if (tbody) {
  tbody.innerHTML = getTableHtml(startDate, todaysDate);
}

if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    const { value } = e.target;
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row) => {
      const userName = row.getAttribute("data-name");
      if (
        value.length > 0 &&
        userName.toLowerCase().indexOf(value.toLowerCase()) < 0
      ) {
        row.className = "hide";
      } else row.className = "";
    });
  });
}

const showCustomBtn = document.getElementById("show-custom-btn");
const customDate = document.getElementById("custom-date");
const customDateModal = document.getElementById('custom-date-modal');
const customCloseDateModal = document.getElementById('close-modal-custom-date');

if (showCustomBtn) showCustomBtn.addEventListener("click", () => customDateModal.classList.add('show'));

if (customCloseDateModal) customCloseDateModal.addEventListener('click', () => customDateModal.classList.remove('show'))

if (customDate) {
  const date = new Date();

  customDate.setAttribute("max", date.toISOString().slice(0, 10));
  customDate.addEventListener("change", (e) => {
    const { value: chosenDate } = e.target;
    document.querySelector(".day-and-date-modal").innerHTML =
      new Date(chosenDate).toDateString() +
      ", " +
      new Date(chosenDate).toLocaleTimeString();

    const customTbody = document.querySelector(".modal-table-card tbody");

    customTbody.innerHTML = getTableHtml(
      startDate,
      new Date(chosenDate).getTime()
    );
  });
}

function getTableHtml(startDate, endDate) {
  const weeksToday = (endDate - startDate) / weekInterval;
  const indexCalc = Math.floor(weeksToday) % users.length;

  let html = "";
  users.forEach((user, i) => {
    const dutyIndex =
      indexCalc + i >= users.length
        ? Math.abs(users.length - (indexCalc + i))
        : indexCalc + i;

    html += `
    <tr data-name="${user.userName}">
    <td>${user.userName}</td>
    <td>${dutyPlaces[dutyIndex]}</td>
    </tr>
    `;
  });
  return html;
}
