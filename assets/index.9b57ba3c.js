var w=Object.defineProperty;var S=(s,t,e)=>t in s?w(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>(S(s,typeof t!="symbol"?t+"":t,e),e);import{v as j,d as O,c as M,a as l,b as h,w as d,Q as y,e as I,f as T,o as _,g as v,h as g,t as A,i as F,j as $,q as P}from"./vendor.637f6015.js";const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}};x();class m{constructor(t="scene-object",e){a(this,"type");a(this,"image",{});this.type=t,this.image=e}operation(t){const e=JSON.stringify(this.image),i=JSON.stringify(t);console.log(`Flyweight: Displaying shared (${e}) and unique (${i}) state.`)}getType(){return this.type}}const u=class extends m{constructor(t,e){super(`${u.type}-${e}`,t)}};let p=u;a(p,"type","Missile");class N{constructor(t,e,i,n=[],o=30){a(this,"objects",[]);a(this,"movingObjects",[]);a(this,"currentAnimation",0);a(this,"images",{});a(this,"canvas",{});a(this,"ctx",{});a(this,"fps");a(this,"animationId");this.canvas=t,this.ctx=e,this.images=i,this.fps=o;for(const r of n)this.addObjectToScene(r)}addObjectToScene(t){const e=t.getType();if(this.isObjectCached(e)){this.movingObjects.push(t);return}const i=this.getImageByType(e);!i||(this.objects.push(new m(e,i)),this.movingObjects.push(t))}isObjectCached(t){return!!this.getSceneObjectByType(t)}getSceneObjectByType(t){for(const e of this.objects)if(t===e.getType())return e;return!1}doForAllMovingObjects(t,...e){let i=[];for(const n of this.movingObjects)i.push(t(n,...e));return i}getImageByType(t){return this.images[t]}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(const t of this.movingObjects)t.draw(this.ctx,this.canvas.width,this.canvas.height,this.getSceneObjectByType(t.getType()))}animation(t){this.animationId||(this.animationId=setInterval(()=>{for(const e of t)e();this.doForAllMovingObjects(e=>{e.getType().startsWith(p.type)&&e.calculateNewPosition()})},4))}start(){const t=e=>{setTimeout(()=>{this.currentAnimation&&(this.draw(),this.currentAnimation=window.requestAnimationFrame(t))},1e3/this.fps),this.animation([])};this.currentAnimation||(this.currentAnimation=window.requestAnimationFrame(t))}stop(){typeof this.currentAnimation=="number"&&(this.currentAnimation=void 0),this.animationId&&(clearInterval(this.animationId),this.animationId=void 0)}changeGameSettings(t,e){this[`${t}`]=e}changeObjectsProperty(t,e){console.log(t,e),this.doForAllMovingObjects((i,n,o)=>{i.hasOwnProperty(n)?i[`${n}`]=o:console.error(`MovingSceneObject-ID: ${i.objId} 
 MovingSceneObject-Type: ${i.getType()} 
 Key: ${n} 
 Value: ${o} `)},t,e),console.log(this.movingObjects[0])}changeMovingObjectPropertyById(t,e,i){this.doForAllMovingObjects((n,o,r)=>{n.objId===t&&n.hasOwnProperty(o)&&(n[`${o}`]=r)},t,e,i)}}const b=.2;class B{constructor(t,e,i,n=1){a(this,"position");a(this,"direction");a(this,"speed");a(this,"objType");a(this,"objId");a(this,"target");a(this,"steeringForce",1);this.position=t,this.direction=e.normalize(),this.objType=i,this.speed=n,this.objId=j()}draw(t,e,i,n){if(n instanceof m){const{width:o,height:r}=n.image;this.direction=this.direction.normalize(),t.save();let f=Math.atan(this.direction.y/this.direction.x);this.direction.x<0&&(f+=Math.PI),t.translate(this.position.x,this.position.y),t.rotate(f+Math.PI*.5),t.scale(b,b),t.fillStyle="red",t.strokeStyle="red",t.drawImage(n.image,-o*.5,-r*.5),t.restore()}}calculateNewPosition(){this.position=this.position.add(this.direction.mul(this.speed)),this.target===this.position&&(this.target=void 0),this.direction=this.steerWithForce(this.position,this.direction,this.target,this.steeringForce)}steerWithForce(t=this.position,e=this.direction,i=this.target,n=this.steeringForce){if(!i)return e;const r=i.sub(t).sub(e);return e.add(r.normalize().mul(n/1e3)).normalize()}getType(){return this.objType}}class c{constructor(t=0,e=0){a(this,"x");a(this,"y");this.x=t,this.y=e}static fromDegree(t){return new c(Math.cos(t*Math.PI/180),Math.sin(t*Math.PI/180))}static random(t=1){let e=1;Math.random()<=.5&&(e=-1);let i=1;return Math.random()<=.5&&(i=-1),new c(e*Math.random()*t,i*Math.random()*t)}normalize(){return this.mul(1/this.length())}length(){return Math.abs(Math.sqrt(this.x*this.x+this.y*this.y))}add(t){return new c(this.x+t.x,this.y+t.y)}sub(t){return new c(this.x-t.x,this.y-t.y)}mul(t){return new c(this.x*t,this.y*t)}}var L="/aswe-flyweight/assets/Missile_1_Flying_000.1296be13.png",q="/aswe-flyweight/assets/Missile_2_Flying_000.b1f02716.png",C="/aswe-flyweight/assets/Missile_3_Flying_000.c9c39387.png";var E=(s,t)=>{const e=s.__vccOpts||s;for(const[i,n]of t)e[i]=n;return e};const z=O({data(){return{canvas:{},ctx:{},images:{},gameState:{},speed:1e-5,fps:30,force:1,testMissile:{}}},watch:{speed(s,t){s!==t&&s!==""&&this.gameState.changeObjectsProperty("speed",s)},fps(s,t){s!==t&&this.gameState.changeGameSettings("fps",s)}},methods:{async loadImages(s){const t={};for(const e of s)t[`${this.getFileName(e)}`]=await this.loadImage(e);return t},loadImage(s){return new Promise((t,e)=>{let i=new Image;i.crossOrigin="Anonymous",i.src=s,i.onload=()=>{t(i)},i.onerror=()=>e(i)})},getFileName(s){const t=s.match("([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])+(.png|.jpeg|.pdf)$"),e=t==null?void 0:t[t.length-1].toString();if(e)return t==null?void 0:t[0].replace(e,"")},clickAction(s){s.preventDefault(),s.stopPropagation();const{offsetX:t,offsetY:e}=s;console.log("Target: ",t,e,this.force),this.testMissile.target=new c(t,e),this.testMissile.steeringForce=this.force,this.gameState.changeObjectsProperty("target",new c(t,e)),this.gameState.changeObjectsProperty("steeringForce",this.force)},addEventListeners(){this.canvas.addEventListener("mousedown",this.clickAction)},removeEventListeners(){this.canvas.removeEventListener("mousedown",this.clickAction)}},computed:{testFn(){if(!!this.gameState.changeObjectsProperty)return this.degrees}},async mounted(){this.canvas=this.$refs.gameScene,this.ctx=this.canvas.getContext("2d"),this.addEventListeners();try{const s=[L,q,C];this.images=await this.loadImages(s)}catch(s){console.error(`Not loading assets!
 ${s.src}`)}console.log(this.images),this.gameState=new N(this.canvas,this.ctx,this.images);for(const s in this.images){console.log(s);for(let t=0;t<10;t++)this.testMissile=new B(c.random(this.canvas.width*2),c.random(),s,1),this.gameState.addObjectToScene(this.testMissile)}},destroyed(){this.removeEventListeners()}}),D={id:"app"},Q={id:"game-scene",ref:"gameScene",width:1024,height:600},V={class:"q-pa-md q-gutter-sm"},k=g(" Start Animation "),U=g(" Stop Animation "),W={class:"q-pa-md"};function G(s,t,e,i,n,o){return _(),M("div",D,[l("canvas",Q,null,512),l("div",V,[h(y,{class:"start",push:"",color:"primary",onClick:t[0]||(t[0]=r=>s.gameState.start())},{default:d(()=>[h(v,{left:"",size:"1em",name:"fas fa-play"}),k]),_:1}),h(y,{class:"stop",push:"",color:"secondary",onClick:t[1]||(t[1]=r=>s.gameState.stop())},{default:d(()=>[h(v,{left:"",size:"1em",name:"fas fa-pause"}),U]),_:1})]),l("div",W,[h(I,{color:"secondary"},{default:d(()=>[g(" Rotation: "+A(s.force),1)]),_:1}),h(T,{modelValue:s.force,"onUpdate:modelValue":t[2]||(t[2]=r=>s.force=r),min:1,max:100,step:1,label:"","label-value":s.force+"\xB0","label-always":"",color:"primary"},null,8,["modelValue","label-value"])])])}var R=E(z,[["render",G]]);F(R).use($,{plugins:{},iconSet:P}).mount("#app");