const TOKEN = "90939035|-31949284158763881|90940535";
const DB = "Demo";
const REL = "Demo-rel";

//get user data from the jsondb
function getdata(name) {
  jQuery.ajaxSetup({ async: false });
  $.post(
    "http://api.login2explore.com:5577/api/irl",
    JSON.stringify({
      token: TOKEN,
      cmd: "GET_BY_KEY",
      dbName: DB,
      rel: REL,
      createTime: true,
      updateTime: true,
      jsonStr: {
        name,
      },
    }),
    (d) => {
      const { data, status } = JSON.parse(d);
      if (status === 400) {
        return alert("User Not Found");
      }
      sessionStorage.setItem("name",name)
      const { rec_no, record } = JSON.parse(data);
      console.log(record);
      if (location.pathname.slice(1) === "update.html") {
        document.getElementById("rec").innerHTML = rec_no;
        document.getElementById("id").value = record.id;
        document.getElementById("name").value = record.name;
        document.getElementById("email").value = record.email;
        document.getElementById("mobile").value = record.mobile;
      } else {
        document.getElementById("usergetdata").style.display = "block";
        document.getElementById("rec").innerHTML = rec_no;
        document.getElementById("uid").innerHTML = record.id;
        document.getElementById("uname").innerHTML = record.name;
        document.getElementById("uemail").innerHTML = record.email;
        document.getElementById("unumber").innerHTML = record.mobile;
      }
    }
  ).fail((err) => console.log(err));
  jQuery.ajaxSetup({ async: true });
}

//create new user data to jsondb
function createdata() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;

  jQuery.ajaxSetup({ async: false });
  $.post(
    "http://api.login2explore.com:5577/api/iml",
    JSON.stringify({
      token: TOKEN,
      cmd: "PUT",
      dbName: DB,
      rel: REL,
      jsonStr: {
        id,
        name,
        email,
        mobile,
      },
    }),
    (data) => {
      const { status } = JSON.parse(data);
      if (status === 200) {
        alert("user created successfully");
        window.location = "index.html";
      }
    }
  ).fail((err) => console.log(err));
  jQuery.ajaxSetup({ async: true });
}

//update an existing data in the jsonDB
function updatedata(num) {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  let dat = createUPDATERecordRequest(
    TOKEN,
    JSON.stringify({ id, name, email, mobile }),
    DB,
    REL,
    num
  );
  jQuery.ajaxSetup({ async: false });
  $.post("http://api.login2explore.com:5577/api/iml", dat, (data) => {
    console.log(data);
    alert("Data updated");
    window.location = "index.html";
  }).fail((err) => console.log(err));
  jQuery.ajaxSetup({ async: true });
}

//remove the existing data form the jsondb
function removedata(n) {
  jQuery.ajaxSetup({ async: false });
  $.post(
    "http://api.login2explore.com:5577/api/iml",
    JSON.stringify({
      token: TOKEN,
      cmd: "REMOVE",
      dbName: DB,
      rel: REL,
      jsonStr: {},
      record: n,
    }),
    (data) => {
      alert("user remove successfully");
      window.location = "index.html";
      console.log(data);
    }
  ).fail((err) => console.log(err));
  jQuery.ajaxSetup({ async: true });
}
