// ambil semua variable pada html
const formContact = document.forms["contact-form"];
const nameContact = document.querySelector("#namecontact");
const emailContact = document.querySelector("#emailcontact");
const pesanContact = document.querySelector("#pesancontact");
const tombolContact = document.querySelector("#submitcontact");
const loadtombolContact = document.querySelector("#loadingcontactbtn");
const alertContact = document.querySelector("#alertcontact");
const contents = document.querySelector(".contents");

// load
window.addEventListener("load", (event) => {
  document.querySelector("html").style.scrollBehavior = "initial";
  window.scrollTo(0, 0);
  document.querySelector("html").style.overflowY = "hidden";
  document.querySelector("body").style.visibility = "hidden";
  document.querySelector(".load-page").style.visibility = "visible";

  // progress bar
  // const progressBar = document.querySelector(".progress-bar");

  // progressBar.style.transition = "width";
  // progressBar.style.transitionDuration = "2s";
  // progressBar.style.width = "100%";

  // kirim ip
  // fetch("https://ipapi.co/json/")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data.ip);
  //     discord_message(
  //       2,
  //       "Seseorang mengunjungi website anda!",
  //       "LINK :\n" +
  //         window.location.href +
  //         "\nIP :\n" +
  //         data.ip +
  //         "\nKOTA :\n" +
  //         data.city +
  //         "\nISP :\n" +
  //         data.org +
  //         "\nDEVICE :\n" +
  //         navigator.userAgent
  //     );
  //   });

  setTimeout(function () {
    stopLoad();
  }, 2000);

  setTimeout(function () {
    document.querySelector(".load-page").style.display = "none";
    document.querySelector("html").style.scrollBehavior = "smooth";
    document.querySelector("body").style.visibility = "visible";
    document.querySelector("html").style.overflowY = "scroll";
  }, 2200);
});

// function stopload
function stopLoad() {
  var loadPage = document.querySelector(".load-page");
  contents.classList.remove("d-none");
  var fadeEffect = setInterval(function () {
    if (!loadPage.style.opacity) {
      loadPage.style.opacity = 1;
    }
    if (loadPage.style.opacity > 0) {
      loadPage.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 1);
  AOS.init({
    once: true,
  });
}

// kirim contact

// sebelumnya kita buat dia capital
nameContact.addEventListener("input", function () {
  nameContact.value = nameContact.value.toUpperCase();
});

// setelah itu kirim pesan ke discord
formContact.addEventListener("submit", function (e) {
  e.preventDefault();

  // kita buat params biar enak
  var kodeKirim = 1;
  var orangnya = nameContact.value + " | " + emailContact.value;
  var pesannya = pesanContact.value;

  // kita kirim
  if (discord_message(kodeKirim, orangnya, pesannya) === "OK!") {
    // masuk funvtion
    startContactValue();

    // DELAY kita reset semua value
    setTimeout(function () {
      resetContactValue();
    }, 2500);
    setTimeout(function () {
      successContact();
    }, 5500);
  }
});

// FUNGSI KE DISCORD
function discord_message(kode, username, message) {
  var params = "username=" + username + "&message=" + message;
  if (kode == 1) {
    url = "https://apiv2.bhadrikais.my.id/webhook.php?kode=1";
  } else if (kode == 2) {
    url = "https://apiv2.bhadrikais.my.id/webhook.php?kode=2";
  } else {
    url = "SORRY!";
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send(params);
  xhr.onload = function () {
    if (xhr.status === 200) {
    }
  };
  return "OK!";
}

// function loading contact
function startContactValue() {
  // disabled kontakt form
  nameContact.disabled = true;
  emailContact.disabled = true;
  pesanContact.disabled = true;
  // KITA BUAT LOADING
  tombolContact.classList.add("d-none");
  loadtombolContact.classList.remove("d-none");
}

// function reset contact
function resetContactValue() {
  nameContact.value = "";
  emailContact.value = "";
  pesanContact.value = "";
  nameContact.disabled = false;
  emailContact.disabled = false;
  pesanContact.disabled = false;
  tombolContact.classList.remove("d-none");
  loadtombolContact.classList.add("d-none");
  alertContact.classList.remove("d-none");
}

// function success contact

function successContact() {
  alertContact.classList.add("d-none");
}
