class NumberFormatter {
  // format(num) will correctly insert commas into numbers >= 1,000
  static format(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export default NumberFormatter;
