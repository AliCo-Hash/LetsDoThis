async function getData() {
  const res = await fetch(
    "https://ldt-tech-test.herokuapp.com/api/startlistentries"
  );
  const eventData = await res.json();
  return eventData;
}

async function getStartlist(eventId) {
  const namesArr = [];
  const dataSet = await getData();

  dataSet.forEach(data => {
    if (eventId == data.eventId && data.status == "CONFIRMED") {
      namesArr.push(`${data.firstName} ${data.lastName}`);
    }
  });
  return namesArr.join("\n");
}

async function printNames() {
  const eventInput = document.getElementById("eventid").value;
  const printedName = getStartlist(eventInput);
  document.getElementById("names").innerText = await printedName;
}

async function getSales(organiserId) {
  let sum = 0;
  const dataSet = await getData();

  dataSet.forEach(data => {
    if (organiserId == data.organiserId && data.status == "CONFIRMED") {
      sum += data.ticketPrice.value;
    }
  });
  return `£${sum}`;
}

async function printSales() {
  const organiserInput = document.getElementById("organiserid").value;
  const printedSales = getSales(organiserInput);
  document.getElementById("sales").innerText = await printedSales;
}

async function getEventsales(eventId) {
  let sum = 0;
  const dataSet = await getData();

  dataSet.forEach(data => {
    if (eventId == data.eventId && data.status == "CONFIRMED") {
      sum += data.ticketPrice.value;
    }
  });
  return `£${sum}`;
}

async function printEventsales() {
  const eventInput = document.getElementById("eventid").value;
  const printedEventsales = getEventsales(eventInput);
  document.getElementById("eventsales").innerText = await printedEventsales;
}

document.getElementById("eventBtn").addEventListener("click", printNames);
document.getElementById("eventBtn").addEventListener("click", printEventsales);
document.getElementById("salesBtn").addEventListener("click", printSales);
