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
  const namesOutput = document.getElementById("names");
  const eventInput = document.getElementById("eventid").value;
  const printedName = getStartlist(eventInput);
  namesOutput.innerText = await printedName;
}

async function getSales(organiserId) {
  let sum = 0;
  const dataSet = await getData();

  dataSet.forEach(data => {
    if (organiserId == data.organiserId && data.status == "CONFIRMED") {
      sum += data.ticketPrice.value;
    }
  });
  return `Total Sales: £${sum}`;
}

async function printSales() {
  const salesOutput = document.getElementById("sales");
  const organiserInput = document.getElementById("organiserid").value;
  const printedSales = getSales(organiserInput);
  salesOutput.innerText = await printedSales;
}

document.getElementById("eventBtn").addEventListener("click", printNames);
document.getElementById("salesBtn").addEventListener("click", printSales);
