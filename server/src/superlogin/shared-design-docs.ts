export const sharedDesignDocuments = [
    {
        _id: '_design/sharedDoc',
        language: 'javascript',
        validate_doc_update: "function(newDoc, oldDoc, userCtx){function require(field, title) {title = title || 'Document must have a ' + field; if (!newDoc[field]){throw({forbidden : title}); } } function unchanged(field) {if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field])){throw({forbidden : 'Field cant be changed: ' + field}); } } if(newDoc.type == 'sharedDoc'){require('title'); require('author'); require('dateUpdated'); require('dateCreated'); unchanged('author'); unchanged('dateCreated'); log(userCtx); if(('user:' + newDoc.author) !== userCtx.roles[0] && userCtx.roles[0] !== '_admin'){throw({forbidden: 'operation forbidden'}); } } }",
        views: {
            by_date_created: {
                map: "function(doc){ if(doc.type == 'sharedDoc'){emit(doc.dateCreated);} }"
            },
            by_date_updated: {
                map: "function(doc){ if(doc.type == 'sharedDoc'){emit(doc.dateUpdated);} }"
            }
        }
    }
]