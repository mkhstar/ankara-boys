const users = [
  {
    userName: "Musah Kusi Hussein mkhstar"
  },
  {
    userName: "Mohammed SharifDeen"
  },
  {
    userName: "Vandana Saifullah"
  },
  {
    userName: "Yusif Mustapha"
  },
  {
    userName: "Umar Sharif Asumah Paper"
  }
];

const startDate = new Date('11 July 2020').getTime();
const todaysDate = new Date().getTime();
const weekInterval = 604800000;
const weeksToday = (todaysDate - startDate) / weekInterval;
const indexCalc = Math.floor(weeksToday) % users.length;

const dutyPlaces = [
  "BATHROOM",
  "FRIDGE AND FLOOR (KITCHEN AND ITS BALCONY)",
  "COOKING AREA AND WOODWORK",
  "TOILET",
  "CORRIDOR"
];

const tbody = document.querySelector(".duty-content tbody");
const dayDate = document.querySelector(".day-and-date");
const searchInput = document.querySelector("#searchDuty");

if (dayDate) {
  dayDate.innerHTML =
    new Date().toDateString() + ", " + new Date().toLocaleTimeString();
}
if (tbody) {
  tbody.innerHTML = "";
  users.forEach((user, i) => {
    const dutyIndex =
      indexCalc + i >= users.length
        ? Math.abs(users.length - (indexCalc + i))
        : indexCalc + i;
    tbody.innerHTML += `
    <tr data-name="${user.userName}">
    <td>${user.userName}</td>
    <td>${dutyPlaces[dutyIndex]}</td>
    </tr>
    `;
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", e => {
    const { value } = e.target;
    const rows = tbody.querySelectorAll("tr");
    rows.forEach(row => {
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
