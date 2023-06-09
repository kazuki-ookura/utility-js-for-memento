function getAge(birthDate, referenceDate) {
  // 年単位で差を計算
  var age = referenceDate.getFullYear() - birthDate.getFullYear();
  // 誕生月と基準月を比較
  var monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    // 誕生月が未来か同じでも誕生日が未来なら1歳引く
    age--;
  }
  return age;
}