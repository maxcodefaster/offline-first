import * as nano from 'nano';
export const db: any = nano({
    url: 'http://' + process.env.COUCHDB_ADMIN + ':' + process.env.COUCHDB_PW + '@' + process.env.COUCHDB_HOST
});

export const loginHandler = (userDoc, provider) => {

    db.create('admin-database', function (err, data) {
        (err) ? console.log('admin-database: ' + err.reason) : console.log('admin database created');
    });
    db.create('user-resources', function (err, data) {
        (err) ? console.log('user-resources: ' + err.reason) : console.log('user-resources database created');
    });
    db.create('_replicator', function (err, data) {
        (err) ? console.log('_replicator: ' + err.reason) : console.log('_replicator database created');
    });

}
