type MenuState = {
  tag: "menu";
};

type StartState = {
  tag: "start";
  frame: number;
  lastSwitchTime: number;
};

type FinishState = {
  tag: "finish";
  frame: number;
  lastSwitchTime: number;
};

type CollectState = {
  tag: "collect";
  dog: DogState;
  ball: BallState;
  water: WaterState;
  camera: CameraState;
  backgrounds: Background[];
  startTime: number;
  candles: CandleState[];
  message: string;
  lastMessageTime: number;
};

type Background = {
  drawFunc: (x: number, y: number) => void;
  pos: Vec;
  cameraInfluence: number;
};

type CandleState = {
  pos: Vec;
  foundTime: number | null;
};

type DogState = {
  phys: Phys;
  flipped: boolean;
};

type BallState = {
  phys: Phys;
};

type WaterState = {
  phys: Phys;
};

type Phys = {
  pos: Vec;
  vel: Vec;
  grounded: boolean;
  size: Vec;
  name: string;
};

type Vec = {
  x: number;
  y: number;
};

type CameraState = {
  pos: Vec;
};

type State = StartState | CollectState | MenuState | FinishState;
