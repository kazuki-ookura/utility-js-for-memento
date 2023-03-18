function getAge(birthDate, referenceDate) {
  // ”N’PˆÊ‚Å·‚ğŒvZ
  var age = referenceDate.getFullYear() - birthDate.getFullYear();
  // ’a¶Œ‚ÆŠî€Œ‚ğ”äŠr
  var monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    // ’a¶Œ‚ª–¢—ˆ‚©“¯‚¶‚Å‚à’a¶“ú‚ª–¢—ˆ‚È‚ç1Îˆø‚­
    age--;
  }
  return age;
}