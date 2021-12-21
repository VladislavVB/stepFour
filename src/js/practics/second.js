let offset = 1;
let limit = 15;
let fullData = [];
let dataOnPage = [];
let currentData = [];
let sortingMethod = "asc";
let temp = "";
const dataBtn = document.querySelectorAll(".data-btn");

dataBtn.forEach((elem) => {
  elem.addEventListener("click", () => {
    dataBtn.forEach((elem) => {
      elem.classList.remove("disabel");
    });
    elem.classList.add("disabel");
  });
});

const getRes = async (url) => {
  const tableDataHead = document.querySelector(".table__data-head");
  tableDataHead.innerHTML = "";

  temp = "";
  tableDataHead.innerHTML = `
  <div class="spinner-border text-light load-spiner" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  const responseSm = await fetch(url, {});
  const dataPerson = await responseSm.json();
  fullData = dataPerson;

  tableDataHead.innerHTML = `
  <tr>
    <th scope="col headTabel" class="head-tabel" onclick="sortUser('id', 0)" >id <img src="img/nt.png" alt=""> </th>
    <th scope="col headTabel" class="head-tabel" onclick="sortUser('firstName', 1)" >firstName <img src="img/nt.png" alt=""></th>
    <th scope="col headTabel" class="head-tabel" onclick="sortUser('lastName', 2)" >lastName <img src="img/nt.png" alt=""></th>
    <th scope="col headTabel" class="head-tabel" onclick="sortUser('email', 3)" >email <img src="img/nt.png" alt=""> </th>
    <th scope="col headTabel" class="head-tabel" onclick="sortUser('phone', 4)" >phone <img src="img/nt.png" alt=""> </th>
  </tr>
  `;
  currentData = fullData;
  fillData();
};

const fillData = () => {
  let copyData = currentData.slice(
    (offset - 1) * limit,
    (offset - 1) * limit + limit
  );
  const filterPagination = document.querySelector(".filter-pagination");
  filterPagination.innerHTML = "";
  filterPagination.innerHTML = getPaginator(
    Math.ceil(currentData.length / limit),
    currentData
  );

  const tableBody = document.querySelector(".table__body");
  temp = "";
  for (const key in copyData) {
    temp += `
    <tr class="userInfoLine">
      <th class="userID"  scope="row">${copyData[key].id}</th>
      <td class="userFirstName" >${copyData[key].firstName}</td>
      <td class="userLastName" >${copyData[key].lastName}</td>
      <td class="userEmail" ><a href="mailto:${copyData[key].email}">${copyData[key].email}</a></td>
      <td class="userPhone" > <a href="tel:${copyData[key].phone}">${copyData[key].phone}</a> </td>
    </tr>
    `;
  }
  tableBody.innerHTML = temp;

  const detailPerson = document.querySelector(".detail__person");
  const userInfoLine = document.querySelectorAll(".userInfoLine");
  const searchPersonWrapper = document.querySelector(".search__person-wrapper");
  userInfoLine.forEach((elem, index) => {
    elem.onclick = () => {
      detailPerson.innerHTML = `
        <h3>Выбран пользователь ${copyData[index].firstName}</h3>
        <p class="detail__person-descp">Описание: </br>${copyData[index].description}</p>
        <p class="detail__person-streetAddress">Адрес проживания: ${copyData[index].adress.streetAddress}</з>
        <p class="detail__person-city">Город: ${copyData[index].adress.city}</з>
        <p class="detail__person-state">Провинция/штат: ${copyData[index].adress.state}</з>
        <p class="detail__person-zip">Индекс: ${copyData[index].adress.zip}</з>
      `;
    };
  });

  searchPersonWrapper.innerHTML = `
    <div class="search__person input-group mb-3">
      <input class="search-input form-control" type="text" name="" id="">
      <button  class="btn btn-light data-btn" onclick="search()" >Найти</button>
      <button  class="btn btn-light data-btn" onclick="searchRemove()" >Сбросить</button>
    </div>
  `;
  disabelBtn();
};

const getPaginator = (pageCount) => {
  let res = `
  <ul class="pagination">
  <li onclick="rollPage('prev')" class="page-item page-item-prev"><a class="page-link">Previous</a></li>
  `;
  for (
    let i = offset - 3 <= 0 ? 1 : offset - 3;
    i <= (offset + 3 > pageCount ? pageCount : offset + 3);
    i++
  ) {
    res += `<li onclick="getDataPage(${i})" class="page-item page-item-page ${
      offset == i && "active"
    }"><a class="page-link">${i}</a></li>`;
  }

  res += `
  <li onclick="rollPage('next')" class="page-item page-item-next"><a class="page-link">Next</a></li>
  </ul>
  `;
  return res;
};

const getDataPage = (i) => {
  offset = i;
  fillData();
};

const rollPage = (side) => {
  switch (side) {
    case "next":
      offset++;
      break;
    case "prev":
      offset--;
      break;
  }
  fillData();
  getPaginator(Math.ceil(currentData.length / limit), currentData);
};

const disabelBtn = () => {
  const pageItemNext = document.querySelector(".page-item-next");
  const pageItemPrev = document.querySelector(".page-item-prev");

  if (offset == 1) {
    pageItemPrev.classList.add("disabel");
    pageItemNext.classList.remove("disabel");
  } else if (offset == Math.ceil(currentData.length / limit)) {
    pageItemNext.classList.add("disabel");
    pageItemPrev.classList.remove("disabel");
  } else {
    pageItemNext.classList.remove("disabel");
    pageItemPrev.classList.remove("disabel");
  }

  if (Math.ceil(currentData.length / limit) == 1) {
    pageItemPrev.classList.add("disabel");
    pageItemNext.classList.add("disabel");
  }
};

const search = () => {
  offset = 1;
  // let searchArr = fullData;
  const searchInput = document.querySelector(".search-input");
  let valueInput = searchInput.value;
  const searchArr = fullData.filter(
    (elem) =>
      elem.firstName.toUpperCase().indexOf(valueInput.toUpperCase()) != -1
  );
  currentData = searchArr;
  fillData();
};

const searchRemove = () => {
  offset = 1;
  let valueInput = "";
  const searchArr = fullData.filter(
    (elem) =>
      elem.firstName.toUpperCase().indexOf(valueInput.toUpperCase()) != -1
  );
  currentData = searchArr;
  fillData();
};

const sortUser = (str, index) => {
  const arrowHead = document.querySelectorAll(".head-tabel img");
  arrowHead.forEach((elem) => {
    elem.classList.remove("up");
    elem.classList.remove("down");
  });
  // elem.classList.add('up')

  if (sortingMethod === "asc") {
    currentData = fullData.sort(
      (a, b) => (a[str] > b[str]) - (a[str] < b[str])
    );
    arrowHead[index].classList.remove("down");
    arrowHead[index].classList.add("up");
    sortingMethod = "desc";
  } else {
    currentData = fullData.sort(
      (a, b) => (a[str] < b[str]) - (a[str] > b[str])
    );
    arrowHead[index].classList.remove("up");
    arrowHead[index].classList.add("down");
    sortingMethod = "asc";
  }
  fillData();
};
