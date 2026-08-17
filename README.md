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

**Dokud je nenastavíte**, formulář návštěvníkovi ukáže hlášku „Poptávku se
nepodařilo odeslat, zavolejte prosím na +420 775 259 253“. Web funguje
i bez toho, jen se poptávky neodesílají — telefon zůstává hlavní cesta.

### Rychlá varianta — bez zasahování do DNS

Tohle je cesta pro případ, kdy DNS domény spravuje někdo jiný nebo se do nich
nechcete pouštět.

1. Zaregistrujte se na [resend.com](https://resend.com) **e-mailem, na který
   chcete poptávky dostávat** — tady `079114@gmail.com`. Na té adrese to
   závisí, viz upozornění níž. Free tarif zvládne 3 000 e-mailů měsíčně.
2. Vytvořte **API Key** a zkopírujte ho (`re_…`).
3. Ve Vercelu **Settings → Environment Variables** přidejte:

   | Název | Hodnota |
   |---|---|
   | `RESEND_API_KEY` | klíč z Resendu (`re_…`) |
   | `CONTACT_TO` | `079114@gmail.com` |
   | `CONTACT_FROM` | `onboarding@resend.dev` |

4. **Deployments → poslední nasazení → … → Redeploy**, aby se proměnné načetly.
   Bez tohohle kroku se nové proměnné nepoužijí.

> **⚠️ Omezení téhle varianty.** Odesílatel `onboarding@resend.dev` je testovací
> adresa Resendu a smí posílat **jen na e-mail, kterým je účet registrovaný**.
> Když v `CONTACT_TO` uvedete jinou adresu, Resend odpoví chybou 403 a poptávka
> nedojde. Takže obě adresy musí být stejné. Kdybyste chtěl poptávky posílat
> ještě někomu dalšímu nebo na adresu na vlastní doméně, je potřeba varianta níž.

Zkontrolujte po prvním odeslání i **spam**. Doména `resend.dev` je společná pro
všechny, kdo ji testují, takže první zpráva tam někdy spadne. Označte ji jako
„není spam“ a příště už přijde normálně.

### Plná varianta — s vlastní doménou

Vypadá profesionálněji (odesílatel `web@parking-steparska.cz` místo
`onboarding@resend.dev`), lépe se doručuje a poptávky můžou chodit na víc
adres. Vyžaduje ale přístup k DNS.

1. V Resendu **Domains → Add Domain** → `parking-steparska.cz`.
2. Resend vypíše několik `TXT` a `CNAME` záznamů (DKIM a SPF). Ty se přidají
   u Wedosu — viz varování o MX záznamech v části 2, pošta se tím nesmí
   rozbít. Na doméně teď žádný `SPF` ani `DMARC` záznam není, takže není
   s čím kolidovat.
3. Po ověření změňte ve Vercelu `CONTACT_FROM` na `web@parking-steparska.cz`
   a `CONTACT_TO` může být libovolná adresa. Znovu **Redeploy**.

### Ještě jednodušší varianta bez Resendu

[Formspree](https://formspree.io) — založíte formulář, dostanete adresu jako
`https://formspree.io/f/abcdwxyz` a v `assets/script.js` nahradíte jeden řádek:

```js
fetch("/api/contact", {                        // ← původní
fetch("https://formspree.io/f/abcdwxyz", {     // ← nové
```

Soubor `api/contact.js` pak můžete smazat. Nevýhoda: poptávky procházejí
přes službu třetí strany a free tarif má nižší limit.

### Ověření, že funkce vůbec žije

```bash
curl -i -X POST https://parking-steparska.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"+420777123456"}'
```

- `503` a `{"error":"not_configured"}` → funkce běží, jen chybí proměnné
- `422` a `{"error":"missing_fields"}` → funkce běží a validuje
- `200` a `{"ok":true}` → odesláno, koukněte do e-mailu
- `404` → funkce se nenasadila, zkontrolujte, že soubor je v `api/contact.js`

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

### Když změnu nevidíte

Soubory `assets/styles.css` a `assets/script.js` mají v `vercel.json` nastavené
`max-age=0, must-revalidate`. To znamená, že se prohlížeč pokaždé zeptá
serveru, jestli se soubor změnil — když ne, dostane krátkou odpověď „beze
změny" a použije uloženou kopii. Změny se tedy projeví hned a přenáší se
jen to, co je opravdu nové.

Fotky v `images/` mají cache na jeden den, protože se mění zřídka a jsou
velké. **Když vyměníte fotku pod stejným názvem, může ji návštěvník, který už
na webu byl, vidět starou až 24 hodin.** Chcete-li ji prosadit hned, uložte ji
pod jiným názvem (`parking1b.jpg`) a přepište odkaz v `index.html`.

Když změnu nevidíte ani po tvrdém obnovení (**Cmd + Shift + R** na macOS,
**Ctrl + F5** na Windows), zkontrolujte ve Vercelu v **Deployments**, jestli
nasazení opravdu proběhlo a je označené jako `Current`.

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
