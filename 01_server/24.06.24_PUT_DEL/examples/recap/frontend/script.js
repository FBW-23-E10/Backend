
function postRequest () {
    console.log('function called')
    fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify({ username: "fahim", pass: "123" }),
      //headers:{'Content-Type': "application/json"},
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
}
function getRequest () {
    console.log('function called')
    fetch("http://localhost:5000/user/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
}

