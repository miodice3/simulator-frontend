class applianceAdapter{

    static addApplianceAdapter(e){
        let appliance
        
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

        //clear form inputs
        document.getElementById("aname").value = "" 
        document.getElementById("awattage").value = ""
    }

    static totalWattages(){
        fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            sumWattages.innerHTML = appliancesArray.reduce(function(total, element){
                return element.wattage + total}, 0)
        })   
    }

    static searchAppliances(e){
        let applianceName = document.getElementById("searchName").value
        fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            console.log(appliancesArray)
            if (appliancesArray.find(function(appliance){ return appliance.name === applianceName})){
            foundAppliance.innerHTML = appliancesArray.find(function(appliance){ return appliance.name === applianceName}).name
            } else {
                foundAppliance.innerHTML = "no matches found"
            }
        })
    }

    static fetchAppliancesAdapter(){
        // console.log("Inside Fetch Appliance Adapter")
        fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            // console.log(appliancesArray)
            let returnArray = appliancesArray.sort(function(a, b){
                return b.wattage - a.wattage;
            })
            console.log(returnArray)
            appliancesArray.forEach(function(appliance){
    
                appliance.schedules.sort(function(a, b){
                    return a.id - b.id;
                })
                applianceContainer.innerHTML += `
                <div class="appliance" id=appliance-${appliance.id}>
                <p>${appliance.name} - ${appliance.wattage}w - <a id="delete-appliance" data-id=${appliance.id} href="">Remove Appliance</a></p>
                <ul>
                    ${
                        appliance.schedules
                            .map(function(schedule){
                                let savings = 0;
                                let start = schedule.time_on.split(":")[0]
                                let end = schedule.time_off.split(":")[0]
                                if (schedule.day == "Weekday") {
                                    savings = Rates.costDifferenceWeekday(start, end, appliance.wattage).savings.toFixed(2)
                                } else if (schedule.day == "Weekend"){
                                    savings = Rates.costDifferenceWeekend(start, end, appliance.wattage).savings.toFixed(2)
                                }
                                return `<li class="slider">${schedule.day} - on: ${schedule.time_on} off:  - ${schedule.time_off} -Savings: $${savings}  - <a id="delete-schedule" data-id=${schedule.id} href="">delete schedule</a></li>
                            <li><input data-id=${schedule.id} class="slider-left" type="range" id="input-left-${schedule.id}" min="0" max="23" value="${start}">
                            <input data-id=${schedule.id} class="slider-right" type="range" id="input-right-${schedule.id}" min="0" max="23" value="${end}">
                            </li>`
                            })
                            .join('')
                    }
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

    }

    static deleteApplianceAdapter(e){
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