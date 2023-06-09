const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const createArray = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
};

const createData = () => {
  const current = new Date();
  current.setDate(1);

  const startDay = current.getDay();
  const daysInMonth = getDaysInMonth(current);

  const weeks = createArray(5);
  const days = createArray(7);
  let value = null;

  const result = [];

  for (let weekIndex of weeks) {
    value = {
      week: weekIndex + 1,
      days: [],
    };

    for (let dayIndex of days) {
      const day = weekIndex * 7 + dayIndex + startDay - 1;
      const isValid = day > 0 && day <= daysInMonth;

      value.days.unshift({
        dayOfWeek: dayIndex + 1,
        value: (isValid && day) || "",
      });
    }
    result.push(value);
  }
  return result;
};

const addCell = (existing, classString, value) => {
  const result = /* html */ `
        <td class= "${classString}">                      
            ${value}
        </td>

        ${existing}
    `;
  return result;
};

const createHtml = (data) => {
  let result = "";

  for (let week of data) {
    let inner = "";

    for (let day of week.days) {
      let classString = "table__cell";

      const isToday = new Date().getDate() == day.value;
      const isWeekend = day.dayOfWeek == 1 || day.dayOfWeek == 7;
      const isAlternate = week / 2;

      if (isToday) {
        classString = `${classString} table__cell_today`;
      }
      if (isWeekend) {
        classString = `${classString} table__cell_weekend`;
      }
      if (isAlternate) {
        classString = `${classString} table__cell_alternate`;
      }

      inner = addCell(inner, classString, day.value);
    }
    inner = addCell(
      inner,
      "table__cell table__cell_sidebar",
      `Week ${week.week}`
    );
    result += `<tr>${inner}</tr>`;
  }
  return result;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);