function showRag() {
  stopTimer();
  state.mode = "rag";
  app.innerHTML = `<section class="panel">
    <h1>Kérdezz a tananyagtól</h1>
    <p id="ragLoginNote" hidden>Jelentkezz be e-maillel a kérdezéshez.</p>
    <form id="ragForm">
      <label for="ragQuestion">Kérdésed</label>
      <textarea id="ragQuestion" class="auth-input" rows="3" minlength="3" maxlength="1000" required></textarea>
      <div class="actions"><button id="ragSend" class="button" type="submit">Kérdezek</button></div>
    </form>
    <p id="ragStatus" role="status"></p>
    <div id="ragAnswer" aria-live="polite"></div>
    <div class="actions">
      <button id="ragLogin" class="button" type="button" hidden>Belépés</button>
      <button id="ragBack" class="button secondary" type="button">Vissza a tanuláshoz</button>
    </div>
  </section>`;
  const form = document.getElementById("ragForm");
  const question = document.getElementById("ragQuestion");
  const status = document.getElementById("ragStatus");
  const answer = document.getElementById("ragAnswer");
  const send = document.getElementById("ragSend");
  const login = document.getElementById("ragLogin");
  const loginNote = document.getElementById("ragLoginNote");
  document.getElementById("ragBack").onclick = studyHome;
  login.onclick = showLogin;
  const auth = window.ElektroAuth;
  const updateAuth = user => {
    form.hidden = !user;
    login.hidden = Boolean(user);
    loginNote.hidden = Boolean(user);
  };
  updateAuth(auth?.getUser());
  auth?.getClient()?.auth.getSession().then(({ data }) => {
    if (form.isConnected) updateAuth(data.session?.user);
  }).catch(() => {});
  form.onsubmit = async event => {
    event.preventDefault();
    if (send.disabled) return;
    answer.replaceChildren();
    status.textContent = "Keresés a tananyagban…";
    send.disabled = true;
    try {
      const client = auth?.getClient();
      const session = (await client?.auth.getSession())?.data?.session;
      if (!session) {
        updateAuth(null);
        status.textContent = "A bejelentkezés lejárt. Lépj be újra.";
        return;
      }
      const { data, error } = await client.functions.invoke("rag/ask", {
        body: { question: question.value.trim() },
      });
      if (error) {
        const body = await error.context?.json?.().catch(() => null);
        if (error.context?.status === 401) updateAuth(null);
        status.textContent = body?.error || "A tananyagkereső jelenleg nem érhető el.";
        return;
      }
      if (data.status === "no_source") {
        status.textContent = data.message;
        return;
      }
      status.textContent = "";
      const list = document.createElement("ol");
      for (const step of data.steps) {
        const item = document.createElement("li");
        const quote = document.createElement("blockquote");
        quote.style.whiteSpace = "pre-wrap";
        quote.textContent = step.text;
        const source = document.createElement("p");
        source.className = "muted small";
        source.textContent = step.source.filename + " · " + step.source.page + ". oldal · " + step.source.version;
        item.append(quote, source);
        list.append(item);
      }
      answer.append(list);
      for (const id of data.topics) {
        const topic = EXAM_FRAMEWORK.topics.find(item => item.id === id);
        if (!topic) continue;
        const button = document.createElement("button");
        const hasQuestions = topicQuestionCount(id) > 0;
        button.className = "button secondary";
        button.textContent = (hasQuestions ? "Gyakorlás · " : "Tananyag · ") + topic.title;
        button.onclick = () => hasQuestions ? launchTopicPractice(id) : showLearningTopic(id);
        answer.append(button);
      }
    } catch {
      status.textContent = "A tananyagkereső jelenleg nem érhető el.";
    } finally {
      send.disabled = false;
    }
  };
}
