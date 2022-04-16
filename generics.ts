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

//공변성 반공변성에 대해서
// https://iamssen.medium.com/typescript-%EC%97%90%EC%84%9C%EC%9D%98-%EA%B3%B5%EB%B3%80%EC%84%B1%EA%B3%BC-%EB%B0%98%EA%B3%B5%EB%B3%80%EC%84%B1-strictfunctiontypes-a82400e67f2
/* --------------------------------------------------------------------------------------------------------------------------------------------  */