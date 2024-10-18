function getGmtTime(i){
    let now = new Date();

    let gmtTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    gmtTime.setHours(gmtTime.getHours() + i);

    let hours = String(gmtTime.getHours()).padStart(2, '0');
    let minutes = String(gmtTime.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

function loop(i, idname) {
    gmtTime(i, idname);  
    setInterval(() => gmtTime(i, idname), 10);  
}

function gmtTime(i, idname) {
    document.getElementById(idname).innerHTML = getGmtTime(i);    
}