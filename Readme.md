# zipcode-to-timzone

## Installation

```
npm install --save zipcode-to-timzone
```

## Usage

```
var zipcode_to_timezone = require( 'zipcode-to-timzone' );

var tz = zipcode_to_timezone.lookup( '94110' );
console.log( tz ); // PDT
```
## Other info

This project uses the timezone list found here:

```
https://gist.githubusercontent.com/anonymous/4e04970131ca82945080/raw/e85876daf39a823e54d17a79258b170d0a33dac0/timezones_to_zipcodes_short.yml
```

See `scripts/generate_database.js` on how the `zipcodes.json` is generated.
