// Monthly living cost estimates by city (£/month, 2025 data)
export const CITY_COSTS = {
  london:        { rent1bed: 2100, transport: 180, groceries: 350, total: 2800 },
  manchester:    { rent1bed: 1050, transport: 85,  groceries: 280, total: 1550 },
  birmingham:    { rent1bed: 950,  transport: 80,  groceries: 270, total: 1430 },
  leeds:         { rent1bed: 1000, transport: 80,  groceries: 270, total: 1460 },
  bristol:       { rent1bed: 1200, transport: 90,  groceries: 290, total: 1700 },
  edinburgh:     { rent1bed: 1100, transport: 75,  groceries: 290, total: 1580 },
  glasgow:       { rent1bed: 900,  transport: 75,  groceries: 260, total: 1330 },
  liverpool:     { rent1bed: 850,  transport: 75,  groceries: 260, total: 1290 },
  sheffield:     { rent1bed: 800,  transport: 70,  groceries: 255, total: 1230 },
  nottingham:    { rent1bed: 850,  transport: 70,  groceries: 255, total: 1270 },
  coventry:      { rent1bed: 800,  transport: 70,  groceries: 250, total: 1220 },
  leicester:     { rent1bed: 800,  transport: 65,  groceries: 250, total: 1210 },
  cardiff:       { rent1bed: 850,  transport: 70,  groceries: 255, total: 1270 },
  newcastle:     { rent1bed: 750,  transport: 70,  groceries: 250, total: 1160 },
  cambridge:     { rent1bed: 1400, transport: 70,  groceries: 300, total: 1870 },
  oxford:        { rent1bed: 1350, transport: 70,  groceries: 300, total: 1820 },
  reading:       { rent1bed: 1200, transport: 80,  groceries: 285, total: 1670 },
  brighton:      { rent1bed: 1250, transport: 85,  groceries: 295, total: 1730 },
  southampton:   { rent1bed: 950,  transport: 75,  groceries: 265, total: 1380 },
  portsmouth:    { rent1bed: 900,  transport: 70,  groceries: 260, total: 1320 },
  plymouth:      { rent1bed: 750,  transport: 65,  groceries: 250, total: 1150 },
  stoke:         { rent1bed: 600,  transport: 60,  groceries: 240, total: 1000 },
  hull:          { rent1bed: 550,  transport: 55,  groceries: 235, total: 940  },
  sunderland:    { rent1bed: 600,  transport: 60,  groceries: 240, total: 990  },
  wolverhampton: { rent1bed: 700,  transport: 65,  groceries: 245, total: 1100 },
};

export function getDisposable(netMonthly, locationSlug) {
  const costs = CITY_COSTS[locationSlug];
  if (!costs) return null;
  return {
    netMonthly,
    totalCosts: costs.total,
    disposable: netMonthly - costs.total,
    rent: costs.rent1bed,
    ...costs,
  };
}
