
export async function calculatePrice(_addresstype: string, praefixLength: number, _praefix_casesensitive: boolean) {

  let praefix_price = 0;
  let praefix_cs_price = 0;

  switch (praefixLength) {
    case 1:
      praefix_price = 0;
      break;
    case 2:
      switch (_addresstype) {
        case '1':
          praefix_price = 0;
          break;
        case '3':
          praefix_price = 0;
          break;
        case 'bc1q':
          praefix_price = 0;
          break;
      }
      break;
    case 3:
      switch (_addresstype) {
        case '1':
        case '3':
          praefix_price = 0;
          break;
        case 'bc1q':
          praefix_price = 0;
          break;
      }
      break;
    case 4:
      switch (_addresstype) {
        case '1':
        case '3':
          praefix_price = 2;
          break;
        case 'bc1q':
          praefix_price = 2;
          break;
      }
      break;
    case 5:
      switch (_addresstype) {
        case '1':
        case '3':
          praefix_price = 16;
          break;
        case 'bc1q':
          praefix_price = 16;
          break;
      }
      break;
    case 6:
      switch (_addresstype) {
        case '1':
        case '3':
          praefix_price = 32;
          break;
        case 'bc1q':
          praefix_price = 32;
          break;
      }
      break;
    case 7:
      switch (_addresstype) {
        case '1':
          praefix_price = 85;
          break;
        case '3':
          praefix_price = 65;
          break;
        case 'bc1q':
          praefix_price = 15;
          break;
      }
      break;
    case 8:
      switch (_addresstype) {
        case '1':
          praefix_price = 412;
          break;
        case '3':
          praefix_price = 360;
          break;
        case 'bc1q':
          praefix_price = 95;
          break;
      }
      break;
    case 9:
      switch (_addresstype) {
        case '1':
          praefix_price = 5000;
          break;
        case '3':
          praefix_price = 2000;
          break;
        case 'bc1q':
          praefix_price = 512;
          break;
      }
      break;
    case 10:
      switch (_addresstype) {
        case '1':
          praefix_price = 30000;
          break;
        case '3':
          praefix_price = 15000;
          break;
        case 'bc1q':
          praefix_price = 2000;
          break;
      }
      break;
    default:
      break;
  }

  if (!_praefix_casesensitive) {
    switch (_addresstype) {
      case '1':
      case '3':
        praefix_cs_price = (-1) * (praefix_price * 0.7);
        break;
      case 'bc1q':
        praefix_cs_price = 0;
        break;
    }
  }


  const price = praefix_price + Math.round(praefix_cs_price)
  const taxes = price * 0.19
  return {
    price: price,
    priceIncltaxes: taxes
  }
}