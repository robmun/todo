# To Do Jassie

Gedeelde to-do-lijst voor Jasmijn, Heleen en Robert. Een webapp op GitHub Pages die de lijst bewaart in Firebase. Werkt als app op het beginscherm, ook zonder internet, en stuurt pushmeldingen. Niemand heeft een Claude-account nodig.

App-adres: <https://robmun.github.io/todo/>

## Bestanden op GitHub

| Bestand | Wat |
|---|---|
| `index.html` | De app |
| `sw.js` | Laat de app offline werken en ontvangt pushmeldingen |
| `manifest.webmanifest` | Maakt er een echte app van op het beginscherm |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `favicon.png` | Iconen |
| `README.md` | Deze uitleg |

**Nooit op GitHub** (deze repository is openbaar):

- de gezinscode, dus ook niet in deze README;
- `firestore-regels.txt`: daar staat de gezinscode in;
- back-ups en `takenlijst-export.json`: persoonlijke gegevens;
- de map `meldingen` (die gaat naar Firebase, zie stap 4).

---

## 1. Firebase (opslag)

1. <https://console.firebase.google.com> → project **to-do-jasmijn**.
2. **Firestore Database → Regels**: vervang alles door de inhoud van `firestore-regels.txt` → **Publiceren**.
   Alleen jullie eigen lijst is dan bereikbaar; de rest van het project is dicht.
3. De koppelgegevens staan al in `index.html` en `sw.js` (`FIREBASE_CONFIG`). Die zijn niet geheim.

## 2. GitHub

1. Upload alle bestanden uit de tabel hierboven naar <https://github.com/robmun/todo> (**Add file → Upload files**), in de hoofdmap.
2. **Settings → Pages**: *Deploy from a branch*, branch **main**, map **/(root)** → **Save**.

## 3. Op de iPhone zetten

Iedereen krijgt privé (WhatsApp) een persoonlijke link van Robert, in deze vorm:

```
https://robmun.github.io/todo/#k=<gezinscode>&ik=<Naam>
```

1. Open de link in **Safari**.
2. Deel-icoon → **Zet op beginscherm** → **Voeg toe**.
3. Open de app vanaf het beginscherm. Vraagt hij om de gezinscode, plak die dan één keer.

De app op het beginscherm opent schermvullend, werkt ook zonder internet en synchroniseert wijzigingen zodra er weer verbinding is.

## 4. Pushmeldingen (eenmalig, ±20 minuten)

Iedereen krijgt dan een melding op het vergrendelscherm als een ander een actie toevoegt of op Done zet. Je eigen wijzigingen geven geen melding.

### 4a. Blaze-abonnement aanzetten

Pushmeldingen hebben een klein stukje code bij Firebase nodig (een *Cloud Function*), en dat kan alleen met het Blaze-abonnement.

1. Firebase-console → linksonder **Upgrade** → **Blaze** → creditcard koppelen.
2. Zet een budgetmelding van bijvoorbeeld € 1. Bij jullie gebruik blijft het in de praktijk € 0: er zit een ruime gratis hoeveelheid in.

### 4b. Web Push-sleutel

1. Tandwiel → **Projectinstellingen → Cloud Messaging**.
2. Onder **Web-configuratie → Web Push-certificaten** → **Sleutelpaar genereren**.
3. Kopieer de lange sleutel en zet hem in `index.html` bij `VAPID_KEY` (of stuur hem naar Claude). Deze sleutel is niet geheim.
4. Upload de nieuwe `index.html` naar GitHub.

### 4c. De meldingen-code installeren (via Google Cloud Shell, niets installeren op je computer)

1. Open <https://console.cloud.google.com/?cloudshell=true> met hetzelfde Google-account. Kies bovenin project **to-do-jasmijn**.
2. Onderin opent een terminal. Klik op **⋮ → Uploaden** en kies `meldingen.zip`.
3. Plak deze regels in de terminal en druk op Enter:

   ```
   unzip -o meldingen.zip -d meldingen && cd meldingen
   npm --prefix functions install
   npx firebase-tools login --no-localhost
   npx firebase-tools deploy --only functions --project to-do-jasmijn
   ```

4. Bij `login` krijg je een link: open die, log in, en plak de code terug in de terminal.
5. Vraagt de deploy om API's aan te zetten (Cloud Functions, Cloud Build, Eventarc, Artifact Registry), antwoord dan **Y**. De eerste keer duurt het een paar minuten.
6. Klaar als je `Deploy complete!` ziet.

### 4d. Meldingen aanzetten op elke telefoon

1. Open de app **vanaf het beginscherm** (in Safari zelf kan het niet; iOS 16.4 of nieuwer).
2. Tik op **Aanzetten** in de balk boven de lijst (of: tabblad **Done** → **Meldingen aanzetten**) en kies **Sta toe**.
3. In het tabblad Done staat daarna: *Meldingen: aan voor (naam)*.

De melding gaat naar de naam die bij **Ik** staat. Zet die dus op elke telefoon goed.

## Back-up

Tabblad **Done** → **Back-up downloaden** bewaart alle acties en de geschiedenis in één bestand. Met **Back-up terugzetten** zet je zo'n bestand (of `takenlijst-export.json`) terug. Bewaar back-ups niet op GitHub.

## Updates en versienummer

Pas de bestanden aan en upload ze opnieuw naar GitHub. Iedereen krijgt de nieuwe versie automatisch de volgende keer dat de app opent met internet.

Het versienummer is **JJ.MM.N**: jaar, maand en de zoveelste versie in die maand (`26.10.5` is de vijfde versie van oktober 2026; de eerste in november wordt `26.11.1`). Bij een nieuwe versie:

- in `index.html`: `APP_VERSION` aanpassen en bovenaan `VERSIONS` een regel toevoegen;
- in `sw.js`: `CACHE` op hetzelfde nummer zetten.

Elke upload staat in de geschiedenis van de repository (tabblad **Commits**), dus je kunt altijd terug.

## Gezinscode veranderen

Als de code bij iemand terechtkomt die hem niet mag hebben:

1. Maak een back-up (tabblad Done).
2. Kies een nieuwe code (minstens 20 tekens: letters, cijfers, `-`, `_`) en zet die in `firestore-regels.txt` → publiceren in Firebase.
3. Stuur iedereen een nieuwe persoonlijke link. Open de app via die link en zet de back-up terug.

## Goed om te weten

- Geen inlog: wie de gezinscode heeft, kan de lijst lezen en wijzigen.
- De Claude-versie van de app en deze GitHub-versie zijn twee aparte lijsten.
