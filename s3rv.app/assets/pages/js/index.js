const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  //When menu is clicked, it adds a new css class
  nav.classList.add("open-nav");
});

close.addEventListener("click", () => {
  //When close button is clicked, it removes the new css class
  nav.classList.remove("open-nav");
});

//API Routes Fields
var admins_tab = [];
var employees_tab = [];
var fuzai_tab = [];
var menzen_tab = [];
var lect = document.getElementById("selector");
var fld_01 = document.getElementById("fld_01");
var fld_02 = document.getElementById("fld_02");
var fld_03 = document.getElementById("fld_03");
var fld_04 = document.getElementById("fld_04");
var fld_05 = document.getElementById("fld_05");

admins_tab = [
  ["/administrator/add"],
  ["/administrator/0"],
  ["/administrator/{admin_ID}"],
  ["/administrator/{admin_ID}"],
  ["/administrator/{admin_ID}"],
];
employees_tab = [
  ["/employee/add"],
  ["/employee/0"],
  ["/employee/{employee_ID}"],
  ["/employee/{employee_ID}"],
  ["/employee/{employee_ID}"],
];
fuzai_tab = [
  ["/fuzai/add"],
  ["/fuzai/0"],
  ["/fuzai/{fuzai_ID}"],
  ["/fuzai/{fuzai_ID}"],
  ["/fuzai/{fuzai_ID}"],
];
menzen_tab = [
  ["/menzen/add"],
  ["/menzen/0"],
  ["/menzen/{menzen_ID}"],
  ["/menzen/{menzen_ID}"],
  ["/menzen/{menzen_ID}"],
];

lect.onchange = () => {
  if (lect.value == "administrator") {
    fld_01.value = admins_tab[0];
    fld_02.value = admins_tab[1];
    fld_03.value = admins_tab[2];
    fld_04.value = admins_tab[3];
    fld_05.value = admins_tab[4];
  } else if (lect.value == "employee") {
    fld_01.value = employees_tab[0];
    fld_02.value = employees_tab[1];
    fld_03.value = employees_tab[2];
    fld_04.value = employees_tab[3];
    fld_05.value = employees_tab[4];
  } else if (lect.value == "fuzai") {
    fld_01.value = fuzai_tab[0];
    fld_02.value = fuzai_tab[1];
    fld_03.value = fuzai_tab[2];
    fld_04.value = fuzai_tab[3];
    fld_05.value = fuzai_tab[4];
  } else if (lect.value == "menzen") {
    fld_01.value = menzen_tab[0];
    fld_02.value = menzen_tab[1];
    fld_03.value = menzen_tab[2];
    fld_04.value = menzen_tab[3];
    fld_05.value = menzen_tab[4];
  }
};

function cpypaste(fld_id) {
  if (fld_id == "fld_01") {
    navigator.clipboard
      .writeText(document.getElementById("fld_01").value)
      .then(function () {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1500);
      });
  } else if (fld_id == "fld_02") {
    navigator.clipboard
      .writeText(document.getElementById("fld_02").value)
      .then(function () {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1500);
      });
  } else if (fld_id == "fld_03") {
    navigator.clipboard
      .writeText(document.getElementById("fld_03").value)
      .then(function () {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1500);
      });
  } else if (fld_id == "fld_04") {
    navigator.clipboard
      .writeText(document.getElementById("fld_04").value)
      .then(function () {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1500);
      });
  } else if (fld_id == "fld_05") {
    navigator.clipboard
      .writeText(document.getElementById("fld_05").value)
      .then(function () {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1500);
      });
  }
}
