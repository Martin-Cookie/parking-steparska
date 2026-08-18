/* ==========================================================================
   Anglický překlad.
   Čeština je uložená přímo v index.html — skript si ji při načtení stránky
   sám zapamatuje, takže ji tady NENÍ potřeba duplikovat.

   Když v HTML změníte český text, tady stačí upravit jen odpovídající
   anglickou větu. Klíč (např. "hero.title") musí zůstat stejný.
   ========================================================================== */

window.I18N_EN = {
  /* --- meta --- */
  "meta.title": "Parking spaces for rent — Štěpařská, Prague 5 | Parking Štěpařská",
  "meta.desc": "Parking spaces for rent at a car park by the Albert supermarket, Štěpařská 1098/22, Prague 5. 24/7 access, CCTV, parking barriers. From CZK 1,550 per month.",

  /* --- hlavička --- */
  "brand.sub": "Prague 5 — Barrandov",
  "nav.features": "What we offer",
  "nav.pricing": "Pricing",
  "nav.photos": "Photos",
  "nav.location": "Location",
  "nav.contact": "Contact",

  /* --- hero --- */
  "hero.badge": "Parking spaces available for rent",

  /* Počet volných míst — {free} a {total} doplní web sám podle
     data-volnych v index.html. "few" = 2–4 místa, "many" = 5 a víc. */
  "avail.0":    "*Currently full* — join the waiting list",
  "avail.1":    "*One space left* out of {total}",
  "avail.few":  "*{free} of {total}* spaces available",
  "avail.many": "*{free} of {total}* spaces available",

  /* Texty, které se ukážou jen když je obsazeno (0 volných míst) */
  "cta.inquiry.full":   "Join the waiting list",
  "contact.title.full": "We are full at the moment",
  "contact.lead.full":  "All 20 spaces are currently taken. Leave us your details and we will contact you first as soon as one frees up.",
  "form.submit.full":   "Join the waiting list",
  "form.ok.full":       "Thank you — you are on the waiting list. We will be in touch as soon as a space frees up.",

  "hero.title": "Your own parking space in Barrandov, right by the Albert supermarket",
  "hero.lead": "A car park on Štěpařská street with 24/7 access, CCTV and lockable parking barriers. No more circling the neighbourhood looking for a spot — your space is always free.",
  "cta.inquiry": "Enquire — no obligation",
  "chip.label": "Prices from",
  "unit.monthShort": "CZK / month",

  /* --- výhody --- */
  "features.eyebrow": "What you get",
  "features.title": "Parking without the hassle of hunting for a space",
  "features.lead": "The car park serves both residents and local businesses. Every space is permanently assigned and protected against unauthorised parking.",
  "f1.title": "20 spaces for rent",
  "f1.text": "A well-organised car park with twenty spaces for passenger cars. The space is yours — nobody else can take it.",
  "f2.title": "24/7 access",
  "f2.text": "Come and go whenever you like — day or night, weekends and public holidays included. No opening hours, no attendant.",
  "f3.title": "CCTV surveillance",
  "f3.text": "The whole car park is covered by cameras. The recording helps trace any incident and discourages damage to your car.",
  "f4.title": "Numbered space with a barrier",
  "f4.text": "Every space has its own number and its own lockable barrier. Your space stays free even if you arrive late in the evening.",

  /* --- ceník --- */
  "price.eyebrow": "Pricing",
  "price.title": "Clear prices, no hidden fees",
  "price.lead": "Choose how long you want to park. The longer the period, the lower the monthly price.",
  "unit.month": "CZK / month",
  "unit.week": "CZK / week",
  "plan1.name": "Monthly payment",
  "plan1.note": "Pay month by month. Maximum flexibility, no long commitment.",
  "plan1.b1": "Reserved space with its own barrier",
  "plan1.b2": "24/7 access and CCTV surveillance",
  "plan2.flag": "Best value",
  "plan2.name": "12 months paid upfront",
  "plan2.note": "Pay a year in advance and save CZK 1,200. The price is locked in for the whole year.",
  "plan2.b1": "Everything in the monthly plan",
  "plan2.b2": "Save CZK 100 every month",
  "plan2.b3": "One payment, nothing to sort out monthly",
  "plan3.name": "Short-term parking",
  "plan3.note": "For visitors, moving house or holidays. Ideal when you only need a space for a short while.",
  "plan3.b1": "No long-term contract",
  "plan3.b2": "Subject to current availability",
  "price.foot": "Prices are final, per one parking space for a passenger car. Do you have several cars or need spaces for a company? Give us a call and we will work something out.",

  /* --- galerie --- */
  "gallery.eyebrow": "Photo gallery",
  "gallery.title": "What the car park looks like",

  /* --- lokalita --- */
  "place.eyebrow": "Location",
  "place.title": "Štěpařská 1098/22, Prague 5",
  "place.lead": "You will find the car park directly by the Albert supermarket in Barrandov, within walking distance of the surrounding buildings.",
  "fact1.k": "Address",
  "fact1.v": "Štěpařská 1098/22, 152 00 Prague 5 — Hlubočepy",
  "fact2.k": "Landmark",
  "fact2.v": "The car park by the Albert supermarket",
  "place.nav": "Open in Google Maps",

  /* --- kontakt a formulář --- */
  "contact.eyebrow": "Contact",
  "contact.title": "Interested in a space?",
  "contact.lead": "Call us or use the form below. We will get back to you and let you know which spaces are currently free.",
  "contact.phoneLabel": "Phone",
  "contact.addrLabel": "Car park address",
  "lbl.name": "Full name",
  "lbl.phone": "Phone",
  "lbl.email": "Email (optional)",
  "lbl.plan": "What are you interested in",
  "lbl.msg": "Message",
  "ph.name": "John Smith",
  "ph.phone": "+420 777 123 456",
  "ph.email": "john.smith@email.com",
  "ph.msg": "When would you need the space from? Any other questions?",
  "opt.month": "Monthly rental — CZK 1,650 / month",
  "opt.year": "12 months upfront — CZK 1,550 / month",
  "opt.week": "Short-term parking — CZK 700 / week",
  "opt.other": "Not sure yet, please advise",
  "form.submit": "Send enquiry",
  "form.fine": "We use the details you provide only to reply to your enquiry. We do not pass them on to anyone and do not use them for anything else.",

  /* --- stavové zprávy formuláře --- */
  "form.sending": "Sending…",
  "form.ok": "Thank you — your enquiry has been sent. We will get back to you as soon as possible.",
  "form.errRequired": "Please fill in your name and phone number.",
  "form.errEmail": "The email address does not look valid.",
  "form.errSend": "The enquiry could not be sent. Please call us on +420 775 259 253 instead.",

  /* --- mobilní lišta --- */
  "cta.write": "Write",
  "cta.call": "Call"
};

