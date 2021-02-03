class scheduleAdapter{

    static addScheduleAdapter(e){
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
            .then(function(){
                fetchAppliances()
                total.hidden = ""
                minTotal.hidden = ""
                savingsTotal.hidden = ""
                savingsTotalAnnual.hidden = ""
            })
    }

    static updateSliderLeftAdapter(e){
        fetch(`http://localhost:3000/schedules/${e.target.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: e.target.dataset.id,
                time_on: e.target.value,
                left_right: e.target.className
            })
            })
            .then(function(){
                fetchAppliances()
                total.hidden = ""
                minTotal.hidden = ""
                savingsTotal.hidden = ""
                savingsTotalAnnual.hidden = ""
            })
    }

    static updateSliderRightAdapter(e){
        fetch(`http://localhost:3000/schedules/${e.target.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: e.target.dataset.id,
                time_off: e.target.value,
                left_right: e.target.className
            })
            })
            .then(function(){
                fetchAppliances()
                total.hidden = ""
                minTotal.hidden = ""
                savingsTotal.hidden = ""
                savingsTotalAnnual.hidden = ""
            })
    }

    static deleteScheduleAdapter(e){

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

}