exports.Utils = function Utils() {
  function id() {
    let dt = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return "id-" + uuid;
  }

  function interpolate(xInterval, yInterval) {
    const [x0, x1] = xInterval;
    const [y0, y1] = yInterval;

    return (xA) => {
      if (xA > x1) xA = x1;
      else if (xA < x0) xA = x0;

      const yA = y0 + (y1 - y0) * ((xA - x0) / (x1 - x0));

      return Number(yA.toFixed(1));
    };
  }

  const self = {
    id,
    interpolate,
  };

  return Object.freeze(self);
};
