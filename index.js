/**
 * @file index.js
 *
 * @description Uses zipcodes.json to lookup the timezone for the given zipcode
 *
 * Copyright (C) 2016 Dor Technologies
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

var zipcode_database = require( './zipcodes.json' );

/**
 * Looks up zipcode in zipcode.json
 * @param  {String} zipcode The zipcdoe to lookup, as a String
 * @return {String|null}         Return short name (EDT) for the zipcode, null if not found
 */
 exports.lookup = function( zipcode ) {
     if( zipcode_database.hasOwnProperty( zipcode ) ) {
         return zipcode_database[ zipcode ];
     } else {
         return null;
     }
 };
