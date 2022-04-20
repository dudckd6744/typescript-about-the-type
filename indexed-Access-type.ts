// TODO: Indexed Access Types

// 인덱싱된 액세스 유형 을 사용하여 다른 유형의 특정 속성을 조회할 수 있다.
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
type I1 = Person["age" | "name"];

// keyof 활용 사례
type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";

type I3 = Person[AliveOrName];

// 존재하지 않는 속성을 인덱싱하려고 하면 err
type I1A = Person["alve"];


// 임의의 유형으로 인덱싱하는 또 다른 예는 number 를 사용하여 배열 요소의 유형을 가져오는 것입니다. 이것을 typeof와 결합하여 배열 리터럴의 요소 유형을 편리하게 캡처할 수 있습니다.
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];
   
type PersonA = typeof MyArray[number];

type AgeA = typeof MyArray[number]["name"];

// 인덱싱할 때만 유형을 사용할 수 있습니다. 즉 const, 변수 참조를 만드는 데 사용할 수 없다.
const key2 = "age";
type AgeB = Person[key2];
// const 가 아니라 type으로 alias 지정해주면 사용가능하다.
type key = "age";
type AgeW = Person[key];
