type uinon = 'test1' | 'test2' | 'test3'


type Extends<T , U extends T> = U

const fafa = '' as Extends<uinon, 'test1'|'test2'>

// NOTE:  인터페이스 같은 경우 pick 이라는 유틸타입으로 사용하고싶은것만 찝어낼수있다.
//        하지만 union type 의 경우 Extract 유틸타입으로 가능하지만 원하는 타입을 가져올때 자동완성이 안된다.
//        그래서 Type 제네릭을 과 상속을 이용하여 union type의 경우에도 pick 처럼 작동되게 구현해 보았다.