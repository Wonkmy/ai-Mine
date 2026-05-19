const templates = {
  quick_note: {
    title: "快速记录一句话",
    kind: "Quick Note",
    description: "记录瞬间想法、反感、灵感、提醒或一句原话。",
    fields: [
      { name: "content", label: "原始内容", type: "textarea", required: true, hint: "保留你的原话，不要求完整。" },
      { name: "scene", label: "发生场景", type: "text", placeholder: "例如：工作、路上、聊天后、睡前" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔，例如：工作,沟通,反感" },
      { name: "importance", label: "重要程度", type: "range", min: 1, max: 10, value: 5 }
    ]
  },
  keyword_tags: {
    title: "标签/关键词采集器",
    kind: "Keyword Tags",
    description: "用标签记录当前想到的任何东西，支持气泡点击和自定义写入。",
    fields: [
      {
        name: "keywords",
        label: "标签/关键词",
        type: "tag_picker",
        required: true,
        hint: "只保存标签，不做 AI 总结，也不和其他系统交互。",
        options: [
          "工作",
          "项目",
          "灵感",
          "决策",
          "情绪",
          "焦虑",
          "开心",
          "压力",
          "关系",
          "沟通",
          "家庭",
          "朋友",
          "金钱",
          "健康",
          "学习",
          "产品",
          "反感",
          "喜欢",
          "待办",
          "值得记住"
        ]
      },
      { name: "importance", label: "重要程度", type: "range", min: 1, max: 10, value: 5 }
    ]
  },
  voice_note: {
    title: "录一段语音",
    kind: "Voice Note",
    description: "保存音频原件，并允许补充文字转写或背景。",
    hasAudio: true,
    fields: [
      { name: "transcript", label: "文字转写或大意", type: "textarea", hint: "这里由你手动写，不做 AI 总结。" },
      { name: "context", label: "语音背景", type: "text", placeholder: "例如：每日复盘、刚开完会、情绪波动后" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔" },
      { name: "importance", label: "重要程度", type: "range", min: 1, max: 10, value: 5 }
    ]
  },
  decision: {
    title: "记录一个决定",
    kind: "Decision",
    description: "记录选择、选项、原因和当时最看重的东西。",
    fields: [
      { name: "decision", label: "我做了什么决定", type: "textarea", required: true },
      { name: "options", label: "当时有哪些选项", type: "textarea" },
      { name: "reason", label: "为什么这样选", type: "textarea", required: true },
      { name: "priority", label: "我最看重什么", type: "text", placeholder: "例如：长期收益、现金流、关系、自由、效率" },
      { name: "hesitation", label: "有没有犹豫", type: "textarea" },
      { name: "future_rule", label: "以后类似情况是否还这样选", type: "textarea" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔" }
    ]
  },
  emotion: {
    title: "记录一次情绪",
    kind: "Emotion",
    description: "记录触发原因、第一反应和处理方式。",
    fields: [
      { name: "emotion", label: "当前情绪", type: "text", required: true, placeholder: "例如：焦虑、烦躁、兴奋、平静" },
      { name: "intensity", label: "强度", type: "range", min: 1, max: 10, value: 5 },
      { name: "trigger", label: "是谁或什么事触发的", type: "textarea", required: true },
      { name: "first_reaction", label: "我的第一反应", type: "textarea" },
      { name: "response", label: "我最后怎么处理", type: "textarea" },
      { name: "boundary_or_preference", label: "它反映了我的什么偏好或底线", type: "textarea" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔" }
    ]
  },
  interaction: {
    title: "记录一次人与人的互动",
    kind: "Interaction",
    description: "记录对方、关系、对话内容、真实感受和下次要记住的事。",
    fields: [
      { name: "person", label: "对方是谁", type: "text", required: true },
      { name: "relationship", label: "关系", type: "text", placeholder: "例如：朋友、家人、客户、同事、陌生人" },
      { name: "topic", label: "我们聊了什么", type: "textarea", required: true },
      { name: "my_feeling", label: "我对这次互动的真实感受", type: "textarea" },
      { name: "unsaid_words", label: "有没有隐藏没说的话", type: "textarea" },
      { name: "relationship_state", label: "这段关系现在是什么状态", type: "textarea" },
      { name: "next_memory", label: "下次需要记得什么", type: "textarea" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔" }
    ]
  },
  daily_review: {
    title: "每晚 5 分钟复盘",
    kind: "Daily Review",
    description: "用固定问题收口一天，不做自由散文。",
    fields: [
      { name: "top_three_events", label: "今天最重要的三件事", type: "textarea", required: true },
      { name: "representative_decision", label: "今天最能代表我的一个决定", type: "textarea" },
      { name: "main_emotion", label: "今天最明显的情绪", type: "textarea" },
      { name: "quote", label: "今天有没有一句原话值得保存", type: "textarea" },
      { name: "important_person", label: "今天有没有一个人需要记住", type: "textarea" },
      { name: "self_observation", label: "今天我对自己有什么新发现", type: "textarea" },
      { name: "tomorrow_reminders", label: "明天或之后要提醒的事", type: "textarea" },
      { name: "tags", label: "标签", type: "tags", placeholder: "用逗号分隔" }
    ]
  }
};

const entryGrid = document.querySelector("#entryGrid");
const captureModal = document.querySelector("#captureModal");
const capturePanel = document.querySelector("#capturePanel");
const historyPanel = document.querySelector("#historyPanel");
const captureForm = document.querySelector("#captureForm");
const templateTitle = document.querySelector("#templateTitle");
const templateKind = document.querySelector("#templateKind");
const toast = document.querySelector("#toast");

let activeTemplateKey = null;
let recorder = null;
let audioChunks = [];
let recordedAudio = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function nowLocalValue() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 16);
}

function renderEntries() {
  entryGrid.innerHTML = Object.entries(templates)
    .map(([key, template]) => `
      <button class="entry-card" type="button" data-template="${key}">
        <strong>${template.title}</strong>
        <span>${template.description}</span>
      </button>
    `)
    .join("");

  entryGrid.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => openTemplate(button.dataset.template));
  });
}

