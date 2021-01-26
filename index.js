let applianceContainer = document.getElementById("appliance-container")


let createAppliance = document.getElementById("create-appliance")

createAppliance.addEventListener("click", addAppliance)

function addAppliance(e){
    e.preventDefault()
    let applianceName = document.getElementById("fname").value
    console.log(applianceName)
    // debugger
}

function fetchAppliances(){
    fetch('http://localhost:3000/appliances')
    .then(resp=> resp.json)
    .then(json=> renderAppliances(json))
}

function renderAppliances(appliances){
    appliances.forEach(appliance => {
        appliances.innerHTML += `<li>${appliance.name}</li>`
    })
}

