"use strict";

const geohash = require('ngeohash');
const georaptor = require('georaptor');

function inCircleCheck(latitude, longitude, centre_lat, centre_lon, radius) {
    let x_diff = longitude - centre_lon;
    let y_diff = latitude - centre_lat;

    return Math.pow(x_diff, 2) + Math.pow(y_diff, 2) <= Math.pow(radius, 2);

}


function getCentroid(latitude, longitude, height, width) {

    let y_cen = latitude + (height / 2);
    let x_cen = longitude + (width / 2);

    return [x_cen, y_cen];
}


function convertToLatlon(y, x, latitude, longitude) {

    let pi = 3.14159265359;
    let r_earth = 6371000;

    let lat_diff = (y / r_earth) * (180 / pi);
    let lon_diff = (x / r_earth) * (180 / pi) / Math.cos(latitude * pi / 180);

    let final_lat = latitude + lat_diff;
    let final_lon = longitude + lon_diff;

    return [final_lat, final_lon];
}

exports.createGeohashes = function (options) {
    let latitude = options.latitude;
    let longitude = options.longitude;
    let radius = options.radius;
    let precision = options.precision;
    let georaptorFlag = options.georaptorFlag ? options.georaptorFlag: false;
    let minlevel = options.minlevel ? options.minlevel: 1;
    let maxlevel = options.maxlevel ? options.maxlevel: 12;
    let approxHashCount = options.approxHashCount ? options.approxHashCount: false; 

    let x = 0.0;
    let y = 0.0;
    let points = [];

    let grid_width = [5009400.0, 1252300.0, 156500.0, 39100.0, 4900.0, 1200.0, 152.9, 38.2, 4.8, 1.2, 0.149, 0.0370];
    let grid_height = [4992600.0, 624100.0, 156000.0, 19500.0, 4900.0, 609.4, 152.4, 19.0, 4.8, 0.595, 0.149, 0.0199];

    let height = (grid_height[precision - 1]) / 2;
    let width = (grid_width[precision - 1]) / 2;

    let lat_moves = parseInt(Math.ceil(radius / height));
    let lon_moves = parseInt(Math.ceil(radius / width));

    for (let i = 0; i < lat_moves; i++) {
        let temp_lat = y + height * i;

        for (let j = 0; j < lon_moves; j++) {
            let temp_lon = x + width * j;

            if (inCircleCheck(temp_lat, temp_lon, y, x, radius)) {
                let centr = getCentroid(temp_lat, temp_lon, height, width);

                points.push(convertToLatlon(centr[1], centr[0], latitude, longitude));
                points.push(convertToLatlon(-centr[1], centr[0], latitude, longitude));
                points.push(convertToLatlon(centr[1], -centr[0], latitude, longitude));
                points.push(convertToLatlon(-centr[1], -centr[0], latitude, longitude));
            }
        }

    }

    
    let finalHashes = points.reduce((acc, present, index) => {
        acc.push(geohash.encode(present[0], present[1], precision));
        return acc;
    }, []);

    if(georaptorFlag && georaptorFlag == true){
        return georaptor.compress(new Set(finalHashes),parseInt(minlevel), parseInt(maxlevel),approxHashCount);
    }
    else {
        return finalHashes;
    }

};


