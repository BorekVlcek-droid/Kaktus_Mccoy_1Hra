# Kaktus: Srdce pouště

Westernová 2D plošinovka v jediném HTML souboru. Kaktus se vydává po stopách
Barona Vanea, který odváží šťávu Srdce pouště: přístav, otevřené moře, bažina,
starý důl, step, vlak, pevnost a Leviatan. Čtyři hratelné třídy (Kovboj, Asasín,
Lovec odměn, Mistr převleku), bossové s vlastními nástupy, úkoly a odměny.

## Hraní

Stačí otevřít `index.html` v prohlížeči. Nic se neinstaluje.
Po zapnutí GitHub Pages (Settings → Pages → větev `main`, složka `/ (root)`)
hra běží i na adrese `https://<uživatel>.github.io/<repozitář>/`.

## Ovládání

| Akce | Klávesy |
|---|---|
| Pohyb | ← → nebo A D |
| Nahoru / dolů (žebříky, plošiny) | ↑ ↓ nebo W S |
| Skok | Mezerník |
| Útok / silný útok | J nebo X / K |
| Střelba / speciál | Q / F |
| Úskok | L nebo Z |
| Akce (zvednout, mluvit, dělo) | E |
| Přikrčení | C nebo Shift |
| Pauza s menu | Esc |
| Tichá pauza (zastaví čas) | H |
| Zvuk zapnout / vypnout | M |
| Připnout úkoly | U |

Klávesy jdou přenastavit v menu. Funguje i gamepad a dotykové ovládání.

## Struktura

```
index.html        hotová hra (vygenerovaná – needitovat ručně)
src/kaktus.html   základ hry
src/*.js          moduly (postavy, bossové, HUD, menu, úkoly …)
src/data/*.json   předkreslené díly postav (obrázky v datových URL)
src/build.py      sestaví src/ do index.html
```

## Sestavení

```
python3 src/build.py
```

Skript spojí základ a moduly do `index.html`. Na pořadí modulů záleží –
pozdější moduly obalují funkce těch dřívějších.
