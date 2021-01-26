class Schedule{
    constructor(appliance_id, day, time_on, time_off, set_point, created_at, updated_at){
    this.appliance_id = appliance_id;
    this.day = day;
    this.time_on = time_on;
    this.time_off = time_off;
    this.set_point = set_point;
    this.created_at = created_at;
    this.updated_at = updated_at
    }

    test(){
        console.log("if you can see this, schedule class is working")
    }
}