export default function (json = null) {

    this.content = undefined;
    this.date = undefined;
    this.priority = undefined;
    this.progress = undefined;
    this.searchTerm = undefined;
    this.key = undefined;
    
    if(json == null) return;
    


    for(let key in json) {
        this[key] = json[key];
    }
    
};