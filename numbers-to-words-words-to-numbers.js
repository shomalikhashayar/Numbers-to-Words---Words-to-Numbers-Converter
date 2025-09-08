/**
 * Convert numbers to words and words to numbers
 *
 * Author: Khashayar Shomali => https://github.com/shomalikhashayar
 * Repository: https://github.com/shomalikhashayar/Numbers-to-Words---Words-to-Numbers-Converter
 *
 * Usage:
 *
 * 1. Convert number to words:
 *    numberToWords(1234, 'fa')  // "یک هزار و دویست و سی و چهار"
 *    numberToWords(1234, 'en')  // "one thousand two hundred thirty four"
 *    numberToWords(1234, 'ar')  // "ألف و مائتان و أربعة و ثلاثون"
 *
 * 2. Convert words to number:
 *    wordsToNumber("یک هزار و دویست و سی و چهار", 'fa')  // 1234
 *    wordsToNumber("one thousand two hundred thirty four", 'en')  // 1234
 *    wordsToNumber("ألف و مائتان و أربعة و ثلاثون", 'ar')  // 1234
 *
 * Supported languages:
 * - 'fa': Persian
 * - 'en': English
 * - 'ar': Arabic
 *
 * Limitations:
 * - Maximum number: 999,999,999,999,999 (999 trillion)
 * - For negative numbers, "منفی" or "minus" or "سالب" is added
 */

const dictionaries = {
  fa: {
    units: ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
    teens: [
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هجده",
      "نوزده",
    ],
    tens: [
      "",
      "",
      "بیست",
      "سی",
      "چهل",
      "پنجاه",
      "شصت",
      "هفتاد",
      "هشتاد",
      "نود",
    ],
    hundreds: [
      "",
      "یکصد",
      "دویست",
      "سیصد",
      "چهارصد",
      "پانصد",
      "ششصد",
      "هفتصد",
      "هشتصد",
      "نهصد",
    ],
    scales: ["", "هزار", "میلیون", "میلیارد", "هزار میلیارد"],
  },
  en: {
    units: [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ],
    teens: [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    tens: [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ],
    hundreds: [
      "",
      "one hundred",
      "two hundred",
      "three hundred",
      "four hundred",
      "five hundred",
      "six hundred",
      "seven hundred",
      "eight hundred",
      "nine hundred",
    ],
    scales: ["", "thousand", "million", "billion", "trillion"],
  },
  ar: {
    units: [
      "",
      "واحد",
      "اثنان",
      "ثلاثة",
      "أربعة",
      "خمسة",
      "ستة",
      "سبعة",
      "ثمانية",
      "تسعة",
    ],
    teens: [
      "عشرة",
      "أحد عشر",
      "اثنا عشر",
      "ثلاثة عشر",
      "أربعة عشر",
      "خمسة عشر",
      "ستة عشر",
      "سبعة عشر",
      "ثمانية عشر",
      "تسعة عشر",
    ],
    tens: [
      "",
      "",
      "عشرون",
      "ثلاثون",
      "أربعون",
      "خمسون",
      "ستون",
      "سبعون",
      "ثمانون",
      "تسعون",
    ],
    hundreds: [
      "",
      "مائة",
      "مائتان",
      "ثلاثمائة",
      "أربعمائة",
      "خمسمائة",
      "ستمائة",
      "سبعمائة",
      "ثمانمائة",
      "تسعمائة",
    ],
    scales: ["", "ألف", "مليون", "مليار", "ترليون"],
  },
};

// Convert 3-digit chunk to words
function convertChunk(number, dict, lang) {
  let parts = [];
  let hundreds = Math.floor(number / 100);
  let tensUnits = number % 100;
  let tens = Math.floor(tensUnits / 10);
  let units = tensUnits % 10;

  if (hundreds > 0) parts.push(dict.hundreds[hundreds]);

  if (tensUnits > 0) {
    if (tensUnits < 10) {
      parts.push(dict.units[units]);
    } else if (tensUnits < 20) {
      parts.push(dict.teens[tensUnits - 10]);
    } else {
      if (units > 0) {
        if (lang === "fa" || lang === "ar") {
          parts.push(`${dict.tens[tens]} و ${dict.units[units]}`);
        } else if (lang === "en") {
          // Use hyphen for compound numbers in English
          parts.push(`${dict.tens[tens]}-${dict.units[units]}`);
        } else {
          parts.push(`${dict.tens[tens]} ${dict.units[units]}`);
        }
      } else {
        parts.push(dict.tens[tens]);
      }
    }
  }

  // Join parts with appropriate separator
  if (parts.length > 1 && (lang === "fa" || lang === "ar")) {
    return parts.join(" و ");
  }
  return parts.join(" ");
}

// Convert number to words
export function numberToWords(number, lang = "fa") {
  number = Math.trunc(number);

  if (number === 0) {
    if (lang === "fa") return "صفر";
    if (lang === "en") return "Zero";
    if (lang === "ar") return "صفر";
  }

  const dict = dictionaries[lang];
  let chunks = [];
  let chunkIndex = 0;
  let num = Math.abs(number);

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      let chunkWords = convertChunk(chunk, dict, lang);
      let scale = dict.scales[chunkIndex];

      if (lang === "ar" && chunk === 1 && chunkIndex > 0) {
        chunkWords = scale;
      } else if (scale) {
        chunkWords += scale ? ` ${scale}` : "";
      }
      chunks.unshift(chunkWords.trim());
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }

  let result;
  if (lang === "fa" || lang === "ar") {
    result = chunks.join(" و ");
  } else if (lang === "en") {
    // For English, join with commas and spaces, and capitalize first letter
    result = chunks.join(", ");
    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
  } else {
    result = chunks.join(" ");
  }

  if (number < 0) {
    if (lang === "fa") result = "منفی " + result;
    if (lang === "en") result = "Minus " + result;
    if (lang === "ar") result = "سالب " + result;
  }

  return result;
}

