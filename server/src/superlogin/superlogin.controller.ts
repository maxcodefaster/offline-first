import { Controller } from '@nestjs/common';
import * as Nano from 'nano';


@Controller('superlogin')
export class SuperloginController {


    // // Create admin-database & user-resources database
    nano.db.create('admin-database', function (err, data) {
        (err) ? console.log('admin-database: ' + err.reason) : console.log('admin database created');
    });
    nano.db.create('user-resources', function (err, data) {
        (err) ? console.log('user-resources: ' + err.reason) : console.log('user-resources database created');
    });
    nano.db.create('_replicator', function (err, data) {
        (err) ? console.log('_replicator: ' + err.reason) : console.log('_replicator database created');
    });

    // superlogin.on('signup', function (userDoc, provider) {
    //     console.log(JSON.stringify(userDoc));

    //     // opts for replication
    //     const opts = {
    //         continuous: true,
    //         create_target: true,
    //         // exclude design documents
    //         selector: {
    //             "_id": {
    //                 "$regex": "^(?!_design\/)",
    //             }
    //         }
    //     };

    //     // get private DB name
    //     const regex = /^private\$.+$/;
    //     let privateDB;
    //     for (let dbs in userDoc.personalDBs) {
    //         console.log(dbs)
    //         if (regex.test(dbs)) {
    //             privateDB = dbs;
    //         }
    //     }

    //     // Replicate design documents to private DB
    //     nano.db.replicate('user-resources', privateDB).then((body) => {
    //         return nano.db.replication.query(body.id);
    //     }).then((response) => {
    //         // console.log(response);
    //     }).catch((err) => {
    //         console.log(err);
    //     });

    //     if (userDoc.isAdmin) {
    //         // Replicate AdminDB to AdminUsers
    //         nano.db.replication.enable('admin-database', privateDB, opts).then((body) => {
    //             return nano.db.replication.query(body.id);
    //         }).then((response) => {
    //             // console.log(response);
    //         }).catch((err) => {
    //             console.log(err);
    //         });;
    //     } else {
    //         // Enable replication from userDB to adminDB
    //         nano.db.replication.enable(privateDB, 'admin-database', opts).then((body) => {
    //             return nano.db.replication.query(body.id);
    //         }).then((response) => {
    //             // console.log(response);
    //         }).catch((err) => {
    //             console.log(err);
    //         });;
    //     }
    // })
}