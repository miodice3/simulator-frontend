let appliance = document.querySelector(".appliances")

function fetchAppliances(){
    fetch('http://localhost:3000/appliances')
    .then(resp=> resp.json)
    .then(json=> renderAppliances(json))
}

function renderAppliances(appliances){
    appliances.forEach(appliance => {
        appliances.innerHTML += `<li>${appliances.name}</li>`
    })
}