function buildField(field) {
  const value = field.value ?? "";
  const required = field.required ? "required" : "";
  const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";
  const hint = field.hint ? `<small>${field.hint}</small>` : "";

  if (field.type === "textarea") {
    return `
      <div class="field">
        <label for="${field.name}">${field.label}</label>
        <textarea id="${field.name}" name="${field.name}" ${required} ${placeholder}></textarea>
        ${hint}
      </div>
    `;
  }

  if (field.type === "range") {
    return `
      <div class="field">
        <label for="${field.name}">${field.label}：<span data-range-value="${field.name}">${value}</span>/10</label>
        <input id="${field.name}" name="${field.name}" type="range" min="${field.min}" max="${field.max}" value="${value}" />
        ${hint}
      </div>
    `;
  }

  if (field.type === "tag_picker") {
    return `
      <div class="field tag-picker" data-tag-picker="${field.name}">
        <label>${field.label}</label>
        <div class="tag-cloud" aria-label="${field.label}预设气泡">
          ${field.options.map((option) => `
            <button class="tag-chip" type="button" data-tag-value="${option}" aria-pressed="false">${option}</button>
          `).join("")}
        </div>
        <div class="custom-tag-row">
          <input id="${field.name}Custom" type="text" placeholder="自定义关键词，多个可用逗号分隔" autocomplete="off" />
          <button class="ghost-button add-tag-button" type="button" data-add-custom-tag="${field.name}">添加</button>
        </div>
        <div class="selected-tags" data-selected-tags="${field.name}" aria-live="polite"></div>
        ${hint}
      </div>
    `;
  }

  return `
    <div class="field">
      <label for="${field.name}">${field.label}</label>
      <input id="${field.name}" name="${field.name}" type="text" ${required} ${placeholder} />
      ${hint}
    </div>
  `;
}

function renderAudioControls() {
  return `
    <div class="audio-box">
      <div class="audio-controls">
        <button id="startRecording" class="primary-button" type="button">开始录音</button>
        <button id="stopRecording" class="danger-button" type="button" disabled>停止录音</button>
        <button id="clearRecording" class="ghost-button" type="button" disabled>清除录音</button>
      </div>
      <audio id="audioPreview" controls hidden></audio>
      <small id="audioStatus">录音会作为 base64 数据跟随 JSON 一起提交。</small>
    </div>
  `;
}

function openTemplate(key) {
  activeTemplateKey = key;
  recordedAudio = null;
  audioChunks = [];

  const template = templates[key];
  templateTitle.textContent = template.title;
  templateKind.textContent = template.kind;

  captureForm.innerHTML = `
    <div class="field-row">
      <div class="field">
        <label for="capturedAt">采集时间</label>
        <input id="capturedAt" name="capturedAt" type="datetime-local" value="${nowLocalValue()}" required />
      </div>
      <div class="field">
        <label for="privacyLevel">隐私级别</label>
        <select id="privacyLevel" name="privacyLevel">
          <option value="private">private：仅自己可见</option>
          <option value="assistant_only">assistant_only：AI 可用但不能对外引用</option>
          <option value="shareable">shareable：授权后可对外使用</option>
          <option value="locked">locked：极私密，不进入 AI 上下文</option>
        </select>
      </div>
    </div>
    ${template.hasAudio ? renderAudioControls() : ""}
    ${template.fields.map(buildField).join("")}
    <div class="form-actions">
      <button id="cancelButton" class="ghost-button" type="button">取消</button>
      <button class="primary-button" type="submit">提交采集</button>
    </div>
  `;

  bindFormControls();
  captureModal.hidden = false;
  document.body.classList.add("modal-open");
  capturePanel.scrollTop = 0;
  historyPanel.hidden = true;
  capturePanel.hidden = false;
  window.setTimeout(() => document.querySelector("#backButton").focus(), 0);
}

