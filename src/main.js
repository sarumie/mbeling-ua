// ==UserScript==
// @name         Binusmaya Auto Solve
// @version      0.1
// @author       You
// @match        https://newbinusmaya.binus.ac.id/beelingua/student/class/93de7666-c200-4bbf-b9af-c0cf9d2af7f1/session/f6276c54-2ca8-4704-92c2-3330cb16992f/content/0c908253-cda5-4888-849b-3a4b45cf5468/BlExercise/115838b8-3722-47ac-9a41-ba0ecd623034
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ac.id
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

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
