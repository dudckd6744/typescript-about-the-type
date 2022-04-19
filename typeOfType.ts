// TODO: typeOf Type Operator

// TypeScript는 변수 또는 속성 의 유형 을 참조하기 위해 유형 컨텍스트 typeof에서 사용할 수 있는 연산자를 추가한다.

let s = "hello";
let n: typeof s = '2'

// 기본 타입에서는 별로 유용하지 않지만, 다른 타입 연산자와 결합하여 typeof여러 패턴을 편리하게 표현할 수 있다. 예를 들어 미리 정의된 유형부터 살펴보겠습니다 ReturnType<T>. 함수 유형 을 취하고 반환 유형을 생성한다.
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

// ReturnType함수 이름에 사용하려고 하면 err 가난다.
// 값 과 유형 은 같은 것이 아니다 . 
function f() {
    return { x: 10, y: 3 };
  }
type P = ReturnType<f>;

// 값 의 유형 을 참조하려면 다음과 같이 사용해야된다.
function A() {
    return { x: 10, y: 3 };
  }
type P2 = ReturnType<typeof A>;