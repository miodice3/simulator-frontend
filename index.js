let applianceContainer = document.getElementById("appliance-container")
let applianceCreationContainer = document.getElementById("appliance-creation-container")
let createAppliance = document.getElementById("create-appliance")
let total = document.getElementById("sum-total")


let createSchedule = document.getElementById("appliance-container")

applianceContainer.addEventListener("click", addSchedule)

function updateTotal() {
    Rates.costCalcAsync()
    .then(function(sum) {
        total.innerText = `$${sum.toFixed(2)}`
    })
}

function addSchedule(e){
    e.preventDefault()
    if (e.target.id === "create-schedule") {
        let example = e.target.dataset.id
        document.querySelector(`#form-${example}`).hidden = ""
    }

    if (e.target.id === "add-schedule"){
        let temp = "form-" + e.target.dataset.id

        fetch("http://localhost:3000/schedules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                appliance_id: e.target.dataset.id,
                day: document.querySelector(`#${temp}`).day.value,
                time_on: document.querySelector(`#${temp}`).timeon.value,
                time_off: document.querySelector(`#${temp}`).timeoff.value,
            })
            })
            fetchAppliances()
    }

    if (e.target.id === "delete-schedule") {
        console.log("you tried to remove schedule instance: ", e.target.dataset.id)
        fetch(`http://localhost:3000/schedules/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: e.target.dataset.id,
            })
            })
            .then(function(){
                fetchAppliances()
            })
            
    }

    if (e.target.id === "delete-appliance") {
        console.log("you tried to remove schedule instance: ", e.target.dataset.id)
        fetch(`http://localhost:3000/appliances/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: e.target.dataset.id,
            })
            })
            .then(function(){
                fetchAppliances()
            })
    }


}

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
    //is this where Rates.costCalcAsync() should be integrated to to avoid dble calling API?
    .then(function(appliancesArray){
        appliancesArray.forEach(function(appliance){
            applianceContainer.innerHTML += `
            <div id=appliance-${appliance.id}>
            <p>${appliance.name} - ${appliance.wattage}w - <a id="delete-appliance" data-id=${appliance.id} href="">Remove Appliance</a></p>
            <ul>
                ${appliance.schedules.map(function(schedule){
                    return `<li>${schedule.day} - on: ${schedule.time_on} off:  - ${schedule.time_off} - <a id="delete-schedule" data-id=${schedule.id} href="">Remove Schedule</a></li>`}).join('')}
            </ul>

            <input id=create-schedule data-id=${appliance.id} type="submit" value="create new schedule">
            <br>

            <form hidden id=form-${appliance.id}>
                <label for="day">Select Type:</label>
                <input type="hidden" id="appliance_id" name="appliance_id" value="${appliance.id}">
                <select name="day" id="day">
                <option value="Weekday">Weekday</option>
                <option value="Weekend">Weekend</option>
                </select><br>
                <label for="timeon">Time On (24hr format):</label><br>
                <input type="text" id="timeon" name="timeon"><br>
                <label for="timeoff">Time Off (24hr format):</label><br>
                <input type="text" id="timeoff" name="timeoff"><br>
                <input id=add-schedule data-id=${appliance.id} type="submit" value="Submit">
            </form>

            </div>
            `
        })
    })
    updateTotal()
}

// function costCalc(){
//     // return Rates.testMethod()
//     // return Rates.calculated(wattage, hour)
// }
