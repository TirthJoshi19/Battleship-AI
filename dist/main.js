(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{K:()=>v});const e=class{constructor(t){this.length=t,this.sunk=!1,this.hits=Array(t).fill(!1)}isSunk(){return this.hits.every((t=>t))}hit(t){this.hits[t]=!0}};class n{constructor(){this.board=Array(10).fill(null).map((()=>Array(10).fill(null))),this.ships=[],this.shipIdCounter=0}createBoard(t){const e=document.querySelector(`.${t}`);for(let n=0;n<100;n++){const o=document.createElement("div");o.classList.add("cell"),e.appendChild(o),o.setAttribute("id",`${t}-${n}`)}}isAdjacentCellOccupied(t,e){const n=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let[o,r]of n){const n=t+o,s=e+r;if(n>=0&&n<10&&s>=0&&s<10&&null!==this.board[n][s])return!0}return!1}isValidPlacement(t,e,n,o){if(o&&t+n>10)return!1;if(!o&&e+n>10)return!1;for(let r=0;r<n;r++){const n=o?t:t+r,s=o?e+r:e;if(null!==this.board[n][s]||this.isAdjacentCellOccupied(n,s))return!1}return!0}placeShip(t,n,o=!1,r){const s=document.querySelector(`.${r}`);if(!s)return console.log("Container not found"),!1;const c=Math.floor(t/10),i=t%10;if(!this.isValidPlacement(c,i,n,o))return console.log("Invalid ship placement"),!1;const l=new e(n);for(let t=0;t<n;t++){const e=o?c:c+t,n=o?i+t:i,a=`${r}-${10*e+n}`,u=s.querySelector(`#${a}`);u&&(u.classList.add(`${r}-ship`),u.classList.add("target"),this.board[e][n]={ship:l,position:t})}return this.ships.push({ship:l,startRow:c,startCol:i,length:n,isHorizontal:o,id:this.shipIdCounter}),this.shipIdCounter++,console.log("Ship placed"),console.log(this.board),!0}receiveAttack(t,e){if(null!==this.board[t][e]){const{ship:n,position:o}=this.board[t][e];return n.hit(o),console.log(`hit at ${t}, ${e}`),this.determineSunkState(n),!0}return!1}determineSunkState(t){t.isSunk()&&(t.sunk=!0)}allShipsSunk(){return this.ships.every((({ship:t})=>t.sunk))}}const o=document.querySelector("#resetBtn");let r=!1;o.addEventListener("click",(()=>{r=!0,s=!0,c.clear(),i=[]}));let s=!0;const c=new Set;let i=[];function l(t,e){document.querySelector(".gameboard-c").querySelectorAll(".cell").forEach((t=>{t.addEventListener("click",(()=>{const n=h(t);!function(t,e,n){!c.has(e)&&s&&(a(t,n),c.add(e))}(t,n,e)}))}))}function a(t,e){if(!s||!r)return;let n=!1;const o=h(t),{row:c,col:i}=f(o);t.classList.contains("target")?(p(t,"sunk"),n=!0,e.receiveAttack(c,i),g(e,"Player")):p(t,"non-ship-cell"),console.log(e.board),function(t,e){const{row:n,col:o}=f(t),r=e.board[n][o];console.log(r)}(o,e),n?l():(s=!1,m(),setTimeout((()=>u()),1e3))}function u(t){if(i.length>0){const t=i.shift(),{row:e,col:n}=f(t),o=document.querySelector(`#gameboard-p-${t}`);if(o&&!c.has(t))return void d(o)}let e=[];if(document.querySelectorAll(".cell").forEach((t=>{t.classList.contains("non-ship-cell")||t.classList.contains("sunk")||e.push(t)})),0===e.length)return;const n=Math.floor(Math.random()*e.length);d(e[n])}function d(t){const e=h(t),{row:n,col:o}=f(e),r=document.querySelector(`#gameboard-p-${e}`);let c=!1;r.classList.contains("target")?(r.classList.add("sunk"),v.receiveAttack(n,o),c=!0,g(v,"Computer")):r.classList.add("non-ship-cell"),c?setTimeout((()=>u()),1e3):(s=!0,m())}function h(t){const e=t.id.match(/\d+/g);return parseInt(e,10)}function f(t){return{row:Math.floor(t/10),col:t%10}}function p(t,e){t.classList.add(`${e}`)}function m(){document.querySelector(".whoseTurnh2").textContent=s?"Player's Turn":"Computer's Turn"}function g(t,e){t.allShipsSunk()&&function(t){const e=document.querySelector(".parent-of-announcement-div");e?(p(e,"game-over"),e.style.display="flex",function(t,e){e.querySelector("h2").textContent=t+" Wins!"}(t,e),r=!1):console.error("Announcement div not found")}(e)}function y(){let t,e=[10,20,30,40,50,60,70,80,90,100];do{t=Math.floor(100*Math.random())}while(e.includes(t));return t}function S(){const t=Math.floor(4*Math.random())+2;return console.log(t),t}function b(t,e,n){const o=Math.floor(t/10);if(n){if(t%10+e>10)return!1}else if(o+e>10)return!1;return!0}const k=new n,v=new n;document.addEventListener("DOMContentLoaded",(()=>{function t(n,o){e.addEventListener("click",(()=>{location.reload()}));const{startId:r,length:s,isHorizontal:c}=function(){let t,e,n,o;do{t=y(),e=S(),n=Math.random()>=.5,o=b(t,e,n)}while(!o);return{startId:t,length:e,isHorizontal:n}}();n.placeShip(r,s,c,o)||t(n,o)}v.createBoard("gameboard-p"),k.createBoard("gameboard-c");const e=document.querySelector("#resetBtn");e.addEventListener("click",(()=>{!function(){for(let e=0;e<4;e++)t(v,"gameboard-p"),t(k,"gameboard-c")}(),document.querySelector(".whoseTurn").querySelector("h2").textContent="Player's Turn"})),document.getElementById("win-reset").addEventListener("click",(()=>{location.reload()})),l(0,k)}))})();