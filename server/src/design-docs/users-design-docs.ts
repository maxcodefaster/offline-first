export const usersDesignDocuments = [
    {
        _id: '_design/userDoc',
        language: 'javascript',
        views: {
            admin_users: {
                map: "function(doc){ if(doc.type == 'user' && doc.role == 'admin'){emit(doc);} }"
            },
            regular_users: {
                map: "function(doc){ if(doc.type == 'user' && doc.role == 'user'){emit(doc);} }"
            }
        }
    }
]