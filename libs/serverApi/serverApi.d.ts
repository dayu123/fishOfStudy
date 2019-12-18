type RoomInReq = {
    roomId: number;
    /** 是否试玩 */
    isTrial: 0 | 1;
    /** 币种 */
    currency: number;
};
type RoomInRep = {
    roomId: number;
    bulletNum: number;
    socketUrl: string;
};
type CheckReplayRep = {
    isReplay: boolean;
    socketUrl: string;
};
type ServerUserInfo = {
    userId: string;
    bulletNum: number;
    multiple: number;
    turretSkin: string;
    bulletSkin: string;
    lockFish: string;
    lockLeft: number;
};

type displaceType = 'path' | 'fun';
type ServerFishInfo = {
    eid: string;
    fishId: string;
    group: [
        {
            eid: string;
            index: number;
        },
    ];
    displaceType: displaceType;
    pathNo: string;
    usedTime: number;
    totalTime: number;
    funNo: string;
    funParams: any[];
    startTime: number;
    reverse: boolean;
    frozen: boolean;
    inScreen: boolean;
};
type ServerItemInfo = {
    itemId: string;
    count: number;
    coolTime: number;
    usedTime: number;
};
type EnterGameRep = {
    roomId: number;
    tableId: string;
    frozen: boolean;
    frozenLeft: number;
    users: ServerUserInfo[];
    fish: ServerFishInfo[];
    items: ServerItemInfo[];
};

type RoomOutRep = {
    userId: string;
};
type ShootReq = {
    direction: Point;
};
type ShootRep = {
    userId: string;
    direction: Point;
};
type HitReq = {
    eid: string;
    multiple: number;
};
type HitDrop = {
    itemId: string;
    itemNum: number;
};
type HitRep = {
    userId: string;
    eid: string;
    bet: string;
    win: string;
    balance: string;
    drop: HitDrop[];
};
type ChangeTurretReq = {
    multiple: string;
};
type ChangeTurretRep = {
    userId: string;
    multiple: string;
};
type FishShoal = {
    shoalId: string;
    fish: ServerFishInfo[];
};
type UseFreezeRep = {
    userId: string;
    count: number;
    duration: number;
    frozenFishList: string[];
};

type FreezeOverRep = {
    tableId: string;
};
type UseLockRep = {
    userId: string;
    count: number;
    lockedFish: string;
    duration: string;
};
type LockFishReq = {
    eid: string;
};
type LockFishRep = {
    useId: string;
    eid: string;
};
type UseBombReq = {
    bombPoint: string;
    eid: string[];
};
type UseBombReq = {
    bombPoint: string;
    eid: string[];
};
type UseBombRep = {
    userId: string;
    bombPoint: string;
    killedFish: {
        eid: string;
        win: number;
    };
    balance: number;
};

type PowerUpRep = {
    userId: string;
    duration: number;
};
type SetRobotReportRep = {};
type UserAccountRep = {
    userId: string;
    email: string;
    showName: string;
    balances: Array<{
        currency: string;
        available: number;
    }>;
};
type GetDomainRep = {
    domain: string;
    cdn: string;
    api: string;
    sso: string;
    domainRecharge: string;
    channelRecharge: string;
    homeUrl: string;
    roomApi: string;
    serverApi: string;
    newServerApi: string;
};

type ItemPrice = {
    type: number;
    count: number;
    name: string;
};
type LotteryRep = {
    list: ItemPrice[];
};
type TicketExchangeRep = {
    list: ItemPrice[];
};
type ShopItem = {
    id: string;
    name: string;
    price: number;
    status: number;
};
type ShopListRep = {
    turret: ShopItem[];
    bullet: ShopItem[];
    items: ShopItem[];
};
type BuyReq = {
    id: string;
};
type BuyRep = {
    count: number;
    name: string;
};
