export const MENU_SPACING_CSS = `
header nav ul,
nav ul {
  column-gap: 18px !important;
}

header nav a + a,
nav a + a {
  margin-left: 18px !important;
}

header nav [class*="menu"] > *,
nav [class*="menu"] > * {
  margin-right: 18px !important;
}

header nav [class*="menu"] > *:last-child,
nav [class*="menu"] > *:last-child {
  margin-right: 0 !important;
}
`;
