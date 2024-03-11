// ==UserScript==
// @name         mbeling(ua)
// @version      0.1
// @author       KulkasTerbakar
// @match        https://newbinusmaya.binus.ac.id/beelingua/*
// @icon         https://binusmaya.binus.ac.id/favicon.ico
// @grant        none
// @updateURL    https://gist.githubusercontent.com/sarumie/6e63c3133e2c7d3ba9f89ea4c9affc77/raw/cffe33031fefcea63ef71d2846798bbc0da5bf8d/mbeling(ua).js
// @downloadURL  https://gist.githubusercontent.com/sarumie/6e63c3133e2c7d3ba9f89ea4c9affc77/raw/cffe33031fefcea63ef71d2846798bbc0da5bf8d/mbeling(ua).js
// @description  not stable, only works in objective questions(not multi choice)
// ==/UserScript==

(function () {
  "use strict";
  // owo
  let exec = null;
  let isStop = false;

  /*
  Declare the start button to exceute the script
  */
  let btnStart = document.createElement("button");
  btnStart.innerHTML = `
    <div style="padding: 10px; display: flex; align-items: center; justify-content: center; background: blue; color: white; border-radius: 4px;">
      Start
    </div>`;
  btnStart.style = "position: fixed; bottom: 0; right: 0; z-index: 9999;";
  document.body.appendChild(btnStart);

  function setDelay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function stopExec() {
    isStop = true;
    btnStart.onclick = start;
    btnStart.innerHTML = `
      <div style="padding: 10px; display: flex; align-items: center; justify-content: center; background: blue; color: white; border-radius: 4px;">
        Start
      </div>
    `;
  }

  async function start() {
    btnStart.onclick = stopExec;
    isStop = false;

    btnStart.innerHTML = `
      <div style="padding: 10px; display: flex; align-items: center; justify-content: center; background: red; color: white; border-radius: 4px;">
        Stop
      </div>
    `;

    /*
      Elements
    */
    let nodeNavElement = document.getElementsByClassName(
      "MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2"
    )[0];

    let btnListAns = document.getElementsByClassName(
      "MuiButtonBase-root bl-w-full justify-content-start"
    );

    for (let i = 0; i < nodeNavElement.childElementCount; i++) {
      if (isStop) break;
      for (let i = 0; i < btnListAns.length; i++) {
        if (isStop) break;
        await setDelay(300);
        let button = btnListAns[i];

        button.click();

        await setDelay(300);

        let btnCheck = document.getElementsByClassName(
          "bl-button__container secondary-shade-color "
        )[2];
        btnCheck.click();

        await setDelay(1000);

        let isCorrect =
          document.getElementsByClassName(
            "bl-col bl-flex-1 bl-m-l-left bl-m-xl-right"
          )[0].children[0].children[0].innerText == "Correct!";

        if (isCorrect) break;
      }

      let btnNext = document.getElementsByClassName(
        "bl-button__container secondary-shade-color "
      )[2];

      btnNext.click();
    }
  }

  /*
  Execution
*/
  btnStart.onclick = start;
})();
