// ==UserScript==
// @name     Tripadvisor KML Export
// @version  1
// @grant    GM.xmlHttpRequest
// @grant    GM.notification
// @match    https://www.tripadvisor.ru/Trips/*
// ==/UserScript==

var TripadvisorKmlExport = {};

TripadvisorKmlExport.loadData = function (url, callback) {
    GM.xmlHttpRequest({
        method: 'GET',
        url: url.replace('/Trips/', '/data/1.0/trips/list/'),
        onload: function(response) {
            callback(JSON.parse(response.responseText));
        }
    });
}

TripadvisorKmlExport.toKml = function (data) {
    var kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '<Document>\n';
  
    for (var i = 0; i < data.nodes.length; ++i) {
        var place = data.nodes[i].content;

        kml += '    <Placemark>\n';
        kml += '        <name><![CDATA[' + place.name + ']]></name>\n';
        kml += '        <description>\n';
        kml += '            <![CDATA[\n';
        kml += '                <p><b>Адрес: </b>' + place.address + '</p>\n';
        
        if (place.website) {
            kml += '                <p><b>Сайт: </b><a href="' + place.website + '">' + place.website + '</a></p>\n';
        }

        kml += '            ]]>\n';
        kml += '        </description>\n';
        kml += '        <Point>\n';
        kml += '            <coordinates>' + place.longitude + ',' + place.latitude + ',0</coordinates>\n'
        kml += '        </Point>\n';
        kml += '    </Placemark>\n';
    }
  
    kml += '</Document>\n';
    kml += '</kml>\n';
    return kml;
}

TripadvisorKmlExport.download_link = function (content) {
    var data = new Blob([content], {name: 'map.kml', type: 'application/octet-stream'});
    var file = window.URL.createObjectURL(data);
    return file;
}

TripadvisorKmlExport.init = function (navbar) {
    var btn = document.createElement('a');
    btn.classList.add('fJfzr');
    btn.classList.add('R4');
    btn.classList.add('_S');
    btn.classList.add('V');
    btn.setAttribute('target', '_parent')
    btn.setAttribute('download', 'map.kml')
  	btn.setAttribute('style', 'margin-left: 10px')
    btn.textContent = 'Скачать KML ';

    TripadvisorKmlExport.loadData(window.location.href, function (data) {
        btn.href = TripadvisorKmlExport.download_link(TripadvisorKmlExport.toKml(data));
    });
    
    navbar.appendChild(btn);
}

TripadvisorKmlExport.check = function (interval) {
    var node = document.querySelector('.dqqbB'),
        gmap = document.querySelector('.gm-style');

    if (node && gmap) {
        clearInterval(interval);
        TripadvisorKmlExport.init(node);
    }
}

var TripadvisorKmlExport_loaded = setInterval(function () { TripadvisorKmlExport.check(TripadvisorKmlExport_loaded); }, 1);
