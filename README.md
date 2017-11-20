ProximityHash: Geohashes in Proximity (with the option of compression using Georaptor)
=======================================================================================

Geohash is a geocoding system invented by Gustavo Niemeyer and placed into the public domain. It is a hierarchical
spatial data structure which subdivides space into buckets of grid shape, which is one of the many applications of
what is known as a Z-order curve, and generally space-filling curves.

ProximityHash generates a set of geohashes that cover a circular area, given the center coordinates and the radius.
It also has an additional option to use **GeoRaptor** that creates the best combination of geohashes across various
levels to represent the circle, starting from the highest level and iterating till the optimal blend is brewed. Result
accuracy remains the same as that of the starting geohash level, but data size reduces considerably, thereby improving
speed and performance.

## Credits

    https://github.com/ashwin711/proximityhash


## Installation

```bash
npm install proximityhash
```


### API


```js
var proximityhash = require('proximityhash');

var options = {
    latitude : 12.918126, //required
    longitude : 77.630239,//required
    radius : 2000,// in mts, required
    precision : 7,// geohash precision level , required
    georaptorFlag : true,  //set true to compress hashes using georaptor
    minlevel : 1, // minimum geohash level, default value: 1
    maxlevel : 12, // maximum geohash level, default value: 12
    approxHashCount : true // set to true to round off if the hashes count is greater than 27
}

let geohashes = proximityhash.createGeohashes(options);

```





