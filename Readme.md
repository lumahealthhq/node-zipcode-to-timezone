# zipcode-to-timzone

## Installation

```
npm install --save node-zipcode-to-timezone
```

## Usage

```
var zipcode_to_timezone = require( 'zipcode-to-timzone' );

var tz = zipcode_to_timezone.lookup( '94110' );
console.log( tz ); // America/Los_Angeles
```
## Other info

This project uses the timezone list found here:

```
https://sourceforge.net/projects/zip2timezone/files/
```
