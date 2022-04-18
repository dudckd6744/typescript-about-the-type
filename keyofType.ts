
// TODO: Keyof Type Operator

// 해당 연산자는 keyof 개체 유형을 사용하여 해당 키의 문자열 또는 숫자 리터럴 조합을 생성한다.
// 밑에 유형 P는 x | y 의 유형을 가진다.
type Point = { x: number; y: number };
type P = keyof Point;

const tet = 'x' as P
// 

// NOTE: 유형에 문자열 또는 숫자 인덱스 서명이 있는 경우 keyof는 대신 해당 유형을 반환한ㄷ.
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

const tet2 = 3 as A

// 이 예에서 M은 string | number — JavaScript 객체 키는 항상 문자열로 강제 변환되므로 obj[0]은 항상 obj["0"]과 동일하다.
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

const tet1 = 'test' as M