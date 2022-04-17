// 제레닉 사용 방법

function identity<Type>(arg: Type): Type {
    return arg;
}

let output = identity<string>("myString");


// 
interface MyType<T> {
    name: string,
    value: T
}

const dataA: MyType<string> = {
name: 'Data A',
value: 'Hello world'
};
const dataB: MyType<number> = {
name: 'Data B',
value: 1234
};

/* --------------------------------------------------------------------------------------------------------------------------------------------  */
// TODO: extends 키워드를 사용하는 제약조건을 추가
interface MyType<T extends string | number> {
    name: string,
    value: T
}

const dataC: MyType<string> = {
name: 'Data A',
value: 'Hello world'
};
const dataD: MyType<boolean> = { // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
name: 'Data C',
value: true
};


// NOTE: type 과 interface 키워드를 사용하는 타입선언은 다음 예제와 같이 = 기호를 기준으로 식별자 와 타입구현으로 구분할 수 있다.
//       제약 조건은 식별자 영역에서 사용하는 extends 에 한합니다.
type U = string | number | boolean;

// type 식별자 = 타입 구현
type MyTypeC<T extends U> = T

const dataQ: MyTypeC<number> = 2

// interface 식별자 { 타입 구현 }
interface IUser<T extends U> {
  name: string,
  age: T
}
/* --------------------------------------------------------------------------------------------------------------------------------------------  */

// TODO: 조건부타입 (Conditional Types)
// 제약 조건과 다르게 타입구현 영역에서 사용하는 extends 는 삼항 연산자(Conditional ternary operator)를 사용할 수 다.

type U2 = string | number | boolean;

// type 식별자 = 타입 구현
type MyTypeB<T> = T extends U ? string : never;

// interface 식별자 { 타입 구현 }
interface IUser1<T> {
  name: string,
  age: T extends U2 ? number : never
}

// NOTE: 사용예시

// `T`는 `boolean` 타입으로 제한.

interface IUser2<T extends boolean> {
    name: string,
    age: T extends true ? string : number, // `T`의 타입이 `true`인 경우 `string` 반환, 아닌 경우 `number` 반환.
    isString: T
  }
  
  const str: IUser2<true> = {
    name: 'Neo',
    age: '12', // String
    isString: true
  }
  const num: IUser2<false> = {
    name: 'Lewis',
    age: 12, // Number
    isString: false
  }

// 삼항 연사자를 연속해서 사용할 수도 있다.

type MyType3<T> =
  T extends string ? 'Str' :
  T extends number ? 'Num' :
  T extends boolean ? 'Boo' :
  T extends undefined ? 'Und' :
  T extends null ? 'Nul' :
  'Obj';

const umme:MyType3<string> = 'Str'

// NOTE: infer
//       해당 키워드를 사용해 타입 변수의 타입 추론 여부를 확인할 수 있습니다.

// U 가 추론가능한 타입이면 참, 아니면 거짓
type eg<T> = T extends infer U ? true : false

// 예제
type MyType4<T> = T extends infer R ? R : null;

const b: MyType4<number> = 123;
/* 
여기서 타입변수 R 은 MyType4<number> 에서 받은 타입 number 가 되고 infer 키워드를 통해 타입 추론이 가능한지 확인합니다.
number 타입은 당연히 타입 추론이 가능하니 R 을 반환하게 됩니다.(만약 R을 타입 추론할 수 없다면 null 이 반환됩니다.)
결과적으로 MyType4<number>는 number 를 반환하고 b 는 123을 할당할 수 있습니다.
*/

// NOTE: 이번엔 조금 복잡하지만 유용한 예제를 살펴보자
//       RetrunType 은 함수의 반환 값이 어떤 타입인지 반환합니다.

type ReturnTypeA<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function fn(num: number) {
  return num.toString();
}

const a: ReturnTypeA<typeof fn> = 'Hello';

/*
typeof fn 의 반환 타입은 string 이빈다.
따라서 R 은 string 이고 역시 infer 키워드를 통해서 타입 추론이 가능하기 때문에 R을 반환합니다.
즉 string을 반환합니다.

infer 키워드에 대한 더 자세한 내용은 공식 문서 https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types 를 참고하자.
문서 내용을 간단히 정리하자면 ,,,
- infer 키워드는 제약조건 extends 가 아닌 조건부 타입 extends 에서만 가능
- infer 키워드는 같은 타입 변수를 여러 위치에서 사용가능
    - 일반적인 공변성 위치에선 유니언타입으로 추론
    - 함수 인수인 반공변성 위치에선 인터섹션 타입으로 추론
- 여러 호출 시그니처의 경우 마지막 시그니처에서 추론

공변성 반공변성에 대해서
https://iamssen.medium.com/typescript-%EC%97%90%EC%84%9C%EC%9D%98-%EA%B3%B5%EB%B3%80%EC%84%B1%EA%B3%BC-%EB%B0%98%EA%B3%B5%EB%B3%80%EC%84%B1-strictfunctiontypes-a82400e67f2
*/

/* --------------------------------------------------------------------------------------------------------------------------------------------  */