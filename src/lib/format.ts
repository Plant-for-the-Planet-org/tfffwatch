import millify from "millify";

export function toReadable(n: number | string) {
  return millify(+n, { lowercase: true, precision: 2, locales: "en" });
}

export function toReadableAmount(n: number | string, decimal: boolean = true) {
  // Chnage first ternary statement to true to use decimal always
  const ifBillions = +n >= 1e9 ? true : false;
  return (
    "$" +
    millify(+n, {
      lowercase: true,
      precision: ifBillions ? 2 : decimal ? 2 : 0,
      locales: "en",
      units: ["", "k", "m", "bn", "t"],
    })
  );
}

// Short dollar amount with 3 significant digits: $1.30bn, $841m, $89.5m, $0.
export function toShortUsd(n: number): string {
  if (!n || n <= 0) return "$0";
  const units = [
    { v: 1e12, s: "t" },
    { v: 1e9, s: "bn" },
    { v: 1e6, s: "m" },
    { v: 1e3, s: "k" },
  ];
  const unit = units.find((u) => n >= u.v);
  if (!unit) return `$${Math.round(n)}`;
  const x = n / unit.v;
  const digits = x >= 100 ? 0 : x >= 10 ? 1 : 2;
  return `$${x.toFixed(digits)}${unit.s}`;
}

export function toReadableAmountLong(
  n: number | string,
  withSymbol = true,
  decimal = false
): string {
  const num = +n;
  const prefix = withSymbol ? "$" : "";
  const decimalPlaces = decimal ? 3 : 0;

  // Helper to remove trailing zeros
  const formatNumber = (value: number) => {
    return parseFloat(value.toFixed(decimalPlaces)).toString();
  };

  if (num >= 1e9) {
    // For billions
    return `${prefix}${formatNumber(num / 1e9)} Billion`;
  } else if (num >= 1e6) {
    // For millions
    return `${prefix}${formatNumber(num / 1e6)} Million`;
  } else if (num >= 1e3) {
    // For thousands
    return `${prefix}${formatNumber(num / 1e3)} Thousand`;
  }

  return `${prefix}${formatNumber(num)}`;
}
