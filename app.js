const canvas = document.getElementById("jsCanvas");

const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const ctx = canvas.getContext("2d"); //고유context
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#222f3e";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; //canvas는 css뿐만 아니라 fixel modify도 한번더 크기를 정해줘야한다./

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //초기에 흰도화지 안주면 저장할땐 opacity버전으로 저장
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //이미 클릭이 되어있다면 그점과 이점을 이어서 선을 만들어줌

    ctx.stroke();
    //위 둘의 동적은 마우스를 움직이는 내내 동작되고 있음. 작은 좌표(선)가 보여서 눈에 보이는
  }
}

function onMouseDown(event) {
  paiting = true;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //기존 색에서 타겟의 배경색으로 바꿔줌
  ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeChange() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    //클릭이 fill으로 변경되는걸 막기위해
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); //오른쪽 저장 막음
}

function handleSaveBtn() {
  const image = canvas.toDataURL("image/png"); //형태(대소문자 구분)
  const link = document.createElement("a");
  link.href = image; //긴링크가 이미지
  link.download = "MyPicture✍️"; //다운받는 사진이름
  link.click(); //헛액션
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColor)
); /*컬러나열을 Array.from()로 내용을 array로 바꿔줌
forEach로 각 컬러에 이벤트리스너를 걸어준다.
*/

if (range) {
  //제대로 정의되었나 확인
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeChange);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveBtn);
}
