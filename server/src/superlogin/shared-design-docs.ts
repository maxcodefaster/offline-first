export const sharedDesignDocuments = [
    {
        _id: '_design/sharedDoc',
        language: 'javascript',
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