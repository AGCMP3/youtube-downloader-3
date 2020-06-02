export function Utils() {
  function downloadFile(blob, title) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const self = {
    downloadFile,
  };

  return Object.freeze(self);
}
