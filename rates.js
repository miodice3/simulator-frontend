class Rates {

    static rateReturn(hour){
        let rate;
        switch (hour) {
            case (x < 9):
                rate = .08;
                return rate
            case (x < 14):
                rate = .13;
                return rate
            case (x < 18):
                rate = .18;
                return rate
            case (x < 21):
                rate = .13;
                return rate
            case (x < 24);
                rate = .08;
                return rate
        }
    }

    static costCalcAsync(){


        let action = fetch('http://localhost:3000/appliances')
        .then(function(obj){
            return obj.json()
        })
        .then(function(appliancesArray){
            let sumTotal = 0.00;

            appliancesArray.forEach(function(appliance){

                appliance.schedules.forEach(function(schedule){
                    
                    if (schedule.day == "Weekday"){

                                let i = 0
                                let start = schedule.time_on.split(":")[0]
                                let end = schedule.time_off.split(":")[0]

                                    while (i < 24){
                                        if (i >= start && i <= end){
                                            sumTotal += (appliance.wattage/1000)*20*Rates.rateReturn(i).toFixed(2)
                                            }
                                        i += 1;
                                    }
                            } else if (schedule.day == "Weekend"){

                                let i = 0
                                let start = schedule.time_on.split(":")[0]
                                let end = schedule.time_off.split(":")[0]

                                    while (i < 24){
                                        if (i >= start && i <= end){
                                            sumTotal += (appliance.wattage/1000)*8*Rates.rateReturn(i).toFixed(2)
                                            }
                                        i += 1;
                                    }
                            }





                })
            })
            return sumTotal

        })
        return action
        // console.log(action)
        // console.log(sumTotal)
        // return sumTotal.toFixed(2)
    }

}