function closePanels() {
  captureModal.hidden = true;
  capturePanel.hidden = true;
  historyPanel.hidden = true;
  entryGrid.hidden = false;
  document.body.classList.remove("modal-open");
  stopRecordingIfNeeded();
}

function bindFormControls() {
  captureForm.querySelectorAll('input[type="range"]').forEach((input) => {
    const output = captureForm.querySelector(`[data-range-value="${input.name}"]`);
    input.addEventListener("input", () => {
      output.textContent = input.value;
    });
  });

  captureForm.querySelector("#cancelButton").addEventListener("click", closePanels);
  bindTagPickers();

  const startButton = captureForm.querySelector("#startRecording");
  if (startButton) {
    startButton.addEventListener("click", startRecording);
    captureForm.querySelector("#stopRecording").addEventListener("click", stopRecording);
    captureForm.querySelector("#clearRecording").addEventListener("click", clearRecording);
  }
}

function bindTagPickers() {
  captureForm.querySelectorAll("[data-tag-picker]").forEach((picker) => {
    const name = picker.dataset.tagPicker;
    const customInput = picker.querySelector(`#${name}Custom`);

    picker.querySelectorAll("[data-tag-value]").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("selected");
        button.setAttribute("aria-pressed", button.classList.contains("selected") ? "true" : "false");
        renderSelectedTags(name);
      });
    });

    picker.querySelector(`[data-add-custom-tag="${name}"]`).addEventListener("click", () => {
      addCustomTags(name);
    });

    customInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addCustomTags(name);
      }
    });
  });
}

function addCustomTags(name) {
  const picker = captureForm.querySelector(`[data-tag-picker="${name}"]`);
  const customInput = picker.querySelector(`#${name}Custom`);
  const selectedWrap = picker.querySelector(`[data-selected-tags="${name}"]`);
  const newTags = parseTags(customInput.value);

  for (const tag of newTags) {
    const exists = selectedWrap.querySelector(`[data-custom-tag="${cssEscape(tag)}"]`)
      || picker.querySelector(`[data-tag-value="${cssEscape(tag)}"].selected`);

    if (!exists) {
      selectedWrap.insertAdjacentHTML("beforeend", `
        <button class="tag-chip selected custom-selected-tag" type="button" data-custom-tag="${escapeHtml(tag)}" aria-label="移除 ${escapeHtml(tag)}">${escapeHtml(tag)} ×</button>
      `);
    }
  }

  customInput.value = "";
  selectedWrap.querySelectorAll("[data-custom-tag]").forEach((button) => {
    button.onclick = () => button.remove();
  });
}

function renderSelectedTags(name) {
  const picker = captureForm.querySelector(`[data-tag-picker="${name}"]`);
  const selectedPresetTags = Array.from(picker.querySelectorAll("[data-tag-value].selected")).map((button) => button.dataset.tagValue);
  const selectedWrap = picker.querySelector(`[data-selected-tags="${name}"]`);
  const customTags = Array.from(selectedWrap.querySelectorAll("[data-custom-tag]")).map((button) => button.dataset.customTag);
  const allTags = [...selectedPresetTags, ...customTags];

  if (!allTags.length) {
    selectedWrap.setAttribute("data-empty", "true");
    selectedWrap.innerHTML = "";
    return;
  }

  selectedWrap.removeAttribute("data-empty");
  selectedWrap.querySelectorAll("[data-preset-preview]").forEach((button) => button.remove());
  selectedWrap.insertAdjacentHTML("afterbegin", selectedPresetTags.map((tag) => `
    <button class="tag-chip selected preset-preview-tag" type="button" data-preset-preview="${escapeHtml(tag)}">${escapeHtml(tag)}</button>
  `).join(""));
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("当前浏览器不支持录音。");
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioChunks = [];
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => audioChunks.push(event.data);
  recorder.onstop = async () => {
    const blob = new Blob(audioChunks, { type: recorder.mimeType || "audio/webm" });
    recordedAudio = {
      mimeType: blob.type,
      size: blob.size,
      base64: await blobToBase64(blob)
    };

    const preview = captureForm.querySelector("#audioPreview");
    preview.src = URL.createObjectURL(blob);
    preview.hidden = false;
    captureForm.querySelector("#audioStatus").textContent = `已录音，大小 ${Math.round(blob.size / 1024)} KB。`;
    captureForm.querySelector("#clearRecording").disabled = false;
    stream.getTracks().forEach((track) => track.stop());
  };

  recorder.start();
  captureForm.querySelector("#startRecording").disabled = true;
  captureForm.querySelector("#stopRecording").disabled = false;
  captureForm.querySelector("#audioStatus").textContent = "正在录音...";
}

