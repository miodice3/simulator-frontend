class Rates {

    static rateReturn(hour){
        let rate;
        if (hour < 9){
            rate = .08
        } else if (hour < 14){
            rate = .13
        } else if (hour < 18){
            rate = .18
        } else if (hour < 21){
            rate = .13
        } else if (hour < 24){
            rate = .08
        }
        return rate
    }

    static minReturn(hour){
        return .08
    }

    static costCalcAsync(){
        let action = fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            let sumHash = {actual: 0.00, min: 0.00}
            appliancesArray.forEach(function(appliance){

                appliance.schedules.forEach(function(schedule){
                    
                    if (schedule.day == "Weekday"){

                                let i = 0
                                let start = schedule.time_on.split(":")[0]
                                let end = schedule.time_off.split(":")[0]

                                    while (i < 24){
                                        if (i >= start && i <= end){
                                            sumHash["actual"] += (appliance.wattage/1000)*20*Rates.rateReturn(i)
                                            sumHash["min"] += (appliance.wattage/1000)*20*Rates.minReturn(i)
                                            }
                                        i += 1;
                                    }
                            } else if (schedule.day == "Weekend"){

                                let i = 0
                                let start = schedule.time_on.split(":")[0]
                                let end = schedule.time_off.split(":")[0]

                                    while (i < 24){
                                        if (i >= start && i <= end){
                                            sumHash["actual"] += (appliance.wattage/1000)*8*Rates.rateReturn(i)
                                            sumHash["min"] += (appliance.wattage/1000)*8*Rates.minReturn(i)
                                            }
                                        i += 1;
                                    }
                            }

                })
            })
            sumHash["savings"] = (sumHash["actual"]-sumHash["min"])
            sumHash["savingsAnnual"] = sumHash["savings"]*12
            return sumHash

        })
        return action
    }


    static costDifferenceWeekday(on, off, wattage) {
        let sumHash = {actual: 0.00, min: 0.00}

        let i = 0
                while (i < 24){
                    if (i >= on && i <= off){
                        sumHash["actual"] += (wattage/1000)*20*Rates.rateReturn(i)
                        sumHash["min"] += (wattage/1000)*20*Rates.minReturn(i)
                        }
                    i += 1;
                }

        sumHash["savings"] = sumHash["actual"]-sumHash["min"]
        return sumHash
    }

    static costDifferenceWeekend(on, off, wattage) {
        let sumHash = {actual: 0.00, min: 0.00}

        let i = 0
                while (i < 24){
                    if (i >= on && i <= off){
                        sumHash["actual"] += (wattage/1000)*8*Rates.rateReturn(i)
                        sumHash["min"] += (wattage/1000)*8*Rates.minReturn(i)
                        }
                    i += 1;
                }

        sumHash["savings"] = sumHash["actual"]-sumHash["min"]
        return sumHash
    }

}