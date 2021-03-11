
# Management System for EV Charging

### Το παρών repo πρόκεται για ένα πληροφοριακό σύστημα διαχείρισης φόρτισης ηλεκτρικών οχημάτων 

Ο σκοπός του συστήματος που υλοποιήσαμε είναι η δημιουργία ενός πληροφοριακού συστήματος διαχείρισης της φόρτισης ηλεκτρικών οχημάτων, η οποία πραγματοποιείται σε δημόσιους ή ιδιωτικούς χώρους.  Οι ιδιαίτερες απαιτήσεις των φορτιστών σε ηλεκτρική ισχύ σε συνδυασμό με τον μεγάλο απαιτούμενο χρόνο φόρτισης καθιστούν αναγκαίο τον σχεδιασμό ενός διαφορετικού συστήματος διαχείρισης της διαδικασίας της φόρτισης, από αυτόν των υγρών καυσίμων. Επιπλέον, η απελευθέρωση της αγοράς έχει οδηγήσει σε κατάργηση του σχήματος συνεργασίας ενός operator (διαχειριστής σταθμού) με μοναδικό πάροχο, ενώ έχουμε πληθώρα διαφορετικών κατασκευαστών οχημάτων. Το γεγονός αυτό επιβάλλει την προτυποποίηση των πρωτοκόλλων φόρτισης και των ηλεκτρικών συνδέσεων. 

# Πληροφοριακό σύστημα
Τα τμήματα του πληροφοριακού μας συστήματος έχουν ως εξής: <br>
**1.** Ένα υποσύστημα **back-end**, το οποίο υποστηρίζει δυνατότητες διαχείρισης χρηστών (εγγραφή, σύνδεση, αποσύνδεση), προκειμένου αυτοί να αποκτούν πρόσβαση σε δεδομένα μέσω ενός REST API.  Ένα υποσύστημα back-end, υπεύθυνο για τη διαχείριση των δεδομένων και την πρόσβαση σε αυτά (εγγραφή, ανάγνωση) μέσω ενός REST API.  <br>
**2.**  Μία εφαρμογή **CLI** (Command Line Interface) για τις λειτουργίες προσπέλασης δεδομένων και διαχείρισης χρηστών. Η εφαρμογή λειτουργεί ως client του REST API που παρέχεται από το back-end υποσύστημα, προσφέροντας στο χρήστη της τη δυνατότητα να εκτελεί λειτουργίες δημιουργίας χρήστη, σύνδεσης χρήση, ανάγνωσης από και εγγραφής στα σύνολα δεδομένων.  <br>
**3.**  Μία δικτυακή εφαρμογή (Web Application) για το σύστημα φόρτισης ηλεκτρικών οχημάτων , η οποία προσφέρει στο χρήστη δυνατότητες παρουσίασης των δεδομένων (πχ διαγράμματα). Λειτουργεί σε περιβάλλον Web browser και αποτελεί το **front-end** του συστήματος. <br>



# Repo structure

```
├── documentation          # SRS and StRSs documents and UML diagrams explaining the system
├── back-end               # Code for a back-end server the provies the restFUL APIs
├── cli-client             # Code for a command client interface 
├── front-end              # Code for a fron-end wep application
└── README.md              # This file

```
# Η εγκατάσταση των απαραίτητων εργαλείων
Ανοίγουμε ενα cmd και κάνουμε τα παρακάτω βήματα ως διαχειριστές

    git clone https://github.com/ntua/TL20-39.git


Έπειτα ανάλογα το λειτουργικό σας σύστημα:

### Windows 



    choco install nodejs            # εγκατάσταση nodejs
    choco install redis-64          # εγκατάσταση για το jwtr
    choco install openssl           # για https self cert


### Linux


    sudo apt-get install node.js    # εγκατάσταση nodejs
    sudo install redis-64           # εγκατάσταση για το jwtr
    sudo install openssl            # για https self cert

   
### Mac

    brew install node               # εγκατάσταση nodejs
    brew install redis-64           # εγκατάσταση για το jwtr
    brew install openssl            # για https self cert

 * Στην συνέχεια ακολουθήστε τα βήματα που υπάρχουν στο [https://flaviocopes.com/express-https-self-signed-certificate/](https://flaviocopes.com/express-https-self-signed-certificate/ "https://flaviocopes.com/express-https-self-signed-certificate/") για την απόκτηση https-self-signed-certificate
 <br>

* Φυλάξτε τα αρχεία  **auth.js, secretKey.js**  για το self signed certificate μέσα στην διέυθυνση **back-end/database**

