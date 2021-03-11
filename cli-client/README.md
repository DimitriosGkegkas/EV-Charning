# CLI client

Ένας client server για το σύστημα φόρτισης ηλεκτρικών οχημάτων 
# Η εγκατάσταση των απαραίτητων εργαλείων
Ανοίγουμε ενα cmd και κάνουμε τα παρακάτω βήματα ως διαχειριστές

	Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    npm link


Για να τρέξει o server  στο backend κάνουμε έπειτα το

	npm install
    npm start

## Ανάκτηση δεδομένων

Το CLI καλείται από τη γραμμή εντολών με κλήσεις της μορφής: 
##### ev_groupXX SCOPE --param1 value1 [--param2 value2 ...] --format fff --apikey kkk
Υποστηρίζονται τα ακόλουθα **scopes** με τις παραμέτρους τους:

 ##### healthcheck  
##### resetsessions 
##### login  
- με παραμέτρους --username --passw 
 ##### logout
 ##### SessionsPerPoint  
- με παραμέτρους  --point --datefrom --dateto
 ##### SessionsPerStation  
- με παραμέτρους  --station --datefrom --dateto
##### SessionsPerEV  
- με παραμέτρους  --ev --datefrom --dateto
 ##### SessionsPerProvider  
 - με παραμέτρους  --provider --datefrom --dateto
##### Admin
 Στον Admin υποστηρίζονται οι ακόλουθες παράμετροοι:
- --usermod με λοιπές παραμέτρους --username --passw
- --username με λοιπές παραμέτρους --passw
- --passw
- --users
- --sessionsupd με λοιπές παραμέτρους --source
- --source 
- --healthcheck
- --resetsessions
	
Τέλος η παράμετρος --apikey είναι υποχρεωτική για όλες τις κλήσεις
	 
## CLI tests

Όσο είναι σε λειτουργία ο server μας στο backend, υπάρχει η εξής δυνατότητα
Εκτελώντας σε ένα cmd, στο directory του cli-client την εντολή <br>
`npm test` 
<br>
υπάρχει η δυνατότητα του testing για κάθε λειτουργία της εφαρμογής του λογισμικού, παρέχοντας κατάλληλη είσοδο, επαληθεύοντας την έξοδο έναντι των λειτουργικών απαιτήσεων.
