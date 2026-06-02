/* Mermaid — un solo esquema de color (café/oliva Río Perdido), estable en todo el sitio */

(function () {
  const box = "#dbd0c0";
  const ink = "#1a1f1b";
  const line = "#8a7b6a";
  const page = "#f2f1ed";

  const light = {
    darkMode: false,
    background: page,
    primaryColor: box,
    secondaryColor: box,
    tertiaryColor: box,
    primaryTextColor: ink,
    secondaryTextColor: ink,
    tertiaryTextColor: ink,
    primaryBorderColor: line,
    secondaryBorderColor: line,
    tertiaryBorderColor: line,
    lineColor: line,
    textColor: ink,
    mainBkg: box,
    nodeBorder: line,
    clusterBkg: page,
    clusterBorder: line,
    titleColor: ink,
    edgeLabelBackground: box,
    edgeLabelTextColor: ink,
    arrowheadColor: line,
    entityBkg: box,
    entityBorder: line,
    attributeBackgroundColorOdd: box,
    attributeBackgroundColorEven: box,
    fontFamily: "inherit",
    fontSize: "14px",
  };

  /* Modo oscuro: mismas cajas claras que en modo claro, fondo del diagrama un poco más suave */
  const dark = {
    darkMode: true,
    background: "#313833",
    primaryColor: box,
    secondaryColor: box,
    tertiaryColor: box,
    primaryTextColor: ink,
    secondaryTextColor: ink,
    tertiaryTextColor: ink,
    primaryBorderColor: line,
    secondaryBorderColor: line,
    tertiaryBorderColor: line,
    lineColor: line,
    textColor: ink,
    mainBkg: box,
    nodeBorder: line,
    clusterBkg: "#3c423c",
    clusterBorder: line,
    titleColor: page,
    edgeLabelBackground: box,
    edgeLabelTextColor: ink,
    arrowheadColor: line,
    entityBkg: box,
    entityBorder: line,
    attributeBackgroundColorOdd: box,
    attributeBackgroundColorEven: box,
    fontFamily: "inherit",
    fontSize: "14px",
  };

  function initMermaid() {
    if (typeof mermaid === "undefined") return;
    const isDark =
      document.body.getAttribute("data-md-color-scheme") === "slate";
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: isDark ? dark : light,
    });
  }

  document$.subscribe(function () {
    initMermaid();
  });
})();
