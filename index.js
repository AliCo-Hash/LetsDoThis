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

document.getElementById("eventBtn").addEventListener("click", printNames);
