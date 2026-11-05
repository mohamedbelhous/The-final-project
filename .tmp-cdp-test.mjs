const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BASE = "http://localhost:5173";

const targets = await (await fetch("http://127.0.0.1:9223/json")).json();
const page = targets.find((target) => target.type === "page");
if (!page) throw new Error("No Chrome page target found");

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
const exceptions = [];
const consoleErrors = [];

ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
    return;
  }

  if (message.method === "Runtime.exceptionThrown") {
    exceptions.push(
      message.params.exceptionDetails?.exception?.description ||
        message.params.exceptionDetails?.text ||
        "Unknown exception",
    );
  }

  if (
    message.method === "Runtime.consoleAPICalled" &&
    message.params.type === "error"
  ) {
    consoleErrors.push(
      message.params.args
        .map((arg) => arg.value ?? arg.description ?? "")
        .join(" "),
    );
  }
});

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++messageId;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expression) => {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (response.result?.exceptionDetails) {
    throw new Error(
      response.result.exceptionDetails.exception?.description ||
        response.result.exceptionDetails.text,
    );
  }

  return response.result?.result?.value;
};

const waitForLoad = async () => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if ((await evaluate("document.readyState")) === "complete") break;
    await sleep(200);
  }
  await sleep(900);
};

const navigate = async (path) => {
  await evaluate(`location.href = ${JSON.stringify(`${BASE}${path}`)}`);
  await waitForLoad();
};

const click = async (expression) => {
  const value = await evaluate(`(() => {
    const el = ${expression};
    if (!el) return "MISSING";
    el.click();
    return "OK";
  })()`);

  if (value !== "OK") throw new Error(`Could not click: ${expression}`);
  await sleep(700);
};

const fill = async (expression, value) => {
  const result = await evaluate(`(() => {
    const el = ${expression};
    if (!el) return "MISSING";
    const proto =
      el.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : el.tagName === "SELECT"
          ? window.HTMLSelectElement.prototype
          : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
    setter.call(el, ${JSON.stringify(value)});
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return el.value;
  })()`);

  if (result === "MISSING") throw new Error(`Could not fill: ${expression}`);
  await sleep(120);
};

