Books.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
