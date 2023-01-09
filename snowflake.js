var snowflake = require('snowflake-sdk');

var connection = snowflake.createConnection({
    account: 'ssq.canada-central.azure',
    username: 'alexandre.maltais@lacapitale.com',
    authenticator: 'externalbrowser'
  });

connection.connectAsync(function(err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected as id: ' + connection.getId());
    }
}).then(() => {    
    connection.execute({
    sqlText: 'select PRODC_NUMBR from M_ASSURANCE_INDIVIDUELLE.ACCES_BII_DATM.PRODC;',
    complete: function(err, stmt, rows) {
    if (err) {
        console.error('Failed to execute statement due to the following error: ' + err.message);
    } else {
        console.log('Number of rows produced: ' + rows.length);
    }
    }
    });    
});


