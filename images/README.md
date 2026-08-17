# Fotky parkoviště

Do této složky patří tři soubory. Web se na ně odkazuje přesně těmito názvy:

| Soubor         | Kde se zobrazí                      | Doporučený rozměr        |
|----------------|-------------------------------------|--------------------------|
| `parking1.jpg` | velké foto v úvodu + galerie + náhled při sdílení | šířka 1600 px, formát na šířku |
| `parking2.jpg` | galerie                             | šířka 1600 px            |
| `parking3.jpg` | galerie                             | šířka 1600 px            |

Dokud tu soubory nejsou, web místo fotek ukáže jemné zástupné plochy — layout
se nerozsype, jen budou místo fotek světlé bloky.

## Na co si dát pozor

- **Zmenšit před nahráním.** Fotka z telefonu má klidně 4000 px a 5 MB, což web
  hodně zpomalí. Stačí šířka 1600 px a kvalita JPEG okolo 80 % — soubor
  by měl mít pod 400 kB.
- **Zachovat názvy** `parking1.jpg`, `parking2.jpg`, `parking3.jpg`. Když je
  změníte, upravte i odkazy v `index.html`.
- **Co vyfotit:** celkový pohled na parkoviště, vjezd s orientačním bodem
  (Albert) a detail parkovací zábrany. Ideálně za denního světla, ne v šeru.

## Jak fotky zmenšit

**macOS (Náhled):** otevřít fotku → Nástroje → Upravit velikost → šířka 1600 →
Soubor → Exportovat → JPEG, kvalita cca 80 %.

**Přes příkazovou řádku (ImageMagick):**

```bash
magick parking1.jpg -resize 1600x -quality 82 -strip parking1.jpg
```
