# Parking Štěpařská — web

Jednostránkový web pro pronájem parkovacích míst ve Štěpařské 1098/22, Praha 5.
Statické HTML, CSS a JavaScript bez frameworků, plus jedna serverless funkce
pro poptávkový formulář. Nasazuje se na Vercel.

---

## Co je ve složce

```
index.html            celá stránka (český text je přímo tady)
assets/styles.css     vzhled
assets/script.js      chování — menu, přepínač jazyka, galerie, formulář
assets/i18n.js        anglický překlad
api/contact.js        odeslání poptávky na e-mail (Vercel funkce)
images/               fotky parkoviště — viz images/README.md
favicon.svg           ikonka v záložce prohlížeče
robots.txt            pravidla pro vyhledávače
sitemap.xml           mapa webu pro vyhledávače
vercel.json           nastavení hostingu (hlavičky, cache)
.env.example          vzor proměnných pro formulář
```

---

## 1. Nahrání na GitHub

Fotky vložte do složky `images/` **před** prvním commitem (viz
`images/README.md` — soubory se musí jmenovat `parking1.jpg`, `parking2.jpg`,
`parking3.jpg`).

```bash
cd parking-steparska
git init
git add .
git commit -m "Nový web parkoviště Štěpařská"
git branch -M main
git remote add origin https://github.com/VASE-JMENO/parking-steparska.git
git push -u origin main
```

Repozitář si nejdřív vytvořte na GitHubu (tlačítko **New repository**, název
třeba `parking-steparska`, bez README a bez .gitignore — ty už tu jsou).

---

## 2. Nasazení na Vercel

