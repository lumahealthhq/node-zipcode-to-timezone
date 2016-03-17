var _ = require( 'underscore' ),
    assert = require( 'chai' ).assert;

var zipcode_to_timezone = require( '../' );

var test_zipcodes = {
    '21114': 'EDT',
    '94110': 'PDT',
    '06419': 'EDT',
    '93460': 'PDT',
    '00000': null
};

describe( 'zipcode_to_timezone.lookup', function() {
    _
        .each( test_zipcodes, function( tz, zipcode ) {
            it( zipcode + '->' + tz, function() {
                var found_tz = zipcode_to_timezone.lookup( zipcode );
                assert.equal( found_tz, tz );
            } );
        } );
} );
