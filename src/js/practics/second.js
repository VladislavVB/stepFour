let offset = 1;
let limit = 10;
let fullData = [];
let dataOnPage = [];
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
  const filterPagination = document.querySelector(".filter-pagination");
  tableDataHead.innerHTML = "";
  filterPagination.innerHTML = "";
  temp = "";
  tableDataHead.innerHTML = `
  <div class="spinner-border text-light load-spiner" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  console.log("88888888888888");
  const responseSm = await fetch(url, {});
  const dataPerson = await responseSm.json();
  console.log(dataPerson);
  fullData = dataPerson;

  tableDataHead.innerHTML = `
  <tr>
    <th scope="col">id</th>
    <th scope="col">firstName</th>
    <th scope="col">lastName</th>
    <th scope="col">email</th>
    <th scope="col">phone</th>
  </tr>
  `;

  filterPagination.innerHTML = getPaginator(
    Math.ceil(dataPerson.length / limit)
  );
  fillData(fullData.slice((offset - 1) * limit, (offset - 1) * limit + limit));
  disabelBtn();
};

const fillData = (data) => {
  const tableBody = document.querySelector(".table__body");
  temp = "";
  for (const key in data) {
    temp += `
    <tr class="userInfoLine">
      <th class="userID"  scope="row">${data[key].id}</th>
      <td class="userFirstName" >${data[key].firstName}</td>
      <td class="userLastName" >${data[key].lastName}</td>
      <td class="userEmail" ><a href="mailto:${data[key].email}">${data[key].email}</a></td>
      <td class="userPhone" > <a href="tel:${data[key].phone}">${data[key].phone}</a> </td>
    </tr>
    `;
  }
  tableBody.innerHTML = temp;

  const detailPerson = document.querySelector(".detail__person");
  const userInfoLine = document.querySelectorAll(".userInfoLine");
  const searchPersonWrapper = document.querySelector(".search__person-wrapper");
  userInfoLine.forEach((elem, index) => {
    elem.onclick = () => {
      console.log(index);
      detailPerson.innerHTML = `
        <h3>Выбран пользователь ${data[index].firstName}</h3>
        <p class="detail__person-descp">Описание: </br>${data[index].description}</p>
        <p class="detail__person-streetAddress">Адрес проживания: ${data[index].adress.streetAddress}</з>
        <p class="detail__person-city">Город: ${data[index].adress.city}</з>
        <p class="detail__person-state">Провинция/штат: ${data[index].adress.state}</з>
        <p class="detail__person-zip">Индекс: ${data[index].adress.zip}</з>
      `;
    };
  });

  searchPersonWrapper.innerHTML = `
    <div class="search__person">
      <input type="text" name="" id="">
      <button>Найти</button>
    </div>
  `;
};

const getPaginator = (pageCount) => {
  console.log(pageCount);
  let res = `
  <ul class="pagination">
  <li onclick="rollPage('prev')" class="page-item page-item-prev"><a class="page-link">Previous</a></li>
  `;
  for (let i = 1; i <= pageCount; i++) {
    res += `<li onclick="getDataPage(${i})" class="page-item page-item-page"><a class="page-link">${i}</a></li>`;
  }

  res += `
  <li onclick="rollPage('next')" class="page-item page-item-next"><a class="page-link">Next</a></li>
  </ul>
  `;
  return res;
};

const getDataPage = (i) => {
  offset = i;
  fillData(fullData.slice((offset - 1) * limit, (offset - 1) * limit + limit));
  disabelBtn();
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
  disabelBtn();
  fillData(fullData.slice((offset - 1) * limit, (offset - 1) * limit + limit));
};

const disabelBtn = () => {
  const pageItemNext = document.querySelector(".page-item-next");
  const pageItemPrev = document.querySelector(".page-item-prev");
  console.log(fullData);
  console.log(offset);
  if (offset == 1) {
    pageItemPrev.classList.add("disabel");
    pageItemNext.classList.remove("disabel");
  } else if (offset == Math.ceil(fullData.length / limit)) {
    pageItemNext.classList.add("disabel");
    pageItemPrev.classList.remove("disabel");
  } else {
    pageItemNext.classList.remove("disabel");
    pageItemPrev.classList.remove("disabel");
  }
};