/* ==========================================================================
   Ukrajinský překlad.
   Stejné klíče jako v anglickém slovníku výš. Když přidáte nový text do
   index.html, doplňte ho do obou slovníků, jinak se v cizí verzi ukáže
   česky.
   ========================================================================== */

window.I18N_UA = {
  /* --- meta --- */
  "meta.title": "Паркувальні місця в оренду — Прага 5, Штєпаржська | Parking Štěpařská",
  "meta.desc": "Оренда паркувальних місць на паркінгу біля супермаркету Albert, Štěpařská 1098/22, Прага 5. Цілодобовий доступ, відеоспостереження, паркувальні бар’єри. Від 1 550 Kč на місяць.",

  /* --- шапка --- */
  "brand.sub": "Прага 5 — Баррандов",
  "nav.features": "Що пропонуємо",
  "nav.pricing": "Ціни",
  "nav.photos": "Фото",
  "nav.location": "Де це",
  "nav.contact": "Контакти",

  /* --- головний блок --- */
  "hero.badge": "Вільні місця в оренду",

  /* Кількість вільних місць. Українська відмінює так само як чеська:
     1 місце · 2–4 місця · 5 і більше місць. */
  "avail.0":    "*Наразі всі місця зайняті* — запишіться в чергу",
  "avail.1":    "*Залишилось одне вільне місце* з {total}",
  "avail.few":  "*Вільно {free}* місця з {total}",
  "avail.many": "*Вільно {free}* місць з {total}",

  /* Тексти, які показуються лише коли немає вільних місць */
  "cta.inquiry.full":   "Записатися в чергу",
  "contact.title.full": "Наразі всі місця зайняті",
  "contact.lead.full":  "Усі 20 місць зараз орендовані. Залиште контакти — щойно місце звільниться, ми зателефонуємо вам першим.",
  "form.submit.full":   "Записатися в чергу",
  "form.ok.full":       "Дякуємо, ви в черзі. Ми зв’яжемося, щойно місце звільниться.",

  "hero.title": "Власне паркувальне місце на Баррандові, поруч із Albert",
  "hero.lead": "Паркінг під охороною на вулиці Štěpařská з цілодобовим доступом, відеоспостереженням і паркувальними бар’єрами. Більше не треба кружляти районом у пошуках місця — ваше місце завжди вільне.",
  "cta.inquiry": "Залишити заявку",
  "chip.label": "Ціна від",
  "unit.monthShort": "Kč / місяць",

  /* --- переваги --- */
  "features.eyebrow": "Що ви отримаєте",
  "features.title": "Паркування без клопоту й пошуків",
  "features.lead": "Паркінг призначений для мешканців і компаній поблизу. Кожне місце закріплене за орендарем і захищене від стороннього паркування.",
  "f1.title": "Усього 20 місць",
  "f1.text": "Відкритий паркінг для легкових автомобілів. Невеликий і зрозумілий майданчик, а не безликий паркінг на сотні місць.",
  "f2.title": "Цілодобовий доступ",
  "f2.text": "Приїжджайте та виїжджайте будь-коли — вдень, уночі, у вихідні та свята. Без годин роботи й без персоналу.",
  "f3.title": "Відеоспостереження",
  "f3.text": "Увесь паркінг під камерами. Запис допомагає з’ясувати обставини інциденту й відлякує від пошкодження авто.",
  "f4.title": "Пронумероване місце з бар’єром",
  "f4.text": "Кожне місце має свій номер і власний замковий бар’єр. Ваше місце залишиться вільним, навіть якщо приїдете пізно ввечері.",

  /* --- ціни --- */
  "price.eyebrow": "Ціни",
  "price.title": "Прозорі ціни без прихованих платежів",
  "price.lead": "Оберіть, як довго плануєте паркуватися. Що довший період, то нижча ціна за місяць.",
  "unit.month": "Kč / місяць",
  "unit.week": "Kč / тиждень",
  "plan1.name": "Щомісячна оплата",
  "plan1.note": "Платите щомісяця. Максимальна гнучкість, без тривалих зобов’язань.",
  "plan1.b1": "Закріплене місце з власним бар’єром",
  "plan1.b2": "Цілодобовий доступ і відеоспостереження",
  "plan2.flag": "Найвигідніше",
  "plan2.name": "Передоплата на 12 місяців",
  "plan2.note": "Сплачуєте рік наперед і економите 1 200 Kč. Ціна зафіксована на весь рік.",
  "plan2.b1": "Усе з місячного тарифу",
  "plan2.b2": "Економія 100 Kč щомісяця",
  "plan2.b3": "Один платіж, жодних щомісячних турбот",
  "plan3.name": "Короткострокове паркування",
  "plan3.note": "Для гостей, переїзду чи відпустки. Ідеально, коли місце потрібне ненадовго.",
  "plan3.b1": "Без довгострокового договору",
  "plan3.b2": "За наявності вільних місць",
  "price.foot": "Ціни остаточні, за одне паркувальне місце для легкового авто. Маєте кілька автомобілів або потрібні місця для компанії? Зателефонуйте, домовимося.",

  /* --- галерея --- */
  "gallery.eyebrow": "Фотогалерея",
  "gallery.title": "Як виглядає паркінг",

  /* --- розташування --- */
  "place.eyebrow": "Розташування",
  "place.title": "Štěpařská 1098/22, Прага 5",
  "place.lead": "Паркінг розташований просто біля супермаркету Albert на Баррандові, у пішій доступності від навколишньої забудови.",
  "fact1.k": "Адреса",
  "fact1.v": "Štěpařská 1098/22, 152 00 Прага 5 — Глубочепи",
  "fact2.k": "Орієнтир",
  "fact2.v": "Паркінг біля супермаркету Albert",
  "place.nav": "Відкрити в Google Maps",

  /* --- контакти й форма --- */
  "contact.eyebrow": "Контакти",
  "contact.title": "Цікавить місце?",
  "contact.lead": "Зателефонуйте або напишіть через форму. Ми передзвонимо й скажемо, які місця зараз вільні.",
  "contact.phoneLabel": "Телефон",
  "contact.addrLabel": "Адреса паркінгу",
  "lbl.name": "Ім’я та прізвище",
  "lbl.phone": "Телефон",
  "lbl.email": "Email (необов’язково)",
  "lbl.plan": "Що вас цікавить",
  "lbl.msg": "Повідомлення",
  "ph.name": "Іван Петренко",
  "ph.phone": "+420 777 123 456",
  "ph.email": "ivan.petrenko@email.com",
  "ph.msg": "З якого часу вам потрібне місце? Маєте інші запитання?",
  "opt.month": "Місячна оренда — 1 650 Kč / місяць",
  "opt.year": "Передоплата на 12 місяців — 1 550 Kč / місяць",
  "opt.week": "Короткострокове паркування — 700 Kč / тиждень",
  "opt.other": "Ще не визначився, порадьте",
  "form.submit": "Надіслати заявку",
  "form.fine": "Надані дані використовуємо лише для відповіді на вашу заявку. Ми нікому їх не передаємо й не використовуємо для інших цілей.",

  /* --- повідомлення форми --- */
  "form.sending": "Надсилаю…",
  "form.ok": "Дякуємо, заявку надіслано. Ми зв’яжемося з вами найближчим часом.",
  "form.errRequired": "Будь ласка, вкажіть ім’я та телефон.",
  "form.errEmail": "Адреса email виглядає некоректно.",
  "form.errSend": "Не вдалося надіслати заявку. Зателефонуйте, будь ласка, на +420 775 259 253.",

  /* --- нижня панель на телефоні --- */
  "cta.write": "Написати",
  "cta.call": "Подзвонити"
};

