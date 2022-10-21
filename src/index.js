const container = document.querySelector(".container");
const input = document.querySelector("input");
const popup = document.querySelector('#popupId')

// search
const api = "http://127.0.0.1:3000/";

let usersList;

function dataUser(data, name) {
  if (name === undefined) {
    return;
  } else {
    return (container.innerHTML += `
            <div data-email='${data.email}'class="card">
                <div class="card__name">
                    <h2>
                        ${name}
                    </h2>
                </div>
                <div class="card__info">
                    <div class="card__phone">
                        <div class="icon_phone icon"></div>
                        <div class="phone">${data.phone}</div>
                    </div>
                    <div class="card__mail">
                        <div class="icon_mail icon"></div>
                        <div class="mail"><a href="mailto:${data.email}">${data.email}</a></div>   
                    </div>
                </div>

            </div>
        `);
  }
}

async function getData() {
    let response = await fetch(api);
    usersList = await response.json();
    usersList.map((id) => {
        // console.log(userID)
        let name = id.name;
        if (input.value === "") {
          dataUser(id, name);
        } else {
          let arrName = name.split(",");
          arrName.filter((e) => {
            let listName =
              e.toLowerCase().startsWith(input.value) ||
              e.startsWith(input.value);
              
            (listName) ? dataUser(id, name):null;
            
          });
        }
        
        return usersList
      });
       
}

(input.oninput = () => {
  container.innerHTML = "";

    getData()
})();



// pop-up

function open (id) {
    popup.classList.add('popup')
    return popup.innerHTML = `
        <div class="popup__wrapper">
            <div class="close">
                <div class="close__cross"></div>
            </div>
            <div class="popup__container">
                <h1 class="popup__user">${id.name}</h1>
                <div class="popup__phone popup__group">
                    <div class="title__phone title">Телефон:</div>
                    <div class="phone">${id.phone}</div>
                </div>
                <div class="popup__mail popup__group">
                    <div class="title__mail title">Почта:</div>
                    <div class="mail">${id.email}</div>
                </div>
                <div class="popup__date popup__group">
                    <div class="title__date title">Дата приема:</div>
                    <div class="date">${id.hire_date}</div>
                </div>
                <div class="popup__position popup__group">
                    <div class="title__position title">Должность:</div>
                    <div class="position">${id.position_name}</div>
                </div>
                <div class="popup__department popup__group">
                    <div class="title_department title">Подразделение:</div>
                    <div class="department">${id.department}</div>
                </div>
                <div class="popup__info">
                    <div class="title__info title">Дополнительная информация:</div>
                    <div class="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt natus dolore repellat consequatur, doloribus tempora cupiditate qui, repellendus eum perferendis dolorum.</div>
                </div>
            </div>
        </div>
    `
}

function close () {
    popup.classList.remove('popup')
    return popup.innerHTML = ''
}


container.addEventListener('click', el => {
    const target = el.target.closest('.card')
    const email = target.dataset.email
    if(target.className !== 'card') return 
    if(target.dataset == null) return 
    
    const foundUser = usersList.find(user => user.email === email)

    open(foundUser)
     
})

popup.addEventListener('click', (el) => {
    const target = el.target.closest('.close')
    target ? close() : null
    
})
popup.addEventListener('click', (el) => {
    const target = el.target.closest('.popup__container')
    !target ? close() : null
    
})

