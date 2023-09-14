var fs = require('fs');
var url = require('url');
var http = require('http');
var crypto = require('crypto');

function requestHandler(request, response) {
    var uriData = url.parse(request.url);
    var pathname = uriData.pathname;
    
    if (pathname.startsWith('/room')) {
        var urlPath = pathname.split('/')[1]; // Get the part after the first /
        var roomNumber = urlPath.match(/^room(\d+)/)[1]; // Extract the room number using a regular expression
        console.log('Room Number:', roomNumber); // This will output '2'
        
        var espVersion;
        if (request.headers['x-esp8266-version']) {
            espVersion = request.headers['x-esp8266-version'];
        } else if (request.headers['x-esp32-version']) {
            espVersion = request.headers['x-esp32-version'];
        } else {
            response.statusCode = 400; // Bad Request
            response.end("Invalid request");
            return;
        }
        
        console.log('Client ESP Room', roomNumber, 'Version:', espVersion);
        
        var latestFirmwareVersion = getLatestFirmwareVersion(roomNumber);

        console.log('Latest Firmware Version:', latestFirmwareVersion);

        if (!latestFirmwareVersion) {
            response.statusCode = 404; // Not Found
            response.end("Room not found");
            return;
        }
        
        if (compareVersions(espVersion, latestFirmwareVersion) < 0) {
            console.log('Send firmware', latestFirmwareVersion, 'to client');
            
            var firmwareFilePath = `./room${roomNumber}/room${roomNumber}-firmware-${latestFirmwareVersion}.bin`;
            
            fs.readFile(firmwareFilePath, function(error, content) {
                if (error) {
                    response.statusCode = 500; // Internal Server Error
                    response.end("Error reading firmware file");
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'binary/octet-stream',
                        'Content-Length': Buffer.byteLength(content),
                        'x-MD5': crypto.createHash('md5').update(content).digest("hex")
                    });
                    response.end(content);
                    console.log('Client Update To Firmware Version', latestFirmwareVersion);
                }
            });
        } else {
            response.statusCode = 304; // Not Modified
            response.end();
            console.log('No Updates');
        }
    }
}

function getLatestFirmwareVersion(roomNumber) {
    var latestVersion = null;
    var files = fs.readdirSync(`./room${roomNumber}/`);
    
    files.forEach(function(file) {
        if (file.startsWith(`room${roomNumber}-firmware-`) && file.endsWith('.bin')) {
            var version = file.match(new RegExp(`room${roomNumber}-firmware-(\\d+\\.\\d+)\\.bin`));
            if (version) {
                var firmwareVersion = version[1];
                if (!latestVersion || compareVersions(firmwareVersion, latestVersion) > 0) {
                    latestVersion = firmwareVersion;
                }
            }
        }
    });
    
    return latestVersion;
}

function compareVersions(a, b) {
    // Hàm so sánh phiên bản, trả về:
    // 0 nếu a và b bằng nhau
    // < 0 nếu a nhỏ hơn b
    // > 0 nếu a lớn hơn b
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

var server = http.createServer(requestHandler);
server.listen(3000);
console.log('Server listening on port 3000');
