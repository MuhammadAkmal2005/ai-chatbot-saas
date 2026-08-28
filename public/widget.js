(() => {
  const script = document.currentScript;
  if (!script) return;

  const widgetKey = script.getAttribute("data-widget-key");
  if (!widgetKey) return;

  const apiBase = new URL(script.src, window.location.href).origin;
  const storageKey = `chatbot_session_${widgetKey}`;
  let sessionId = localStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(storageKey, sessionId);
  }

  const style = document.createElement("style");
  style.textContent = `
    .aicb-root{all:initial;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}
    .aicb-root *{box-sizing:border-box;font-family:inherit;}
    .aicb-launcher{position:fixed;z-index:2147483000;width:56px;height:56px;border:0;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(15,23,42,.18);opacity:0;pointer-events:none;transition:opacity .25s ease,transform .2s ease,box-shadow .2s ease;}
    .aicb-launcher.aicb-ready{opacity:1;pointer-events:auto;}
    .aicb-launcher:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(15,23,42,.22);}
    .aicb-launcher svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
    .aicb-launcher img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
    .aicb-avatar{width:22px;height:22px;border-radius:50%;object-fit:cover;display:none;}
    .aicb-window{position:fixed;z-index:2147483000;width:360px;height:500px;max-width:calc(100vw - 32px);max-height:calc(100vh - 112px);background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(15,23,42,.22);opacity:0;transform:translateY(12px) scale(.96);pointer-events:none;visibility:hidden;transition:opacity .2s ease,transform .2s ease,visibility .2s ease;}
    .aicb-window.aicb-open{opacity:1;transform:none;pointer-events:auto;visibility:visible;}
    .aicb-header{padding:14px 16px;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:space-between;}
    .aicb-close{background:transparent;border:0;color:inherit;cursor:pointer;font-size:20px;line-height:1;opacity:.85;}
    .aicb-messages{flex:1;overflow-y:auto;padding:16px;background:#f8fafc;display:flex;flex-direction:column;gap:10px;}
    .aicb-bubble{max-width:80%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word;}
    .aicb-bot{align-self:flex-start;background:#e2e8f0;color:#0f172a;border-bottom-left-radius:4px;}
    .aicb-user{align-self:flex-end;color:#fff;border-bottom-right-radius:4px;}
    .aicb-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#e2e8f0;border-radius:14px;}
    .aicb-dot{width:6px;height:6px;border-radius:50%;background:#64748b;animation:aicb-bounce 1s infinite;}
    .aicb-dot:nth-child(2){animation-delay:.15s;}
    .aicb-dot:nth-child(3){animation-delay:.3s;}
    @keyframes aicb-bounce{0%,80%,100%{transform:translateY(0);opacity:.4;}40%{transform:translateY(-4px);opacity:1;}}
    .aicb-composer{display:flex;gap:8px;padding:12px;border-top:1px solid #e2e8f0;background:#fff;}
    .aicb-input{flex:1;border:1px solid #cbd5e1;border-radius:10px;padding:10px 12px;font-size:13px;outline:none;color:#0f172a;}
    .aicb-input:disabled{opacity:.6;}
    .aicb-send{border:0;border-radius:10px;padding:0 14px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;}
    .aicb-send:disabled{opacity:.6;cursor:default;}
    .aicb-pos-right .aicb-launcher{right:20px;bottom:20px;}
    .aicb-pos-right .aicb-window{right:20px;bottom:88px;}
    .aicb-pos-left .aicb-launcher{left:20px;bottom:20px;}
    .aicb-pos-left .aicb-window{left:20px;bottom:88px;}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.className = "aicb-root aicb-pos-right";
  document.body.appendChild(root);

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "aicb-launcher";
  launcher.setAttribute("aria-label", "Open chat");
  launcher.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  const defaultLauncherIcon = launcher.innerHTML;

  const windowEl = document.createElement("div");
  windowEl.className = "aicb-window";
  windowEl.setAttribute("role", "dialog");
  windowEl.setAttribute("aria-label", "Chat");

  const header = document.createElement("div");
  header.className = "aicb-header";
  const avatarImg = document.createElement("img");
  avatarImg.className = "aicb-avatar";
  avatarImg.alt = "";
  const title = document.createElement("span");
  title.textContent = "Chat";
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "aicb-close";
  closeBtn.setAttribute("aria-label", "Close chat");
  closeBtn.textContent = "×";
  header.append(avatarImg, title, closeBtn);
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.gap = "8px";
  title.style.flex = "1";

  const messages = document.createElement("div");
  messages.className = "aicb-messages";

  const composer = document.createElement("form");
  composer.className = "aicb-composer";
  const input = document.createElement("input");
  input.className = "aicb-input";
  input.type = "text";
  input.placeholder = "Type a message...";
  input.autocomplete = "off";
  const sendBtn = document.createElement("button");
  sendBtn.type = "submit";
  sendBtn.className = "aicb-send";
  sendBtn.textContent = "Send";
  composer.append(input, sendBtn);

  windowEl.append(header, messages, composer);
  root.append(windowEl, launcher);

  let open = false;
  let busy = false;
  let primaryColor = "#4f46e5";

  const contrastColor = (hex) => {
    const value = /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex.slice(1) : "4f46e5";
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "#0f172a" : "#ffffff";
  };

  const applyTheme = (color, position, headerColor) => {
    primaryColor = color || "#4f46e5";
    const headerBg = headerColor || primaryColor;
    const text = contrastColor(primaryColor);
    const headerText = contrastColor(headerBg);
    launcher.style.background = headerBg;
    launcher.style.color = headerText;
    header.style.background = headerBg;
    header.style.color = headerText;
    closeBtn.style.color = headerText;
    sendBtn.style.background = primaryColor;
    sendBtn.style.color = text;
    root.classList.remove("aicb-pos-right", "aicb-pos-left");
    root.classList.add(position === "bottom-left" ? "aicb-pos-left" : "aicb-pos-right");
  };

  const applyAvatar = (avatarUrl) => {
    if (!avatarUrl) {
      avatarImg.style.display = "none";
      launcher.innerHTML = defaultLauncherIcon;
      return;
    }
    avatarImg.src = avatarUrl;
    avatarImg.style.display = "block";
    launcher.innerHTML = "";
    const launcherImg = document.createElement("img");
    launcherImg.src = avatarUrl;
    launcherImg.alt = "";
    launcher.appendChild(launcherImg);
  };

  applyTheme(primaryColor, "bottom-right");

  const setOpen = (next) => {
    open = next;
    windowEl.classList.toggle("aicb-open", open);
    launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat");
    if (open) input.focus();
  };

  const addBubble = (text, kind) => {
    const bubble = document.createElement("div");
    bubble.className = `aicb-bubble ${kind === "user" ? "aicb-user" : "aicb-bot"}`;
    bubble.textContent = text;
    if (kind === "user") {
      bubble.style.background = primaryColor;
      bubble.style.color = contrastColor(primaryColor);
    }
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  };

  const showTyping = () => {
    const el = document.createElement("div");
    el.className = "aicb-typing";
    for (let i = 0; i < 3; i += 1) {
      const dot = document.createElement("span");
      dot.className = "aicb-dot";
      el.appendChild(dot);
    }
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };

  const setBusy = (next) => {
    busy = next;
    input.disabled = next;
    sendBtn.disabled = next;
  };

  launcher.addEventListener("click", () => setOpen(!open));
  closeBtn.addEventListener("click", () => setOpen(false));

  composer.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;

    input.value = "";
    addBubble(text, "user");
    setBusy(true);
    const typing = showTyping();

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgetKey, sessionId, message: text }),
      });
      const data = await response.json();
      typing.remove();
      addBubble(
        response.ok && data?.reply
          ? data.reply
          : "Sorry, something went wrong. Please try again.",
        "bot"
      );
    } catch {
      typing.remove();
      addBubble("Sorry, something went wrong. Please try again.", "bot");
    } finally {
      setBusy(false);
      input.focus();
    }
  });

  fetch(`${apiBase}/api/widget-config?widgetKey=${encodeURIComponent(widgetKey)}`)
    .then((response) => {
      if (!response.ok) throw new Error("config");
      return response.json();
    })
    .then((config) => {
      title.textContent = config.name || "Chat";
      applyTheme(config.primary_color, config.position, config.header_color);
      applyAvatar(config.avatar_url);
      if (config.welcome_message) addBubble(config.welcome_message, "bot");
      launcher.classList.add("aicb-ready");
    })
    .catch(() => {
      applyTheme("#4f46e5", "bottom-right");
      launcher.classList.add("aicb-ready");
    });
})();