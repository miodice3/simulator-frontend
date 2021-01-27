let applianceContainer = document.getElementById("appliance-container")
let applianceCreationContainer = document.getElementById("appliance-creation-container")

let createAppliance = document.getElementById("create-appliance")

createAppliance.addEventListener("click", addAppliance)

let allApps = document.getElementById("allapps")
allApps.addEventListener("click", listAppliances)

function listAppliances(e){
    e.preventDefault()
    fetchAppliances()
}

let createApp = document.getElementById("createapp")
createApp.addEventListener("click", unhideNewAppForm)

function unhideNewAppForm(e){
    e.preventDefault()
    hideAll()
    applianceCreationContainer.hidden = ""
}

function hideAll(){
    applianceCreationContainer.hidden = "hidden"
    applianceContainer.hidden = "hidden"
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
            appliance = new Appliance(json.id, json.name, json.wattage)
            console.log(appliance)
        })
        document.getElementById("aname").value = ""
        document.getElementById("awattage").value = ""
}

function fetchAppliances(){
    hideAll()
    applianceContainer.hidden = ""
    removeAllChildNodes(applianceContainer);
    fetch('http://localhost:3000/appliances')
    .then(function(obj){
        return obj.json()
    })
    .then(function(appliancesArray){
        appliancesArray.forEach(function(appliance){
            applianceContainer.innerHTML += `
            <div id=appliance-${appliance.id}>
            <p>${appliance.name} - ${appliance.wattage}</p>
            <ul>
                ${appliance.schedules.map(function(schedule){return `<li>${schedule.day}</li>`}).join('')}
            </ul>
            </div>
            `
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

