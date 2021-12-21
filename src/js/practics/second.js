let offset = 1;
let limit = 3;
let fullData = [];
let dataOnPage = [];
let currentData = [];
// let activePage = 1;
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
    <th scope="col headTabel" onclick="sortUser('id')" >id</th>
    <th scope="col headTabel" onclick="sortUser('firstName')" >firstName</th>
    <th scope="col headTabel" onclick="sortUser('lastName')" >lastName</th>
    <th scope="col headTabel" onclick="sortUser('email')" >email</th>
    <th scope="col headTabel" onclick="sortUser('phone')" >phone</th>
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
    <div class="search__person">
      <input class="search-input" type="text" name="" id="">
      <button onclick="search()" >Найти</button>
      <button onclick="searchRemove()" >Сбросить</button>
    </div>
  `;
  disabelBtn();
};

const getPaginator = (pageCount, ) => {
  console.log(offset);
  let res = `
  <ul class="pagination">
  <li onclick="rollPage('prev')" class="page-item page-item-prev"><a class="page-link">Previous</a></li>
  `;
  for (let i = 1; i <= pageCount; i++) {
    // activePage = i
    // console.log(activePage);
    // if (2 >= pageCount) {
    // console.log(pageCount);
    res += `<li onclick="getDataPage(${i})" class="page-item page-item-page"><a class="page-link">${i}</a></li>`;
    // }
  }

  res += `
  <li onclick="rollPage('next')" class="page-item page-item-next"><a class="page-link">Next</a></li>
  </ul>
  `;
  return res;
};

const getDataPage = (i) => {
  offset = i;
  console.log(i);
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
  // console.log(offset + 'wwwwwwwwwwwwww');
  // console.log(Math.ceil(currentData.length / limit));

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
    // console.log('rty');
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

let sortingMethod = "asc";

const sortUser = (str) => {
  if (sortingMethod === "asc") {
    currentData = fullData.sort(
      (a, b) => (a[str] > b[str]) - (a[str] < b[str])
    );
    sortingMethod = "desc";
  } else {
    currentData = fullData.sort(
      (a, b) => (a[str] < b[str]) - (a[str] > b[str])
    );
    sortingMethod = "asc";
  }
  fillData();
};
