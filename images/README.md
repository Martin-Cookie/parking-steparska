# Fotky parkoviště

| Soubor | Kde se zobrazí | Rozměr |
|---|---|---|
| `parking1.jpg` | velké foto v úvodu + první v galerii | 1280 × 960 |
| `parking2.jpg` | galerie — detail zábran s čísly míst | 1280 × 960 |
| `parking3.jpg` | galerie — pohled z výšky | 1280 × 960 |
| `og.jpg` | náhled při sdílení na Facebooku a jinde | 1200 × 630 |

Dohromady necelý 1,2 MB. Kdyby soubory chyběly, web místo nich ukáže jemné
zástupné plochy — layout se nerozsype.

## Když budete chtít fotky vyměnit

Nedávejte na web fotku přímo z telefonu. Má typicky 4000–6000 px a 5–7 MB,
což stránku citelně zpomalí, a hlavně:

> **⚠️ Fotky z telefonu obsahují GPS souřadnice místa, kde byly vyfoceny.**
> U snímku z okna bytu to znamená zveřejnit vlastní adresu. Fotky v této
> složce už jsou vyčištěné — neobsahují GPS ani údaje o přístroji.

Před nahráním tedy fotku zmenšete **a zbavte metadat**:

```bash
# ImageMagick — zmenší na 1280 px a -strip odstraní všechna metadata včetně GPS
magick original.jpg -resize 1280x -quality 82 -strip parking1.jpg
```

Na macOS bez ImageMagicku:

```bash
sips --resampleWidth 1280 original.jpg --out parking1.jpg
```

`sips` ale metadata nemaže. Buď použijte `exiftool -all= parking1.jpg`, nebo
v Náhledu udělejte Soubor → Exportovat a odškrtněte zachování údajů o poloze.

Nejjednodušší je poslat mi originály a nechat to na mně.

## Co vyfotit, kdyby přišly nové

Nejlíp funguje trojice: celkový pohled na parkoviště, detail zábrany s číslem
místa (to je dobrý argument — je vidět, že místo je konkrétní a vaše)
a záběr, ze kterého je poznat okolí a orientační bod. Ideálně za denního
světla, ne v šeru.
