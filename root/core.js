
const Core = Object.freeze({
    
    
    Window: Object.freeze({
        
        setTitle(text) {
            var host = location.hostname;
            var prefix = '';
            if (host.includes('localhost')) {
                prefix = 'localhost';
            } else if (host.includes('hasol.co')) {
                prefix = 'hasol.co';
            } else if (host.includes('ddns.net')) {
                prefix = 'him-NYIT';
            } else {
                prefix = 'him';
            }
            document.title = prefix + ': ' + text;
        },
        
        setProtocol(proto, root) {
            if (root) {
                location.href = proto + '//' + location.hostname;
            } else if (location.protocol != proto) {
                location.protocol = proto;
            }
        },
        
        getSSLmode() {
            return location.protocol == 'https:';
        },
        
        setSSLindicator(item) {
            if (this.getSSLmode()) {
                item.classList.add('active');
                item.setAttribute('aria-pressed', true);
            }
        },
        
        toggleProtocol() {
            if (location.protocol == 'http:') {
                location.protocol = 'https:';
            } else if (location.protocol == 'https:') {
                location.protocol = 'http:';
            }
        },
        
        setHostname(name, root) {
            if (root) {
                location.href = location.protocol + '//' + name;
            } else if (location.hostname != name) {
                location.hostname = name;
            }
        },
        
        setFullScreen(state) {
            var current = document.fullscreen || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            if (state && !current) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            } else if (!state && current) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        },
        
        toggleFullscreen() {
            if (document.fullscreen || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            }
        },
        
        param: new URLSearchParams(location.search),
        
        getDarkMode() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        },
        
        getMediaColorSchemePreference() {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            } else if (window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
                return 'no-preference';
            } else {
                return '';
            }
        },
        
        setDarkIndicator(item) {
            if (this.getMediaColorSchemePreference() == 'dark' || document.body.classList.contains('dark')) {
                item.classList.add('active');
                item.setAttribute('aria-pressed', true);
            }
        },
        
        setDarkMode(mode) {
            if (mode == 'dark') {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            } else if (mode == 'light') {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.remove('light');
            }
        },
        
        toggleDarkMode() {
            if (document.body.classList.contains('light') || (!document.body.classList.contains('dark') && this.getMediaColorSchemePreference() != 'dark')) {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        },
        
    }),
    
    
    Math: Object.freeze({
        
        randomInt(min, max, inclusive) {
            if (max === undefined) {
                return Math.floor(Math.random() * min);
            } else {
                if (inclusive === true) {
                    max += 1;
                }
                return Math.floor(Math.random() * (max - min)) + min;
            }
        },
        
    }),
    
    
    Util: Object.freeze({
        
        arrayIndex (arr, item) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
        },
        
        objectIndex (obj, item) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                if (obj[keys[i]] === item) {
                    return keys[i];
                }
            }
        },
        
        strnatcasecmp (a, b) {
            return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
        },
        
        sortTable(elem) {
            if (elem.tagName != 'TH') {
                return; // stop if not head
            }
            var table = elem.parentElement.parentElement.parentElement;
            if (table.tagName != 'TABLE' || !table.classList.contains('sortable')) {
                return; // stop if not table or not sortable
            }
            var head = table.tHead.rows[0]; // get header
            var column = this.arrayIndex(elem.parentElement.cells, elem); // get column index
            if (elem.classList.contains('sorted')) {
                elem.classList.replace('asc', 'desc') || elem.classList.replace('desc', 'asc') || elem.classList.add('asc');
            } else {
                for (var i = 0; i < head.children.length; i++) {
                    head.children[i].classList.remove('sorted');
                }
                elem.classList.add('sorted');
            }
            var mode = elem.classList.contains('asc') ? 1 : elem.classList.contains('desc') ? -1 : 0;
            var sorter = function(a, b) {
                return mode * this.strnatcasecmp(a['data'], b['data']);
            };
            var getData = function(body) { // get index, html, sorting data of each row in tbody
                var arr = [];
                for (var i = 0; i < body.rows.length; i++) {
                    arr.push({'index': i, 'html': body.rows[i].innerHTML, 'data': body.rows[i].cells[column].dataset['sort']});
                }
                return arr;
            };
            for (var i = 0; i < table.tBodies.length; i++) {
                var data = getData(table.tBodies[i]);
                data.sort(sorter); // sort
                for (var j = 0; j < data.length; j++) { // replace table rows
                    table.tBodies[i].rows[j].innerHTML = data[j]['html'];
                }
            }
            return false;
        },
        
        makeSortable(elem, func) {
            if (elem.tagName != 'TABLE') {
                return; // stop if not table
            }
            if (func === undefined) {
                func = function(item) { // default function
                    return item.innerText;
                }
            }
            var head = elem.tHead.rows[0]; // get header
            for (var i = 0; i < head.cells.length; i++) {
                var cell = head.cells[i];
                cell.onclick = function(event) { // add click event
                    this.sortTable(this);
                }
                cell.classList.add('asc');
                var create = true;
                for (var j = 0; create && j < cell.children.length; j++) { // detect presence of sort indicator.
                    if (cell.children[j].tagName == 'I' && cell.children[j].classList.contains('sort')) {
                        create = false;
                    }
                }
                if (create) { // add sort indicator
                    cell
                    var up = document.createElement('i');
                    var down = document.createElement('i');
                    up.classList.add('sort', 'fa', 'fa-sort-up');
                    down.classList.add('sort', 'fa', 'fa-sort-down');
                    cell.append(' ', up, down);
                }
            }
            for (var i = 0; i < elem.tBodies.length; i++) { // set sorting tag data
                for (var j = 0; j < elem.tBodies[i].rows.length; j++) {
                    for (var k = 0; k < elem.tBodies[i].rows[j].cells.length; k++) {
                        var cell = elem.tBodies[i].rows[j].cells[k];
                        cell.dataset['sort'] = func(cell);
                    }
                }
            }
            elem.classList.add('sortable');
        },
        
    }),
    
    
    Script: {},
    
    //Local: {},
    
    //Data: {},
    
});


/*
const Super = class {};
const Super = function() {};
class Super {
    static #Sub = class {
    };
    static get Sub() {
        return Super.#Sub;
    }
}
const Super = Object.freeze({Sub: class{},});
Object.defineProperties(Super, {Sub: {value: class{}, writable: false, enumerable: false, configurable: false}, Subs: {value: function(){}}});
*/