function stopRecording() {
  if (recorder && recorder.state === "recording") {
    recorder.stop();
  }
  captureForm.querySelector("#startRecording").disabled = false;
  captureForm.querySelector("#stopRecording").disabled = true;
}

function stopRecordingIfNeeded() {
  if (recorder && recorder.state === "recording") {
    recorder.stop();
  }
}

function clearRecording() {
  recordedAudio = null;
  audioChunks = [];
  const preview = captureForm.querySelector("#audioPreview");
  preview.removeAttribute("src");
  preview.hidden = true;
  captureForm.querySelector("#clearRecording").disabled = true;
  captureForm.querySelector("#audioStatus").textContent = "录音已清除。";
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function parseTags(value) {
  return value
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function collectTagPickerValues(name) {
  const picker = captureForm.querySelector(`[data-tag-picker="${name}"]`);
  if (!picker) {
    return [];
  }

  const selectedTags = Array.from(picker.querySelectorAll("[data-tag-value].selected")).map((button) => button.dataset.tagValue);
  const customInputTags = parseTags(picker.querySelector(`#${name}Custom`)?.value ?? "");
  const customBubbleTags = Array.from(picker.querySelectorAll("[data-custom-tag]")).map((button) => button.dataset.customTag);
  return Array.from(new Set([...selectedTags, ...customBubbleTags, ...customInputTags]));
}

function cssEscape(value) {
  if (window.CSS?.escape) {
    return CSS.escape(value);
  }

  return value.replaceAll('"', '\\"');
}

function formToStructuredPayload(formData) {
  const template = templates[activeTemplateKey];
  const fields = {};

  for (const field of template.fields) {
    const rawValue = formData.get(field.name)?.trim() ?? "";
    if (field.type === "tags") {
      fields[field.name] = parseTags(rawValue);
    } else if (field.type === "tag_picker") {
      fields[field.name] = collectTagPickerValues(field.name);
    } else {
      fields[field.name] = rawValue;
    }
  }

  return {
    captureType: activeTemplateKey,
    captureTitle: template.title,
    capturedAt: formData.get("capturedAt"),
    privacyLevel: formData.get("privacyLevel"),
    fields,
    attachments: recordedAudio ? [{ kind: "audio", ...recordedAudio }] : [],
    schemaVersion: 1
  };
}

captureForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = formToStructuredPayload(new FormData(captureForm));
  if (payload.captureType === "keyword_tags" && !payload.fields.keywords.length) {
    showToast("请至少选择或写入一个标签。");
    return;
  }

  const response = await fetch("/api/captures", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    showToast("提交失败，请稍后重试。");
    return;
  }

  const result = await response.json();
  showToast(`已保存：${result.id}`);
  closePanels();
});

async function openHistory() {
  entryGrid.hidden = true;
  captureModal.hidden = true;
  capturePanel.hidden = true;
  historyPanel.hidden = false;
  document.body.classList.remove("modal-open");

  const list = document.querySelector("#historyList");
  list.innerHTML = "<p>正在加载...</p>";

  const response = await fetch("/api/captures");
  const data = await response.json();

  if (!data.records.length) {
    list.innerHTML = "<p>还没有采集记录。</p>";
    return;
  }

  list.innerHTML = data.records
    .map((record) => `
      <article class="history-item">
        <strong>${record.payload.captureTitle || record.payload.captureType}</strong>
        <p>${record.receivedAt}</p>
        <pre>${escapeHtml(JSON.stringify(record, null, 2))}</pre>
      </article>
    `)
    .join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#backButton").addEventListener("click", closePanels);
document.querySelector("#historyButton").addEventListener("click", openHistory);
document.querySelector("#historyBackButton").addEventListener("click", closePanels);
captureModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closePanels();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !captureModal.hidden) {
    closePanels();
  }
});

renderEntries();