1. Přihlaste se na [vercel.com](https://vercel.com) přes GitHub.
2. **Add New → Project** a vyberte repozitář `parking-steparska`.
3. Framework Preset nechte na **Other**, Build Command i Output Directory
   nechte prázdné. Vercel pozná, že je to statický web.
4. **Deploy.**

Za pár sekund web běží na adrese typu `parking-steparska.vercel.app`.

### Připojení vlastní domény

Doména `parking-steparska.cz` je vedená u **Wedosu** a na stejné doméně běží
i e-mail (MX záznamy míří na `wes1-mx1.wedos.net`).

> **⚠️ Nepřepínejte nameservery na Vercel.** Vercel to nabízí jako
> jednodušší cestu, ale převzal by celé DNS včetně MX záznamů — a e-mail na
> téhle doméně by přestal fungovat. DNS musí zůstat u Wedosu, měnit se budou
> jen jednotlivé záznamy pro web.

Ve Vercelu **Settings → Domains** přidejte `www.parking-steparska.cz`
(hlavní) a `parking-steparska.cz` (přesměruje se na www). Vercel u každé
vypíše konkrétní hodnoty — **opište je z obrazovky**, nespoléhejte na hodnoty
odjinud: `CNAME` pro www je pro každý projekt jiný (třeba
`d1d4fc829fe7bc7c.vercel-dns-017.com`), zatímco `A` záznam pro doménu bez www
bývá `76.76.21.21`.

V administraci Wedosu se pak u záznamů pro web udělá tohle:

| Záznam | Teď | Nově |
|---|---|---|
| `A` pro `parking-steparska.cz` | `46.28.105.157` | hodnota z Vercelu (`76.76.21.21`) |
| `AAAA` pro `parking-steparska.cz` | `2a02:2b88:1:4::143` | **smazat** |
| `A` pro `www` | `46.28.105.157` | **smazat** |
| `AAAA` pro `www` | `2a02:2b88:1:4::143` | **smazat** |
| `CNAME` pro `www` | neexistuje | přidat, cíl z Vercelu |
| `MX` (pošta) | Wedos | **nechat být** |

Na `AAAA` záznamy se snadno zapomene. Kdyby zůstaly, návštěvníci s IPv6
připojením by pořád viděli starý web, zatímco ostatní už nový — a hledal
byste chybu tam, kde není.

HTTPS certifikát Vercel vyřídí sám. Starý web běžel jen na `http://`, nový
bude na `https://`.

---

## 3. Zapnutí poptávkového formuláře

Formulář posílá data na `/api/contact`, což je funkce v `api/contact.js`.
Aby opravdu odesílala e-maily, potřebuje tři proměnné prostředí.

1. Zaregistrujte se na [resend.com](https://resend.com) — free tarif zvládne
   3 000 e-mailů měsíčně, na poptávky víc než dost.
2. V Resendu přidejte a ověřte doménu `parking-steparska.cz`
   (přidáte pár DNS záznamů, které Resend vypíše).
3. Vytvořte **API Key** a zkopírujte ho.
4. Ve Vercelu **Settings → Environment Variables** přidejte:

   | Název | Hodnota |
   |---|---|
   | `RESEND_API_KEY` | klíč z Resendu (`re_…`) |
   | `CONTACT_TO` | e-mail, kam mají poptávky chodit |
   | `CONTACT_FROM` | např. `web@parking-steparska.cz` (ověřená doména) |

5. **Deployments → … → Redeploy**, aby se proměnné načetly.

**Dokud to nenastavíte**, formulář návštěvníkovi ukáže hlášku „Poptávku se
nepodařilo odeslat, zavolejte prosím na +420 775 259 253“. Web tedy funguje
i bez toho, jen se poptávky neodesílají — telefon zůstává hlavní cesta.

### Jednodušší varianta bez Resendu

Pokud se nechcete zdržovat s ověřováním domény, jde použít
[Formspree](https://formspree.io). Založíte formulář, dostanete adresu jako
`https://formspree.io/f/abcdwxyz` a v `assets/script.js` nahradíte jeden řádek:

```js
fetch("/api/contact", {          // ← původní
fetch("https://formspree.io/f/abcdwxyz", {   // ← nové
```

Soubor `api/contact.js` pak můžete smazat.

---

## 4. Změna počtu volných míst

Tohle budete měnit nejčastěji, proto je to nachystané tak, aby to byla úprava
jednoho čísla. V `index.html` najděte (je to hned v sekci `<!-- HERO -->`,
obklopené výrazným komentářem):

```html
<span class="badge" id="dostupnost" data-volnych="5" data-celkem="20">
```

Změňte `data-volnych` a je to. **Nikde jinde na webu se počet neopakuje** —
odznáček v úvodu se přepíše sám, včetně správného skloňování:

| `data-volnych` | Co se zobrazí |
|---|---|
| `7` | Volných 7 míst z 20 |
| `3` | Volná 3 místa z 20 |
| `1` | Poslední volné místo z 20 |
| `0` | Momentálně obsazeno — zapište se do pořadníku |

### Když nastavíte 0

Web se přepne do režimu „obsazeno" a přestane slibovat něco, co nemáte:

- odznáček zešedne a přestane pulzovat
- tlačítko v úvodu se změní na **Zapsat se do pořadníku**
- nadpis u formuláře na **Momentálně je obsazeno** s vysvětlením, že se ozvete,
  jakmile se místo uvolní
- odesílací tlačítko na **Zapsat do pořadníku**

Poptávky pořád chodí na e-mail, takže i v době, kdy nemáte co nabídnout,
sbíráte kontakty na zájemce. Až se místo uvolní, máte komu zavolat.

Anglická verze se přepíná stejně, texty jsou v `assets/i18n.js`.

**Kdyby čtenář neměl zapnutý JavaScript** (nebo ho něco blokuje), uvidí
v odznáčku obecné „Volná místa k pronájmu". Nikdy tam tedy nesvítí konkrétní
číslo, které by mohlo být neaktuální.

---

## 5. Běžné úpravy

**Změna ceny** — najděte v `index.html` sekci `<!-- CENÍK -->`. Číslo je
v `<span class="plan__amount">`. Změňte ho i v rozbalovacím seznamu ve
formuláři (`opt.month`, `opt.year`, `opt.week`), v anglickém překladu
v `assets/i18n.js` a v `"makesOffer"` na konci `index.html` (to čte Google).

**Změna telefonu** — v `index.html` je číslo na pěti místech. Nejrychleji přes
hledání `775 259 253` a `775259253` (v odkazech `tel:` je bez mezer).

**Změna textu** — český text je přímo v `index.html`. Angličtinu upravíte
v `assets/i18n.js` u stejného klíče (např. `hero.title`).

**Výměna fotek** — nahrajte nové soubory do `images/` pod stejnými názvy.

Po každé úpravě:

```bash
git add .
git commit -m "Úprava ceny"
git push
```

Vercel nasadí novou verzi sám, do půl minuty.

---

## 6. Lokální náhled

```bash
npx serve .
```

Otevřete `http://localhost:3000`. Formulář lokálně odesílat nebude
(chybí serverless funkce) — na to použijte `npx vercel dev`.

Anglickou verzi zobrazíte přidáním `?lang=en` do adresy, nebo přepínačem
CZ/EN vpravo nahoře.

---

## Co ještě stojí za zvážení

- **Ověřit PSČ.** Starý web měl v mapě `158 00`, Google ukazuje `152 00`.
  Na novém webu je `152 00` — pokud je správné to druhé, opravte
  v `index.html` (adresa v sekci Lokalita, v zápatí a v `"postalCode"`).
- **Firma z Google Maps.** Založit profil na
  [Google Business Profile](https://business.google.com) — u lokální služby
  přinese víc poptávek než samotný web.
- **Zápis do Search Console.** Přidat web do
  [Google Search Console](https://search.google.com/search-console)
  a poslat `sitemap.xml`, aby se rychleji objevil ve vyhledávání.
