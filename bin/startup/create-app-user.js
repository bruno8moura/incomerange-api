db.createUser( { user: "incomerange", pwd: "incomerange1234", roles: [ {role: "dbOwner", db: "customdatadb" } ], mechanisms: ["SCRAM-SHA-1"]})
