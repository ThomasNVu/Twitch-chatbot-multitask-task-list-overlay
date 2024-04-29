var A=(m,f,k)=>{if(!f.has(m))throw TypeError("Cannot "+k)};var T=(m,f,k)=>(A(m,f,"read from private field"),k?k.call(m):f.get(m)),S=(m,f,k)=>{if(f.has(m))throw TypeError("Cannot add the same private member more than once");f instanceof WeakSet?f.add(m):f.set(m,k)},M=(m,f,k,U)=>(A(m,f,"write to private field"),U?U.call(m,k):f.set(m,k),k);var C=(m,f,k)=>(A(m,f,"access private method"),k);(function(){"use strict";var L,N,g,y,u,x,F;class m{constructor(e,t){this.username=this.validateUsername(e),this.userColor=(t==null?void 0:t.userColor)||"",this.tasks=[]}validateUsername(e){if(typeof e!="string")throw new Error("Username must be of type string");if(e=e.trim(),e.length===0)throw new Error("Username invalid");return e}addTask(e){return this.tasks.push(e),e}editTask(e,t){let s=this.getTask(e);return s.setDescription(t),s}completeTask(e){let t=this.getTask(e);return t.setCompletionStatus(!0),t}deleteTask(e){Array.isArray(e)||(e=[e]),e.forEach(s=>this.validateTaskIndex(s));const t=[];return this.tasks=this.tasks.filter((s,r)=>{if(e.includes(r))t.push(s);else return!0}),t}clearDoneTasks(){return this.tasks=this.tasks.filter(e=>!e.isComplete()),this.tasks}getTask(e){return this.validateTaskIndex(e),this.tasks[e]}getTasks(){return this.tasks}validateTaskIndex(e){if(typeof e!="number"||isNaN(e))throw new Error("Task index must be a number");if(e<0||e>=this.tasks.length)throw new Error("Task index out of bounds");return!0}}class f{constructor(e){this.description=this.validateDescription(e),this.completionStatus=!1}validateDescription(e){if(typeof e!="string")throw new Error("Task description must be of type string");if(e=e.trim(),e.length===0)throw new Error("Task description invalid");return e}getDescription(){return this.description}setDescription(e){this.description=this.validateDescription(e)}isComplete(){return this.completionStatus}setCompletionStatus(e){if(typeof e!="boolean")throw new Error("Completion status must be of type boolean");this.completionStatus=e}}class k{constructor(){S(this,L);S(this,g);this.users=C(this,L,N).call(this)}getUser(e){return this.users.find(s=>s.username===e)}getAllUsers(){return this.users}createUser(e,t){if(this.getUser(e))throw new Error(`${e} already exists`);const s=new m(e,t);return this.users.push(s),s}addUserTasks(e,t){let s=this.getUser(e);if(!s)throw new Error(`${e} does not exist`);return Array.isArray(t)||(t=[t]),t.forEach(r=>s.addTask(new f(r))),C(this,g,y).call(this),t}editUserTask(e,t,s){const r=this.getUser(e);if(!r)throw new Error(`${e} has no tasks`);return r.editTask(t,s),C(this,g,y).call(this),s}completeUserTasks(e,t){const s=this.getUser(e);if(!s)throw new Error(`${e} has no tasks`);Array.isArray(t)||(t=[t]);const r=t.map(o=>s.completeTask(o).description);return C(this,g,y).call(this),r}deleteUserTasks(e,t){const s=this.getUser(e);if(!s)throw new Error(`${e} has no tasks`);Array.isArray(t)||(t=[t]);const r=s.deleteTask(t).map(o=>o.description);return C(this,g,y).call(this),r}checkUserTasks(e){const t=this.getUser(e);if(!t)throw new Error(`${e} has no tasks`);return t.getTasks().filter(s=>!s.isComplete()).map(s=>s.getDescription())}clearUserList(){this.users=[],C(this,g,y).call(this)}clearDoneTasks(){this.users.forEach(e=>{e.clearDoneTasks()}),C(this,g,y).call(this)}deleteUser(e){const t=this.users.findIndex(r=>r.username===e);if(t===-1)throw new Error(`${e} not found`);const s=this.users[t];return this.users.splice(t,1),C(this,g,y).call(this),s}}L=new WeakSet,N=function(){let e=localStorage.getItem("userList");return e?(e=JSON.parse(e),e.map(s=>{const r=new m(s.username,{userColor:s.userColor});return s.tasks.map(o=>{r.addTask(new f(o.description)).setCompletionStatus(o.completionStatus)}),r})):(e=[],localStorage.setItem("userList",JSON.stringify(e)),e)},g=new WeakSet,y=function(){localStorage.setItem("userList",JSON.stringify(this.users))};function U(){const n=document.querySelector(":root");for(let[e,t]of Object.entries(configs.styles))e.includes("FontFamily")&&G(t),n.style.setProperty(H(e),t)}function G(n){WebFont.load({google:{families:[`${n}:100,400,700`]}})}function H(n){return`--${n.replace(/([A-Z])/g,"-$1").toLowerCase()}`}function q(){const n=["!add","!edit","!done","!delete","!taskhelp"],e=document.querySelector(".command-code");let t=0;setInterval(()=>{e.style.opacity=0,setTimeout(()=>{e.innerText=n[t],e.style.opacity=1,t=(t+1)%n.length},1e3)},7e3)}let E,v;function $(){const e=document.querySelector(".task-wrapper").clientHeight,t=document.querySelector(".task-container.primary"),s=t.scrollHeight,r=document.querySelector(".task-container.secondary");if(s<e)r.style.display="none",V();else{r.style.display="flex";const o=configs.settings.scrollSpeed;let a=parseInt(o,10),h={duration:s/a*1e3,iterations:1,easing:"linear"};const p=getComputedStyle(document.documentElement).getPropertyValue("--card-gap-between").slice(0,-2);let l=s+parseInt(p,10),c=[{transform:"translateY(0)"},{transform:`translateY(-${l}px)`}],d=[{transform:"translateY(0)"},{transform:`translateY(-${l}px)`}];E=t.animate(c,h),v=r.animate(d,h),J()}}function V(){E&&E.cancel(),v&&v.cancel()}function J(){E&&(E.addEventListener("finish",O),E.addEventListener("cancel",O))}function O(){$()}function R(n){const e=document.createDocumentFragment();let t=0,s=0;n.forEach(h=>{const p=document.createElement("div");p.classList.add("card");const l=document.createElement("div");l.classList.add("username"),l.innerText=h.username,l.style.color=configs.settings.showUsernameColor?h.userColor:"",p.appendChild(l);const c=document.createElement("ol");c.classList.add("tasks"),h.tasks.forEach(d=>{const w=document.createElement("li");w.classList.add("task"),w.innerText=d.description,d.completionStatus&&(w.classList.add("done"),s++),t++,c.appendChild(w)}),p.appendChild(c),e.appendChild(p)});const r=document.querySelector(".task-count");r.innerText=`${s}/${t}`;const o=e.cloneNode(!0),a=document.querySelector(".task-container.primary");a.innerHTML="",a.appendChild(e);const i=document.querySelector(".task-container.secondary");i.innerHTML="",i.appendChild(o),$()}function j(){const n=[];for(let e=1;e<=10;e++){const t=`Username${e}`,r=["red","coral","springGreen","lightSeaGreen","slateBlue","hotpink","violet","orange","darkTurquoise","dodgerblue","blueviolet"][e-1],o={username:t,userColor:r,tasks:[{description:"Task 1 description",completionStatus:!0},{description:"This is task 2 description",completionStatus:!0},{description:"This description is a longer description task",completionStatus:!1}]};n.push(o)}return n}function W(n,e,t,s,r){e=`!${e.toLowerCase()}`;const{admin:o,user:a,settings:{languageCode:i,maxTasksPerUser:h}}=window.configs,p=window.userList;let l="",c="";try{if(Y(s)){if(o.commands.clearList.includes(e))return p.clearUserList(),l=o.responseTo[i].clearList,b(l,n,c);if(o.commands.clearDone.includes(e))return p.clearDoneTasks(),l=o.responseTo[i].clearDone,b(l,n,c);if(o.commands.clearUser.includes(e))return p.deleteUser(t),c=t,l=o.responseTo[i].clearUser,b(l,n,c)}if(a.commands.addTask.includes(e)){if(t==="")throw new Error("Task description is empty");let d=p.getUser(n);d||(d=p.createUser(n,{userColor:r.userColor}));const w=t.split(", ");d.getTasks().length+w.length>h?l=a.responseTo[i].maxTasksAdded:(c=p.addUserTasks(n,w).join(", "),l=a.responseTo[i].addTask)}else if(a.commands.editTask.includes(e)){const d=t.search(new RegExp("(?<=\\d)\\s"));if(d===-1)throw new Error("Task number or description format is invalid");const w=t.slice(d+1),I=t.slice(0,d);p.editUserTask(n,P(I),w),c=I,l=a.responseTo[i].editTask}else if(a.commands.finishTask.includes(e)){const d=P(t);c=p.completeUserTasks(n,d),l=a.responseTo[i].finishTask}else if(a.commands.deleteTask.includes(e)){const d=P(t);c=p.deleteUserTasks(n,d),l=a.responseTo[i].deleteTask}else if(a.commands.check.includes(e))c=p.checkUserTasks(n).join(", "),c===""?l=a.responseTo[i].noTaskFound:l=a.responseTo[i].check;else if(a.commands.help.includes(e))l=a.responseTo[i].help;else if(a.commands.additional.includes(e))l=a.responseTo[i].additional;else throw new Error("command not found");return b(l,n,c)}catch(d){return b(a.responseTo[i].invalidCommand,n,d.message)}}function b(n,e,t){return n.replace("{user}",e).replace("{message}",t)}function Y(n){return n.broadcaster||n.mod}function P(n){return parseInt(n,10)-1}function K(n){let e=0,t=null,s=null,r=null,o=null;if(n[e]==="@"){let h=n.indexOf(" ");t=n.slice(1,h),e=h+1}if(n[e]===":"){e+=1;let h=n.indexOf(" ",e);s=n.slice(e,h),e=h+1}let a=n.indexOf(":",e);a===-1&&(a=n.length),r=n.slice(e,a).trim(),a!==n.length&&(e=a+1,o=n.slice(e));let i={command:null,parameters:null,source:null,tags:null};return i.command=_(r),i.command===null?null:(t!==null&&(i.tags=B(t)),i.source=z(s),i.parameters=o,o&&o[0]==="!"&&(i.command=Q(o,i.command)),i)}function _(n){let e=null;const t=n.split(" ");switch(t[0]){case"JOIN":case"PART":case"NOTICE":case"CLEARCHAT":case"HOSTTARGET":case"PRIVMSG":e={command:t[0],channel:t[1]};break;case"PING":e={command:t[0]};break;case"CAP":e={command:t[0],isCapRequestEnabled:t[2]==="ACK"};break;case"GLOBALUSERSTATE":e={command:t[0]};break;case"USERSTATE":case"ROOMSTATE":e={command:t[0],channel:t[1]};break;case"RECONNECT":console.log("The Twitch IRC server is about to terminate the connection for maintenance."),e={command:t[0]};break;case"421":return console.log(`Unsupported IRC command: ${t[2]}`),null;case"001":e={command:t[0]};break;case"002":case"003":case"004":case"353":case"366":case"375":case"372":case"376":return null;default:return console.log(`Unexpected command: ${t[0]}`),null}return e}function B(n){const e={"client-nonce":null,flags:null};let t={};return n.split(";").forEach(r=>{let o=r.split("="),a=o[1]===""?null:o[1];switch(o[0]){case"badges":case"badge-info":if(a){let h={};a.split(",").forEach(l=>{let c=l.split("/");h[c[0]]=c[1]}),t[o[0]]=h}else t[o[0]]=null;break;case"emotes":if(a){let h={};a.split("/").forEach(l=>{let c=l.split(":"),d=[];c[1].split(",").forEach(I=>{let D=I.split("-");d.push({startPosition:D[0],endPosition:D[1]})}),h[c[0]]=d}),t[o[0]]=h}else t[o[0]]=null;break;case"emote-sets":let i=a.split(",");t[o[0]]=i;break;default:e.hasOwnProperty(o[0])||(t[o[0]]=a)}}),t}function z(n){if(n==null)return null;{let e=n.split("!");return{nick:e.length==2?e[0]:null,host:e.length==2?e[1]:e[0]}}}function Q(n,e){let s=n.slice(0+1).trim(),r=s.indexOf(" ");return r===-1?(e.botCommand=s.slice(0),e.botCommandParams=""):(e.botCommand=s.slice(0,r),e.botCommandParams=s.slice(r).trim()),e}class Z{constructor(){this.events=new Map}on(e,t){this.events.has(e)||this.events.set(e,[]),this.events.get(e).push(t)}emit(e,...t){this.events.has(e)&&this.events.get(e).forEach(s=>s(...t))}off(e,t){if(this.events.has(e)){const s=this.events.get(e),r=s.indexOf(t);r!==-1&&(s.splice(r,1),s.length===0&&this.events.delete(e))}}once(e,t){const s=(...r)=>{t(...r),this.off(e,s)};this.on(e,s)}}class X extends Z{constructor({username:t,authToken:s,channel:r}){super();S(this,x);S(this,u,null);this.username=t.toLowerCase(),this.channel=`#${r.toLowerCase()}`,this.authToken=s}connect(t="ws://irc-ws.chat.twitch.tv:80"){M(this,u,new WebSocket(t)),T(this,u).onopen=()=>{T(this,u).send("CAP REQ :twitch.tv/tags twitch.tv/commands"),T(this,u).send(`PASS ${this.authToken}`),T(this,u).send(`NICK ${this.username}`),console.log("Authenticating with Twitch IRC server...")},T(this,u).onerror=s=>{console.error("Error connecting to Twitch IRC",s)},T(this,u).onmessage=s=>{C(this,x,F).call(this,s.data)},T(this,u).onclose=()=>{console.log("Disconnected from Twitch IRC")}}say(t,s){if(T(this,u).readyState===WebSocket.OPEN){let r="";s&&(r=s?`@reply-parent-msg-id=${s}`:"");const o=[r,"PRIVMSG",this.channel,`:${t}`].join(" ").trim();T(this,u).send(o)}else console.error("Connection is not open")}close(){T(this,u)&&T(this,u).close()}}u=new WeakMap,x=new WeakSet,F=function(t){t.trim().split(`\r
`).forEach(r=>{const o=K(r);if(o)switch(o.command.command){case"PRIVMSG":if(o.parameters.startsWith("!")){const a=ee(o);this.emit("command",a)}break;case"PING":T(this,u).send("PONG "+o.parameters);break;case"001":T(this,u).send(`JOIN ${this.channel}`);break;case"JOIN":console.log(`Joined ${this.channel}`);break;case"PART":console.log("The channel must have banned (/ban) the bot."),T(this,u).close();break;case"NOTICE":o.parameters==="Login authentication failed"?(console.log(`Authentication failed; left ${this.channel}`),T(this,u).send(`PART ${this.channel}`)):o.parameters==="You don't have permission to perform that action"&&(console.log(`No permission. Check if the access token is still valid. Left ${this.channel}`),T(this,u).send(`PART ${this.channel}`));break}})};function ee(n){var e,t;return{user:n.tags["display-name"],command:n.command.botCommand,message:n.command.botCommandParams||"",flags:{broadcaster:!!((e=n.tags.badges)!=null&&e.broadcaster),mod:!!((t=n.tags.badges)!=null&&t.moderator)},extra:{userColor:n.tags.color,messageId:n.tags.id}}}const{twitch_channel:te,twitch_oauth:se,twitch_username:ne}=configs.auth;window.addEventListener("load",()=>{window.userList=new k,U(),q(),configs.settings.testMode&&(window.userList.users=j());const n=new X({username:ne,authToken:se,channel:te});n.on("command",e=>{const{user:t,command:s,message:r,flags:o,extra:a}=e,i=W(t,s,r,o,a);i&&n.say(i,a.messageId),R(window.userList.users)}),n.connect(),R(window.userList.users)})})();
