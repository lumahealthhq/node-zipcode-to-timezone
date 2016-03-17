/**
 * @file generate_database.js
 *
 * @description Generates the zipcodes.json zipcode database, using the zipcode->tz
 *              list that can be found on this site: https://gist.githubusercontent.com/anonymous/4e04970131ca82945080/raw/e85876daf39a823e54d17a79258b170d0a33dac0/timezones_to_zipcodes_short.yml'
 *              Requires development dependencies
 *
 * Copyright (C) 2016 Dor Technologies
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

var fs = require( 'fs' );

var request = require( 'request' ),
    q = require( 'q' ),
    YAML = require( 'yamljs' ),
    _ = require( 'underscore' );

var zipfile_url = 'https://gist.githubusercontent.com/anonymous/4e04970131ca82945080/raw/e85876daf39a823e54d17a79258b170d0a33dac0/timezones_to_zipcodes_short.yml';
var database_file = 'zipcodes.json';

/**
 * Gets the zipcodes->tz data from remote server. Gist is stored here:
 * https://gist.githubusercontent.com/anonymous/4e04970131ca82945080/raw/e85876daf39a823e54d17a79258b170d0a33dac0/timezones_to_zipcodes_short.yml
 * for right now, other data sources should be useable as long as they are in the format:
 * {
 * 		"<zipcode_abbr>": [
 * 			"<zipcode>",
 * 			"94110",
 * 			...
 * 		],
 * 		"PST": [
 * 			 ...
 * 		],
 * 		...
 * }
 * @return {Promise} Downloads file from url, and converts to JSON
 */
var _getZipcodesList = function() {
    return q
        .Promise( function( resolve ) {
            request
                .get( zipfile_url, function( err, res ) {
                    // Some of the values in this yml file are randomly not quoted, so we loose the appending 0s, just add them back
                    res.body = res.body.replace( /-[^'](\d{5})[^']/g, '- \'$1\'\n' );
                    resolve( YAML.parse( res.body ) )
                } );
        } );
};

/**
 * Converts the downloaded zipcode data, do the database format we want, which is
 * {
 * 		"<zipcode>": "<tz abbr>",
 * 		"94110": "PST"
 * }
 * @param  {Object} data The data to convert and save
 */
var _convertAndSave = function( data ) {
    var converted_data = _
        .reduce( data, function( full, zipcodes, timezone ) {
            _
                .each( zipcodes, function( zipcode ) {
                    full[ zipcode ] = timezone;
                } );
            return full;
        }, {} );

    fs.writeFileSync( database_file, JSON.stringify( converted_data, null, 4 ) );
};

_getZipcodesList()
    .then( _convertAndSave )
    .then( function() {
        console.log( 'Completed database generation, saved to: ' + database_file );
    } )
    .catch( function( err ) {
        console.error( err );
        console.error( err.stack );
    } )
