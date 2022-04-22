// TODO: Mapped Types

/*자신을 반복하고 싶지 않을 때 유형이 다른 유형을 기반으로 해야 하는 경우가 있다

매핑된 유형은 사전에 선언되지 않은 속성 유형을 선언하는 데 사용되는 인덱스 서명 구문을 기반으로 한다.. */
type OnlyBoolsAndHorses = {
    [key: string]: boolean | number;
  };
   
const conforms: OnlyBoolsAndHorses = {
del: true,
rodney: false,
};

// 매핑된 유형은 PropertyKeys(자주 keyof를 통해 생성됨)의 조합을 사용하여 키를 반복하여 유형을 생성하는 일반 유형이다..
interface ItestCase1 {
    test: string
    test1:number
}

const testet= {
    qWE:11,
    rqwe:2
}
// OptionsFlags에서 는 유형의 모든 속성을 가져와서 Type해당 값을 부울로 변경한다.
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

const testCase1 : OptionsFlags<ItestCase1>= {test:true,test1:false} 

const testCase2 : OptionsFlags<typeof testet>= {qWE:true,rqwe:true} 

// NOTE: 매핑 수정자

// 유형의 속성에서 '읽기 전용' 속성을 제거
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };
   
interface LockedAccount {
    readonly id: string;
    readonly name: string;
};
   
type UnlockedAccount = CreateMutable<LockedAccount>;
  
// 유형의 속성에서 '선택적' 속성을 제거
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };
   
interface MaybeUser {
    id: string;
    name?: string;
    age?: number;
};

type User = Concrete<MaybeUser>;