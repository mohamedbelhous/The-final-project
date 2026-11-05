const targets = await (await fetch("http://127.0.0.1:9223/json")).json();
const page = targets.find((target) => target.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});
let id = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  } else if (message.method === "Runtime.exceptionThrown") {
    events.push(message.params.exceptionDetails?.exception?.description);
  } else if (
    message.method === "Runtime.consoleAPICalled" &&
    message.params.type === "error"
  ) {
    events.push(
      message.params.args.map((a) => a.value ?? a.description).join(" "),
    );
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const messageId = ++id;
    pending.set(messageId, resolve);
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });
const evaluate = async (expression) => {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.result?.exceptionDetails) {
    console.log("EXCEPTION", response.result.exceptionDetails);
  }
  return response.result?.result?.value;
};
await send("Runtime.enable");
console.log("path", await evaluate("location.pathname"));
console.log(
  "button",
  await evaluate(
    "(() => { const b = document.querySelector('.btn-plan-trip'); return b ? b.outerHTML.slice(0, 300) : 'MISSING'; })()",
  ),
);
console.log("click", await evaluate("document.querySelector('.btn-plan-trip').click(); 'clicked'"));
await new Promise((r) => setTimeout(r, 1500));
console.log("path after", await evaluate("location.pathname + location.search"));
console.log("exceptions", events);
console.log(
  "react errors",
  await evaluate(
    "document.body.innerText.includes('Something went wrong') || document.body.innerText.includes('Booking')",
  ),
);
ws.close();
process.exit(0);