const checks = [];
const check = (name, passed, detail = "") => {
  checks.push({ name, passed, detail });
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

await send("Runtime.enable");
await send("Page.enable");
await evaluate("localStorage.clear()");

// ---------- Login as admin ----------
await navigate("/login");
check(
  "Login page renders",
  (await evaluate("document.body.innerText.includes('Welcome Back')")) === true,
);

await fill("document.querySelector('#email')", "admin@rahla.dz");
await fill("document.querySelector('#password')", "admin123");
await click("document.querySelector('.auth-btn')");
await sleep(900);

check(
  "Admin login redirects to destinations",
  (await evaluate("location.pathname")) === "/destinations",
  await evaluate("location.pathname"),
);
check(
  "Admin session has admin role",
  (await evaluate(
    "JSON.parse(localStorage.getItem('user') || 'null')?.role",
  )) === "admin",
);

// ---------- Admin dashboard ----------
await navigate("/admin");
check(
  "Admin dashboard loads",
  (await evaluate(
    "document.body.innerText.includes('Dashboard Overview')",
  )) === true,
);
check(
  "Admin sees destinations in table",
  (await evaluate(
    "document.querySelectorAll('.admin-table tbody tr').length > 0",
  )) === true,
);

// Create a guide via the admin UI
await click(
  "[...document.querySelectorAll('.admin-nav-item')].find((b) => b.textContent.includes('Travel Guides'))",
);
await click("document.querySelector('.btn-add-new')");
await fill(
  "document.querySelectorAll('.guide-admin-form input')[0]",
  "CDP Test Guide",
);
await fill(
  "document.querySelectorAll('.guide-admin-form textarea')[0]",
  "A temporary article created during the automated audit.",
);
await fill(
  "document.querySelectorAll('.guide-admin-form textarea')[1]",
  "This is the full body of the test guide, created from the admin dashboard.",
);
await fill(
  "document.querySelectorAll('.guide-admin-form select')[0]",
  "Culture & Tips",
);
await fill(
  "document.querySelectorAll('.guide-admin-form select')[1]",
  "published",
);
await click("document.querySelector('.guide-admin-form button[type=submit]')");
await sleep(700);

const guideSlug = await evaluate(`(() => {
  const content = JSON.parse(localStorage.getItem('rahla_content_v1') || '{}');
  const guide = (content.guides || []).find((item) => item.title === 'CDP Test Guide');
  return guide ? guide.slug : null;
})()`);

check("Admin guide is saved to storage", Boolean(guideSlug), guideSlug || "none");
check(
  "Admin guide appears in admin table",
  (await evaluate(
    "document.body.innerText.includes('CDP Test Guide')",
  )) === true,
);

await navigate("/travel-guide");
check(
  "New guide appears on the public guide page",
  (await evaluate(
    "document.body.innerText.includes('CDP Test Guide')",
  )) === true,
);

await navigate(`/guide/${guideSlug}`);
check(
  "New guide detail page opens",
  (await evaluate(
    "document.body.innerText.includes('full body of the test guide')",
  )) === true,
);

// ---------- Booking flow ----------
await navigate("/destinations/jijel");
check(
  "Destination detail page loads",
  (await evaluate("document.body.innerText.includes('About Jijel')")) === true,
);

await click("document.querySelector('.btn-plan-trip')");
await sleep(500);
check(
  "Plan trip opens booking",
  (await evaluate("location.pathname")) === "/booking",
  await evaluate("location.pathname"),
);

await fill(
  "document.querySelector('input[name=phone]')",
  "+213 555 000 000",
);
await fill(
  "document.querySelector('input[name=date]')",
  "2026-12-20",
);
await click("document.querySelector('.submit-booking-btn')");
await sleep(600);

check(
  "Booking confirmation is shown",
  (await evaluate(
    "document.body.innerText.includes('Booking Confirmed!')",
  )) === true,
);

const bookingCount = await evaluate(
  "JSON.parse(localStorage.getItem('rahla_bookings_v2') || '[]').length",
);
check("Booking was persisted", bookingCount >= 1, String(bookingCount));

await navigate("/trips");
check(
  "Booking appears in My Trips",
  (await evaluate(
    "document.body.innerText.includes('Jijel') && document.body.innerText.includes('RHL-')",
  )) === true,
);

// ---------- Favorites ----------
await navigate("/destinations");
await click(
  "document.querySelector('.destination-card .destination-favorite')",
);
const favoriteCount = await evaluate(
  "JSON.parse(localStorage.getItem('rahla_favorites_v1') || '{}').destinations?.length || 0",
);
check("Destination favorite is saved", favoriteCount >= 1, String(favoriteCount));

await navigate("/favorites");
check(
  "Favorites page lists the saved destination",
  (await evaluate(
    "document.body.innerText.includes('Saved destinations') && document.body.innerText.includes('Jijel')",
  )) === true,
);

// ---------- Newsletter ----------
await navigate("/");
await fill(
  "document.querySelector('.footer-newsletter-form input')",
  "audit@example.com",
);
await click("document.querySelector('.footer-newsletter-form button')");
await sleep(400);
check(
  "Newsletter subscription shows confirmation",
  (await evaluate(
    "document.body.innerText.includes('Thanks for subscribing')",
  )) === true,
);

// ---------- Activities controls ----------
await navigate("/activities");
check(
  "Activities shows the first page of results",
  (await evaluate("document.querySelectorAll('.activity-card').length")) === 6,
  String(
    await evaluate("document.querySelectorAll('.activity-card').length"),
  ),
);

await fill("document.querySelector('.sort-select')", "price-asc");
await sleep(400);
check(
  "Price sort reorders activities",
  (await evaluate(
    "document.querySelector('.activity-card .card-price')?.innerText.includes('$12')",
  )) === true,
  await evaluate(
    "document.querySelector('.activity-card .card-price')?.innerText",
  ),
);

await fill("document.querySelector('.filters-sidebar .filter-select')", "Algiers");
await sleep(400);
check(
  "Location filter narrows activities",
  (await evaluate("document.querySelectorAll('.activity-card').length")) === 1,
  String(
    await evaluate("document.querySelectorAll('.activity-card').length"),
  ),
);

await click("document.querySelector('.quiz-btn')");
check(
  "Quiz modal opens",
  (await evaluate("Boolean(document.querySelector('.quiz-modal'))")) === true,
);
await click("document.querySelector('.quiz-apply-btn')");
check(
  "Quiz closes and applies a category filter",
  (await evaluate("Boolean(document.querySelector('.quiz-modal'))")) === false &&
    (await evaluate(
      "[...document.querySelectorAll('.pill-btn.active')].some((b) => b.textContent.includes('Outdoor'))",
    )) === true,
);

// ---------- Registration + admin guard ----------
await evaluate("localStorage.removeItem('user')");
await navigate("/register");
check(
  "Register page renders",
  (await evaluate("document.body.innerText.includes('Create Account')")) === true,
);

const newEmail = `traveler.${Date.now()}@example.com`;
await fill("document.querySelector('#name')", "CDP Traveler");
await fill("document.querySelector('#email')", newEmail);
await fill("document.querySelector('#password')", "secret123");
await click("document.querySelector('.auth-btn')");
await sleep(1100);

check(
  "Registration signs the traveler in",
  (await evaluate("location.pathname")) === "/destinations" &&
    (await evaluate(
      "JSON.parse(localStorage.getItem('user') || 'null')?.role",
    )) === "Traveler",
);

await navigate("/admin");
check(
  "Non-admin is redirected away from admin",
  (await evaluate("location.pathname")) === "/" &&
    (await evaluate(
      "document.body.innerText.includes('Dashboard Overview')",
    )) === false,
  await evaluate("location.pathname"),
);

const failures = checks.filter((item) => !item.passed);
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed`);
console.log(`Uncaught exceptions: ${exceptions.length}`);
if (exceptions.length) console.log(exceptions.slice(0, 5).join("\n"));
console.log(`Console errors: ${consoleErrors.length}`);
if (consoleErrors.length) console.log(consoleErrors.slice(0, 5).join("\n"));

ws.close();
process.exit(failures.length > 0 ? 1 : 0);
