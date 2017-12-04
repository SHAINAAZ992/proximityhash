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


*hash count when georaptorFlag set to false :* 2264 geohashes at precision 7 for Bangalore.

*hash count when georaptorFlag set to true and approxHashCount set to false :* 271 geohashes with a mix of precision 6 and 7.

*hash count when georaptorFlag set to true and approxHashCount set to true :* 103 geohashes with a mix of precision 6 and 7.


## Image without georaptor compression :

 ![proximity1](https://user-images.githubusercontent.com/16045606/33555955-4d567c40-d928-11e7-91bf-e8edb0e581ac.png)

## Image with georaptor compression (no hash approximation) :

 ![screen shot 2017-12-04 at 7 39 45 pm](https://user-images.githubusercontent.com/16045606/33556732-f406252a-d92a-11e7-9f09-1120b82d7317.png)


## Image with georaptor compression and hash approximation :

  ![screen shot 2017-12-04 at 7 19 41 pm](https://user-images.githubusercontent.com/16045606/33555977-6a14f5dc-d928-11e7-9af1-4bc671422cb5.png)



