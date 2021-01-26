let applianceContainer = document.getElementById("appliance-container")


let createAppliance = document.getElementById("create-appliance")

createAppliance.addEventListener("click", addAppliance)

let allApps = document.getElementById("allapps")
allApps.addEventListener("click", listAppliances)

function listAppliances(e){
    e.preventDefault()
    fetchAppliances()
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
    fetch('http://localhost:3000/appliances')
    .then(resp=> resp.json())
    .then(json=> renderAppliances(json))
}

function renderAppliances(appliances){
    
    appliances.forEach(appliance => {
        appliance = new Appliance(appliance.id, appliance.name)
        console.log(appliance.name)

        let test = document.createElement('LI')
        test.className = "formatted"
        test.innerHTML=`${appliance.name}`
        applianceContainer.appendChild(test)
    })
}

