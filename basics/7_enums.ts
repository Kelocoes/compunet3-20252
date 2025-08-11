// const RESERVED = 1;
// const ACTIVE = 2;
// const INACTIVE = 3;
// const PENDING = 4;

enum ProceedingStatus {
    RESERVED = 1,
    ACTIVE = 2,
    INACTIVE,
    PENDING = 4
}

/*
const enum ProceedingStatus {
    RESERVED = 1,
    ACTIVE = 2,
    INACTIVE,
    PENDING = 4
}

*/

ProceedingStatus.RESERVED; // 1
ProceedingStatus.ACTIVE; // 2
ProceedingStatus.INACTIVE; // 3
ProceedingStatus.PENDING; // 4

console.log(ProceedingStatus.RESERVED); // 1

const status = ProceedingStatus.RESERVED;

export {}