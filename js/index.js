const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; position: absolute; justify-content: center; align-items: center; top:40vh; left:45vw; background-color: white; height: 50px";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts == 6) return gameover();

    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  // 정답 맞추면 종료 시키기
  // 5글자 안채웠을 때, 엔터치면 오류메시지 뜨게 하기
  // 6번 시도 끝나면, 졌다고 알려주기 => 했지만...
  // 지우는 기능 필요

  const handleEnterKey = () => {
    let hitNumber = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const input_letter = block.innerText;
      const answer_letter = answer[i];

      if (input_letter === answer_letter) {
        block.style.background = "#6AAA64";
        hitNumber++;
      } else if (answer.includes(input_letter))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      console.log(`입력한글자: ${input_letter}, 정답글자:${answer_letter}`);
      block.style.color = "#fff";
    }

    if (hitNumber === 5) gameover();
    else nextLine();
  };

  const handleBackspace = (thisBlock) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 1) index--;
    console.log(indexs);
  };

  const handleKeydown = (event) => {
    console.log("키가 입력!", event.key);
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    console.log(event.key, event.keyCode);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; //index++ , index = index+1
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
    console.log(timer);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
