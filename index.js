async function getData() {
  const res = await fetch(
    "https://ldt-tech-test.herokuapp.com/api/startlistentries"
  );
  const eventData = await res.json();
  return eventData;
}
