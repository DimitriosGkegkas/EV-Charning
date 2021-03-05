# CLI client

Ένας client server για το σύστημα φόρτισης ηλεκτρικών οχημάτων 
# Η εγκατάσταση των απαραίτητων εργαλείων
Ανοίγουμε ενα cmd και κάνουμε τα παρακάτω βήματα ως διαχειριστές

    npm install
    npm link
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Για να τρέξει o server  στο backend κάνουμε έπειτα το

    npm start

## Ανάκτηση δεδομένων

Το CLI καλείται από τη γραμμή εντολών με κλήσεις της μορφής: 
$ ev_groupXX SCOPE --param1 value1 [--param2 value2 ...] --format fff --apikey kkk
Υποστηρίζονται τα ακόλουθα scopes με τις παραμέτρους τους:

 - healthcheck  
 - resetsessions 
 - login  με παραμέτρους --username --passw 
 - logout
 - SessionsPerPoint  με παραμέτρους  --point --datefrom --dateto
 - SessionsPerStation  με παραμέτρους  --station --datefrom --dateto
 - SessionsPerEV  με παραμέτρους  --ev --datefrom --dateto
 - SessionsPerProvider  με παραμέτρους  --provider --datefrom --dateto
 - Admin
 Στον Admin υποστηρίζονται οι ακόλουθες παράμετροοι:
	 --usermod με λοιπές παραμέτρους --username --passw
	 --username με λοιπές παραμέτρους --passw
	 --passw
	 --users
	 --sessionsupd με λοιπές παραμέτρους --source
	 --source 
	 --healthcheck
	 --resetsessions
	
Τέλος οι παράμετροι --format και --apikey είναι υποχρεωτικές για όλες τις κλήσεις
	 

