let applianceContainer = document.getElementById("appliance-container")


let createAppliance = document.getElementById("create-appliance")

createAppliance.addEventListener("click", addAppliance)

let allApps = document.getElementById("allapps")
allApps.addEventListener("click", listAppliances)

function listAppliances(e){
    e.preventDefault()
    fetchAppliances()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let appliance
function addAppliance(e){
    e.preventDefault()
    let applianceName = document.getElementById("aname").value
    let applianceWattage = document.getElementById("awattage").value

        fetch("http://localhost:3000/appliances", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: applianceName,
            wattage: applianceWattage
        })
        })
        .then(resp=> resp.json())
        .then(function(json){
            appliance = new Appliance(json.id, json.name)
            console.log(appliance)
        })
}

function fetchAppliances(){
    // applianceContainer.innerHTML = '';
    removeAllChildNodes(applianceContainer);
    fetch('http://localhost:3000/appliances')
    .then(function(obj){
        return obj.json()
    })
    .then(function(appliancesArray){
        appliancesArray.forEach(function(appliance){
            let divCard = document.createElement('div')
            divCard.setAttribute('id', `appliance-${appliance.id}`)
            divCard.setAttribute('data-id', `${appliance.id}`)
            let ul = document.createElement('ul')
            let li = document.createElement('li')
            let name = document.createElement('p')
            // let wattage = document.createElement('p')
            name.innerText = appliance.name
            // wattage.innerText = appliance.wattage
            divCard.appendChild(name)
            // divCard.appendChild(name, wattage) 
            applianceContainer.appendChild(divCard)
        })
    })
}

// function fetchAppliances(){
//     fetch('http://localhost:3000/appliances')
//     .then(resp=> resp.json())
//     .then(json=> renderAppliances(json))
// }

// function renderAppliances(appliances){
//     applianceContainer.children = ""

//     appliances.forEach(appliance => {
//         appliance = new Appliance(appliance.id, appliance.name)
  
//         let test = document.createElement('LI')
//         test.className = "formatted"
//         test.innerHTML=`${appliance.name}`
//         applianceContainer.appendChild(test)
//     })
// }

