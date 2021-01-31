let applianceContainer = document.getElementById("appliance-container")
let applianceCreationContainer = document.getElementById("appliance-creation-container")
let createAppliance = document.getElementById("create-appliance")
let total = document.getElementById("sum-total")
let minTotal = document.getElementById("min-total")
let savingsTotal = document.getElementById("savings-total")
let savingsTotalAnnual = document.getElementById("savings-total-annual")
let createSchedule = document.getElementById("appliance-container")

applianceContainer.addEventListener("click", generalListen)
createAppliance.addEventListener("click", addAppliance)

let allApps = document.getElementById("allapps")
allApps.addEventListener("click", listAppliances)

let createApp = document.getElementById("createapp")
createApp.addEventListener("click", unhideNewAppForm)

function updateTotal() {
    Rates.costCalcAsync()
        .then(function(sum) {
            total.innerText = `Cost as Scheduled: $${sum["actual"].toFixed(2)} / mo`
            minTotal.innerText = `Cost if all off peak: $${sum["min"].toFixed(2)} / mo`
            savingsTotal.innerText = `Possible Savings: $${sum["savings"].toFixed(2)} / mo`
            savingsTotalAnnual.innerText = `Possible Savings: $${sum["savingsAnnual"].toFixed(2)} / year`
    }   )
}

function generalListen(e){
    e.preventDefault()

    if (e.target.id === "create-schedule") {
        let example = e.target.dataset.id
        document.querySelector(`#form-${example}`).hidden = ""
    }

    if (e.target.id === "add-schedule"){
        scheduleAdapter.addScheduleAdapter(e)
    }

    if (e.target.id === "delete-schedule") {
        scheduleAdapter.deleteScheduleAdapter(e)
    }

    if (e.target.id === "delete-appliance") {
        applianceAdapter.deleteApplianceAdapter(e)
    }

    if (e.target.className === 'slider-left') {
        scheduleAdapter.updateSliderLeftAdapter(e)    
        }

    if (e.target.className === 'slider-right') {
        scheduleAdapter.updateSliderRightAdapter(e)
        }
}

function listAppliances(e){
    e.preventDefault()
    fetchAppliances()
    total.hidden = ""
    minTotal.hidden = ""
    savingsTotal.hidden = ""
}

function unhideNewAppForm(e){
    e.preventDefault()
    hideAll()
    applianceCreationContainer.hidden = ""
}

function hideAll(){
    applianceCreationContainer.hidden = "hidden"
    applianceContainer.hidden = "hidden"
    total.hidden = "hidden"
    minTotal.hidden = "hidden"
    savingsTotal.hidden = "hidden"
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addAppliance(e){
    e.preventDefault()
    applianceAdapter.addApplianceAdapter(e)
}

function fetchAppliances(){
    hideAll()
    applianceContainer.hidden = ""
    removeAllChildNodes(applianceContainer);
    applianceAdapter.fetchAppliancesAdapter();
    updateTotal()
}