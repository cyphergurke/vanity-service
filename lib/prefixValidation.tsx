export const rules: any = {
    "1": {
      allowed: /^[1-9A-HJ-NP-Za-kn-z]+$/,
      disallowed: /[0OIl]/,
      maxLength: 8,
      typeName: "Legacy",
    },
    "3": {
      allowed: /^[1-9A-HJ-NP-Za-kn-z]*$/,
      disallowed: /[0OIl]/,
      maxLength: 8,
      typeName: "Nested SegWit",
    },
    "bc1q": {
      allowed: /^[0-9a-qs-z]$/,
      disallowed: /[1bio]/,
      maxLength: 10,
      typeName: "Native SegWit Bech32",
    },
  };

export const validateAddressPrefix = (addrType: string, prefixStr: string, translate: any) => {
    let disallowedChars = [];
    let invalidChars = [];
    const rule = rules[addrType];
    let errors = [];
    if (addrType === "3" && !/^[2-9A-Q]/.test(prefixStr[0])) {
      errors.push(<p>{translate.disallowedfirstchar}: {prefixStr[0]}</p>)
    }
    for (let i = 0; i < prefixStr.length; i++) {
      const char = prefixStr[i];
      if (rule.disallowed.test(char)) {
        disallowedChars.push(char);
      } else if (!rule.allowed.test(char)) {
        invalidChars.push(char);
      }
    }
    if (disallowedChars.length > 0) {
      errors.push(<p>{translate.disallowedPrefix}: {[...new Set(disallowedChars)].join(', ')}</p>);
    }
    if (invalidChars.length > 0) {
      errors.push(<p>{translate.invalidPrefix}: {[...new Set(invalidChars)].join(', ')}</p>);
    }
    return errors
  };