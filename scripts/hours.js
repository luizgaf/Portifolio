function getGmtTime(i){
    let now = new Date();

    let gmtTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    gmtTime.setHours(gmtTime.getHours() + i);

    let hours = String(gmtTime.getHours()).padStart(2, '0');
    let minutes = String(gmtTime.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}:`;
}

function getseconds(i){
    let now = new Date();
    let gmtTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    gmtTime.setHours(gmtTime.getHours() + i);

    let seconds = String(gmtTime.getSeconds()).padStart(2, '0'); 
    return `${seconds}`;
}

function loop(i, idname) {
    gmtTime(i, idname);  
    setInterval(() => gmtTime(i, idname), 1000);  
}

function gmtTime(i, idname) {
    document.getElementById(idname).innerHTML = getGmtTime(i); 
    let secondsElements = document.getElementsByClassName("seconds");
    
    for (let element of secondsElements) {
        element.innerHTML = getseconds(i);  
    } 
}