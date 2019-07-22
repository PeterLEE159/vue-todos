export default function (json = null) {

    this.username = undefined;
    this.email = undefined;
    this.imageUrl = undefined;

    if(json == null) return;

    for(let key in json) {
        this[key] = json[key];
    }
    
};