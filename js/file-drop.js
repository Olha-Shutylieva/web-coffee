const zones = document.querySelectorAll(".dropzone");

zones.forEach((zone) => {
  const input = zone.querySelector("input[type='file']");
  const status = zone.querySelector(".dropzone__file");
  const emptyText = status.textContent;

  const showFile = () => {
    const file = input.files[0];
    zone.classList.remove("dropzone--error");
    zone.classList.toggle("dropzone--filled", Boolean(file));
    status.textContent = file ? file.name : emptyText;
  };

  const accepts = (file) => {
    const rules = input.accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean);
    if (rules.length === 0) {
      return true;
    }
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) => {
      if (rule.startsWith(".")) {
        return name.endsWith(rule);
      }
      if (rule.endsWith("/*")) {
        return type.startsWith(rule.slice(0, -1));
      }
      return type === rule;
    });
  };

  const takeFile = (file) => {
    if (!file || !accepts(file)) {
      input.value = "";
      zone.classList.remove("dropzone--filled");
      zone.classList.add("dropzone--error");
      status.textContent = "Підходить лише SVG, WebP або PNG";
      return;
    }
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    showFile();
  };

  input.addEventListener("change", showFile);
  showFile();

  zone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    zone.classList.add("dropzone--over");
  });

  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    zone.classList.add("dropzone--over");
  });

  zone.addEventListener("dragleave", (event) => {
    if (zone.contains(event.relatedTarget)) {
      return;
    }
    zone.classList.remove("dropzone--over");
  });

  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    zone.classList.remove("dropzone--over");
    takeFile(event.dataTransfer.files[0]);
  });

  input.form.addEventListener("reset", () => {
    window.setTimeout(showFile, 0);
  });
});
