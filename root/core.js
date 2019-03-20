
function setTitle(text) {
    var host = window.location.hostname;
    var prefix = "";
    if (host.includes("hasol.co")) {
        prefix = "hasol.co ";
    } else if (host.includes("ddns.net")) {
        prefix = "him-NYIT ";
    }
    document.title = prefix + text;
}

function setProtocol(proto) {
    if (window.location.protocol != proto) {
        window.location.protocol = proto;
    }
}