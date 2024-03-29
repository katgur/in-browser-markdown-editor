const key = "ibme-theme";

function isPreferenceLight() {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

export function getTheme(): boolean {
  const theme = localStorage.getItem(key);
  const isLight = theme && JSON.parse(theme).isLight;
  if (typeof isLight !== "boolean" && !isLight) {
    return isPreferenceLight();
  }
  return isLight;
}

export function setTheme(isLight: boolean) {
  localStorage.setItem(key, JSON.stringify({ isLight }));
}
