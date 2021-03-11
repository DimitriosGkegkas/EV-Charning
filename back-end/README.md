# Back-end

Ένας backend server για την διαχείριση RESTful APIs για το σύστημα φόρτισης ηλεκτρικών οχημάτων 




## Για να τρέξει ο server

    npm install
    npm start

# RESTful APIs
O server παρέχει τα παρακάτω restful API endpoints 
## Endpoints για Λειτουργία Συστήματος
O server παρέχει τα παρακάτω restful API endpoints που μπορούν να χρησιμοποιηθούν για την αλληλεπίδραση διαφόρων stakeholders προς το σύστημα
#### https://localhost:8765/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to
 Επιστρέφεται λίστα με την ανάλυση των γεγονότων φόρτισης (sessions) για ένα σημείο και περίοδο που δίνονται ως παράμετροι στη διεύθυνση του URL. Η παράσταση ημερομηνιών που επιστρέφονται πρέπει να είναι της μορφής "YYYY-MM-DD HH:MM:SS"
#### https://localhost:8765/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to 
 Επιστρέφεται λίστα με την ομαδοποίηση ανά σημείο των γεγονότων φόρτισης για ένα σταθμό και περίοδο που δίνονται ως παράμετροι στη διεύθυνση του URL. Για κάθε σημείο επιστρέφεται ο αριθμός των γεγονότων και η ενέργεια που διατέθηκε. Η παράσταση ημερομηνιών που επιστρέφονται πρέπει να είναι της μορφής "YYYY-MM-DD HH:MM:SS"
####  https://localhost:8765/evcharge/api/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to 
Επιστρέφεται λίστα με την ανάλυση των γεγονότων φόρτισης (sessions) για ένα όχημα και περίοδο που δίνονται ως παράμετροι στη διεύθυνση του URL. Η παράσταση ημερομηνιών που επιστρέφονται πρέπει να είναι της μορφής "YYYY-MM-DD HH:MM:SS"
#### https://localhost:8765/evcharge/api/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to 
Επιστρέφεται λίστα με την ανάλυση των γεγονότων φόρτισης (sessions) για έναν πάροχο ηλεκτρικής ενέργειας και περίοδο που δίνονται ως παράμετροι στη διεύθυνση του URL. Η παράσταση ημερομηνιών που επιστρέφονται πρέπει να είναι της μορφής "YYYY-MM-DD HH:MM:SS"

## Endpoints για Πρόσβαση και διαχείριση

#### Login & Logout 
Το back-end μας υποστηρίζει δύο endpoints για το Login και το Logout των χρηστών. Ειδικότερα: 
1. https://localhost:8765/evcharge/api/login: Υποστηρίζει την μέθοδο POST και λαμβάνει τις παραμέτρους username, password του χρήστη κωδικοποιημένους ως "application/x-www-form-urlencoded". Σε περίπτωση επιτυχούς διαπίστευσης του χρήστη, επιστρέφει ένα json object με το token αυτού: {"token":"FOO"}. 
2.  https://localhost:8765/evcharge/api/logout: Υποστηρίζει τη μέθοδο POST και δε λαμβάνει παραμέτρους. Σε περίπτωση επιτυχίας, επιστρέφει μόνο το status code 200 (empty response body). 
#### Διαχειριστικά Endpoints 

Το back-end μας υποστηρίζει τα παρακάτω endpoints, τα οποία θα είναι προσβάσιμα μόνο από τους χρήστες – διαχειριστές του συστήματος: 

1. https://localhost:8765/evcharge/api/admin/usermod/:username/:password Υποστηρίζει τη μέθοδο POST για την προσθήκη νέου χρήστη ή την αλλαγή password αν ο χρήστης υπάρχει ήδη.
2. https://localhost:8765/evcharge/api/admin/users/:username 
Υποστηρίζει τη μέθοδο GET για την ανάγνωση των στοιχείων του συγκεκριμένου χρήστη. 
3. https://localhost:8765/evcharge/api/admin/system/sessionsupd 
Υποστηρίζει τη μέθοδο POST για το «ανέβασμα» αρχείου CSV με δεδομένα γεγονότων φόρτισης. Το αρχείο πρέπει να είναι κωδικοποιημένο ως πεδίο "file" σε multipart/form-data κωδικοποίηση. 
Η κλήση αυτή αντικαθιστά την αυτόματη μεταφόρτωση δεδομένων από τα σημεία φόρτισης. Ως αποτέλεσμα επιστρέφεται ένα json object με τρία αριθμητικά πεδία: SessionsInUploadedFile, SessionsImported, TotalSessionsInDatabase.

#### Πρόσθετα (βοηθητικά) Endpoints 
Τέλος, το back-end μας υποστηρίζει τα παρακάτω endpoints, τα οποία λειτουργούν επικουρικά:
1. https://localhost:8765/evcharge/api/admin/healthcheck: 
Υποστηρίζει τη μέθοδο GET και επιβεβαιώνει την πλήρη συνδεσιμότητα (end-to-end connectivity) μεταξύ του χρήστη και της βάσης δεδομένων. Σε περίπτωση επιτυχούς σύνδεσης επιστρέφεται το json object: {"status":"OK"}, διαφορετικά επιστρέφεται {"status":"failed"}. 
2.  https://localhost:8765/evcharge/api/admin/resetsessions: 
Υποστηρίζει τη μέθοδο POST και προβαίνει σε αρχικοποίηση του πίνακα γεγονότων φόρτισης (διαγραφή όλων των γεγονότων φόρτισης), καθώς και αρχικοποίηση του default διαχειριστικού λογαριασμού (username: admin, password: petrol4ever). Σε περίπτωση επιτυχίας, επιστρέφεται το json object: {"status":"OK"}, διαφορετικά επιστρέφεται {"status":"failed"}. 

Τα βοηθητικά αυτά endpoints δεν απαιτούν διαπίστευση χρηστών.

## Διαχείριση σφαλμάτων 
Κάθε κλήση στο API επιστρέφει τα κατάλληλα HTTP Status Codes σε περίπτωση σφάλματος. Ειδικότερα, επιστρέφονται οι ακόλουθοι κωδικοί σφάλματος:

|**400 Bad Request**  |**Σε περίπτωση που οι παράμετροι που δίνονται σε μία κλήση δεν είναι έγκυρες (π.χ. κενό υποχρεωτικό πεδίο)**  |
|--|--|
| **401 Not Authorized** | **Σε περίπτωση που η αίτηση γίνεται από μη διαπιστευμένο χρήστη** |
| **402 No data** |**Σε περίπτωση που η απάντηση στην κλήση είναι κενή**  |


# Back-end tests

Όσο είναι σε λειτουργία ο server μας στο backend, υπάρχει η εξής δυνατότητα
Εκτελώντας σε ένα cmd, στο directory του back-end μας την εντολή 
`npm test` 
υπάρχει η δυνατότητα του testing για κάθε λειτουργία της εφαρμογής του λογισμικού, παρέχοντας κατάλληλη είσοδο, επαληθεύοντας την έξοδο έναντι των λειτουργικών απαιτήσεων.
