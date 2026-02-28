(function () {
  const cfg = window.KD_ANALYTICS_CONFIG || {};
  const measurementId = String(cfg.ga4MeasurementId || "").trim();
  const isValidId = /^G-[A-Z0-9]+$/i.test(measurementId) && measurementId !== "G-XXXXXXXXXX";

  function noop() {}
  window.trackEvent = noop;
  if (!isValidId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", measurementId, {
    anonymize_ip: true,
    send_page_view: true
  });

  window.trackEvent = function trackEvent(name, params) {
    if (!name) return;
    gtag("event", name, params || {});
  };
})();
