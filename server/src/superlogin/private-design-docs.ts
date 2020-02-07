export const privateDesignDocuments = [
    {
        _id: '_design/privateDoc',
        language: 'javascript',
        views: {
            by_date_created: {
                map: "function(doc){ if(doc.type == 'privateDoc'){emit(doc.dateCreated);} }"
            },
            by_date_updated: {
                map: "function(doc){ if(doc.type == 'privateDoc'){emit(doc.dateUpdated);} }"
            }
        }
    }
]