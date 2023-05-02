const recordSelectInput = document.getElementById("add-input-group");
const resetButton = document.getElementById("reset-button");
const noResultElement = document.querySelector(".no-results");
const addButton = document.getElementById("add-button");
const initializeButton = document.getElementById("initialize-button");
const billSummary = document.querySelector(".bill-summary");
const billContainer = document.querySelector(".bill-container");
const totalValueElement = document.getElementById("totalValue");
const distrElement = document.getElementById("distr");
const usersCountElement = document.getElementById("users-count");
const generateBtn = document.getElementById("generateBtn");

const getTemplate = (next, name, amount, paidBy) => `
        <div class="item">
            <div class="name-group">
              <label for="name-input-${next}">Name</label>
              <input type="text" class="name-value" id="name-input-${next}" value="${name}" />
            </div>
            <div class="amount-group">
              <label for="amount-input-${next}">Amount</label>
              <input type="number" class="amount-value" id="amount-input-${next}" value="${amount}" />
            </div>
            <div class="paid-by-group">
              <label for="paid-by-${next}">Paid By</label>
              <select class="paid-by-value" id="paid-by-${next}">
                ${users.map(
                  (user) =>
                    `<option ${
                      user.short === paidBy ? "selected" : ""
                    } value="${user.short}">${user.userName}</option>`
                )}
              </select>
            </div>
            <button type="button" class="cancel-button">Cancel</button>
        </div> 
`;

resetButton.addEventListener("click", () => {
  billContainer.innerHTML = "";
  calculate();
});

initializeButton.addEventListener("click", () => {
  const data = [
    {
      name: "Rent",
      amount: 600,
      paidBy: "MKH",
    },
    {
      name: "Aydat",
      amount: 300,
      paidBy: "Yusif",
    },
    {
      name: "Hot Water",
      amount: 450,
      paidBy: "Yusif",
    },
    {
      name: "Electricity",
      amount: 200,
      paidBy: "MKH",
    },
    {
      name: "Water",
      amount: 50,
      paidBy: "MKH",
    },
    {
      name: "Wifi",
      amount: 105,
      paidBy: "MKH",
    },
  ];
  billContainer.innerHTML = data.reduce(
    (acc, v, i) => acc + getTemplate(i + 1, v.name, v.amount, v.paidBy),
    ``
  );
  calculate();
});

addButton.addEventListener("click", () => {
  const { childElementCount } = billContainer;
  const next = childElementCount + 1;

  billContainer.insertAdjacentHTML("beforeend", getTemplate(next, "", "", ""));
  calculate();
});

billContainer.addEventListener("click", (e) => {
  const { target } = e;
  const className = target.getAttribute("class");
  if (className !== "cancel-button") return;
  e.stopPropagation();
  billContainer.removeChild(target.parentElement);
  calculate();
});

billContainer.addEventListener("input", (e) => {
  const { target } = e;
  const className = target.getAttribute("class");
  if (className !== "amount-value") return;
  e.stopPropagation();
  calculate();
});

generateBtn.addEventListener("click", generateTemplate);

function calculate() {
  if (!billContainer.childElementCount) {
    billSummary.classList.remove("show");
    noResultElement.classList.add("show");
    return;
  }
  const total = Array.from(billContainer.children).reduce(
    (acc, v) =>
      acc + Number(v.querySelector(".amount-group .amount-value").value) || 0,
    0
  );

  const totalValue = Number.parseFloat(total).toFixed(2);
  const usersCount = Number(usersCountElement.value);

  totalValueElement.innerText = totalValue;
  distrElement.innerText = `(${totalValue} / ${usersCount}) = ${Number.parseFloat(
    totalValue / usersCount
  ).toFixed(2)}`;

  billSummary.classList.add("show");
  noResultElement.classList.remove("show");
}

function generateTemplate() {
  const children = Array.from(billContainer.children);
  
  console.log(`*${new Date().toLocaleString("default", {
    month: "long",
  })} bills*

_Salam alaikum_
${children.reduce((acc, v) => {
  const name = v.querySelector(".name-value").value;
  const amount = Number(v.querySelector(".amount-value").value) || 0;
  const paidBy = v.querySelector(".paid-by-value").value;

  return (
    acc +
    "" +
    (`${name}: ${Number.parseFloat(amount).toFixed(2)}TL (${paidBy})` + "\r\n")
  );
}, "")}
    
Total: *${totalValueElement.innerText}TL*

Each will contribute: *${distrElement.innerText}TL*

Total Per User:
${users
  .map(
    (user) =>
      `${user.short}: ${Number.parseFloat(
        children.reduce((acc, child) => {
          const name = child.querySelector(".name-value").value;
          const amount =
            Number(child.querySelector(".amount-value").value) || 0;
          const paidBy = child.querySelector(".paid-by-value").value;

          if (paidBy === user.short) {
            acc += amount;
          }
          return acc;
        }, 0)
      ).toFixed(2)}TL`
  )
  .join("\n")}
    `);
}
