function getAge(birthDate, referenceDate) {
  // �N�P�ʂō����v�Z
  var age = referenceDate.getFullYear() - birthDate.getFullYear();
  // �a�����Ɗ�����r
  var monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    // �a�����������������ł��a�����������Ȃ�1�Έ���
    age--;
  }
  return age;
}