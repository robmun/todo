# To Do Jassie

Gedeelde to-do-lijst voor Jasmijn, Heleen en Robert. Een losse webapp die op GitHub Pages draait en de lijst bewaart in Firebase (gratis). Niemand heeft een Claude-account nodig.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | De app |
| `apple-touch-icon.png` | Icoon op het beginscherm van de iPhone |
| `favicon.png` | Icoon in het browsertabblad |
| `firestore.rules` | Beveiligingsregels voor Firebase (stap 1.4) |

Zet het exportbestand `takenlijst-export.json` **niet** op GitHub: daar staan persoonlijke gegevens in.

---

## 1. Firebase instellen (opslag van de lijst, ±10 minuten)

1. Ga naar <https://console.firebase.google.com> en log in met je Google-account.
2. **Project toevoegen** → naam bijvoorbeeld `todo-jassie` → Google Analytics mag uit → **Project maken**.
3. Links in het menu: **Build → Firestore Database → Database maken**.
   - Locatie: **eur3 (europe-west)**.
   - Kies **Starten in productiemodus**.
4. Open het tabblad **Regels**, vervang alles door de inhoud van `firestore.rules` en klik **Publiceren**.
5. Ga naar het tandwiel **Projectinstellingen → Algemeen**. Onder *Jouw apps* klik je op het **</>**-icoon (web-app).
   - Naam: `todo-jassie`, Firebase Hosting **niet** aanvinken → **App registreren**.
   - Je ziet een blok `const firebaseConfig = { apiKey: "...", ... }`. Kopieer de waarden.
6. Open `index.html` in een teksteditor, zoek `FIREBASE_CONFIG` (bovenaan het tweede `<script>`-blok) en vul de zes waarden in. Opslaan.

De `apiKey` is geen wachtwoord: Firebase bedoelt hem als openbaar. De echte afscherming is de gezinscode (stap 3).

## 2. Op GitHub zetten

1. Maak op <https://github.com/new> een nieuwe repository, bijvoorbeeld `todo-jassie`, **Public**.
2. Klik **uploading an existing file** en sleep `index.html`, `apple-touch-icon.png`, `favicon.png`, `firestore.rules` en deze `README.md` erin → **Commit changes**.
3. Ga naar **Settings → Pages**. Bij *Source*: **Deploy from a branch**, branch **main**, map **/(root)** → **Save**.
4. Na een minuut staat de app op `https://<jouw-gebruikersnaam>.github.io/todo-jassie/`.

## 3. Gezinscode

Iedereen die de gezinscode kent, kan de lijst lezen en wijzigen. Behandel hem als een wachtwoord en deel hem alleen privé.

Voorgestelde code (mag je ook zelf verzinnen: minstens 20 tekens, alleen letters, cijfers, `-` en `_`):

```
BsHXk1rSg6ykaXZKJ80r9Eov
```

De handigste link om te delen bevat de code al:

```
https://<jouw-gebruikersnaam>.github.io/todo-jassie/#k=BsHXk1rSg6ykaXZKJ80r9Eov
```

Stuur die link privé (WhatsApp) naar Jasmijn en Heleen.

## 4. Op het beginscherm van de iPhone

1. Open de link **met de code erin** in **Safari**.
2. Deel-icoon → **Zet op beginscherm** → naam **To Do Jassie** → **Voeg toe**.
3. Open de app vanaf het beginscherm en kies bovenin bij **Ik** je eigen naam.

Vraagt de app toch om de gezinscode (bijvoorbeeld als je de link zonder code gebruikte), plak hem dan één keer in het veld.

## 5. Huidige taken overzetten (eenmalig)

1. Open de app (stap 4) op je computer of telefoon.
2. Tabblad **Done** → onderaan **Acties importeren (.json)** → kies `takenlijst-export.json`.
3. De acties staan nu in de lijst, met hun volgorde, opmerkingen en status.

Doe dit één keer. Nog een keer importeren overschrijft dezelfde acties met de oude versie.

## Updates

Pas `index.html` aan en upload hem opnieuw naar GitHub (zelfde bestandsnaam). Na een minuut heeft iedereen automatisch de nieuwe versie; de lijst zelf blijft gewoon in Firebase staan. Verhoog bij een wijziging `APP_VERSION` en voeg bovenaan `VERSIONS` een regel toe, dan zie je in het tabblad Done welke versie draait. Elke upload staat ook in de geschiedenis van de repository (tabblad **Commits**), dus je kunt altijd terug naar een eerdere versie.

## Goed om te weten

- Werkt zonder Claude-account en zonder inloggen; alleen de gezinscode is nodig.
- Firebase is gratis voor dit gebruik (de gratis limiet is tienduizenden lees- en schrijfacties per dag).
- De app in Claude en deze GitHub-versie zijn twee aparte lijsten. Na het overzetten kun je de Claude-versie laten rusten.
