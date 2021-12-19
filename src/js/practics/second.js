const getRes = async () => {
  const responseSm = await fetch(
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
  );
  const dataPerson = await responseSm.json();
  // console.log(responseSm);
  const tableBody = document.querySelector(".table__body");

  const dataList = [];
  
  for (let i = 0; i < dataPerson.legth; i += 10) {
    const temp = [];
    for (let j = 0; j < 10; j++) {
      temp.push(dataPerson);
    }
  }

  for (const key in dataPerson) {
    tableBody.innerHTML += `
    <tr class="userInfoLine">
      <th class="userID"  scope="row">${dataPerson[key].id}</th>
      <td class="userFirstName" >${dataPerson[key].firstName}</td>
      <td class="userLastName" >${dataPerson[key].lastName}</td>
      <td class="userEmail" >${dataPerson[key].email}</td>
      <td class="userPhone" >${dataPerson[key].phone}</td>
    </tr>
    `;
  }

  const detailPerson = document.querySelector(".detail__person");
  const userInfoLine = document.querySelectorAll(".userInfoLine");
  const searchPersonWrapper = document.querySelector(".search__person-wrapper");
  userInfoLine.forEach((elem, index) => {
    elem.onclick = () => {
      console.log(index);
      detailPerson.innerHTML = `
        <h3>Выбран пользователь ${dataPerson[index].firstName}</h3>
        <p class="detail__person-descp">Описание: </br>
        ${dataPerson[index].description}</p>
        <p class="detail__person-streetAddress">Адрес проживания: ${dataPerson[index].adress.streetAddress}</з>
        <p class="detail__person-city">Город: ${dataPerson[index].adress.city}</з>
        <p class="detail__person-state">Провинция/штат: ${dataPerson[index].adress.state}</з>
        <p class="detail__person-zip">Индекс: ${dataPerson[index].adress.zip}</з>
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

// const getResBig = async () => {
//   const responseSm = await fetch('https://www.google.com/url?q=http://www.filltext.com/?rows%3D1000%26id%3D%257Bnumber%257C1000%257D%26firstName%3D%257BfirstName%257D%26delay%3D3%26lastName%3D%257BlastName%257D%26email%3D%257Bemail%257D%26phone%3D%257Bphone%257C(xxx)xxx-xx-xx%257D%26adress%3D%257BaddressObject%257D%26description%3D%257Blorem%257C32%257D&sa=D&source=docs&ust=1639918996388000&usg=AOvVaw3tbEQj7q71Q8-qDbKatdLV', {

//   })
//   const responseSm = await responseSm.json()
//   console.log(responseSm);
// }