/* Texty, které jsou jen v JavaScriptu (stavy formuláře) — česká verze. */
window.I18N_CS_RUNTIME = {
  /* Počet volných míst. Čeština skloňuje, proto tři varianty:
     1 místo · 2–4 místa · 5 a více míst. */
  "avail.0":    "*Momentálně obsazeno* — zapište se do pořadníku",
  "avail.1":    "*Poslední volné místo* z {total}",
  "avail.few":  "*Volná {free}* místa z {total}",
  "avail.many": "*Volných {free}* míst z {total}",

  /* Texty, které se ukážou jen když je obsazeno (0 volných míst) */
  "cta.inquiry.full":   "Zapsat se do pořadníku",
  "contact.title.full": "Momentálně je obsazeno",
  "contact.lead.full":  "Všech 20 míst má teď svého nájemce. Nechte nám kontakt a jakmile se místo uvolní, ozveme se vám jako prvním.",
  "form.submit.full":   "Zapsat do pořadníku",
  "form.ok.full":       "Děkujeme, jste v pořadníku. Ozveme se, jakmile se místo uvolní.",

  "form.sending": "Odesílám…",
  "form.ok": "Děkujeme, poptávka byla odeslána. Ozveme se vám co nejdřív.",
  "form.errRequired": "Vyplňte prosím jméno a telefon.",
  "form.errEmail": "E-mailová adresa nevypadá správně.",
  "form.errSend": "Poptávku se nepodařilo odeslat. Zkuste nám prosím zavolat na +420 775 259 253.",
  "meta.title": "Parkovací místa k pronájmu — Praha 5, Štěpařská | Parking Štěpařská",
  "meta.desc": "Pronájem parkovacích míst na parkovišti u Albertu, Štěpařská 1098/22, Praha 5. Nonstop přístup, kamerový dohled, parkovací zábrany. Od 1 550 Kč měsíčně."
};
