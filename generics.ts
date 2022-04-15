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


// NOTE: extends 키워드를 사용하는 제약조건을 추가
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