// Convert words to number
export function wordsToNumber(text, lang = "fa") {
  if (!text) return null;

  text = text.toString().trim();
  if (!text) return null;

  if (lang === "fa") {
    const map = {
      صفر: 0,
      یک: 1,
      دو: 2,
      سه: 3,
      چهار: 4,
      پنج: 5,
      شش: 6,
      هفت: 7,
      هشت: 8,
      نه: 9,
      ده: 10,
      یازده: 11,
      دوازده: 12,
      سیزده: 13,
      چهارده: 14,
      پانزده: 15,
      شانزده: 16,
      هفده: 17,
      هجده: 18,
      نوزده: 19,
      بیست: 20,
      سی: 30,
      چهل: 40,
      پنجاه: 50,
      شصت: 60,
      هفتاد: 70,
      هشتاد: 80,
      نود: 90,
      صد: 100,
      یکصد: 100,
      دویست: 200,
      سیصد: 300,
      چهارصد: 400,
      پانصد: 500,
      ششصد: 600,
      هفتصد: 700,
      هشتصد: 800,
      نهصد: 900,
      هزار: 1000,
      میلیون: 1000000,
      میلیارد: 1000000000,
      تریلیون: 1000000000000,
      "هزار میلیارد": 1000000000000,
    };

    // Process text: replace "هزار میلیارد" with "تریلیون" and "هزار میلیون" with "میلیارد"
    let processedText = text.replace(/هزار\s+میلیارد/g, "تریلیون");
    processedText = processedText.replace(/هزار\s+میلیون/g, "میلیارد");
    let processedWords = processedText
      .split(/\s+/)
      .filter((word) => word.trim() !== "");

    let total = 0;
    let currentGroup = 0;
    let hasValidNumber = false;

    for (let word of processedWords) {
      // Skip "و" (and) words
      if (word === "و") continue;

      let value = map[word];
      if (value === undefined) continue;

      hasValidNumber = true;

      if (value >= 1000) {
        // This is a multiplier (thousand, million, billion, trillion)
        if (currentGroup > 0) {
          total += currentGroup * value;
        } else {
          total += value;
        }
        currentGroup = 0;
      } else if (value >= 100) {
        // This is a hundreds number
        if (currentGroup > 0) {
          currentGroup = currentGroup * value;
        } else {
          currentGroup = value;
        }
      } else {
        // This is a unit or tens number
        currentGroup += value;
      }
    }

    // Add the last group
    total += currentGroup;
    return hasValidNumber ? total : null;
  }

  if (lang === "en") {
    const map = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000,
      trillion: 1000000000000,
    };

    // Process text: replace "thousand billion" with "trillion" and "thousand million" with "billion"
    let processedText = text
      .toLowerCase()
      .replace(/thousand\s+billion/g, "trillion");
    processedText = processedText.replace(/thousand\s+million/g, "billion");

    // Split on commas, spaces, and hyphens, then filter out empty words
    let words = processedText
      .split(/[,\s-]+/)
      .filter((word) => word.trim() !== "");

    let total = 0;
    let currentGroup = 0;
    let hasValidNumber = false;

    for (let word of words) {
      let value = map[word];
      if (value === undefined) continue;

      hasValidNumber = true;

      if (value >= 1000) {
        // This is a multiplier (thousand, million, billion, trillion)
        if (currentGroup > 0) {
          total += currentGroup * value;
        } else {
          total += value;
        }
        currentGroup = 0;
      } else if (value === 100) {
        // This is "hundred"
        if (currentGroup > 0) {
          currentGroup = currentGroup * 100;
        } else {
          currentGroup = 100;
        }
      } else {
        // This is a unit or tens number
        currentGroup += value;
      }
    }

    // Add the last group
    total += currentGroup;
    return hasValidNumber ? total : null;
  }

  if (lang === "ar") {
    const map = {
      صفر: 0,
      واحد: 1,
      اثنان: 2,
      ثلاثة: 3,
      أربعة: 4,
      خمسة: 5,
      ستة: 6,
      سبعة: 7,
      ثمانية: 8,
      تسعة: 9,
      عشرة: 10,
      "أحد عشر": 11,
      "اثنا عشر": 12,
      "ثلاثة عشر": 13,
      "أربعة عشر": 14,
      "خمسة عشر": 15,
      "ستة عشر": 16,
      "سبعة عشر": 17,
      "ثمانية عشر": 18,
      "تسعة عشر": 19,
      عشرون: 20,
      ثلاثون: 30,
      أربعون: 40,
      خمسون: 50,
      ستون: 60,
      سبعون: 70,
      ثمانون: 80,
      تسعون: 90,
      مائة: 100,
      مائتان: 200,
      ثلاثمائة: 300,
      أربعمائة: 400,
      خمسمائة: 500,
      ستمائة: 600,
      سبعمائة: 700,
      ثمانمائة: 800,
      تسعمائة: 900,
      ألف: 1000,
      مليون: 1000000,
      مليار: 1000000000,
      ترليون: 1000000000000,
    };

    // Process text: replace "ألف مليار" with "ترليون" and "ألف مليون" with "مليار"
    let processedText = text.replace(/ألف\s+مليار/g, "ترليون");
    processedText = processedText.replace(/ألف\s+مليون/g, "مليار");
    let processedWords = processedText
      .split(/\s+/)
      .filter((word) => word.trim() !== "");

    let total = 0;
    let currentGroup = 0;
    let hasValidNumber = false;

    for (let word of processedWords) {
      // Skip "و" (and) words
      if (word === "و") continue;

      let value = map[word];
      if (value === undefined) continue;

      hasValidNumber = true;

      if (value >= 1000) {
        // This is a multiplier (ألف، مليون، مليار، ترليون)
        if (currentGroup > 0) {
          total += currentGroup * value;
        } else {
          total += value;
        }
        currentGroup = 0;
      } else if (value >= 100) {
        // This is a hundreds number
        if (currentGroup > 0) {
          currentGroup = currentGroup * value;
        } else {
          currentGroup = value;
        }
      } else {
        // This is a unit or tens number
        currentGroup += value;
      }
    }

    // Add the last group
    total += currentGroup;
    return hasValidNumber ? total : null;
  }

  return null;
}
