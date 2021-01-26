class Appliance{
    constructor(name, status, url_on, url_off, created_at, updated_at){
    this.name = name;
    this.status = status;
    this.url_on = url_on;
    this.url_off = url_off;
    this.created_at = created_at;
    this.updated_at = updated_at
    }

    test(){
        console.log("if you can see this, appliance class is working")
    }
}