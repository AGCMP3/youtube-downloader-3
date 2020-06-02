import { InputError } from "./input-error";
import { Utils } from "./utils";

import { Socket } from "./socket";

export function Form() {
  Socket();

  const inputError = InputError();
  const utils = Utils();

  const form = document.querySelector(".main-form");

  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();

    const videoURL = document.querySelector("input[name=video-url]").value;
    const downloadAsVideo =
      document.querySelector("select").value === "Video - mp4";

    if (!videoURL) return inputError.show();
    inputError.hide();

    const response = await fetch("/download", {
      headers: {
        "video-url": videoURL,
        "download-as-video": downloadAsVideo.toString(),
      },
    });

    const { headers } = response;

    const blob = await response.blob();

    const title = headers.get("video-title");

    utils.downloadFile(blob, title);
  }
}