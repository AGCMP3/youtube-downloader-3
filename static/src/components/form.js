import { InputError } from "./input-error";
import { Utils } from "./utils";

import { Socket } from "./socket";

export async function Form() {
  const io = Socket();

  const id = await io.connect();
  const socket = io.getSocket();

  const inputError = InputError();
  const utils = Utils();

  const form = document.querySelector(".main-form");

  form.addEventListener("submit", onSubmit);

  socket.on("fetch-info", () => {
    console.log("fetching info...");
  });

  socket.on("start-download", () => {
    console.log("downloading...");
  });

  socket.on("download-state-change", (percent) => {
    console.log(percent + "%");
  });

  socket.on("download-complete", () => {
    console.log("complete, enjoy");
  });

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
        "socket-client-id": id,
      },
    });

    const { headers } = response;

    const blob = await response.blob();

    const title = headers.get("video-title");

    utils.downloadFile(blob, title);
  }
}
