class Rates {

    static rateReturn(hour){
        let rate;
        switch (hour) {
            case 0:    
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                rate = .08;
                return rate
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                rate = .13;
                return rate
            case 14:
            case 15:
            case 16:
            case 14:
            case 15:
            case 16:
            case 17:
                rate = .18;
                return rate
            case 18:
            case 19:
            case 20:
                rate = .13;
                return rate
            case 21:
            case 22:
            case 23:
                rate = .08;
                return rate
        }
    }

    static wattageInPriceOut(number){
        let cost = number*
        console.log("you are within js class")
    }

    static definition(){
        console.log("you are within js class")
    }

    static costCalc(){
        let scheduleInc = 0
        let sumTotal = 0;
        fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            appliancesArray.forEach(function(appliance){
                console.log("you are iterating over appliance: ", appliance.name)
                appliance.schedules.forEach(function(schedule){
                    //do a while loop here and iterate over each of the hours to check if sched is on off, * wattage by return from case, add to variable
                    let start = schedule.time_on.split(":")[0]
                    let end = schedule.time_off.split(":")[0]
                    scheduleInc += 1;
                })
            })
        })

    }
}