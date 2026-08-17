/* ==========================================================================
   POST /api/contact  —  odeslání poptávky z formuláře na e-mail
   Běží jako Vercel Serverless Function (Node.js). Žádné npm závislosti.

   Potřebuje tři proměnné prostředí nastavené ve Vercelu
   (Project → Settings → Environment Variables):

     RESEND_API_KEY   API klíč z resend.com (zdarma 3 000 e-mailů / měsíc)
     CONTACT_TO       kam se má poptávka poslat, např. vas@email.cz
     CONTACT_FROM     odesílatel na ověřené doméně, např. web@parking-steparska.cz

   Dokud nejsou nastavené, endpoint vrátí chybu a formulář na webu ukáže
   návštěvníkovi hlášku "zavolejte nám prosím" s telefonním číslem.
   ========================================================================== */

const MAX = { name: 120, phone: 40, email: 160, plan: 120, message: 2000 };

function clean(value, limit) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim().slice(0, limit);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") { return req.body; }
  if (typeof req.body === "string" && req.body) {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  const chunks = [];
  for await (const chunk of req) { chunks.push(chunk); }
  if (!chunks.length) { return {}; }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { return res.status(204).end(); }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let body;
  try { body = await readBody(req); }
  catch { return res.status(400).json({ error: "bad_request" }); }

  // Past na roboty — vyplněné skryté pole znamená spam.
  // Vrátíme 200, ať robot nepozná, že se nic neodeslalo.
  if (clean(body._gotcha, 50)) { return res.status(200).json({ ok: true }); }

  const data = {
    name:    clean(body.name, MAX.name),
    phone:   clean(body.phone, MAX.phone),
    email:   clean(body.email, MAX.email),
    plan:    clean(body.plan, MAX.plan),
    message: String(body.message == null ? "" : body.message).trim().slice(0, MAX.message),
    lang:    body.lang === "en" ? "en" : "cs"
  };

  if (!data.name || !data.phone) {
    return res.status(422).json({ error: "missing_fields" });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return res.status(422).json({ error: "bad_email" });
  }

  const KEY  = process.env.RESEND_API_KEY;
  const TO   = process.env.CONTACT_TO;
  const FROM = process.env.CONTACT_FROM;

  if (!KEY || !TO || !FROM) {
    console.error(
      "[contact] Chybí nastavení. Doplňte RESEND_API_KEY, CONTACT_TO a CONTACT_FROM " +
      "ve Vercelu (Settings → Environment Variables). Poptávka: " + JSON.stringify(data)
    );
    return res.status(503).json({ error: "not_configured" });
  }

  const rows = [
    ["Jméno", data.name],
    ["Telefon", data.phone],
    ["E-mail", data.email || "—"],
    ["Zájem o", data.plan || "—"],
    ["Jazyk webu", data.lang === "en" ? "anglicky" : "česky"]
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;color:#14181c;line-height:1.6">
      <h2 style="margin:0 0 4px;font-size:19px">Nová poptávka parkovacího místa</h2>
      <p style="margin:0 0 18px;color:#7b8794;font-size:13px">parking-steparska.cz</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:520px">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:9px 14px 9px 0;border-bottom:1px solid #e5e9ec;color:#7b8794;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
            <td style="padding:9px 0;border-bottom:1px solid #e5e9ec;font-weight:600">${escapeHtml(v)}</td>
          </tr>`).join("")}
      </table>
      ${data.message ? `
        <p style="margin:22px 0 6px;color:#7b8794;font-size:13px">Zpráva</p>
        <div style="padding:14px 16px;background:#f7f9f8;border:1px solid #e5e9ec;border-radius:10px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
      ` : ""}
      <p style="margin:24px 0 0;font-size:13px;color:#7b8794">
        Odpovědět můžete přímo na tento e-mail${data.email ? "" : " — zájemce ale e-mail nezadal, ozvěte se prosím telefonicky"}.
      </p>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n")
    + (data.message ? `\n\nZpráva:\n${data.message}` : "");

  const payload = {
    from: FROM,
    to: [TO],
    subject: `Poptávka parkovacího místa — ${data.name}`,
    html,
    text
  };
  if (data.email) { payload.reply_to = data.email; }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("[contact] Resend odmítl požadavek:", r.status, detail);
      return res.status(502).json({ error: "send_failed" });
    }
  } catch (err) {
    console.error("[contact] Odeslání selhalo:", err);
    return res.status(502).json({ error: "send_failed" });
  }

  return res.status(200).json({ ok: true });
}
