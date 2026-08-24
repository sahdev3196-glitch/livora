import{o as Nf,R as zo}from"./vendor-misc-CWfl3NA3.js";const kf=()=>{};var Hu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Df=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],h=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},pl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let R=(c&15)<<2|d>>6,C=d&63;h||(C=64,a||(R=64)),r.push(t[p],t[m],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(fl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Df(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||m==null)throw new xf;const R=i<<2|c>>4;if(r.push(R),d!==64){const C=c<<4&240|d>>2;if(r.push(C),m!==64){const N=d<<6&192|m;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class xf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Of=function(n){const e=fl(n);return pl.encodeByteArray(e,!0)},Ws=function(n){return Of(n).replace(/\./g,"")},ml=function(n){try{return pl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=()=>Lf().__FIREBASE_DEFAULTS__,Uf=()=>{if(typeof process>"u"||typeof Hu>"u")return;const n=Hu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ff=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ml(n[1]);return e&&JSON.parse(e)},pi=()=>{try{return kf()||Mf()||Uf()||Ff()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},gl=n=>pi()?.emulatorHosts?.[n],Bf=n=>{const e=gl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},_l=()=>pi()?.config,yl=n=>pi()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ws(JSON.stringify(t)),Ws(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function jf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function zf(){const n=pi()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Wf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Hf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Kf(){const n=Re();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Qf(){return!zf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Jf(){try{return typeof indexedDB=="object"}catch{return!1}}function Yf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf="FirebaseError";class At extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Xf,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Qr.prototype.create)}}class Qr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Zf(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new At(s,c,r)}}function Zf(n,e){try{let t=0,r="";for(;t<n.length;){const s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}const i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}const a=n.substring(s+2,i),c=e[a];r+=n.substring(t,s)+(c!=null?String(c):`<${a}?>`),t=i+1}return r}catch{return n}}function ep(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function dn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Ku(i)&&Ku(a)){if(!dn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ku(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function tp(n,e){const t=new np(n,e);return t.subscribe.bind(t)}class np{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");rp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=co),s.error===void 0&&(s.error=co),s.complete===void 0&&(s.complete=co);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function rp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function co(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function El(n){return(await fetch(n,{credentials:"include"})).ok}class fn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new qf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(op(e))try{this.getOrInitializeService({instanceIdentifier:rn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rn){return this.instances.has(e)}getOptions(e=rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ip(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=rn){return this.component?this.component.multipleInstances?e:rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ip(n){return n===rn?void 0:n}function op(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new sp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const up={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},cp=Q.INFO,lp={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},hp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=lp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wo{constructor(e){this.name=e,this._logLevel=cp,this._logHandler=hp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?up[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(fp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function fp(n){return n.getComponent()?.type==="VERSION"}const To="@firebase/app",Qu="0.16.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=new Wo("@firebase/app"),pp="@firebase/app-compat",mp="@firebase/analytics-compat",gp="@firebase/analytics",_p="@firebase/app-check-compat",yp="@firebase/app-check",Ep="@firebase/auth",wp="@firebase/auth-compat",Tp="@firebase/database",Ip="@firebase/data-connect",vp="@firebase/database-compat",Ap="@firebase/functions",Rp="@firebase/functions-compat",Pp="@firebase/installations",Sp="@firebase/installations-compat",Vp="@firebase/messaging",bp="@firebase/messaging-compat",Cp="@firebase/performance",Np="@firebase/performance-compat",kp="@firebase/remote-config",Dp="@firebase/remote-config-compat",xp="@firebase/storage",Op="@firebase/storage-compat",Lp="@firebase/firestore",Mp="@firebase/ai",Up="@firebase/firestore-compat",Fp="firebase",Bp="12.18.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="[DEFAULT]",qp={[To]:"fire-core",[pp]:"fire-core-compat",[gp]:"fire-analytics",[mp]:"fire-analytics-compat",[yp]:"fire-app-check",[_p]:"fire-app-check-compat",[Ep]:"fire-auth",[wp]:"fire-auth-compat",[Tp]:"fire-rtdb",[Ip]:"fire-data-connect",[vp]:"fire-rtdb-compat",[Ap]:"fire-fn",[Rp]:"fire-fn-compat",[Pp]:"fire-iid",[Sp]:"fire-iid-compat",[Vp]:"fire-fcm",[bp]:"fire-fcm-compat",[Cp]:"fire-perf",[Np]:"fire-perf-compat",[kp]:"fire-rc",[Dp]:"fire-rc-compat",[xp]:"fire-gcs",[Op]:"fire-gcs-compat",[Lp]:"fire-fst",[Up]:"fire-fst-compat",[Mp]:"fire-vertex","fire-js":"fire-js",[Fp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=new Map,$p=new Map,vo=new Map;function Ju(n,e){try{n.container.addComponent(e)}catch(t){wt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ln(n){const e=n.name;if(vo.has(e))return wt.debug(`There were multiple attempts to register component ${e}.`),!1;vo.set(e,n);for(const t of Gs.values())Ju(t,n);for(const t of $p.values())Ju(t,n);return!0}function Go(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ke(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},dt=new Qr("app","Firebase",jp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=Bp;function Wp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Io,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw dt.create("bad-app-name",{appName:String(s)});if(t||(t=_l()),!t)throw dt.create("no-options");const i=Gs.get(s);if(i)if(dn(t,i.options)){if(dn(r,i.config))return i;throw dt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw dt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const a=new ap(s);for(const h of vo.values())a.addComponent(h);const c=new zp(t,r,a);return Gs.set(s,c),c}function wl(n=Io){const e=Gs.get(n);if(!e&&n===Io&&_l())return Wp();if(!e)throw dt.create("no-app",{appName:n});return e}function Mt(n,e,t){let r=qp[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),wt.warn(a.join(" "));return}Ln(new fn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp="firebase-heartbeat-database",Hp=1,kr="firebase-heartbeat-store";let lo=null;function Tl(){return lo||(lo=Nf(Gp,Hp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(kr)}catch(t){console.warn(t)}}}}).catch(n=>{throw dt.create("idb-open",{originalErrorMessage:n.message})})),lo}async function Kp(n){try{const t=(await Tl()).transaction(kr),r=await t.objectStore(kr).get(Il(n));return await t.done,r}catch(e){if(e instanceof At)wt.warn(e.message);else{const t=dt.create("idb-get",{originalErrorMessage:e?.message});wt.warn(t.message)}}}async function Yu(n,e){try{const r=(await Tl()).transaction(kr,"readwrite");await r.objectStore(kr).put(e,Il(n)),await r.done}catch(t){if(t instanceof At)wt.warn(t.message);else{const r=dt.create("idb-set",{originalErrorMessage:t?.message});wt.warn(r.message)}}}function Il(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=1024,Jp=30;class Yp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Zp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Xu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Jp){const s=em(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){wt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Xu(),{heartbeatsToSend:t,unsentEntries:r}=Xp(this._heartbeatsCache.heartbeats),s=Ws(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return wt.warn(e),""}}}function Xu(){return new Date().toISOString().substring(0,10)}function Xp(n,e=Qp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Zu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Zu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Zp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jf()?Yf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Kp(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Zu(n){return Ws(JSON.stringify({version:2,heartbeats:n})).length}function em(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n){Ln(new fn("platform-logger",e=>new dp(e),"PRIVATE")),Ln(new fn("heartbeat",e=>new Yp(e),"PRIVATE")),Mt(To,Qu,n),Mt(To,Qu,"esm2020"),Mt("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tm("");var nm="firebase",rm="12.18.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt(nm,rm,"app");function vl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sm=vl,Al=new Qr("auth","Firebase",vl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs=new Wo("@firebase/auth");function Rl(n,...e){Hs.logLevel<=Q.WARN&&Hs.warn(`Auth (${Wn}): ${n}`,...e)}function xs(n,...e){Hs.logLevel<=Q.ERROR&&Hs.error(`Auth (${Wn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(n,...e){throw Ko(n,...e)}function Ye(n,...e){return Ko(n,...e)}function Ho(n,e,t){const r={...sm(),[e]:t};return new Qr("auth","Firebase",r).create(e,{appName:n.name})}function un(n){return Ho(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function im(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ct(n,"argument-error"),Ho(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ko(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Al.create(n,...e)}function $(n,e,...t){if(!n)throw Ko(e,...t)}function ft(n){const e="INTERNAL ASSERTION FAILED: "+n;throw xs(e),new Error(e)}function Tt(n,e){n||ft(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(){return typeof self<"u"&&self.location?.href||""}function om(){return ec()==="http:"||ec()==="https:"}function ec(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(om()||Gf()||"connection"in navigator)?navigator.onLine:!0}function um(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tt(t>e,"Short delay should be less than long delay!"),this.isMobile=jf()||Hf()}get(){return am()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(n,e){Tt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],hm=new Xr(3e4,6e4);function Jo(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Gn(n,e,t,r,s={}){return Sl(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Jr({...a,key:n.config.apiKey}).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:h,...i};return Wf()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Yr(n.emulatorConfig.host)&&(d.credentials="include"),Pl.fetch()(await Vl(n,n.config.apiHost,t,c),d)})}async function Sl(n,e,t){n._canInitEmulator=!1;const r={...cm,...e};try{const s=new fm(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Ss(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[h,d]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ss(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Ss(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Ss(n,"user-disabled",a);const p=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ho(n,p,d);ct(n,p)}}catch(s){if(s instanceof At)throw s;ct(n,"network-request-failed",{message:String(s)})}}async function dm(n,e,t,r,s={}){const i=await Gn(n,e,t,r,s);return"mfaPendingCredential"in i&&ct(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Vl(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Qo(n.config,s):`${n.config.apiScheme}://${s}`;return lm.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class fm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ye(this.auth,"network-request-failed")),hm.get())})}}function Ss(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ye(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pm(n,e){return Gn(n,"POST","/v1/accounts:delete",e)}async function Ks(n,e){return Gn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mm(n,e=!1){const t=We(n),r=await t.getIdToken(e),s=Yo(r);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Ar(ho(s.auth_time)),issuedAtTime:Ar(ho(s.iat)),expirationTime:Ar(ho(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ho(n){return Number(n)*1e3}function Yo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return xs("JWT malformed, contained fewer than 3 sections"),null;try{const s=ml(t);return s?JSON.parse(s):(xs("Failed to decode base64 JWT payload"),null)}catch(s){return xs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function tc(n){const e=Yo(n);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof At&&gm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function gm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ar(this.lastLoginAt),this.creationTime=Ar(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qs(n){const e=n.auth,t=await n.getIdToken(),r=await Dr(n,Ks(e,{idToken:t}));$(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?bl(s.providerUserInfo):[],a=Em(n.providerData,i),c=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!a?.length,d=c?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ro(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function ym(n){const e=We(n);await Qs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Em(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function bl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wm(n,e){const t=await Sl(n,{},async()=>{const r=Jr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Vl(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:c,body:r};return n.emulatorConfig&&Yr(n.emulatorConfig.host)&&(h.credentials="include"),Pl.fetch()(a,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Tm(n,e){return Gn(n,"POST","/v2/accounts:revokeToken",Jo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):tc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=tc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await wm(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Nn;return r&&($(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&($(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Nn,this.toJSON())}_performRefresh(){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(n,e){$(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Qe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new _m(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ro(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Dr(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return mm(this,e)}reload(){return ym(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Qe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(un(this.auth));const e=await this.getIdToken();return await Dr(this,pm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,h=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:m,emailVerified:R,isAnonymous:C,providerData:N,stsTokenManager:U}=t;$(m&&U,e,"internal-error");const L=Nn.fromJSON(this.name,U);$(typeof m=="string",e,"internal-error"),Nt(r,e.name),Nt(s,e.name),$(typeof R=="boolean",e,"internal-error"),$(typeof C=="boolean",e,"internal-error"),Nt(i,e.name),Nt(a,e.name),Nt(c,e.name),Nt(h,e.name),Nt(d,e.name),Nt(p,e.name);const W=new Qe({uid:m,auth:e,email:s,emailVerified:R,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:L,createdAt:d,lastLoginAt:p});return N&&Array.isArray(N)&&(W.providerData=N.map(X=>({...X}))),h&&(W._redirectEventId=h),W}static async _fromIdTokenResponse(e,t,r=!1){const s=new Nn;s.updateFromServerResponse(t);const i=new Qe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Qs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];$(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?bl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Nn;c.updateFromIdToken(r);const h=new Qe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ro(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc=new Map;function pt(n){Tt(n instanceof Function,"Expected a class definition");let e=nc.get(n);return e?(Tt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,nc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Cl.type="NONE";const rc=Cl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(n,e,t){return`firebase:${n}:${e}:${t}`}class kn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Os(this.userKey,s.apiKey,i),this.fullPersistenceKey=Os("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ks(this.auth,{idToken:e}).catch(()=>{});return t?Qe._fromGetAccountInfoResponse(this.auth,t,e):null}return Qe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new kn(pt(rc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||pt(rc);const a=Os(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){let m;if(typeof p=="string"){const R=await Ks(e,{idToken:p}).catch(()=>{});if(!R)break;m=await Qe._fromGetAccountInfoResponse(e,R,p)}else m=Qe._fromJSON(e,p);d!==i&&(c=m),i=d;break}}catch{}const h=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!h.length?new kn(i,e,r):(i=h[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new kn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ll(e))return"Blackberry";if(Ml(e))return"Webos";if(kl(e))return"Safari";if((e.includes("chrome/")||Dl(e))&&!e.includes("edge/"))return"Chrome";if(Ol(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Nl(n=Re()){return/firefox\//i.test(n)}function kl(n=Re()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Dl(n=Re()){return/crios\//i.test(n)}function xl(n=Re()){return/iemobile/i.test(n)}function Ol(n=Re()){return/android/i.test(n)}function Ll(n=Re()){return/blackberry/i.test(n)}function Ml(n=Re()){return/webos/i.test(n)}function Xo(n=Re()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Im(n=Re()){return Xo(n)&&!!window.navigator?.standalone}function vm(){return Kf()&&document.documentMode===10}function Ul(n=Re()){return Xo(n)||Ol(n)||Ml(n)||Ll(n)||/windows phone/i.test(n)||xl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(n,e=[]){let t;switch(n){case"Browser":t=sc(Re());break;case"Worker":t=`${sc(Re())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const h=e(i);a(h)}catch(h){c(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rm(n,e={}){return Gn(n,"GET","/v2/passwordPolicy",Jo(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm=6;class Sm{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Pm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ic(this),this.idTokenSubscription=new ic(this),this.beforeStateQueue=new Am(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Al,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await kn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ks(this,{idToken:e}),r=await Qe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ke(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qs(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=um()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(un(this));const t=e?We(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Rm(this),t=new Sm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Qr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Tm(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pt(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await kn.create(this,[pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ke(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Rl(`Error while retrieving App Check token: ${e.error}`),e?.token}}function mi(n){return We(n)}class ic{constructor(e){this.auth=e,this.observer=null,this.addObserver=tp(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bm(n){Zo=n}function Cm(n){return Zo.loadJS(n)}function Nm(){return Zo.gapiScript}function km(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dm(n,e){const t=Go(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(dn(i,e??{}))return s;ct(s,"already-initialized")}return t.initialize({options:e})}function xm(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(pt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Om(n,e,t){const r=mi(n);$(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Bl(e),{host:a,port:c}=Lm(e),h=c===null?"":`:${c}`,d={url:`${i}//${a}${h}/`},p=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){$(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),$(dn(d,r.config.emulator)&&dn(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Yr(a)?El(`${i}//${a}${h}`):Mm()}function Bl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Lm(n){const e=Bl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:oc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:oc(a)}}}function oc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Mm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ft("not implemented")}_getIdTokenResponse(e){return ft("not implemented")}_linkToIdToken(e,t){return ft("not implemented")}_getReauthenticationResolver(e){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(n,e){return dm(n,"POST","/v1/accounts:signInWithIdp",Jo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um="http://localhost";class pn extends ql{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new pn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ct("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new pn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Dn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Dn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Dn(e,t)}buildRequest(){const e={requestUri:Um,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Jr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr extends ea{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Zr{constructor(){super("facebook.com")}static credential(e){return pn._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.FACEBOOK_SIGN_IN_METHOD="facebook.com";kt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Zr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.GOOGLE_SIGN_IN_METHOD="google.com";Dt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends Zr{constructor(){super("github.com")}static credential(e){return pn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.GITHUB_SIGN_IN_METHOD="github.com";xt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends Zr{constructor(){super("twitter.com")}static credential(e,t){return pn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Qe._fromIdTokenResponse(e,r,s),a=ac(r);return new Mn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ac(r);return new Mn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ac(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js extends At{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Js.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Js(e,t,r,s)}}function $l(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Js._fromErrorAndOperation(n,i,e,r):i})}async function Fm(n,e,t=!1){const r=await Dr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Mn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bm(n,e,t=!1){const{auth:r}=n;if(Ke(r.app))return Promise.reject(un(r));const s="reauthenticate";try{const i=await Dr(n,$l(r,s,e,n),t);$(i.idToken,r,"internal-error");const a=Yo(i.idToken);$(a,r,"internal-error");const{sub:c}=a;return $(n.uid===c,r,"user-mismatch"),Mn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&ct(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qm(n,e,t=!1){if(Ke(n.app))return Promise.reject(un(n));const r="signIn",s=await $l(n,r,e),i=await Mn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function $m(n,e,t,r){return We(n).onIdTokenChanged(e,t,r)}function jm(n,e,t){return We(n).beforeAuthStateChanged(e,t)}const Ys="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ys,"1"),this.storage.removeItem(Ys),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm=1e3,Wm=10;class zl extends jl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ul(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);vm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Wm):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},zm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}zl.type="LOCAL";const Gm=zl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl extends jl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wl.type="SESSION";const Gl=Wl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hm(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new gi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),h=await Hm(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}gi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,h)=>{const d=ta("",20);s.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const R=m;if(R.data.eventId===d)switch(R.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(R.data.response);break;default:clearTimeout(p),clearTimeout(i),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return window}function Qm(n){it().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(){return typeof it().WorkerGlobalScope<"u"&&typeof it().importScripts=="function"}async function Jm(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ym(){return navigator?.serviceWorker?.controller||null}function Xm(){return Hl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl="firebaseLocalStorageDb",Zm=1,Xs="firebaseLocalStorage",Ql="fbase_key";class es{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function _i(n,e){return n.transaction([Xs],e?"readwrite":"readonly").objectStore(Xs)}function eg(){const n=indexedDB.deleteDatabase(Kl);return new es(n).toPromise()}function Jl(){const n=indexedDB.open(Kl,Zm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xs,{keyPath:Ql})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xs)?e(r):(r.close(),await eg(),e(await Jl()))})})}async function uc(n,e,t){const r=_i(n,!0).put({[Ql]:e,value:t});return new es(r).toPromise()}async function tg(n,e){const t=_i(n,!1).get(e),r=await new es(t).toPromise();return r===void 0?null:r.value}function cc(n,e){const t=_i(n,!0).delete(e);return new es(t).toPromise()}const ng=800,rg=3;class Yl{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.isClosing)throw new Error("Database is closing");return this.dbPromise?this.dbPromise:(this.dbPromise=Jl(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(this.isClosing||t++>rg)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Hl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=gi._getInstance(Xm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Jm(),!this.activeServiceWorker)return;this.sender=new Km(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ym()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await uc(e,Ys,"1"),await cc(e,Ys)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>uc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>tg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>cc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=_i(s,!1).getAll();return new es(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||Rl(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ng)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Yl.type="LOCAL";const sg=Yl;new Xr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n,e){return e?pt(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na extends ql{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ig(n){return qm(n.auth,new na(n),n.bypassAuthState)}function og(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Bm(t,new na(n),n.bypassAuthState)}async function ag(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Fm(t,new na(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ig;case"linkViaPopup":case"linkViaRedirect":return ag;case"reauthViaPopup":case"reauthViaRedirect":return og;default:ct(this.auth,"internal-error")}}resolve(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=new Xr(2e3,1e4);async function ZT(n,e,t){if(Ke(n.app))return Promise.reject(Ye(n,"operation-not-supported-in-this-environment"));const r=mi(n);im(n,e,ea);const s=Xl(r,t);return new on(r,"signInViaPopup",e,s).executeNotNull()}class on extends Zl{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,on.currentPopupAction&&on.currentPopupAction.cancel(),on.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){Tt(this.filter.length===1,"Popup operations only handle one event");const e=ta();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,on.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ug.get())};e()}}on.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg="pendingRedirect",Ls=new Map;class lg extends Zl{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ls.get(this.auth._key());if(!e){try{const r=await hg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ls.set(this.auth._key(),e)}return this.bypassAuthState||Ls.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hg(n,e){const t=pg(e),r=fg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function dg(n,e){Ls.set(n._key(),e)}function fg(n){return pt(n._redirectPersistence)}function pg(n){return Os(cg,n.config.apiKey,n.name)}async function mg(n,e,t=!1){if(Ke(n.app))return Promise.reject(un(n));const r=mi(n),s=Xl(r,e),a=await new lg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg=10*60*1e3;class _g{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!yg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!eh(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ye(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=gg&&this.cachedEventUids.clear(),this.cachedEventUids.has(lc(e))}saveEventToCache(e){this.cachedEventUids.add(lc(e)),this.lastProcessedEventTime=Date.now()}}function lc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function eh({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function yg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return eh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eg(n,e={}){return Gn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Tg=/^https?/;async function Ig(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Eg(n);for(const t of e)try{if(vg(t))return}catch{}ct(n,"unauthorized-domain")}function vg(n){const e=Ao(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Tg.test(t))return!1;if(wg.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=new Xr(3e4,6e4);function hc(){const n=it().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Rg(n){return new Promise((e,t)=>{function r(){hc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{hc(),t(Ye(n,"network-request-failed"))},timeout:Ag.get()})}if(it().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(it().gapi?.load)r();else{const s=km("iframefcb");return it()[s]=()=>{gapi.load?r():t(Ye(n,"network-request-failed"))},Cm(`${Nm()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Ms=null,e})}let Ms=null;function Pg(n){return Ms=Ms||Rg(n),Ms}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg=new Xr(5e3,15e3),Vg="__/auth/iframe",bg="emulator/auth/iframe",Cg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ng=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function kg(n){const e=n.config;$(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qo(e,bg):`https://${n.config.authDomain}/${Vg}`,r={apiKey:e.apiKey,appName:n.name,v:Wn},s=Ng.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Jr(r).slice(1)}`}async function Dg(n){const e=await Pg(n),t=it().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:kg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Cg,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ye(n,"network-request-failed"),c=it().setTimeout(()=>{i(a)},Sg.get());function h(){it().clearTimeout(c),s(r)}r.ping(h).then(h,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Og=500,Lg=600,Mg="_blank",Ug="http://localhost";class dc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Fg(n,e,t,r=Og,s=Lg){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const h={...xg,width:r.toString(),height:s.toString(),top:i,left:a},d=Re().toLowerCase();t&&(c=Dl(d)?Mg:t),Nl(d)&&(e=e||Ug,h.scrollbars="yes");const p=Object.entries(h).reduce((R,[C,N])=>`${R}${C}=${N},`,"");if(Im(d)&&c!=="_self")return Bg(e||"",c),new dc(null);const m=window.open(e||"",c,p);$(m,n,"popup-blocked");try{m.focus()}catch{}return new dc(m)}function Bg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg="__/auth/handler",$g="emulator/auth/handler",jg=encodeURIComponent("fac");async function fc(n,e,t,r,s,i){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Wn,eventId:s};if(e instanceof ea){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ep(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))a[p]=m}if(e instanceof Zr){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const h=await n._getAppCheckToken(),d=h?`#${jg}=${encodeURIComponent(h)}`:"";return`${zg(n)}?${Jr(c).slice(1)}${d}`}function zg({config:n}){return n.emulator?Qo(n,$g):`https://${n.authDomain}/${qg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo="webStorageSupport";class Wg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gl,this._completeRedirectFn=mg,this._overrideRedirectResult=dg}async _openPopup(e,t,r,s){Tt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await fc(e,t,r,Ao(),s);return Fg(e,i,ta())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await fc(e,t,r,Ao(),s);return Qm(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Tt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Dg(e),r=new _g(e);return t.register("authEvent",s=>($(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(fo,{type:fo},s=>{const i=s?.[0]?.[fo];i!==void 0&&t(!!i),ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ig(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ul()||kl()||Xo()}}const Gg=Wg;var pc="@firebase/auth",mc="1.13.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kg(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Qg(n){Ln(new fn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fl(n)},d=new Vm(r,s,i,h);return xm(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ln(new fn("auth-internal",e=>{const t=mi(e.getProvider("auth").getImmediate());return(r=>new Hg(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mt(pc,mc,Kg(n)),Mt(pc,mc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg=5*60,Yg=yl("authIdTokenMaxAge")||Jg;let gc=null;const Xg=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Yg)return;const s=t?.token;gc!==s&&(gc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eI(n=wl()){const e=Go(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Dm(n,{popupRedirectResolver:Gg,persistence:[sg,Gm,Gl]}),r=yl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=Xg(i.toString());jm(t,a,()=>a(t.currentUser)),$m(t,c=>a(c))}}const s=gl("auth");return s&&Om(t,`http://${s}`),t}function Zg(){return document.getElementsByTagName("head")?.[0]??document}bm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ye("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Zg().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Qg("Browser");var _c=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ut,th;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function y(){}y.prototype=g.prototype,T.F=g.prototype,T.prototype=new y,T.prototype.constructor=T,T.D=function(I,w,A){for(var _=Array(arguments.length-2),Ne=2;Ne<arguments.length;Ne++)_[Ne-2]=arguments[Ne];return g.prototype[w].apply(I,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,y){y||(y=0);const I=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)I[w]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(w=0;w<16;++w)I[w]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=T.g[0],y=T.g[1],w=T.g[2];let A=T.g[3],_;_=g+(A^y&(w^A))+I[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[2]+606105819&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[3]+3250441966&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[6]+2821735955&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[7]+4249261313&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[10]+4294925233&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[11]+2304563134&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(A^y&(w^A))+I[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(w^g&(y^w))+I[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(y^A&(g^y))+I[14]+2792965006&4294967295,w=A+(_<<17&4294967295|_>>>15),_=y+(g^w&(A^g))+I[15]+1236535329&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(w^A&(y^w))+I[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[11]+643717713&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[0]+3921069994&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[15]+3634488961&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[4]+3889429448&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[3]+4107603335&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[8]+1163531501&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(y^w))+I[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^w&(g^y))+I[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(A^g))+I[7]+1735328473&4294967295,w=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(w^A))+I[12]+2368359562&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(y^w^A)+I[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[11]+1839030562&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[14]+4259657740&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[7]+4139469664&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[10]+3200236656&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[3]+3572445317&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[6]+76029189&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^A)+I[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^w)+I[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^y)+I[15]+530742520&4294967295,w=A+(_<<16&4294967295|_>>>16),_=y+(w^A^g)+I[2]+3299628645&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(w^(y|~A))+I[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[14]+2878612391&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[5]+4237533241&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[10]+4293915773&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[1]+2240044497&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[6]+2734768916&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[13]+1309151649&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~A))+I[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~w))+I[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~y))+I[2]+718787259&4294967295,w=A+(_<<15&4294967295|_>>>17),_=y+(A^(w|~g))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,g){g===void 0&&(g=T.length);const y=g-this.blockSize,I=this.C;let w=this.h,A=0;for(;A<g;){if(w==0)for(;A<=y;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<g;)if(I[w++]=T.charCodeAt(A++),w==this.blockSize){s(this,I),w=0;break}}else for(;A<g;)if(I[w++]=T[A++],w==this.blockSize){s(this,I),w=0;break}}this.h=w,this.o+=g},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;g=this.o*8;for(var y=T.length-8;y<T.length;++y)T[y]=g&255,g/=256;for(this.v(T),T=Array(16),g=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)T[g++]=this.g[y]>>>I&255;return T};function i(T,g){var y=c;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=g(T)}function a(T,g){this.h=g;const y=[];let I=!0;for(let w=T.length-1;w>=0;w--){const A=T[w]|0;I&&A==g||(y[w]=A,I=!1)}this.g=y}var c={};function h(T){return-128<=T&&T<128?i(T,function(g){return new a([g|0],g<0?-1:0)}):new a([T|0],T<0?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return L(d(-T));const g=[];let y=1;for(let I=0;T>=y;I++)g[I]=T/y|0,y*=4294967296;return new a(g,0)}function p(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return L(p(T.substring(1),g));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(g,8));let I=m;for(let A=0;A<T.length;A+=8){var w=Math.min(8,T.length-A);const _=parseInt(T.substring(A,A+w),g);w<8?(w=d(Math.pow(g,w)),I=I.j(w).add(d(_))):(I=I.j(y),I=I.add(d(_)))}return I}var m=h(0),R=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(U(this))return-L(this).m();let T=0,g=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);T+=(I>=0?I:4294967296+I)*g,g*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(U(this))return"-"+L(this).toString(T);const g=d(Math.pow(T,6));var y=this;let I="";for(;;){const w=Ce(y,g).g;y=W(y,w.j(g));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(T);if(y=w,N(y))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function U(T){return T.h==-1}n.l=function(T){return T=W(this,T),U(T)?-1:N(T)?0:1};function L(T){const g=T.g.length,y=[];for(let I=0;I<g;I++)y[I]=~T.g[I];return new a(y,~T.h).add(R)}n.abs=function(){return U(this)?L(this):this},n.add=function(T){const g=Math.max(this.g.length,T.g.length),y=[];let I=0;for(let w=0;w<=g;w++){let A=I+(this.i(w)&65535)+(T.i(w)&65535),_=(A>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);I=_>>>16,A&=65535,_&=65535,y[w]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function W(T,g){return T.add(L(g))}n.j=function(T){if(N(this)||N(T))return m;if(U(this))return U(T)?L(this).j(L(T)):L(L(this).j(T));if(U(T))return L(this.j(L(T)));if(this.l(C)<0&&T.l(C)<0)return d(this.m()*T.m());const g=this.g.length+T.g.length,y=[];for(var I=0;I<2*g;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let w=0;w<T.g.length;w++){const A=this.i(I)>>>16,_=this.i(I)&65535,Ne=T.i(w)>>>16,Yt=T.i(w)&65535;y[2*I+2*w]+=_*Yt,X(y,2*I+2*w),y[2*I+2*w+1]+=A*Yt,X(y,2*I+2*w+1),y[2*I+2*w+1]+=_*Ne,X(y,2*I+2*w+1),y[2*I+2*w+2]+=A*Ne,X(y,2*I+2*w+2)}for(T=0;T<g;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=g;T<2*g;T++)y[T]=0;return new a(y,0)};function X(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function se(T,g){this.g=T,this.h=g}function Ce(T,g){if(N(g))throw Error("division by zero");if(N(T))return new se(m,m);if(U(T))return g=Ce(L(T),g),new se(L(g.g),L(g.h));if(U(g))return g=Ce(T,L(g)),new se(L(g.g),g.h);if(T.g.length>30){if(U(T)||U(g))throw Error("slowDivide_ only works with positive integers.");for(var y=R,I=g;I.l(T)<=0;)y=He(y),I=He(I);var w=ye(y,1),A=ye(I,1);for(I=ye(I,2),y=ye(y,2);!N(I);){var _=A.add(I);_.l(T)<=0&&(w=w.add(y),A=_),I=ye(I,1),y=ye(y,1)}return g=W(T,w.j(g)),new se(w,g)}for(w=m;T.l(g)>=0;){for(y=Math.max(1,Math.floor(T.m()/g.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=d(y),_=A.j(g);U(_)||_.l(T)>0;)y-=I,A=d(y),_=A.j(g);N(A)&&(A=R),w=w.add(A),T=W(T,_)}return new se(w,T)}n.B=function(T){return Ce(this,T).h},n.and=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)&T.i(I);return new a(y,this.h&T.h)},n.or=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)|T.i(I);return new a(y,this.h|T.h)},n.xor=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)^T.i(I);return new a(y,this.h^T.h)};function He(T){const g=T.g.length+1,y=[];for(let I=0;I<g;I++)y[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(y,T.h)}function ye(T,g){const y=g>>5;g%=32;const I=T.g.length-y,w=[];for(let A=0;A<I;A++)w[A]=g>0?T.i(A+y)>>>g|T.i(A+y+1)<<32-g:T.i(A+y);return new a(w,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,th=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Ut=a}).apply(typeof _c<"u"?_c:typeof self<"u"?self:typeof window<"u"?window:{});var Vs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nh,wr,rh,Us,Po,sh,ih,oh;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vs=="object"&&Vs];for(var u=0;u<o.length;++u){var l=o[u];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var l=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var v=o[f];if(!(v in l))break e;l=l[v]}o=o[o.length-1],f=l[o],u=u(f),u!=f&&u!=null&&e(l,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var l=[],f;for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&l.push([f,u[f]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function h(o,u,l){return o.call.apply(o.bind,arguments)}function d(o,u,l){return d=h,d.apply(null,arguments)}function p(o,u){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function m(o,u){function l(){}l.prototype=u.prototype,o.Z=u.prototype,o.prototype=new l,o.prototype.constructor=o,o.Ob=function(f,v,P){for(var D=Array(arguments.length-2),G=2;G<arguments.length;G++)D[G-2]=arguments[G];return u.prototype[v].apply(f,D)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const u=o.length;if(u>0){const l=Array(u);for(let f=0;f<u;f++)l[f]=o[f];return l}return[]}function N(o,u){for(let f=1;f<arguments.length;f++){const v=arguments[f];var l=typeof v;if(l=l!="object"?l:v?Array.isArray(v)?"array":l:"null",l=="array"||l=="object"&&typeof v.length=="number"){l=o.length||0;const P=v.length||0;o.length=l+P;for(let D=0;D<P;D++)o[l+D]=v[D]}else o.push(v)}}class U{constructor(u,l){this.i=u,this.j=l,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(o){a.setTimeout(()=>{throw o},0)}function W(){var o=T;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class X{constructor(){this.h=this.g=null}add(u,l){const f=se.get();f.set(u,l),this.h?this.h.next=f:this.g=f,this.h=f}}var se=new U(()=>new Ce,o=>o.reset());class Ce{constructor(){this.next=this.g=this.h=null}set(u,l){this.h=u,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let He,ye=!1,T=new X,g=()=>{const o=Promise.resolve(void 0);He=()=>{o.then(y)}};function y(){for(var o;o=W();){try{o.h.call(o.g)}catch(l){L(l)}var u=se;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}ye=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const l=()=>{};a.addEventListener("test",l,u),a.removeEventListener("test",l,u)}catch{}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function Ne(o,u){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}m(Ne,w),Ne.prototype.init=function(o,u){const l=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(l=="mouseover"?u=o.fromElement:l=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Ne.Z.h.call(this)},Ne.prototype.h=function(){Ne.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Yt="closure_listenable_"+(Math.random()*1e6|0),Xd=0;function Zd(o,u,l,f,v){this.listener=o,this.proxy=null,this.src=u,this.type=l,this.capture=!!f,this.ha=v,this.key=++Xd,this.da=this.fa=!1}function ds(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function fs(o,u,l){for(const f in o)u.call(l,o[f],f,o)}function ef(o,u){for(const l in o)u.call(void 0,o[l],l,o)}function Ga(o){const u={};for(const l in o)u[l]=o[l];return u}const Ha="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ka(o,u){let l,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(l in f)o[l]=f[l];for(let P=0;P<Ha.length;P++)l=Ha[P],Object.prototype.hasOwnProperty.call(f,l)&&(o[l]=f[l])}}function ps(o){this.src=o,this.g={},this.h=0}ps.prototype.add=function(o,u,l,f,v){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const D=Bi(o,u,f,v);return D>-1?(u=o[D],l||(u.fa=!1)):(u=new Zd(u,this.src,P,!!f,v),u.fa=l,o.push(u)),u};function Fi(o,u){const l=u.type;if(l in o.g){var f=o.g[l],v=Array.prototype.indexOf.call(f,u,void 0),P;(P=v>=0)&&Array.prototype.splice.call(f,v,1),P&&(ds(u),o.g[l].length==0&&(delete o.g[l],o.h--))}}function Bi(o,u,l,f){for(let v=0;v<o.length;++v){const P=o[v];if(!P.da&&P.listener==u&&P.capture==!!l&&P.ha==f)return v}return-1}var qi="closure_lm_"+(Math.random()*1e6|0),$i={};function Qa(o,u,l,f,v){if(Array.isArray(u)){for(let P=0;P<u.length;P++)Qa(o,u[P],l,f,v);return null}return l=Xa(l),o&&o[Yt]?o.J(u,l,c(f)?!!f.capture:!1,v):tf(o,u,l,!1,f,v)}function tf(o,u,l,f,v,P){if(!u)throw Error("Invalid event type");const D=c(v)?!!v.capture:!!v;let G=zi(o);if(G||(o[qi]=G=new ps(o)),l=G.add(u,l,f,D,P),l.proxy)return l;if(f=nf(),l.proxy=f,f.src=o,f.listener=l,o.addEventListener)A||(v=D),v===void 0&&(v=!1),o.addEventListener(u.toString(),f,v);else if(o.attachEvent)o.attachEvent(Ya(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function nf(){function o(l){return u.call(o.src,o.listener,l)}const u=rf;return o}function Ja(o,u,l,f,v){if(Array.isArray(u))for(var P=0;P<u.length;P++)Ja(o,u[P],l,f,v);else f=c(f)?!!f.capture:!!f,l=Xa(l),o&&o[Yt]?(o=o.i,P=String(u).toString(),P in o.g&&(u=o.g[P],l=Bi(u,l,f,v),l>-1&&(ds(u[l]),Array.prototype.splice.call(u,l,1),u.length==0&&(delete o.g[P],o.h--)))):o&&(o=zi(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Bi(u,l,f,v)),(l=o>-1?u[o]:null)&&ji(l))}function ji(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Yt])Fi(u.i,o);else{var l=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(l,f,o.capture):u.detachEvent?u.detachEvent(Ya(l),f):u.addListener&&u.removeListener&&u.removeListener(f),(l=zi(u))?(Fi(l,o),l.h==0&&(l.src=null,u[qi]=null)):ds(o)}}}function Ya(o){return o in $i?$i[o]:$i[o]="on"+o}function rf(o,u){if(o.da)o=!0;else{u=new Ne(u,this);const l=o.listener,f=o.ha||o.src;o.fa&&ji(o),o=l.call(f,u)}return o}function zi(o){return o=o[qi],o instanceof ps?o:null}var Wi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Xa(o){return typeof o=="function"?o:(o[Wi]||(o[Wi]=function(u){return o.handleEvent(u)}),o[Wi])}function Te(){I.call(this),this.i=new ps(this),this.M=this,this.G=null}m(Te,I),Te.prototype[Yt]=!0,Te.prototype.removeEventListener=function(o,u,l,f){Ja(this,o,u,l,f)};function Se(o,u){var l,f=o.G;if(f)for(l=[];f;f=f.G)l.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new w(u,o);else if(u instanceof w)u.target=u.target||o;else{var v=u;u=new w(f,o),Ka(u,v)}v=!0;let P,D;if(l)for(D=l.length-1;D>=0;D--)P=u.g=l[D],v=ms(P,f,!0,u)&&v;if(P=u.g=o,v=ms(P,f,!0,u)&&v,v=ms(P,f,!1,u)&&v,l)for(D=0;D<l.length;D++)P=u.g=l[D],v=ms(P,f,!1,u)&&v}Te.prototype.N=function(){if(Te.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const l=o.g[u];for(let f=0;f<l.length;f++)ds(l[f]);delete o.g[u],o.h--}}this.G=null},Te.prototype.J=function(o,u,l,f){return this.i.add(String(o),u,!1,l,f)},Te.prototype.K=function(o,u,l,f){return this.i.add(String(o),u,!0,l,f)};function ms(o,u,l,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let P=0;P<u.length;++P){const D=u[P];if(D&&!D.da&&D.capture==l){const G=D.listener,fe=D.ha||D.src;D.fa&&Fi(o.i,D),v=G.call(fe,f)!==!1&&v}}return v&&!f.defaultPrevented}function sf(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function Za(o){o.g=sf(()=>{o.g=null,o.i&&(o.i=!1,Za(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class of extends I{constructor(u,l){super(),this.m=u,this.l=l,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Za(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nr(o){I.call(this),this.h=o,this.g={}}m(nr,I);var eu=[];function tu(o){fs(o.g,function(u,l){this.g.hasOwnProperty(l)&&ji(u)},o),o.g={}}nr.prototype.N=function(){nr.Z.N.call(this),tu(this)},nr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gi=a.JSON.stringify,af=a.JSON.parse,uf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function nu(){}function ru(){}var rr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Hi(){w.call(this,"d")}m(Hi,w);function Ki(){w.call(this,"c")}m(Ki,w);var Xt={},su=null;function gs(){return su=su||new Te}Xt.Ia="serverreachability";function iu(o){w.call(this,Xt.Ia,o)}m(iu,w);function sr(o){const u=gs();Se(u,new iu(u))}Xt.STAT_EVENT="statevent";function ou(o,u){w.call(this,Xt.STAT_EVENT,o),this.stat=u}m(ou,w);function Ve(o){const u=gs();Se(u,new ou(u,o))}Xt.Ja="timingevent";function au(o,u){w.call(this,Xt.Ja,o),this.size=u}m(au,w);function ir(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function or(){this.g=!0}or.prototype.ua=function(){this.g=!1};function cf(o,u,l,f,v,P){o.info(function(){if(o.g)if(P){var D="",G=P.split("&");for(let Z=0;Z<G.length;Z++){var fe=G[Z].split("=");if(fe.length>1){const me=fe[0];fe=fe[1];const tt=me.split("_");D=tt.length>=2&&tt[1]=="type"?D+(me+"="+fe+"&"):D+(me+"=redacted&")}}}else D=null;else D=P;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+u+`
`+l+`
`+D})}function lf(o,u,l,f,v,P,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+u+`
`+l+`
`+P+" "+D})}function vn(o,u,l,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+df(o,l)+(f?" "+f:"")})}function hf(o,u){o.info(function(){return"TIMEOUT: "+u})}or.prototype.info=function(){};function df(o,u){if(!o.g)return u;if(!u)return null;try{const P=JSON.parse(u);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var l=P[o];if(!(l.length<2)){var f=l[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let D=1;D<f.length;D++)f[D]=""}}}}return Gi(P)}catch{return u}}var _s={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},uu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cu;function Qi(){}m(Qi,nu),Qi.prototype.g=function(){return new XMLHttpRequest},cu=new Qi;function ar(o){return encodeURIComponent(String(o))}function ff(o){var u=1;o=o.split(":");const l=[];for(;u>0&&o.length;)l.push(o.shift()),u--;return o.length&&l.push(o.join(":")),l}function Rt(o,u,l,f){this.j=o,this.i=u,this.l=l,this.S=f||1,this.V=new nr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new lu}function lu(){this.i=null,this.g="",this.h=!1}var hu={},Ji={};function Yi(o,u,l){o.M=1,o.A=Es(et(u)),o.u=l,o.R=!0,du(o,null)}function du(o,u){o.F=Date.now(),ys(o),o.B=et(o.A);var l=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),Ru(l.i,"t",f),o.C=0,l=o.j.L,o.h=new lu,o.g=ju(o.j,l?u:null,!o.u),o.P>0&&(o.O=new of(d(o.Y,o,o.g),o.P)),u=o.V,l=o.g,f=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(eu[0]=v.toString()),v=eu);for(let P=0;P<v.length;P++){const D=Qa(l,v[P],f||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=o.J?Ga(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),sr(),cf(o.i,o.v,o.B,o.l,o.S,o.u)}Rt.prototype.ba=function(o){o=o.target;const u=this.O;u&&Vt(o)==3?u.j():this.Y(o)},Rt.prototype.Y=function(o){try{if(o==this.g)e:{const G=Vt(this.g),fe=this.g.ya(),Z=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||ku(this.g)))){this.K||G!=4||fe==7||(fe==8||Z<=0?sr(3):sr(2)),Xi(this);var u=this.g.ca();this.X=u;var l=pf(this);if(this.o=u==200,lf(this.i,this.v,this.B,this.l,this.S,G,u),this.o){if(this.U&&!this.L){t:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(f)){var P=f;break t}}P=null}if(o=P)vn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Zi(this,o);else{this.o=!1,this.m=3,Ve(12),Zt(this),ur(this);break e}}if(this.R){o=!0;let me;for(;!this.K&&this.C<l.length;)if(me=mf(this,l),me==Ji){G==4&&(this.m=4,Ve(14),o=!1),vn(this.i,this.l,null,"[Incomplete Response]");break}else if(me==hu){this.m=4,Ve(15),vn(this.i,this.l,l,"[Invalid Chunk]"),o=!1;break}else vn(this.i,this.l,me,null),Zi(this,me);if(fu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||l.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)vn(this.i,this.l,l,"[Invalid Chunked Response]"),Zt(this),ur(this);else if(l.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),ao(D),D.P=!0,Ve(11))}}else vn(this.i,this.l,l,null),Zi(this,l);G==4&&Zt(this),this.o&&!this.K&&(G==4?Fu(this.j,this):(this.o=!1,ys(this)))}else bf(this.g),u==400&&l.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),Zt(this),ur(this)}}}catch{}finally{}};function pf(o){if(!fu(o))return o.g.la();const u=ku(o.g);if(u==="")return"";let l="";const f=u.length,v=Vt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Zt(o),ur(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<f;P++)o.h.h=!0,l+=o.h.i.decode(u[P],{stream:!(v&&P==f-1)});return u.length=0,o.h.g+=l,o.C=0,o.h.g}function fu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function mf(o,u){var l=o.C,f=u.indexOf(`
`,l);return f==-1?Ji:(l=Number(u.substring(l,f)),isNaN(l)?hu:(f+=1,f+l>u.length?Ji:(u=u.slice(f,f+l),o.C=f+l,u)))}Rt.prototype.cancel=function(){this.K=!0,Zt(this)};function ys(o){o.T=Date.now()+o.H,pu(o,o.H)}function pu(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ir(d(o.aa,o),u)}function Xi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Rt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(hf(this.i,this.B),this.M!=2&&(sr(),Ve(17)),Zt(this),this.m=2,ur(this)):pu(this,this.T-o)};function ur(o){o.j.I==0||o.K||Fu(o.j,o)}function Zt(o){Xi(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,tu(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function Zi(o,u){try{var l=o.j;if(l.I!=0&&(l.g==o||eo(l.h,o))){if(!o.L&&eo(l.h,o)&&l.I==3){try{var f=l.Ba.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<o.F)As(l),Is(l);else break e;oo(l),Ve(18)}}else l.xa=v[1],0<l.xa-l.K&&v[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=ir(d(l.Va,l),6e3));_u(l.h)<=1&&l.ta&&(l.ta=void 0)}else tn(l,11)}else if((o.L||l.g==o)&&As(l),!_(u))for(v=l.Ba.g.parse(u),u=0;u<v.length;u++){let Z=v[u];const me=Z[0];if(!(me<=l.K))if(l.K=me,Z=Z[1],l.I==2)if(Z[0]=="c"){l.M=Z[1],l.ba=Z[2];const tt=Z[3];tt!=null&&(l.ka=tt,l.j.info("VER="+l.ka));const nn=Z[4];nn!=null&&(l.za=nn,l.j.info("SVER="+l.za));const bt=Z[5];bt!=null&&typeof bt=="number"&&bt>0&&(f=1.5*bt,l.O=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const Ct=o.g;if(Ct){const Ps=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ps){var P=f.h;P.g||Ps.indexOf("spdy")==-1&&Ps.indexOf("quic")==-1&&Ps.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(to(P,P.h),P.h=null))}if(f.G){const uo=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;uo&&(f.wa=uo,ee(f.J,f.G,uo))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-o.F,l.j.info("Handshake RTT: "+l.T+"ms")),f=l;var D=o;if(f.na=$u(f,f.L?f.ba:null,f.W),D.L){yu(f.h,D);var G=D,fe=f.O;fe&&(G.H=fe),G.D&&(Xi(G),ys(G)),f.g=D}else Mu(f);l.i.length>0&&vs(l)}else Z[0]!="stop"&&Z[0]!="close"||tn(l,7);else l.I==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?tn(l,7):io(l):Z[0]!="noop"&&l.l&&l.l.qa(Z),l.A=0)}}sr(4)}catch{}}var gf=class{constructor(o,u){this.g=o,this.map=u}};function mu(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function _u(o){return o.h?1:o.g?o.g.size:0}function eo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function to(o,u){o.g?o.g.add(u):o.h=u}function yu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}mu.prototype.cancel=function(){if(this.i=Eu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Eu(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const l of o.g.values())u=u.concat(l.G);return u}return C(o.i)}var wu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _f(o,u){if(o){o=o.split("&");for(let l=0;l<o.length;l++){const f=o[l].indexOf("=");let v,P=null;f>=0?(v=o[l].substring(0,f),P=o[l].substring(f+1)):v=o[l],u(v,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Pt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Pt?(this.l=o.l,cr(this,o.j),this.o=o.o,this.g=o.g,lr(this,o.u),this.h=o.h,no(this,Pu(o.i)),this.m=o.m):o&&(u=String(o).match(wu))?(this.l=!1,cr(this,u[1]||"",!0),this.o=hr(u[2]||""),this.g=hr(u[3]||"",!0),lr(this,u[4]),this.h=hr(u[5]||"",!0),no(this,u[6]||"",!0),this.m=hr(u[7]||"")):(this.l=!1,this.i=new fr(null,this.l))}Pt.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(dr(u,Tu,!0),":");var l=this.g;return(l||u=="file")&&(o.push("//"),(u=this.o)&&o.push(dr(u,Tu,!0),"@"),o.push(ar(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&o.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&o.push("/"),o.push(dr(l,l.charAt(0)=="/"?wf:Ef,!0))),(l=this.i.toString())&&o.push("?",l),(l=this.m)&&o.push("#",dr(l,If)),o.join("")},Pt.prototype.resolve=function(o){const u=et(this);let l=!!o.j;l?cr(u,o.j):l=!!o.o,l?u.o=o.o:l=!!o.g,l?u.g=o.g:l=o.u!=null;var f=o.h;if(l)lr(u,o.u);else if(l=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=u.h.lastIndexOf("/");v!=-1&&(f=u.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const P=[];for(let D=0;D<v.length;){const G=v[D++];G=="."?f&&D==v.length&&P.push(""):G==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),f&&D==v.length&&P.push("")):(P.push(G),f=!0)}f=P.join("/")}else f=v}return l?u.h=f:l=o.i.toString()!=="",l?no(u,Pu(o.i)):l=!!o.m,l&&(u.m=o.m),u};function et(o){return new Pt(o)}function cr(o,u,l){o.j=l?hr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function lr(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function no(o,u,l){u instanceof fr?(o.i=u,vf(o.i,o.l)):(l||(u=dr(u,Tf)),o.i=new fr(u,o.l))}function ee(o,u,l){o.i.set(u,l)}function Es(o){return ee(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function hr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function dr(o,u,l){return typeof o=="string"?(o=encodeURI(o).replace(u,yf),l&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function yf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Tu=/[#\/\?@]/g,Ef=/[#\?:]/g,wf=/[#\?]/g,Tf=/[#\?@]/g,If=/#/g;function fr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function en(o){o.g||(o.g=new Map,o.h=0,o.i&&_f(o.i,function(u,l){o.add(decodeURIComponent(u.replace(/\+/g," ")),l)}))}n=fr.prototype,n.add=function(o,u){en(this),this.i=null,o=An(this,o);let l=this.g.get(o);return l||this.g.set(o,l=[]),l.push(u),this.h+=1,this};function Iu(o,u){en(o),u=An(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function vu(o,u){return en(o),u=An(o,u),o.g.has(u)}n.forEach=function(o,u){en(this),this.g.forEach(function(l,f){l.forEach(function(v){o.call(u,v,f,this)},this)},this)};function Au(o,u){en(o);let l=[];if(typeof u=="string")vu(o,u)&&(l=l.concat(o.g.get(An(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)l=l.concat(o[u]);return l}n.set=function(o,u){return en(this),this.i=null,o=An(this,o),vu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=Au(this,o),o.length>0?String(o[0]):u):u};function Ru(o,u,l){Iu(o,u),l.length>0&&(o.i=null,o.g.set(An(o,u),C(l)),o.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let f=0;f<u.length;f++){var l=u[f];const v=ar(l);l=Au(this,l);for(let P=0;P<l.length;P++){let D=v;l[P]!==""&&(D+="="+ar(l[P])),o.push(D)}}return this.i=o.join("&")};function Pu(o){const u=new fr;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function An(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function vf(o,u){u&&!o.j&&(en(o),o.i=null,o.g.forEach(function(l,f){const v=f.toLowerCase();f!=v&&(Iu(this,f),Ru(this,v,l))},o)),o.j=u}function Af(o,u){const l=new or;if(a.Image){const f=new Image;f.onload=p(St,l,"TestLoadImage: loaded",!0,u,f),f.onerror=p(St,l,"TestLoadImage: error",!1,u,f),f.onabort=p(St,l,"TestLoadImage: abort",!1,u,f),f.ontimeout=p(St,l,"TestLoadImage: timeout",!1,u,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function Rf(o,u){const l=new or,f=new AbortController,v=setTimeout(()=>{f.abort(),St(l,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(P=>{clearTimeout(v),P.ok?St(l,"TestPingServer: ok",!0,u):St(l,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),St(l,"TestPingServer: error",!1,u)})}function St(o,u,l,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(l)}catch{}}function Pf(){this.g=new uf}function ro(o){this.i=o.Sb||null,this.h=o.ab||!1}m(ro,nu),ro.prototype.g=function(){return new ws(this.i,this.h)};function ws(o,u){Te.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(ws,Te),n=ws.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,mr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,pr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,mr(this)),this.g&&(this.readyState=3,mr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Su(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Su(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?pr(this):mr(this),this.readyState==3&&Su(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,pr(this))},n.Na=function(o){this.g&&(this.response=o,pr(this))},n.ga=function(){this.g&&pr(this)};function pr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,mr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var l=u.next();!l.done;)l=l.value,o.push(l[0]+": "+l[1]),l=u.next();return o.join(`\r
`)};function mr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ws.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Vu(o){let u="";return fs(o,function(l,f){u+=f,u+=":",u+=l,u+=`\r
`}),u}function so(o,u,l){e:{for(f in l){var f=!1;break e}f=!0}f||(l=Vu(l),typeof o=="string"?l!=null&&ar(l):ee(o,u,l))}function ie(o){Te.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(ie,Te);var Sf=/^https?$/i,Vf=["POST","PUT"];n=ie.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cu.g(),this.g.onreadystatechange=R(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){bu(this,P);return}if(o=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)l.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const P of f.keys())l.set(P,f.get(P));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(P=>P.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Vf,u,void 0)>=0)||f||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,D]of l)this.g.setRequestHeader(P,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){bu(this,P)}};function bu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,Cu(o),Ts(o)}function Cu(o){o.A||(o.A=!0,Se(o,"complete"),Se(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Se(this,"complete"),Se(this,"abort"),Ts(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ts(this,!0)),ie.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Nu(this):this.Xa())},n.Xa=function(){Nu(this)};function Nu(o){if(o.h&&typeof i<"u"){if(o.v&&Vt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Se(o,"readystatechange"),Vt(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var l;if(!(l=u)){var f;if(f=P===0){let D=String(o.D).match(wu)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),f=!Sf.test(D?D.toLowerCase():"")}l=f}if(l)Se(o,"complete"),Se(o,"success");else{o.o=6;try{var v=Vt(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",Cu(o)}}finally{Ts(o)}}}}function Ts(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const l=o.g;o.g=null,u||Se(o,"ready");try{l.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Vt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Vt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),af(u)}};function ku(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function bf(o){const u={};o=(o.g&&Vt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(_(o[f]))continue;var l=ff(o[f]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const P=u[v]||[];u[v]=P,P.push(l)}ef(u,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function gr(o,u,l){return l&&l.internalChannelParams&&l.internalChannelParams[o]||u}function Du(o){this.za=0,this.i=[],this.j=new or,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gr("baseRetryDelayMs",5e3,o),this.Za=gr("retryDelaySeedMs",1e4,o),this.Ta=gr("forwardChannelMaxRetries",2,o),this.va=gr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new mu(o&&o.concurrentRequestLimit),this.Ba=new Pf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Du.prototype,n.ka=8,n.I=1,n.connect=function(o,u,l,f){Ve(0),this.W=o,this.H=u||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.J=$u(this,null,this.W),vs(this)};function io(o){if(xu(o),o.I==3){var u=o.V++,l=et(o.J);if(ee(l,"SID",o.M),ee(l,"RID",u),ee(l,"TYPE","terminate"),_r(o,l),u=new Rt(o,o.j,u),u.M=2,u.A=Es(et(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=u.A,l=!0),l||(u.g=ju(u.j,null),u.g.ea(u.A)),u.F=Date.now(),ys(u)}qu(o)}function Is(o){o.g&&(ao(o),o.g.cancel(),o.g=null)}function xu(o){Is(o),o.v&&(a.clearTimeout(o.v),o.v=null),As(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function vs(o){if(!gu(o.h)&&!o.m){o.m=!0;var u=o.Ea;He||g(),ye||(He(),ye=!0),T.add(u,o),o.D=0}}function Cf(o,u){return _u(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ir(d(o.Ea,o,u),Bu(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new Rt(this,this.j,o);let P=this.o;if(this.U&&(P?(P=Ga(P),Ka(P,this.U)):P=this.U),this.u!==null||this.R||(v.J=P,P=null),this.S)e:{for(var u=0,l=0;l<this.i.length;l++){t:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,u>4096){u=l;break e}if(u===4096||l===this.i.length-1){u=l+1;break e}}u=1e3}else u=1e3;u=Lu(this,v,u),l=et(this.J),ee(l,"RID",o),ee(l,"CVER",22),this.G&&ee(l,"X-HTTP-Session-Id",this.G),_r(this,l),P&&(this.R?u="headers="+ar(Vu(P))+"&"+u:this.u&&so(l,this.u,P)),to(this.h,v),this.Ra&&ee(l,"TYPE","init"),this.S?(ee(l,"$req",u),ee(l,"SID","null"),v.U=!0,Yi(v,l,null)):Yi(v,l,u),this.I=2}}else this.I==3&&(o?Ou(this,o):this.i.length==0||gu(this.h)||Ou(this))};function Ou(o,u){var l;u?l=u.l:l=o.V++;const f=et(o.J);ee(f,"SID",o.M),ee(f,"RID",l),ee(f,"AID",o.K),_r(o,f),o.u&&o.o&&so(f,o.u,o.o),l=new Rt(o,o.j,l,o.D+1),o.u===null&&(l.J=o.o),u&&(o.i=u.G.concat(o.i)),u=Lu(o,l,1e3),l.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),to(o.h,l),Yi(l,f,u)}function _r(o,u){o.H&&fs(o.H,function(l,f){ee(u,f,l)}),o.l&&fs({},function(l,f){ee(u,f,l)})}function Lu(o,u,l){l=Math.min(o.i.length,l);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var v=o.i;let G=-1;for(;;){const fe=["count="+l];G==-1?l>0?(G=v[0].g,fe.push("ofs="+G)):G=0:fe.push("ofs="+G);let Z=!0;for(let me=0;me<l;me++){var P=v[me].g;const tt=v[me].map;if(P-=G,P<0)G=Math.max(0,v[me].g-100),Z=!1;else try{P="req"+P+"_"||"";try{var D=tt instanceof Map?tt:Object.entries(tt);for(const[nn,bt]of D){let Ct=bt;c(bt)&&(Ct=Gi(bt)),fe.push(P+nn+"="+encodeURIComponent(Ct))}}catch(nn){throw fe.push(P+"type="+encodeURIComponent("_badmap")),nn}}catch{f&&f(tt)}}if(Z){D=fe.join("&");break e}}D=void 0}return o=o.i.splice(0,l),u.G=o,D}function Mu(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;He||g(),ye||(He(),ye=!0),T.add(u,o),o.A=0}}function oo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ir(d(o.Da,o),Bu(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Uu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ir(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),Is(this),Uu(this))};function ao(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Uu(o){o.g=new Rt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=et(o.na);ee(u,"RID","rpc"),ee(u,"SID",o.M),ee(u,"AID",o.K),ee(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&ee(u,"TO",o.ia),ee(u,"TYPE","xmlhttp"),_r(o,u),o.u&&o.o&&so(u,o.u,o.o),o.O&&(o.g.H=o.O);var l=o.g;o=o.ba,l.M=1,l.A=Es(et(u)),l.u=null,l.R=!0,du(l,o)}n.Va=function(){this.C!=null&&(this.C=null,Is(this),oo(this),Ve(19))};function As(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Fu(o,u){var l=null;if(o.g==u){As(o),ao(o),o.g=null;var f=2}else if(eo(o.h,u))l=u.G,yu(o.h,u),f=1;else return;if(o.I!=0){if(u.o)if(f==1){l=u.u?u.u.length:0,u=Date.now()-u.F;var v=o.D;f=gs(),Se(f,new au(f,l)),vs(o)}else Mu(o);else if(v=u.m,v==3||v==0&&u.X>0||!(f==1&&Cf(o,u)||f==2&&oo(o)))switch(l&&l.length>0&&(u=o.h,u.i=u.i.concat(l)),v){case 1:tn(o,5);break;case 4:tn(o,10);break;case 3:tn(o,6);break;default:tn(o,2)}}}function Bu(o,u){let l=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(l*=2),l*u}function tn(o,u){if(o.j.info("Error code "+u),u==2){var l=d(o.bb,o),f=o.Ua;const v=!f;f=new Pt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||cr(f,"https"),Es(f),v?Af(f.toString(),l):Rf(f.toString(),l)}else Ve(2);o.I=0,o.l&&o.l.pa(u),qu(o),xu(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function qu(o){if(o.I=0,o.ja=[],o.l){const u=Eu(o.h);(u.length!=0||o.i.length!=0)&&(N(o.ja,u),N(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function $u(o,u,l){var f=l instanceof Pt?et(l):new Pt(l);if(f.g!="")u&&(f.g=u+"."+f.g),lr(f,f.u);else{var v=a.location;f=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const P=new Pt(null);f&&cr(P,f),u&&(P.g=u),v&&lr(P,v),l&&(P.h=l),f=P}return l=o.G,u=o.wa,l&&u&&ee(f,l,u),ee(f,"VER",o.ka),_r(o,f),f}function ju(o,u,l){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new ie(new ro({ab:l})):new ie(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function zu(){}n=zu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Rs(){}Rs.prototype.g=function(o,u){return new Ue(o,u)};function Ue(o,u){Te.call(this),this.g=new Du(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Rn(this)}m(Ue,Te),Ue.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){io(this.g)},Ue.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var l={};l.__data__=o,o=l}else this.v&&(l={},l.__data__=Gi(o),o=l);u.i.push(new gf(u.Ya++,o)),u.I==3&&vs(u)},Ue.prototype.N=function(){this.g.l=null,delete this.j,io(this.g),delete this.g,Ue.Z.N.call(this)};function Wu(o){Hi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const l in u){o=l;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}m(Wu,Hi);function Gu(){Ki.call(this),this.status=1}m(Gu,Ki);function Rn(o){this.g=o}m(Rn,zu),Rn.prototype.ra=function(){Se(this.g,"a")},Rn.prototype.qa=function(o){Se(this.g,new Wu(o))},Rn.prototype.pa=function(o){Se(this.g,new Gu)},Rn.prototype.oa=function(){Se(this.g,"b")},Rs.prototype.createWebChannel=Rs.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,oh=function(){return new Rs},ih=function(){return gs()},sh=Xt,Po={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},_s.NO_ERROR=0,_s.TIMEOUT=8,_s.HTTP_ERROR=6,Us=_s,uu.COMPLETE="complete",rh=uu,ru.EventType=rr,rr.OPEN="a",rr.CLOSE="b",rr.ERROR="c",rr.MESSAGE="d",Te.prototype.listen=Te.prototype.J,wr=ru,ie.prototype.listenOnce=ie.prototype.K,ie.prototype.getLastError=ie.prototype.Ha,ie.prototype.getLastErrorCode=ie.prototype.ya,ie.prototype.getStatus=ie.prototype.ca,ie.prototype.getResponseJson=ie.prototype.La,ie.prototype.getResponseText=ie.prototype.la,ie.prototype.send=ie.prototype.ea,ie.prototype.setWithCredentials=ie.prototype.Fa,nh=ie}).apply(typeof Vs<"u"?Vs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn="12.18.0";function e_(n){Hn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=new Wo("@firebase/firestore");function Pn(){return mn.logLevel}function O(n,...e){if(mn.logLevel<=Q.DEBUG){const t=e.map(ra);mn.debug(`Firestore (${Hn}): ${n}`,...t)}}function It(n,...e){if(mn.logLevel<=Q.ERROR){const t=e.map(ra);mn.error(`Firestore (${Hn}): ${n}`,...t)}}function Xe(n,...e){if(mn.logLevel<=Q.WARN){const t=e.map(ra);mn.warn(`Firestore (${Hn}): ${n}`,...t)}}function ra(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ah(n,r,t)}function ah(n,e,t){let r=`FIRESTORE (${Hn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw It(r),new Error(r)}function M(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||ah(e,s,r)}function z(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=t_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function So(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return po(s)===po(i)?K(s,i):po(s)?1:-1}return K(n.length,e.length)}const n_=55296,r_=57343;function po(n){const e=n.charCodeAt(0);return e>=n_&&e<=r_}function Un(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t){this.comparator=e,this.root=t||Ee.EMPTY}insert(e,t){return new ne(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ee.BLACK,null,null))}remove(e){return new ne(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ee.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new bs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new bs(this.root,e,this.comparator,!1)}getReverseIterator(){return new bs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new bs(this.root,e,this.comparator,!0)}}class bs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ee{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ee.RED,this.left=s??Ee.EMPTY,this.right=i??Ee.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ee(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ee.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ee.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}Ee.EMPTY=null,Ee.RED=!0,Ee.BLACK=!1;Ee.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ee(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.comparator=e,this.data=new ne(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yc(this.data.getIterator())}getIteratorFrom(e){return new yc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new le(this.comparator);return t.data=e,t}}class yc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends At{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rt="__name__";class nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof nt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const r=nt.isNumericId(e),s=nt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?nt.extractNumericId(e).compare(nt.extractNumericId(t)):So(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ut.fromString(e.substring(4,e.length-2))}}class Y extends nt{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new x(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const s_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let $e=class Sn extends nt{construct(e,t,r){return new Sn(e,t,r)}static isValidIdentifier(e){return s_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Sn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===rt}static keyField(){return new Sn([rt])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new x(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new x(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new x(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Sn(t)}static emptyPath(){return new Sn([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort($e.comparator)}static empty(){return new Je([])}unionWith(e){let t=new le($e.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Un(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function yn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function i_(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function uh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(Y.fromString(e))}static fromName(e){return new F(Y.fromString(e).popFirst(5))}static empty(){return new F(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e,t){if(!t)throw new x(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function o_(n,e,t,r){if(e===!0&&r===!0)throw new x(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ec(n){if(!F.isDocumentKey(n))throw new x(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function wc(n){if(F.isDocumentKey(n))throw new x(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ts(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function yi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function gn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new x(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=yi(n);throw new x(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function ns(n,e){if(!ts(n))throw new x(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new x(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc=-62135596800,Ic=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ic);return new te(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Tc)throw new x(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ic}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ns(e,te._jsonSchema))return new te(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Tc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:ce("string",te._jsonSchemaVersion),seconds:ce("number"),nanoseconds:ce("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new lh("Invalid base64 string: "+i):i}}(e);return new he(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new he(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}he.EMPTY_BYTE_STRING=new he("");const a_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $t(n){if(M(!!n,39018),typeof n=="string"){let e=0;const t=a_.exec(n);if(M(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jt(n){return typeof n=="string"?he.fromBase64String(n):he.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="server_timestamp",dh="__type__",fh="__previous_value__",ph="__local_write_time__";function Ei(n){return(n?.mapValue?.fields||{})[dh]?.stringValue===hh}function rs(n){const e=n.mapValue.fields[fh];return Ei(e)?rs(e):e}function Fn(n){const e=$t(n.mapValue.fields[ph].timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(e,t,r,s,i,a,c,h,d,p,m,R,C){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=m,this._customHeaders=R,this.grpcFlowControlWindow=C}}const ei="(default)";class xr{constructor(e,t){this.projectId=e,this.database=t||ei}static empty(){return new xr("","")}get isDefaultDatabase(){return this.database===ei}isEqual(e){return e instanceof xr&&e.projectId===this.projectId&&e.database===this.database}}function c_(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new x(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xr(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia=-1;function wi(n){return n==null}function Or(n){return n===0&&1/n==-1/0}function l_(n){return typeof n=="number"&&Number.isInteger(n)&&!Or(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function h_(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="__type__",d_="__max__",Cs={mapValue:{}},gh="__vector__",Lr="value",Bn={nullValue:"NULL_VALUE"},Oe={booleanValue:!0},_e={booleanValue:!1};function de(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ei(n)?4:f_(n)?9007199254740991:ti(n)?10:11:B(28295,{value:n})}function Ge(n,e,t){if(n===e)return!0;const r=de(n);if(r!==de(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Fn(n).isEqual(Fn(e));case 3:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const c=$t(i.timestampValue),h=$t(a.timestampValue);return c.seconds===h.seconds&&c.nanos===h.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,a){return jt(i.bytesValue).isEqual(jt(a.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,a){return re(i.geoPointValue.latitude)===re(a.geoPointValue.latitude)&&re(i.geoPointValue.longitude)===re(a.geoPointValue.longitude)}(n,e);case 2:return function(i,a,c){if("integerValue"in i&&"integerValue"in a)return re(i.integerValue)===re(a.integerValue);let h,d;if("doubleValue"in i&&"doubleValue"in a)h=re(i.doubleValue),d=re(a.doubleValue);else{if(!c?.t)return!1;h=re(i.integerValue??i.doubleValue),d=re(a.integerValue??a.doubleValue)}return h===d?!!c?.i||Or(h)===Or(d):!!(c===void 0||c.o)&&isNaN(h)&&isNaN(d)}(n,e,t);case 9:return Un(n.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>Ge(s,i,t));case 10:case 11:return function(i,a,c){const h=i.mapValue.fields||{},d=a.mapValue.fields||{};if(Zs(h)!==Zs(d))return!1;for(const p in h)if(h.hasOwnProperty(p)&&(d[p]===void 0||!Ge(h[p],d[p],c)))return!1;return!0}(n,e,t);default:return B(52216,{left:n})}}function Mr(n,e){return(n.values||[]).find(t=>Ge(t,e))!==void 0}function Le(n,e){if(n===e)return 0;const t=de(n),r=de(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=re(i.integerValue||i.doubleValue),h=re(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return vc(n.timestampValue,e.timestampValue);case 4:return vc(Fn(n),Fn(e));case 5:return So(n.stringValue,e.stringValue);case 6:return function(i,a){const c=jt(i),h=jt(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const p=K(c[d],h[d]);if(p!==0)return p}return K(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=K(re(i.latitude),re(a.latitude));return c!==0?c:K(re(i.longitude),re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ac(n.arrayValue,e.arrayValue);case 10:return function(i,a){const c=i.fields||{},h=a.fields||{},d=c[Lr]?.arrayValue,p=h[Lr]?.arrayValue,m=K(d?.values?.length||0,p?.values?.length||0);return m!==0?m:Ac(d,p)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Cs.mapValue&&a===Cs.mapValue)return 0;if(i===Cs.mapValue)return 1;if(a===Cs.mapValue)return-1;const c=i.fields||{},h=Object.keys(c),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let m=0;m<h.length&&m<p.length;++m){const R=So(h[m],p[m]);if(R!==0)return R;const C=Le(c[h[m]],d[p[m]]);if(C!==0)return C}return K(h.length,p.length)}(n.mapValue,e.mapValue);default:throw B(23264,{u:t})}}function vc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=$t(n),r=$t(e),s=K(t.seconds,r.seconds);return s!==0?s:K(t.nanos,r.nanos)}function Ac(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Le(t[s],r[s]);if(i!==void 0&&i!==0)return i}return K(t.length,r.length)}function qn(n){return Vo(n)}function Vo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=$t(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Vo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Vo(t.fields[a])}`;return s+"}"}(n.mapValue):B(61005,{value:n})}function Fs(n){switch(de(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=rs(n);return e?16+Fs(e):16;case 5:return 2*n.stringValue.length;case 6:return jt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Fs(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return yn(r.fields,(i,a)=>{s+=i.length+Fs(a)}),s}(n.mapValue);default:throw B(13486,{value:n})}}function Rc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function st(n){return!!n&&"integerValue"in n}function an(n){return!!n&&"doubleValue"in n}function zt(n){return st(n)||an(n)}function $n(n){return!!n&&"arrayValue"in n}function qe(n){return!!n&&"nullValue"in n}function Me(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function cn(n){return!!n&&"mapValue"in n}function ti(n){return(n?.mapValue?.fields||{})[mh]?.stringValue===gh}function bo(n){return(n?.mapValue?.fields||{})[Lr]?.arrayValue}function Rr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return yn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Rr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Rr(n.arrayValue.values[t]);return e}return{...n}}function f_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===d_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!cn(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Rr(t)}setAll(e){let t=$e.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Rr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());cn(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ge(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];cn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){yn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Be(Rr(this.value))}}function _h(n){const e=[];return yn(n.fields,(t,r)=>{const s=new $e([t]);if(cn(r)){const i=_h(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Je(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Or(e)?"-0":e}}function oa(n){return{integerValue:""+n}}function aa(n,e,t){return l_(e)?oa(e):Ti(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(){this._=void 0}}function p_(n,e,t){return n instanceof Ur?function(s,i){const a={fields:{[dh]:{stringValue:hh},[ph]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ei(i)&&(i=rs(i)),i&&(a.fields[fh]=i),{mapValue:a}}(t,e):n instanceof Fr?Eh(n,e):n instanceof Br?wh(n,e):n instanceof qr?function(s,i){const a=yh(s,i),c=si(a)+si(s.l);return st(a)&&st(s.l)?oa(c):Ti(s.serializer,c)}(n,e):n instanceof ni?function(s,i){return Pc(s,i,Math.min)}(n,e):n instanceof ri?function(s,i){return Pc(s,i,Math.max)}(n,e):void 0}function m_(n,e,t){return n instanceof Fr?Eh(n,e):n instanceof Br?wh(n,e):t}function yh(n,e){return n instanceof qr?zt(e)?e:{integerValue:0}:null}class Ur extends Ii{}class Fr extends Ii{constructor(e){super(),this.elements=e}}function Eh(n,e){const t=Th(e);for(const r of n.elements)t.some(s=>Ge(s,r))||t.push(r);return{arrayValue:{values:t}}}class Br extends Ii{constructor(e){super(),this.elements=e}}function wh(n,e){let t=Th(e);for(const r of n.elements)t=t.filter(s=>!Ge(s,r));return{arrayValue:{values:t}}}class ua extends Ii{constructor(e,t){super(),this.serializer=e,this.l=t}}class qr extends ua{}class ni extends ua{}class ri extends ua{}function Pc(n,e,t){if(!zt(e))return n.l;const r=t(si(e),si(n.l));return st(e)&&st(n.l)?oa(r):Ti(n.serializer,r)}function si(n){return re(n.integerValue||n.doubleValue)}function Th(n){return $n(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e,t){this.field=e,this.transform=t}}function __(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Fr&&s instanceof Fr||r instanceof Br&&s instanceof Br?Un(r.elements,s.elements,Ge):r instanceof qr&&s instanceof qr||r instanceof ni&&s instanceof ni||r instanceof ri&&s instanceof ri?Ge(r.l,s.l):r instanceof Ur&&s instanceof Ur}(n.transform,e.transform)}class y_{constructor(e,t){this.version=e,this.transformResults=t}}class _t{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _t}static exists(e){return new _t(void 0,e)}static updateTime(e){return new _t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Bs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class vi{}function Ih(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ah(n.key,_t.none()):new ss(n.key,n.data,_t.none());{const t=n.data,r=Be.empty();let s=new le($e.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new En(n.key,r,new Je(s.toArray()),_t.none())}}function E_(n,e,t){n instanceof ss?function(s,i,a){const c=s.value.clone(),h=Vc(s.fieldTransforms,i,a.transformResults);c.setAll(h),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof En?function(s,i,a){if(!Bs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Vc(s.fieldTransforms,i,a.transformResults),h=i.data;h.setAll(vh(s)),h.setAll(c),i.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Pr(n,e,t,r){return n instanceof ss?function(i,a,c,h){if(!Bs(i.precondition,a))return c;const d=i.value.clone(),p=bc(i.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof En?function(i,a,c,h){if(!Bs(i.precondition,a))return c;const d=bc(i.fieldTransforms,h,a),p=a.data;return p.setAll(vh(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(i,a,c){return Bs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function w_(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=yh(r.transform,s||null);i!=null&&(t===null&&(t=Be.empty()),t.set(r.field,i))}return t||null}function Sc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Un(r,s,(i,a)=>__(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ss extends vi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class En extends vi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function vh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Vc(n,e,t){const r=new Map;M(n.length===t.length,32656,{h:t.length,T:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,m_(a,c,t[s]))}return r}function bc(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,p_(i,a,e))}return r}class Ah extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class T_ extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.position=e,this.inclusive=t}}function Cc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=Le(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Nc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ge(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{}class ue extends Rh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new v_(e,t,r):t==="array-contains"?new P_(e,r):t==="in"?new S_(e,r):t==="not-in"?new V_(e,r):t==="array-contains-any"?new b_(e,r):new ue(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new A_(e,r):new R_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Le(t,this.value)):t!==null&&de(this.value)===de(t)&&this.matchesComparison(Le(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends Rh{constructor(e,t){super(),this.filters=e,this.op=t,this.P=null}static create(e,t){return new Ze(e,t)}matches(e){return Ph(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.P!==null||(this.P=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.P}getFilters(){return Object.assign([],this.filters)}}function Ph(n){return n.op==="and"}function Sh(n){return I_(n)&&Ph(n)}function I_(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function Co(n){if(n instanceof ue)return n.field.canonicalString()+n.op.toString()+qn(n.value);if(Sh(n))return n.filters.map(e=>Co(e)).join(",");{const e=n.filters.map(t=>Co(t)).join(",");return`${n.op}(${e})`}}function Vh(n,e){return n instanceof ue?function(r,s){return s instanceof ue&&r.op===s.op&&r.field.isEqual(s.field)&&Ge(r.value,s.value)}(n,e):n instanceof Ze?function(r,s){return s instanceof Ze&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&Vh(a,s.filters[c]),!0):!1}(n,e):void B(19439)}function bh(n){return n instanceof ue?function(t){return`${t.field.canonicalString()} ${t.op} ${qn(t.value)}`}(n):n instanceof Ze?function(t){return t.op.toString()+" {"+t.getFilters().map(bh).join(" ,")+"}"}(n):"Filter"}class v_ extends ue{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class A_ extends ue{constructor(e,t){super(e,"in",t),this.keys=Ch("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class R_ extends ue{constructor(e,t){super(e,"not-in",t),this.keys=Ch("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ch(n,e){return(e.arrayValue?.values||[]).map(t=>F.fromName(t.referenceValue))}class P_ extends ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $n(t)&&Mr(t.arrayValue,this.value)}}class S_ extends ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Mr(this.value.arrayValue,t)}}class V_ extends ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(Mr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Mr(this.value.arrayValue,t)}}class b_ extends ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$n(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Mr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,t="asc"){this.field=e,this.dir=t}}function C_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(e){return new j(e)}static min(){return new j(new te(0,0))}static max(){return new j(new te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ae(e,0,j.min(),j.min(),j.min(),Be.empty(),0)}static newFoundDocument(e,t,r,s){return new Ae(e,1,t,j.min(),r,s,0)}static newNoDocument(e,t){return new Ae(e,2,t,j.min(),j.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new Ae(e,3,t,j.min(),j.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=-1;function N_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=j.fromTimestamp(r===1e9?new te(t+1,0):new te(t,r));return new Wt(s,F.empty(),e)}function k_(n){return new Wt(n.readTime,n.key,$r)}class Wt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Wt(j.min(),F.empty(),$r)}static max(){return new Wt(j.max(),F.empty(),$r)}}function D_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.R=null}}function kc(n,e=null,t=[],r=[],s=null,i=null,a=null){return new x_(n,e,t,r,s,i,a)}function Nh(n){const e=z(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Co(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),wi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>qn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>qn(r)).join(",")),e.R=t}return e.R}function kh(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!C_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Vh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Nc(n.startAt,e.startAt)&&Nc(n.endAt,e.endAt)}function sn(n){return!!n.isCorePipeline}function Dh(n){return!!n.path&&F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=h,this.I=null,this.A=null,this.V=null,this.startAt,this.endAt}}function O_(n,e,t,r,s,i,a,c){return new is(n,e,t,r,s,i,a,c)}function ca(n){return new is(n)}function Dc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function L_(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function xh(n){return n.collectionGroup!==null}function Sr(n){const e=z(n);if(e.I===null){e.I=[];const t=new Set;for(const i of e.explicitOrderBy)e.I.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new le($e.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.I.push(new oi(i,r))}),t.has($e.keyField().canonicalString())||e.I.push(new oi($e.keyField(),r))}return e.I}function ot(n){const e=z(n);return e.A||(e.A=M_(e,Sr(n))),e.A}function M_(n,e){if(n.limitType==="F")return kc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new oi(s.field,i)});const t=n.endAt?new ii(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ii(n.startAt.position,n.startAt.inclusive):null;return kc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function No(n,e){const t=n.filters.concat([e]);return new is(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ko(n,e,t){return new is(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function U_(n,e){return kh(ot(n),ot(e))&&n.limitType===e.limitType}function Vr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>bh(s)).join(", ")}]`),wi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>qn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>qn(s)).join(",")),`Target(${r})`}(ot(n))}; limitType=${n.limitType})`}function Ai(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):F.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Sr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,h){const d=Cc(a,c,h);return a.inclusive?d<=0:d<0}(r.startAt,Sr(r),s)||r.endAt&&!function(a,c,h){const d=Cc(a,c,h);return a.inclusive?d>=0:d>0}(r.endAt,Sr(r),s))}(n,e)}function la(n){return(e,t)=>{let r=!1;for(const s of Sr(n)){const i=F_(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function F_(n,e,t){const r=n.field.isKeyField()?F.comparator(e.key,t.key):function(i,a,c){const h=a.data.field(i),d=c.data.field(i);return h!==null&&d!==null?Le(h,d):B(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae,J;function q_(n){switch(n){case V.OK:return B(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Oh(n){if(n===void 0)return It("GRPC error has no .code"),V.UNKNOWN;switch(n){case ae.OK:return V.OK;case ae.CANCELLED:return V.CANCELLED;case ae.UNKNOWN:return V.UNKNOWN;case ae.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case ae.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case ae.INTERNAL:return V.INTERNAL;case ae.UNAVAILABLE:return V.UNAVAILABLE;case ae.UNAUTHENTICATED:return V.UNAUTHENTICATED;case ae.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case ae.NOT_FOUND:return V.NOT_FOUND;case ae.ALREADY_EXISTS:return V.ALREADY_EXISTS;case ae.PERMISSION_DENIED:return V.PERMISSION_DENIED;case ae.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case ae.ABORTED:return V.ABORTED;case ae.OUT_OF_RANGE:return V.OUT_OF_RANGE;case ae.UNIMPLEMENTED:return V.UNIMPLEMENTED;case ae.DATA_LOSS:return V.DATA_LOSS;default:return B(39323,{code:n})}}(J=ae||(ae={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){yn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return uh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_=new ne(F.comparator);function De(){return $_}const Lh=new ne(F.comparator);function Vn(...n){let e=Lh;for(const t of n)e=e.insert(t.key,t);return e}function Mh(n){let e=Lh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Lt(){return br()}function Uh(){return br()}function br(){return new wn(n=>n.toString(),(n,e)=>n.isEqual(e))}const j_=new ne(F.comparator),z_=new le(F.comparator);function H(...n){let e=z_;for(const t of n)e=e.add(t);return e}const W_=new le(K);function G_(){return W_}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_=new Ut([4294967295,4294967295],0);function xc(n){const e=H_().encode(n),t=new th;return t.update(e),new Uint8Array(t.digest())}function Oc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ut([t,r],0),new Ut([s,i],0)]}class ha{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Tr(`Invalid padding: ${t}`);if(r<0)throw new Tr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Tr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Tr(`Invalid padding when bitmap length is 0: ${t}`);this.m=8*e.length-t,this.p=Ut.fromNumber(this.m)}S(e,t,r){let s=e.add(t.multiply(Ut.fromNumber(r)));return s.compare(K_)===1&&(s=new Ut([s.getBits(0),s.getBits(1)],0)),s.modulo(this.p).toNumber()}v(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.m===0)return!1;const t=xc(e),[r,s]=Oc(t);for(let i=0;i<this.hashCount;i++){const a=this.S(r,s,i);if(!this.v(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new ha(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.m===0)return;const t=xc(e),[r,s]=Oc(t);for(let i=0;i<this.hashCount;i++){const a=this.S(r,s,i);this.D(a)}}D(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Tr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,as.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new os(j.min(),s,new ne(K),De(),De(),H())}}class as{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new as(r,t,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,t,r,s){this.C=e,this.removedTargetIds=t,this.key=r,this.F=s}}class Fh{constructor(e,t){this.targetId=e,this.O=t}}class Bh{constructor(e,t,r=he.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Lc{constructor(e){this.targetId=e,this.M=0,this.N=Mc(),this.L=he.EMPTY_BYTE_STRING,this.B=!1,this.U=!0}get current(){return this.B}get resumeToken(){return this.L}get k(){return this.M!==0}get q(){return this.U}$(e){e.approximateByteSize()>0&&(this.U=!0,this.L=e)}K(){let e=H(),t=H(),r=H();return this.N.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B(38017,{changeType:i})}}),new as(this.L,this.B,e,t,r)}W(){this.U=!1,this.N=Mc()}G(e,t){this.U=!0,this.N=this.N.insert(e,t)}j(e){this.U=!0,this.N=this.N.remove(e)}H(){this.M+=1}J(){this.M-=1,M(this.M>=0,3241,{M:this.M,targetId:this.targetId})}Y(){this.U=!0,this.B=!0}}const yr="WatchChangeAggregator";class Q_{constructor(e){this.Z=e,this.X=new Map,this.ee=De(),this.te=Ns(),this.ne=De(),this.re=Ns(),this.ie=new ne(K)}se(e){for(const t of e.C)e.F&&e.F.isFoundDocument()?this._e(t,e.F):this.oe(t,e.key,e.F);for(const t of e.removedTargetIds)this.oe(t,e.key,e.F)}ae(e){this.forEachTarget(e,t=>{const r=this.X.get(t);if(r)switch(e.state){case 0:this.ue(t)&&r.$(e.resumeToken);break;case 1:r.J(),r.k||r.W(),r.$(e.resumeToken);break;case 2:r.J(),r.k||this.removeTarget(t);break;case 3:this.ue(t)&&(r.Y(),r.$(e.resumeToken));break;case 4:this.ue(t)&&(this.ce(t),r.$(e.resumeToken));break;default:B(56790,{state:e.state})}else O(yr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.X.forEach((r,s)=>{this.ue(s)&&t(s)})}le(e){return sn(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:Dh(e)}Ee(e){const t=e.targetId,r=e.O.count,s=this.he(t);if(s){const i=s.target;if(this.le(i))if(r===0){const a=new F(sn(i)?Y.fromString(i.getPipelineDocuments()[0]):i.path);this.oe(t,a,Ae.newNoDocument(a,j.min()))}else M(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.Te(t);if(a!==r){const c=this.Pe(e),h=c?this.Re(c,e,a):1;if(h!==0){this.ce(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ie=this.ie.insert(t,d)}}}}}Pe(e){const t=e.O.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=jt(r).toUint8Array()}catch(h){if(h instanceof lh)return Xe("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new ha(a,s,i)}catch(h){return Xe(h instanceof Tr?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.m===0?null:c}Re(e,t,r){return t.O.count===r-this.Ve(e,t.targetId)?0:2}Ve(e,t){const r=this.Z.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Z.Ae(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.oe(t,i,null),s++)}),s}de(e){const t=new Map;this.X.forEach((i,a)=>{const c=this.he(a);if(c){if(i.current&&this.le(c.target)){const h=sn(c.target)?Y.fromString(c.target.getPipelineDocuments()[0]):c.target.path,d=new F(h);this.fe(d).has(a)||this.me(a,d)||this.oe(a,d,Ae.newNoDocument(d,e))}i.q&&(t.set(a,i.K()),i.W())}});let r=H();this.re.forEach((i,a)=>{let c=!0;a.forEachWhile(h=>{const d=this.he(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ee.forEach((i,a)=>a.setReadTime(e)),this.ne.forEach((i,a)=>a.setReadTime(e));const s=new os(e,t,this.ie,this.ee,this.ne,r);return this.ee=De(),this.te=Ns(),this.ne=De(),this.re=Ns(),this.ie=new ne(K),s}_e(e,t){const r=this.X.get(e);if(!r||!this.ue(e))return void O(yr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.me(e,t.key)?2:0;r.G(t.key,s),sn(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t.key,t):this.ee=this.ee.insert(t.key,t),this.te=this.te.insert(t.key,this.fe(t.key).add(e)),this.re=this.re.insert(t.key,this.pe(t.key).add(e))}oe(e,t,r){const s=this.X.get(e);s&&this.ue(e)?(this.me(e,t)?s.G(t,1):s.j(t),this.re=this.re.insert(t,this.pe(t).delete(e)),this.re=this.re.insert(t,this.pe(t).add(e)),r&&(sn(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t,r):this.ee=this.ee.insert(t,r))):O(yr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.X.delete(e)}Te(e){const t=this.X.get(e);if(!t)return 0;const r=t.K();return this.Z.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}H(e){let t=this.X.get(e);t||(O(yr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Lc(e),this.X.set(e,t)),t.H()}pe(e){let t=this.re.get(e);return t||(t=new le(K),this.re=this.re.insert(e,t)),t}fe(e){let t=this.te.get(e);return t||(t=new le(K),this.te=this.te.insert(e,t)),t}ue(e){const t=this.he(e)!==null;return t||O(yr,"Detected inactive target",e),t}he(e){const t=this.X.get(e);return t===void 0||t.k?null:this.Z.ge(e)}ce(e){this.X.set(e,new Lc(e)),this.Z.getRemoteKeysForTarget(e).forEach(t=>{this.oe(e,t,null)})}me(e,t){return this.Z.getRemoteKeysForTarget(e).has(t)}}function Ns(){return new ne(F.comparator)}function Mc(){return new ne(F.comparator)}const J_={asc:"ASCENDING",desc:"DESCENDING"},Y_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},X_={and:"AND",or:"OR"};class Z_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Do(n,e){return n.useProto3Json||wi(e)?e:{value:e}}function ai(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function da(n){const e=$t(n);return new te(e.seconds,e.nanos)}function qh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function $s(n,e){return ai(n,e.toTimestamp())}function at(n){return M(!!n,49232),j.fromTimestamp(da(n))}function fa(n,e){return xo(n,e).canonicalString()}function xo(n,e){const t=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function $h(n){const e=Y.fromString(n);return M(Hh(e),10190,{key:e.toString()}),e}function ui(n,e){return fa(n.databaseId,e.path)}function mo(n,e){const t=$h(e);if(t.get(1)!==n.databaseId.projectId)throw new x(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new x(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(zh(t))}function jh(n,e){return fa(n.databaseId,e)}function ey(n){const e=$h(n);return e.length===4?Y.emptyPath():zh(e)}function Oo(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function zh(n){return M(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Uc(n,e,t){return{name:ui(n,e),fields:t.value.mapValue.fields}}function ty(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,p){return d.useProto3Json?(M(p===void 0||typeof p=="string",58123),he.fromBase64String(p||"")):(M(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),he.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const p=d.code===void 0?V.UNKNOWN:Oh(d.code);return new x(p,d.message||"")}(a);t=new Bh(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=mo(n,r.document.name),i=at(r.document.updateTime),a=r.document.createTime?at(r.document.createTime):j.min(),c=new Be({mapValue:{fields:r.document.fields}}),h=Ae.newFoundDocument(s,i,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new qs(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=mo(n,r.document),i=r.readTime?at(r.readTime):j.min(),a=Ae.newNoDocument(s,i),c=r.removedTargetIds||[];t=new qs([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=mo(n,r.document),i=r.removedTargetIds||[];t=new qs([],i,s,null)}else{if(!("filter"in e))return B(11601,{ye:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new B_(s,i),c=r.targetId;t=new Fh(c,a)}}return t}function ny(n,e){let t;if(e instanceof ss)t={update:Uc(n,e.key,e.value)};else if(e instanceof Ah)t={delete:ui(n,e.key)};else if(e instanceof En)t={update:Uc(n,e.key,e.data),updateMask:dy(e.fieldMask)};else{if(!(e instanceof T_))return B(16599,{we:e.type});t={verify:ui(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Ur)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Fr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Br)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof qr)return{fieldPath:a.field.canonicalString(),increment:c.l};if(c instanceof ni)return{fieldPath:a.field.canonicalString(),minimum:c.l};if(c instanceof ri)return{fieldPath:a.field.canonicalString(),maximum:c.l};throw B(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:$s(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)}(n,e.precondition)),t}function ry(n,e){return n&&n.length>0?(M(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?at(s.updateTime):at(i);return a.isEqual(j.min())&&(a=at(i)),new y_(a,s.transformResults||[])}(t,e))):[]}function sy(n,e){return{documents:[jh(n,e.path)]}}function iy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=jh(n,s);const i=function(d){if(d.length!==0)return Gh(Ze.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(p=>function(R){return{field:bn(R.field),direction:cy(R.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Do(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{be:t,parent:s}}function oy(n){let e=ey(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){M(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(m){const R=Wh(m);return R instanceof Ze&&Sh(R)?R.getFilters():[R]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(R=>function(N){return new oi(Cn(N.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(R))}(t.orderBy));let c=null;t.limit&&(c=function(m){let R;return R=typeof m=="object"?m.value:m,wi(R)?null:R}(t.limit));let h=null;t.startAt&&(h=function(m){const R=!!m.before,C=m.values||[];return new ii(C,R)}(t.startAt));let d=null;return t.endAt&&(d=function(m){const R=!m.before,C=m.values||[];return new ii(C,R)}(t.endAt)),O_(e,s,a,i,c,"F",h,d)}function ay(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function uy(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(n))}}}}function Wh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cn(t.unaryFilter.field);return ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cn(t.unaryFilter.field);return ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cn(t.unaryFilter.field);return ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cn(t.unaryFilter.field);return ue.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(n):n.fieldFilter!==void 0?function(t){return ue.create(Cn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ze.create(t.compositeFilter.filters.map(r=>Wh(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(n):B(30097,{filter:n})}function cy(n){return J_[n]}function ly(n){return Y_[n]}function hy(n){return X_[n]}function bn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return $e.fromServerFormat(n.fieldPath)}function Gh(n){return n instanceof ue?function(t){if(t.op==="=="){if(Me(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NAN"}};if(qe(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Me(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NOT_NAN"}};if(qe(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bn(t.field),op:ly(t.op),value:t.value}}}(n):n instanceof Ze?function(t){const r=t.getFilters().map(s=>Gh(s));return r.length===1?r[0]:{compositeFilter:{op:hy(t.op),filters:r}}}(n):B(54877,{filter:n})}function dy(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Hh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Kh(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function jr(n,e){const t={fields:{}};return e.forEach((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)}),{mapValue:t}}function Qh(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(n){return new Z_(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze(he.fromBase64String(e))}catch(t){throw new x(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze(he.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ns(e,ze._jsonSchema))return ze.fromBase64String(e.bytes)}}ze._jsonSchemaVersion="firestore/bytes/1.0",ze._jsonSchema={type:ce("string",ze._jsonSchemaVersion),bytes:ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new $e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function fy(){return new pa(rt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(e){if(ns(e,ut._jsonSchema))return new ut(e.latitude,e.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:ce("string",ut._jsonSchemaVersion),latitude:ce("number"),longitude:ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class py{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ve.UNAUTHENTICATED))}shutdown(){}}class my{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class gy{constructor(e){this.ve=e,this.currentUser=ve.UNAUTHENTICATED,this.De=0,this.forceRefresh=!1,this.auth=null}start(e,t){M(this.xe===void 0,42304);let r=this.De;const s=h=>this.De!==r?(r=this.De,t(h)):Promise.resolve();let i=new yt;this.xe=()=>{this.De++,this.currentUser=this.Ce(),i.resolve(),i=new yt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=i;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},c=h=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.xe&&(this.auth.addAuthTokenListener(this.xe),a())};this.ve.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.ve.getImmediate({optional:!0});h?c(h):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new yt)}},0),a()}getToken(){const e=this.De,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.De!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(M(typeof r.accessToken=="string",31837,{Fe:r}),new Jh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.xe&&this.auth.removeAuthTokenListener(this.xe),this.xe=void 0}Ce(){const e=this.auth&&this.auth.getUid();return M(e===null||typeof e=="string",2055,{Oe:e}),new ve(e)}}class _y{constructor(e,t,r){this.Me=e,this.Ne=t,this.Le=r,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.Be=new Map}Ue(){return this.Le?this.Le():null}get headers(){this.Be.set("X-Goog-AuthUser",this.Me);const e=this.Ue();return e&&this.Be.set("Authorization",e),this.Ne&&this.Be.set("X-Goog-Iam-Authorization-Token",this.Ne),this.Be}}class yy{constructor(e,t,r){this.Me=e,this.Ne=t,this.Le=r}getToken(){return Promise.resolve(new _y(this.Me,this.Ne,this.Le))}start(e,t){e.enqueueRetryable(()=>t(ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Fc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ey{constructor(e,t){this.ke=t,this.forceRefresh=!1,this.appCheck=null,this.qe=null,this.$e=null,Ke(e)&&e.settings.appCheckToken&&(this.$e=e.settings.appCheckToken)}start(e,t){M(this.xe===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.qe;return this.qe=i.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.xe=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.xe&&this.appCheck.addTokenListener(this.xe)};this.ke.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.ke.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.$e)return Promise.resolve(new Fc(this.$e));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(M(typeof t.token=="string",44558,{tokenResult:t}),this.qe=t.token,new Fc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.xe&&this.appCheck.removeTokenListener(this.xe),this.xe=void 0}}function Yh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{Ke(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc="ConnectivityMonitor";class qc{constructor(){this.Qe=()=>this.We(),this.Ge=()=>this.ze(),this.je=[],this.He()}Ke(e){this.je.push(e)}shutdown(){window.removeEventListener("online",this.Qe),window.removeEventListener("offline",this.Ge)}He(){window.addEventListener("online",this.Qe),window.addEventListener("offline",this.Ge)}We(){O(Bc,"Network connectivity changed: AVAILABLE");for(const e of this.je)e(0)}ze(){O(Bc,"Network connectivity changed: UNAVAILABLE");for(const e of this.je)e(1)}static Je(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ks=null;function Lo(){return ks===null?ks=function(){return 268435456+Math.round(2147483648*Math.random())}():ks++,"0x"+ks.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go="RestConnection",Ty={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Iy{get Ye(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ze=t+"://"+e.host,this.Xe=`projects/${r}/databases/${s}`,this.et=this.databaseId.database===ei?`project_id=${r}`:`project_id=${r}&database_id=${s}`}tt(e,t,r,s,i){const a=Lo(),c=this.nt(e,t.toUriEncodedString());O(go,`Sending RPC '${e}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Xe,"x-goog-request-params":this.et};this.rt(h,s,i);const{host:d}=new URL(c),p=Yr(d);return this.it(e,c,h,r,p).then(m=>(O(go,`Received RPC '${e}' ${a}: `,m),m),m=>{throw Xe(go,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m})}st(e,t,r,s,i,a){return this.tt(e,t,r,s,i)}rt(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Hn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}nt(e,t){const r=Ty[e];let s=`${this.Ze}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(e){this._t=e._t,this.ot=e.ot}ut(e){this.ct=e}lt(e){this.Et=e}ht(e){this.Tt=e}onMessage(e){this.Pt=e}close(){this.ot()}send(e){this._t(e)}Rt(){this.ct()}It(){this.Et()}At(e){this.Tt(e)}Vt(e){this.Pt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie="WebChannelConnection",Er=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class xn extends Iy{constructor(e){super(e),this.dt=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static ft(){if(!xn.gt){const e=ih();Er(e,sh.STAT_EVENT,t=>{t.stat===Po.PROXY?O(Ie,"STAT_EVENT: detected buffering proxy"):t.stat===Po.NOPROXY&&O(Ie,"STAT_EVENT: detected no buffering proxy")}),xn.gt=!0}}it(e,t,r,s,i){const a=Lo();return new Promise((c,h)=>{const d=new nh;d.setWithCredentials(!0),d.listenOnce(rh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Us.NO_ERROR:const m=d.getResponseJson();O(Ie,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case Us.TIMEOUT:O(Ie,`RPC '${e}' ${a} timed out`),h(new x(V.DEADLINE_EXCEEDED,"Request time out"));break;case Us.HTTP_ERROR:const R=d.getStatus();if(O(Ie,`RPC '${e}' ${a} failed with status:`,R,"response text:",d.getResponseText()),R>0){let C=d.getResponseJson();Array.isArray(C)&&(C=C[0]);const N=C?.error;if(N&&N.status&&N.message){const U=function(W){const X=W.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(X)>=0?X:V.UNKNOWN}(N.status);h(new x(U,N.message))}else h(new x(V.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new x(V.UNAVAILABLE,"Connection failed."));break;default:B(9055,{yt:e,streamId:a,wt:d.getLastErrorCode(),bt:d.getLastError()})}}finally{O(Ie,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(s);O(Ie,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)})}St(e,t,r){const s=Lo(),i=[this.Ze,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.rt(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");O(Ie,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=a.createWebChannel(d,c);this.vt(p);let m=!1,R=!1;const C=new vy({_t:N=>{R?O(Ie,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(m||(O(Ie,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),O(Ie,`RPC '${e}' stream ${s} sending:`,N),p.send(N))},ot:()=>p.close()});return Er(p,wr.EventType.OPEN,()=>{R||(O(Ie,`RPC '${e}' stream ${s} transport opened.`),C.Rt())}),Er(p,wr.EventType.CLOSE,()=>{R||(R=!0,O(Ie,`RPC '${e}' stream ${s} transport closed`),C.At(),this.Dt(p))}),Er(p,wr.EventType.ERROR,N=>{R||(R=!0,Xe(Ie,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),C.At(new x(V.UNAVAILABLE,"The operation could not be completed")))}),Er(p,wr.EventType.MESSAGE,N=>{if(!R){const U=N.data[0];M(!!U,16349);const L=U,W=L?.error||L[0]?.error;if(W){O(Ie,`RPC '${e}' stream ${s} received error:`,W);const X=W.status;let se=function(ye){const T=ae[ye];if(T!==void 0)return Oh(T)}(X),Ce=W.message;X==="NOT_FOUND"&&Ce.includes("database")&&Ce.includes("does not exist")&&Ce.includes(this.databaseId.database)&&Xe(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),se===void 0&&(se=V.INTERNAL,Ce="Unknown error status: "+X+" with message "+W.message),R=!0,C.At(new x(se,Ce)),p.close()}else O(Ie,`RPC '${e}' stream ${s} received:`,U),C.Vt(U)}}),xn.ft(),setTimeout(()=>{C.It()},0),C}terminate(){this.dt.forEach(e=>e.close()),this.dt=[]}vt(e){this.dt.push(e)}Dt(e){this.dt=this.dt.filter(t=>t===e)}rt(e,t,r){super.rt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return oh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(n){return new xn(n)}xn.gt=!1;class Xh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.xt=e,this.timerId=t,this.Ct=r,this.Ft=s,this.Ot=i,this.Mt=0,this.Nt=null,this.Lt=Date.now(),this.reset()}reset(){this.Mt=0}Bt(){this.Mt=this.Ot}Ut(e){this.cancel();const t=Math.floor(this.Mt+this.kt()),r=Math.max(0,Date.now()-this.Lt),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Mt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Nt=this.xt.enqueueAfterDelay(this.timerId,s,()=>(this.Lt=Date.now(),e())),this.Mt*=this.Ft,this.Mt<this.Ct&&(this.Mt=this.Ct),this.Mt>this.Ot&&(this.Mt=this.Ot)}qt(){this.Nt!==null&&(this.Nt.skipDelay(),this.Nt=null)}cancel(){this.Nt!==null&&(this.Nt.cancel(),this.Nt=null)}kt(){return(Math.random()-.5)*this.Mt}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="PersistentStream";class Zh{constructor(e,t,r,s,i,a,c,h){this.xt=e,this.$t=r,this.Kt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Qt=0,this.Wt=null,this.Gt=null,this.stream=null,this.zt=0,this.jt=new Xh(e,t)}Ht(){return this.state===1||this.state===5||this.Jt()}Jt(){return this.state===2||this.state===3}start(){this.zt=0,this.state!==4?this.auth():this.Yt()}async stop(){this.Ht()&&await this.close(0)}Zt(){this.state=0,this.jt.reset()}Xt(){this.Jt()&&this.Wt===null&&(this.Wt=this.xt.enqueueAfterDelay(this.$t,6e4,()=>this.en()))}tn(e){this.nn(),this.stream.send(e)}async en(){if(this.Jt())return this.close(0)}nn(){this.Wt&&(this.Wt.cancel(),this.Wt=null)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}async close(e,t){this.nn(),this.rn(),this.jt.cancel(),this.Qt++,e!==4?this.jt.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(It(t.toString()),It("Using maximum backoff delay to prevent overloading the backend."),this.jt.Bt()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.sn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ht(t)}sn(){}auth(){this.state=1;const e=this._n(this.Qt),t=this.Qt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Qt===t&&this.an(r,s)},r=>{e(()=>{const s=new x(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.un(s)})})}an(e,t){const r=this._n(this.Qt);this.stream=this.cn(e,t),this.stream.ut(()=>{r(()=>this.listener.ut())}),this.stream.lt(()=>{r(()=>(this.state=2,this.Gt=this.xt.enqueueAfterDelay(this.Kt,1e4,()=>(this.Jt()&&(this.state=3),Promise.resolve())),this.listener.lt()))}),this.stream.ht(s=>{r(()=>this.un(s))}),this.stream.onMessage(s=>{r(()=>++this.zt==1?this.En(s):this.onNext(s))})}Yt(){this.state=5,this.jt.Ut(async()=>{this.state=0,this.start()})}un(e){return O($c,`close with error: ${e}`),this.stream=null,this.close(4,e)}_n(e){return t=>{this.xt.enqueueAndForget(()=>this.Qt===e?t():(O($c,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ry extends Zh{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}cn(e,t){return this.connection.St("Listen",e,t)}En(e){return this.onNext(e)}onNext(e){this.jt.reset();const t=ty(this.serializer,e),r=function(i){if(!("targetChange"in i))return j.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?j.min():a.readTime?at(a.readTime):j.min()}(e);return this.listener.hn(t,r)}Tn(e){const t={};t.database=Oo(this.serializer),t.addTarget=function(i,a){let c;const h=a.target;if(c=sn(h)?{pipelineQuery:uy(i,h)}:Dh(h)?{documents:sy(i,h)}:{query:iy(i,h).be},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=qh(i,a.resumeToken);const d=Do(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(j.min())>0){c.readTime=ai(i,a.snapshotVersion.toTimestamp());const d=Do(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=ay(this.serializer,e);r&&(t.labels=r),this.tn(t)}Pn(e){const t={};t.database=Oo(this.serializer),t.removeTarget=e,this.tn(t)}}class Py extends Zh{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Rn(){return this.zt>0}start(){this.lastStreamToken=void 0,super.start()}sn(){this.Rn&&this.In([])}cn(e,t){return this.connection.St("Write",e,t)}En(e){return M(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,M(!e.writeResults||e.writeResults.length===0,55816),this.listener.An()}onNext(e){M(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.jt.reset();const t=ry(e.writeResults,e.commitTime),r=at(e.commitTime);return this.listener.Vn(r,t)}dn(){const e={};e.database=Oo(this.serializer),this.tn(e)}In(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ny(this.serializer,r))};this.tn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{}class Vy extends Sy{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.fn=!1}mn(){if(this.fn)throw new x(V.FAILED_PRECONDITION,"The client has already been terminated.")}tt(e,t,r,s){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.tt(e,xo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new x(V.UNKNOWN,i.toString())})}st(e,t,r,s,i){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.st(e,xo(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(V.UNKNOWN,a.toString())})}terminate(){this.fn=!0,this.connection.terminate()}}function by(n,e,t,r){return new Vy(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy="ComponentProvider",jc=new Map;function Ny(n,e,t,r,s){return new u_(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Yh(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ed=41943040;class ke{static withCacheSize(e){return new ke(e,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}ke.DEFAULT_COLLECTION_PERCENTILE=10,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ke.DEFAULT=new ke(ed,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ke.DISABLED=new ke(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.pn(r),this.gn=r=>t.writeSequenceNumber(r))}pn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.gn&&this.gn(e),e}}Pi.yn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Dy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==ky)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):b.reject(t)}static resolve(e){return new b((t,r)=>{t(e)})}static reject(e){return new b((t,r)=>{r(e)})}static waitFor(e){return new b((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},h=>r(h))}),a=!0,i===s&&t()})}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next(s=>s?b.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new b((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let h=0;h<i;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++c,c===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new b((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function xy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Qn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc="LruGarbageCollector",Oy=1048576;function Gc([n,e],[t,r]){const s=K(n,t);return s===0?K(e,r):s}class Ly{constructor(e){this.Jn=e,this.buffer=new le(Gc),this.Yn=0}Zn(){return++this.Yn}Xn(e){const t=[e,this.Zn()];if(this.buffer.size<this.Jn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Gc(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class My{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.tr(6e4)}stop(){this.er&&(this.er.cancel(),this.er=null)}get started(){return this.er!==null}tr(e){O(Wc,`Garbage collection scheduled in ${e}ms`),this.er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qn(t)?O(Wc,"Ignoring IndexedDB error during garbage collection: ",t):await Kn(t)}await this.tr(3e5)})}}class Uy{constructor(e,t){this.nr=e,this.params=t}calculateTargetCount(e,t){return this.nr.rr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Pi.yn);const r=new Ly(t);return this.nr.forEachTarget(e,s=>r.Xn(s.sequenceNumber)).next(()=>this.nr.ir(e,s=>r.Xn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.nr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.nr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(zc)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),zc):this.sr(e,t))}getCacheSize(e){return this.nr.getCacheSize(e)}sr(e,t){let r,s,i,a,c,h,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(i=m,h=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(d=Date.now(),Pn()<=Q.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(h-c)+`ms
	Removed ${m} documents in `+(d-h)+`ms
Total Duration: ${d-p}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Fy(n,e){return new Uy(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="firestore.googleapis.com",Hc=!0;class Kc{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new x(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=td,this.ssl=Hc}else this.host=e.host,this.ssl=e.ssl??Hc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=ed;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Oy)throw new x(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(o_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yh(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new x(V.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,s){if(r===s)return!0;if(!r||!s)return!1;const i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(const c of i)if(r[c]!==s[c])return!1;return!0}(this._customHeaders,e._customHeaders)}}let Si=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Kc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Kc(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new py;switch(r.type){case"firstParty":return new yy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new x(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=jc.get(t);r&&(O(Cy,"Removing Datastore"),jc.delete(t),r.terminate())}(this),Promise.resolve()}};function By(n,e,t,r={}){n=gn(n,Si);const s=Yr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&El(`https://${c}`),i.host!==td&&i.host!==c&&Xe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...i,host:c,ssl:s,emulatorOptions:r};if(!dn(h,a)&&(n._setSettings(h),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=ve.MOCK_USER;else{d=$f(r.mockUserToken,n._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new x(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ve(m)}n._authCredentials=new my(new Jh(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Jn(this.firestore,e,this._query)}}class oe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ft(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new oe(this.firestore,e,this._key)}toJSON(){return{type:oe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ns(t,oe._jsonSchema))return new oe(e,r||null,new F(Y.fromString(t.referencePath)))}}oe._jsonSchemaVersion="firestore/documentReference/1.0",oe._jsonSchema={type:ce("string",oe._jsonSchemaVersion),referencePath:ce("string")};class Ft extends Jn{constructor(e,t,r){super(e,t,ca(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new oe(this.firestore,null,new F(e))}withConverter(e){return new Ft(this.firestore,e,this._path)}}function rI(n,e,...t){if(n=We(n),ch("collection","path",e),n instanceof Si){const r=Y.fromString(e,...t);return wc(r),new Ft(n,null,r)}{if(!(n instanceof oe||n instanceof Ft))throw new x(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return wc(r),new Ft(n.firestore,null,r)}}function sI(n,e,...t){if(n=We(n),arguments.length===1&&(e=sa.newId()),ch("doc","path",e),n instanceof Si){const r=Y.fromString(e,...t);return Ec(r),new oe(n,null,new F(r))}{if(!(n instanceof oe||n instanceof Ft))throw new x(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Ec(r),new oe(n.firestore,n instanceof Ft?n.converter:null,new F(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:xe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ns(e,xe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new xe(e.vectorValues);throw new x(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}xe._jsonSchemaVersion="firestore/vectorValue/1.0",xe._jsonSchema={type:ce("string",xe._jsonSchemaVersion),vectorValues:ce("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=/^__.*__$/;class $y{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new En(e,this.data,this.fieldMask,t,this.fieldTransforms):new ss(e,this.data,t,this.fieldTransforms)}}function nd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:n})}}class ga{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ga({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return ci(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(nd(this.dataSource)&&qy.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class jy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ri(e)}createContext(e,t,r,s=!1){return new ga({dataSource:e,methodName:t,targetDoc:r,path:$e.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function rd(n){const e=n._freezeSettings(),t=Ri(n._databaseId);return new jy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function zy(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);od("Data must be an object, but it was:",a,r);const c=sd(r,a);let h,d;if(i.merge)h=new Je(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const R=us(e,m,t);if(!a.contains(R))throw new x(V.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Ky(p,R)||p.push(R)}h=new Je(p),d=a.fieldTransforms.filter(m=>h.covers(m.field))}else h=null,d=a.fieldTransforms;return new $y(new Be(c),h,d)}class _a extends ma{_toFieldTransform(e){return new g_(e.path,new Ur)}isEqual(e){return e instanceof _a}}function Wy(n,e,t,r=!1){return jn(t,n.createContext(r?4:3,e))}function jn(n,e,t){if(id(n=We(n)))return od("Unsupported field value:",e,n),sd(n,e);if(n instanceof ma)return function(s,i){if(!nd(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){const a=[];let c=0;for(const h of s){let d=jn(h,i.childContextForArray(c));d==null&&(d={nullValue:"NULL_VALUE"}),a.push(d),c++}return{arrayValue:{values:a}}}(n,e)}return function(s,i,a){if((s=We(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return aa(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=te.fromDate(s);return{timestampValue:ai(i.serializer,c)}}if(s instanceof te){const c=new te(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ai(i.serializer,c)}}if(s instanceof ut)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof ze)return{bytesValue:qh(i.serializer,s._byteString)};if(s instanceof oe){const c=i.databaseId,h=s.firestore._databaseId;if(!h.isEqual(c))throw i.createError(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:fa(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof xe)return function(h,d){const p=h instanceof xe?h.toArray():h;return{mapValue:{fields:{[mh]:{stringValue:gh},[Lr]:{arrayValue:{values:p.map(R=>{if(typeof R!="number")throw d.createError("VectorValues must only contain numeric values.");return Ti(d.serializer,R)})}}}}}}(s,i);if(Kh(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${yi(s)}`)}(n,e)}function sd(n,e){const t={};return uh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yn(n,(r,s)=>{const i=jn(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function id(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof te||n instanceof ut||n instanceof ze||n instanceof oe||n instanceof ma||n instanceof xe||Kh(n))}function od(n,e,t){if(!id(t)||!ts(t)){const r=yi(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function us(n,e,t){if((e=We(e))instanceof pa)return e._internalPath;if(typeof e=="string")return Hy(n,e);throw ci("Field path arguments must be of type string or ",n,!1,void 0,t)}const Gy=new RegExp("[~\\*/\\[\\]]");function Hy(n,e,t){if(e.search(Gy)>=0)throw ci(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new pa(...e.split("."))._internalPath}catch{throw ci(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ci(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(i||a)&&(h+=" (found",i&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new x(V.INVALID_ARGUMENT,c+n+h)}function Ky(n,e){return n.some(t=>t.isEqual(e))}function ad(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=Be.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let c;i.nestedOptions&&ts(a)?c={mapValue:{fields:new Pe(i.nestedOptions).getOptionsProto(t,a)}}:a&&(c=jn(a,t)??void 0),c&&r.set($e.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(i_(r,(a,c)=>[$e.fromServerFormat(c),a!==void 0?jn(a,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qy(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!ts(t.fields))}(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(n.pipelineValue)))}function iI(){return new _a("serverTimestamp")}function Jy(n){return new xe(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(n){let e;return n instanceof Tn?n:(e=ts(n)?tE(n):n instanceof Array?nE(n):ud(n,void 0),e)}function _o(n){if(n instanceof Tn)return n;if(n instanceof xe)return zr(n);if(Array.isArray(n))return zr(Jy(n));throw new Error("Unsupported value: "+typeof n)}function ya(n){return h_(n)?js(n):k(n)}class Tn{constructor(){this._protoValueType="ProtoValue"}add(e){return new S("add",[this,k(e)],"add")}asBoolean(){if(this instanceof Gt)return this;if(this instanceof Xn)return new ld(this);if(this instanceof Yn)return new eE(this);if(this instanceof S)return new cd(this);throw new x("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new S("subtract",[this,k(e)],"subtract")}multiply(e){return new S("multiply",[this,k(e)],"multiply")}divide(e){return new S("divide",[this,k(e)],"divide")}mod(e){return new S("mod",[this,k(e)],"mod")}equal(e){return new S("equal",[this,k(e)],"equal").asBoolean()}notEqual(e){return new S("not_equal",[this,k(e)],"notEqual").asBoolean()}lessThan(e){return new S("less_than",[this,k(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new S("less_than_or_equal",[this,k(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new S("greater_than",[this,k(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new S("greater_than_or_equal",[this,k(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map(s=>k(s));return new S("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new S("array_contains",[this,k(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Ir(e.map(k),"arrayContainsAll"):e;return new S("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Ir(e.map(k),"arrayContainsAny"):e;return new S("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new S("array_reverse",[this])}arrayLength(){return new S("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Ir(e.map(k),"equalAny"):e;return new S("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Ir(e.map(k),"notEqualAny"):e;return new S("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new S("exists",[this],"exists").asBoolean()}charLength(){return new S("char_length",[this],"charLength")}like(e){return new S("like",[this,k(e)],"like").asBoolean()}regexContains(e){return new S("regex_contains",[this,k(e)],"regexContains").asBoolean()}regexFind(e){return new S("regex_find",[this,k(e)],"regexFind")}regexFindAll(e){return new S("regex_find_all",[this,k(e)],"regexFindAll")}regexMatch(e){return new S("regex_match",[this,k(e)],"regexMatch").asBoolean()}stringContains(e){return new S("string_contains",[this,k(e)],"stringContains").asBoolean()}startsWith(e){return new S("starts_with",[this,k(e)],"startsWith").asBoolean()}endsWith(e){return new S("ends_with",[this,k(e)],"endsWith").asBoolean()}toLower(){return new S("to_lower",[this],"toLower")}toUpper(){return new S("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(k(e)),new S("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(k(e)),new S("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(k(e)),new S("rtrim",t,"rtrim")}type(){return new S("type",[this])}isType(e){return new S("is_type",[this,zr(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(k);return new S("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new S("string_index_of",[this,k(e)],"stringIndexOf")}stringRepeat(e){return new S("string_repeat",[this,k(e)],"stringRepeat")}stringReplaceAll(e,t){return new S("string_replace_all",[this,k(e),k(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new S("string_replace_one",[this,k(e),k(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(k);return new S("concat",[this,...r],"concat")}reverse(){return new S("reverse",[this],"reverse")}arrayFilter(e,t){return new S("array_filter",[this,k(e),t],"arrayFilter")}arrayTransform(e,t){return new S("array_transform",[this,k(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new S("array_transform",[this,k(e),k(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,k(e)];return t!==void 0&&r.push(k(t)),new S("array_slice",r,"arraySlice")}arrayFirst(){return new S("array_first",[this],"arrayFirst")}arrayFirstN(e){return new S("array_first_n",[this,k(e)],"arrayFirstN")}arrayLast(){return new S("array_last",[this],"arrayLast")}arrayLastN(e){return new S("array_last_n",[this,k(e)],"arrayLastN")}arrayMaximum(){return new S("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new S("maximum_n",[this,k(e)],"arrayMaximumN")}arrayMinimum(){return new S("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new S("minimum_n",[this,k(e)],"arrayMinimumN")}arrayIndexOf(e){return new S("array_index_of",[this,k(e),k("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new S("array_index_of",[this,k(e),k("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new S("array_index_of_all",[this,k(e)],"arrayIndexOfAll")}byteLength(){return new S("byte_length",[this],"byteLength")}ceil(){return new S("ceil",[this])}floor(){return new S("floor",[this])}abs(){return new S("abs",[this])}exp(){return new S("exp",[this])}mapGet(e){return new S("map_get",[this,zr(e)],"mapGet")}mapSet(e,t,...r){const s=[this,k(e),k(t),...r.map(k)];return new S("map_set",s,"mapSet")}mapKeys(){return new S("map_keys",[this],"mapKeys")}mapValues(){return new S("map_values",[this],"mapValues")}mapEntries(){return new S("map_entries",[this],"mapEntries")}getField(e){return new S("get_field",[this,k(e)],"get_field")}count(){return Fe._create("count",[this],"count")}sum(){return Fe._create("sum",[this],"sum")}average(){return Fe._create("average",[this],"average")}minimum(){return Fe._create("minimum",[this],"minimum")}maximum(){return Fe._create("maximum",[this],"maximum")}first(){return Fe._create("first",[this],"first")}last(){return Fe._create("last",[this],"last")}arrayAgg(){return Fe._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Fe._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Fe._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new S("maximum",[this,...r.map(k)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new S("minimum",[this,...r.map(k)],"minimum")}vectorLength(){return new S("vector_length",[this],"vectorLength")}cosineDistance(e){return new S("cosine_distance",[this,_o(e)],"cosineDistance")}dotProduct(e){return new S("dot_product",[this,_o(e)],"dotProduct")}euclideanDistance(e){return new S("euclidean_distance",[this,_o(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new S("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new S("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new S("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new S("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new S("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new S("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new S("timestamp_add",[this,k(e),k(t)],"timestampAdd")}timestampSubtract(e,t){return new S("timestamp_subtract",[this,k(e),k(t)],"timestampSubtract")}timestampDiff(e,t){return new S("timestamp_diff",[this,ya(e),k(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new S("timestamp_extract",r,"timestampExtract")}documentId(){return new S("document_id",[this],"documentId")}parent(){return new S("parent",[this],"parent")}substring(e,t){const r=k(e);return new S("substring",t===void 0?[this,r]:[this,r,k(t)],"substring")}arrayGet(e){return new S("array_get",[this,k(e)],"arrayGet")}isError(){return new S("is_error",[this],"isError").asBoolean()}ifError(e){const t=new S("if_error",[this,k(e)],"ifError");return e instanceof Gt?t.asBoolean():t}isAbsent(){return new S("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new S("map_remove",[this,k(e)],"mapRemove")}mapMerge(e,...t){const r=k(e),s=t.map(k);return new S("map_merge",[this,r,...s],"mapMerge")}pow(e){return new S("pow",[this,k(e)])}trunc(e){return e===void 0?new S("trunc",[this]):new S("trunc",[this,k(e)],"trunc")}round(e){return e===void 0?new S("round",[this]):new S("round",[this,k(e)],"round")}collectionId(){return new S("collection_id",[this])}length(){return new S("length",[this])}ln(){return new S("ln",[this])}sqrt(){return new S("sqrt",[this])}stringReverse(){return new S("string_reverse",[this])}ifAbsent(e){return new S("if_absent",[this,k(e)],"ifAbsent")}ifNull(e){return new S("if_null",[this,k(e)],"ifNull")}coalesce(e,...t){return new S("coalesce",[this,k(e),...t.map(k)],"coalesce")}join(e){return new S("join",[this,k(e)],"join")}log10(){return new S("log10",[this])}arraySum(){return new S("sum",[this])}split(e){return new S("split",[this,k(e)])}timestampTruncate(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new S("timestamp_trunc",r)}ascending(){return rE(this)}descending(){return sE(this)}as(e){return new Xy(this,e,"as")}}class Fe{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new Fe(e,t);return s._methodName=r,s}as(e){return new Yy(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class Yy{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class Xy{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Ir extends Tn{constructor(e,t){super(),this.ur=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.ur.map(t=>t._toProto(e))}}}_readUserData(e){this.ur.forEach(t=>t._readUserData(e))}}class Yn extends Tn{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new S("geo_distance",[this,k(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function js(n){return Zy(n,"field")}function Zy(n,e){return new Yn(typeof n=="string"?rt===n?fy()._internalPath:us("field",n):n._internalPath,e)}class Xn extends Tn{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new Xn(e,void 0);return t._protoValue=e,t}_toProto(e){return M(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,Qy(this._protoValue)||(this._protoValue=jn(this.value,e))}}function zr(n,e){return ud(n,"constant")}function ud(n,e){const t=new Xn(n,e);return typeof n=="boolean"?new ld(t):t}class S extends Tn{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Pe({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(r=>r._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Gt extends Tn{get _methodName(){return this._expr._methodName}countIf(){return Fe._create("count_if",[this],"countIf")}not(){return new S("not",[this],"not").asBoolean()}conditional(e,t){return new S("conditional",[this,e,t],"conditional")}ifError(e){const t=k(e),r=new S("if_error",[this,t],"ifError");return t instanceof Gt?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class cd extends Gt{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class ld extends Gt{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class eE extends Gt{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function tE(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(zr(r)),t.push(k(s))}return new S("map",t,"map")}function nE(n){return function(t,r){return new S("array",t.map(s=>k(s)),r)}(n,"array")}function rE(n){return new hd(ya(n),"ascending","ascending")}function sE(n){return new hd(ya(n),"descending","descending")}class hd{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Qh(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class dd extends je{get _name(){return"add_fields"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[jr(e,this.fields)]}}_readUserData(e){super._readUserData(e),Ht(this.fields,e)}}class fd extends je{get _name(){return"aggregate"}get _optionsUtil(){return new Pe({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[jr(e,this.accumulators),jr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Ht(this.groups,e),Ht(this.accumulators,e)}}class pd extends je{get _name(){return"distinct"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[jr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Ht(this.groups,e)}}class Vi extends je{get _name(){return"collection"}get _optionsUtil(){return new Pe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Er=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Er}]}}_readUserData(e){super._readUserData(e)}}class bi extends je{get _name(){return"collection_group"}get _optionsUtil(){return new Pe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Ea extends je{get _name(){return"database"}get _optionsUtil(){return new Pe({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class wa extends je{get _name(){return"documents"}get _optionsUtil(){return new Pe({})}constructor(e,t){if(super(t),!e||e.length===0)throw new x(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(r);if(s.size!==r.length)throw new x(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.hr=r,this.Tr=s}_toProto(e){return{...super._toProto(e),args:this.hr.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}}class Ci extends je{get _name(){return"where"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Ht(this.condition,e)}}class _n extends je{get _name(){return"limit"}get _optionsUtil(){return new Pe({})}constructor(e,t){M(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[aa(e,this.limit)]}}}class Qc extends je{get _name(){return"offset"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[aa(e,this.offset)]}}}class iE extends je{get _name(){return"select"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[jr(e,this.selections)]}}_readUserData(e){super._readUserData(e),Ht(this.selections,e)}}class mt extends je{get _name(){return"sort"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),Ht(this.orderings,e)}}class Ta extends je{get _name(){return"replace_with"}get _optionsUtil(){return new Pe({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Qh(Ta.Pr)]}}_readUserData(e){super._readUserData(e),Ht(this.map,e)}}Ta.Pr="full_replace";function Ht(n,e){return ad(n)?n._readUserData(e):Array.isArray(n)?n.forEach(t=>t._readUserData(e)):n instanceof Map?n.forEach(t=>t._readUserData(e)):Object.values(n).forEach(t=>t._readUserData(e)),n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}Ar(e,t){const r=this.userDataReader.createContext(3,e);return ad(t)?t._readUserData(r):Array.isArray(t)?t.forEach(s=>s._readUserData(r)):t.forEach(s=>s._readUserData(r)),t}where(e){const t=this.stages.map(r=>r);return this.Ar("where",e),t.push(new Ci(e,{})),new Cr(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map(r=>r);return t.push(new _n(e,{})),new Cr(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map(s=>s);return"orderings"in e?r.push(new mt(this.Ar("sort",e.orderings),{})):r.push(new mt(this.Ar("sort",[e,...t]),{})),new Cr(this._db,this.userDataReader,this._userDataWriter,r)}Vr(e){return{pipeline:{stages:this.stages.map(t=>t._toProto(e))}}}}// Copyright 2024 Google LLC* @license
class be{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Ni(this)}getPipelineCollectionGroup(){return Ia(this)}getPipelineCollectionId(){return oE(this)}getPipelineDocuments(){return Mo(this)}getPipelineFlavor(){return function(t){let r="exact";return t.stages.forEach((s,i)=>{s._name!==pd.name&&s._name!==fd.name||(r="keyless"),s._name===iE.name&&r==="exact"&&(r="augmented"),s._name===dd.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")}),r}(this)}getPipelineSourceType(){return Bt(this)}}function Bt(n){const e=n.stages[0];return e instanceof Vi||e instanceof bi||e instanceof Ea||e instanceof wa?e._name:"unknown"}function Ni(n){if(Bt(n)==="collection")return n.stages[0].Er}function Ia(n){if(Bt(n)==="collection_group")return n.stages[0].collectionId}function oE(n){switch(Bt(n)){case"collection":return Y.fromString(Ni(n)).lastSegment();case"collection_group":return Ia(n);default:return}}function Mo(n){if(Bt(n)==="documents")return n.stages[0].hr}class E{constructor(e,t){this.type=e,this.value=t}static dr(){return new E("ERROR",void 0)}static mr(){return new E("UNSET",void 0)}static pr(){return new E("NULL",Bn)}static newValue(e){return qe(e)?new E("NULL",Bn):function(r){return!!r&&"booleanValue"in r}(e)?new E("BOOLEAN",e):st(e)?new E("INT",e):an(e)?new E("DOUBLE",e):function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue}(e)?new E("TIMESTAMP",e):function(r){return!!r&&"stringValue"in r}(e)?new E("STRING",e):function(r){return!!r&&"bytesValue"in r}(e)?new E("BYTES",e):e.referenceValue?new E("REFERENCE",e):e.geoPointValue?new E("GEO_POINT",e):$n(e)?new E("ARRAY",e):ti(e)?new E("VECTOR",e):cn(e)?new E("MAP",e):new E("ERROR",void 0)}gr(){return this.type==="ERROR"||this.type==="UNSET"}yr(){return this.type==="NULL"}}function Nr(n){if(!n.gr())return n.value}function md(n){return n instanceof Gt?n._expr:n}function q(n){if((n=md(n))instanceof Yn)return new aE(n);if(n instanceof Xn)return new uE(n);if(n instanceof Ir)return new cE(n);if(n instanceof S){if(n.name==="add")return new dE(n);if(n.name==="subtract")return new fE(n);if(n.name==="multiply")return new pE(n);if(n.name==="divide")return new mE(n);if(n.name==="mod")return new gE(n);if(n.name==="and")return new _E(n);if(n.name==="equal")return new bE(n);if(n.name==="not_equal")return new CE(n);if(n.name==="less_than")return new NE(n);if(n.name==="less_than_or_equal")return new kE(n);if(n.name==="greater_than")return new DE(n);if(n.name==="greater_than_or_equal")return new xE(n);if(n.name==="array_concat")return new OE(n);if(n.name==="array_reverse")return new LE(n);if(n.name==="array_contains")return new ME(n);if(n.name==="array_contains_all")return new UE(n);if(n.name==="array_contains_any")return new FE(n);if(n.name==="array_length")return new BE(n);if(n.name==="array_element")return new qE(n);if(n.name==="equal_any")return new gd(n);if(n.name==="not_equal_any")return new EE(n);if(n.name==="is_nan")return new wE(n);if(n.name==="is_not_nan")return new TE(n);if(n.name==="is_null")return new IE(n);if(n.name==="is_not_null")return new vE(n);if(n.name==="is_error")return new AE(n);if(n.name==="exists")return new RE(n);if(n.name==="not")return new ki(n);if(n.name==="or")return new yE(n);if(n.name==="xor")return new va(n);if(n.name==="conditional")return new PE(n);if(n.name==="maximum")return new SE(n);if(n.name==="minimum")return new VE(n);if(n.name==="reverse")return new $E(n);if(n.name==="replace_first")return new jE(n);if(n.name==="replace_all")return new zE(n);if(n.name==="char_length")return new WE(n);if(n.name==="byte_length")return new GE(n);if(n.name==="like")return new HE(n);if(n.name==="regex_contains")return new KE(n);if(n.name==="regex_match")return new QE(n);if(n.name==="string_contains")return new JE(n);if(n.name==="starts_with")return new YE(n);if(n.name==="ends_with")return new XE(n);if(n.name==="to_lower")return new ZE(n);if(n.name==="to_upper")return new ew(n);if(n.name==="trim")return new tw(n);if(n.name==="string_concat")return new nw(n);if(n.name==="map_get")return new rw(n);if(n.name==="cosine_distance")return new sw(n);if(n.name==="dot_product")return new iw(n);if(n.name==="euclidean_distance")return new ow(n);if(n.name==="vector_length")return new aw(n);if(n.name==="unix_micros_to_timestamp")return new dw(n);if(n.name==="timestamp_to_unix_micros")return new mw(n);if(n.name==="unix_millis_to_timestamp")return new fw(n);if(n.name==="timestamp_to_unix_millis")return new gw(n);if(n.name==="unix_seconds_to_timestamp")return new pw(n);if(n.name==="timestamp_to_unix_seconds")return new _w(n);if(n.name==="timestamp_add")return new yw(n);if(n.name==="timestamp_subtract")return new Ew(n)}throw new Error(`Unknown Expr : ${n}`)}class aE{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===rt)return E.newValue({referenceValue:ui(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return E.newValue({timestampValue:$s(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return E.newValue({timestampValue:$s(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?Ei(r)?E.newValue(function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:$s(i.serializer,j.fromTimestamp(Fn(a)))};if(i.serverTimestampBehavior==="previous"){const c=rs(a);if(c)return c}return{nullValue:"NULL_VALUE"}}(e,r)):E.newValue(r):E.mr()}}class uE{constructor(e){this.expr=e}evaluate(e,t){return E.newValue(this.expr._getValue())}}class cE{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.ur.map(s=>q(s).evaluate(e,t));return r.some(s=>s.gr())?E.dr():E.newValue({arrayValue:{values:r.map(s=>s.value)}})}}function we(n){return an(n)?Number(n.doubleValue):Number(n.integerValue)}function lt(n){return BigInt(n.integerValue)}const lE=BigInt("0x7fffffffffffffff"),hE=-BigInt("0x8000000000000000");class cs{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length>=2,24778);const r=q(this.expr.params[0]).evaluate(e,t),s=q(this.expr.params[1]).evaluate(e,t);let i=this.wr(r,s);for(const a of this.expr.params.slice(2)){const c=q(a).evaluate(e,t);i=this.wr(i,c)}return i}wr(e,t){if(e.gr()||t.gr())return E.dr();if(e.yr()||t.yr())return E.pr();const r=e.value,s=t.value;if(!an(r)&&!st(r)||!an(s)&&!st(s))return E.dr();if(an(r)||an(s)){const i=this.br(r,s);return i?E.newValue(i):E.dr()}if(st(r)&&st(s)){const i=this.Sr(r,s);return i===void 0?E.dr():typeof i=="number"?E.newValue({doubleValue:i}):i<hE||i>lE?E.dr():E.newValue({integerValue:`${i}`})}return E.dr()}}function vt(n,e){return de(n)!==de(e)?"TYPE_MISMATCH":Me(n)||Me(e)?"NOT_EQ":qe(n)&&qe(e)?"EQ":qe(n)||qe(e)?"NULL":$n(n)&&$n(e)?function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let a=0;a<(r.values?.length??0);a++){const c=r.values[a],h=s.values[a];switch(vt(c,h)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:B(44609,{vr:c,Dr:h})}}return i?"NULL":"EQ"}(n.arrayValue,e.arrayValue):ti(n)&&ti(e)||cn(n)&&cn(e)?function(r,s){const i=r.fields||{},a=s.fields||{};if(Zs(i)!==Zs(a))return"NOT_EQ";let c=!1;for(const h in i)if(i.hasOwnProperty(h)){if(a[h]===void 0)return"NOT_EQ";switch(vt(i[h],a[h])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"}(n.mapValue,e.mapValue):function(r,s){return Ge(r,s,{o:!1,t:!0,i:!0})}(n,e)?"EQ":"NOT_EQ"}class dE extends cs{Sr(e,t){return lt(e)+lt(t)}br(e,t){return{doubleValue:we(e)+we(t)}}}class fE extends cs{constructor(e){super(e),this.expr=e}Sr(e,t){return lt(e)-lt(t)}br(e,t){return{doubleValue:we(e)-we(t)}}}class pE extends cs{constructor(e){super(e),this.expr=e}Sr(e,t){return lt(e)*lt(t)}br(e,t){return{doubleValue:we(e)*we(t)}}}class mE extends cs{constructor(e){super(e),this.expr=e}Sr(e,t){const r=lt(t);if(r!==BigInt(0))return lt(e)/r}br(e,t){const r=we(t);return r===0?{doubleValue:Or(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:we(e)/r}}}class gE extends cs{constructor(e){super(e),this.expr=e}Sr(e,t){const r=lt(t);if(r!==BigInt(0))return lt(e)%r}br(e,t){const r=we(t);if(r!==0)return{doubleValue:we(e)%r}}}class _E{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=q(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!a.value?.booleanValue)return E.newValue(_e);break;case"NULL":s=!0;break;default:r=!0}}return r?E.dr():s?E.pr():E.newValue(Oe)}}class ki{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,9634);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return E.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return E.pr();default:return E.dr()}}}class yE{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=q(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(a.value?.booleanValue)return E.newValue(Oe);break;case"NULL":s=!0;break;default:r=!0}}return r?E.dr():s?E.pr():E.newValue(_e)}}class va{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const a=q(i).evaluate(e,t);switch(a.type){case"BOOLEAN":r=va.xor(r,!!a.value?.booleanValue);break;case"NULL":s=!0;break;default:return E.dr()}}return s?E.pr():E.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class gd{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,55094);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.dr()}if(r)return E.pr();for(const a of i.value?.arrayValue?.values??[])switch(qe(s.value)&&qe(a)?"EQ":vt(s.value,a)){case"EQ":return E.newValue(Oe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44608,{value:s.value,candidate:a})}return r?E.pr():E.newValue(_e)}}class EE{constructor(e){this.expr=e}evaluate(e,t){return new ki(new S("not",[new S("equal_any",this.expr.params)])).evaluate(e,t)}}class wE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,23322);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return E.newValue(_e);case"DOUBLE":return E.newValue({booleanValue:isNaN(we(r.value))});case"NULL":return E.pr();default:return E.dr()}}}class TE{constructor(e){this.expr=e}evaluate(e,t){return M(this.expr.params.length===1,50406),new ki(new S("not",[new S("is_nan",this.expr.params)])).evaluate(e,t)}}class IE{constructor(e){this.expr=e}evaluate(e,t){switch(M(this.expr.params.length===1,23123),q(this.expr.params[0]).evaluate(e,t).type){case"NULL":return E.newValue(Oe);case"UNSET":case"ERROR":return E.dr();default:return E.newValue(_e)}}}class vE{constructor(e){this.expr=e}evaluate(e,t){return M(this.expr.params.length===1,23167),new ki(new S("not",[new S("is_null",this.expr.params)])).evaluate(e,t)}}class AE{constructor(e){this.expr=e}evaluate(e,t){return M(this.expr.params.length===1,5228),q(this.expr.params[0]).evaluate(e,t).type==="ERROR"?E.newValue(Oe):E.newValue(_e)}}class RE{constructor(e){this.expr=e}evaluate(e,t){switch(M(this.expr.params.length===1,6877),q(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return E.dr();case"UNSET":return E.newValue(_e);default:return E.newValue(Oe)}}}class PE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===3,11706);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?q(this.expr.params[1]).evaluate(e,t):q(this.expr.params[2]).evaluate(e,t);case"NULL":return q(this.expr.params[2]).evaluate(e,t);default:return E.dr()}}}class SE{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>q(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Le(i.value,s.value)>0?i:s}return s===void 0?E.pr():s}}class VE{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(i=>q(i).evaluate(e,t));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Le(i.value,s.value)<0?i:s}return s===void 0?E.pr():s}}class Zn{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return E.dr()}const s=q(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return E.dr()}return this.Cr(r,s)}}class bE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){if(e.yr()&&t.yr())return E.newValue(Oe);if(e.yr()||t.yr()||Me(e.value)||Me(t.value)||de(e.value)!==de(t.value))return E.newValue(_e);switch(vt(e.value,t.value)){case"EQ":return E.newValue(Oe);case"NOT_EQ":return E.newValue(_e);case"NULL":return E.pr();default:B(44615,{left:e,right:t})}}}class CE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){switch(vt(e.value,t.value)){case"EQ":return E.newValue(_e);case"NOT_EQ":case"TYPE_MISMATCH":return E.newValue(Oe);case"NULL":return E.pr();default:B(44614,{left:e,right:t})}}}class NE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){return de(e.value)!==de(t.value)||Me(e.value)||Me(t.value)?E.newValue(_e):E.newValue({booleanValue:Le(e.value,t.value)<0})}}class kE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){return de(e.value)!==de(t.value)||Me(e.value)||Me(t.value)?E.newValue(_e):vt(e.value,t.value)==="EQ"?E.newValue(Oe):E.newValue({booleanValue:Le(e.value,t.value)<0})}}class DE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){return de(e.value)!==de(t.value)||Me(e.value)||Me(t.value)?E.newValue(_e):E.newValue({booleanValue:Le(e.value,t.value)>0})}}class xE extends Zn{constructor(e){super(e),this.expr=e}Cr(e,t){return de(e.value)!==de(t.value)||Me(e.value)||Me(t.value)?E.newValue(_e):vt(e.value,t.value)==="EQ"?E.newValue(Oe):E.newValue({booleanValue:Le(e.value,t.value)>0})}}class OE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class LE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,216);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.pr();case"ARRAY":{const s=r.value.arrayValue?.values??[];return E.newValue({arrayValue:{values:[...s].reverse()}})}default:return E.dr()}}}class ME{constructor(e){this.expr=e}evaluate(e,t){return M(this.expr.params.length===2,52884),new gd(new S("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class UE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,1392);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.dr()}if(r)return E.pr();const a=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const h of a){let d=!1;r=!1;for(const p of c){switch(qe(h)&&qe(p)?"EQ":vt(h,p)){case"EQ":d=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44613,{value:p,search:h})}if(d)break}if(!d)return E.newValue(_e)}return E.newValue(Oe)}}class FE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,2680);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.dr()}if(r)return E.pr();const a=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const h of c)for(const d of a)switch(qe(h)&&qe(d)?"EQ":vt(h,d)){case"EQ":return E.newValue(Oe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(60403,{value:h,search:d})}return r?E.pr():E.newValue(_e)}}class BE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,38605);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.pr();case"ARRAY":return E.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return E.dr()}}}class qE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class $E{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,1508);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.pr();case"BYTES":{const s=r.value?.bytesValue;if(typeof s=="string"){const i=he.fromBase64String(s).toUint8Array();return i.reverse(),E.newValue({bytesValue:he.fromUint8Array(i).toBase64()})}return E.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{const s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),a=Array.from(i,c=>c.segment).reverse();return E.newValue({stringValue:a.join("")})}default:return E.dr()}}}class jE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class zE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class WE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,19400);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.pr();case"STRING":{const s=function(a){let c=0;for(let h=0;h<a.length;h++){const d=a.codePointAt(h);if(d===void 0)return;if(d<=65535)if(d>=55296&&d<=57343)if(d<=56319){const p=a.codePointAt(h+1);p!==void 0&&p>=56320&&p<=57343?(c+=1,h++):c+=1}else c+=1;else c+=1;else{if(!(d<=1114111))return;c+=1,h++}}return c}(r.value.stringValue);return s===void 0?E.dr():E.newValue({integerValue:s})}default:return E.dr()}}}class GE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,8486);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const s=r.value?.bytesValue;return typeof s=="string"?E.newValue({integerValue:he.fromBase64String(s).toUint8Array().length}):E.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{const s=function(a){let c=0;for(let h=0;h<a.length;h++){const d=a.codePointAt(h);if(d===void 0)return;if(d>=55296&&d<=57343){if(!(d<=56319))return;{const p=a.codePointAt(h+1);if(p===void 0||!(p>=56320&&p<=57343))return;c+=4,h++}}else if(d<=127)c+=1;else if(d<=2047)c+=2;else if(d<=65535)c+=3;else{if(!(d<=1114111))return;c+=4,h++}}return c}(r.value?.stringValue);return s===void 0?E.dr():E.newValue({integerValue:s})}case"NULL":return E.pr();default:return E.dr()}}}class er{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return E.dr()}return r?E.pr():this.Fr(s.value?.stringValue,i.value?.stringValue)}}class HE extends er{Fr(e,t){try{const r=function(a){let c="";for(let h=0;h<a.length;h++){const d=a.charAt(h);switch(d){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+d;break;default:c+=d}}return"^"+c+"$"}(t),s=zo.compile(r);return E.newValue({booleanValue:s.matches(e)})}catch(r){return Xe(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),E.dr()}}}class KE extends er{Fr(e,t){try{const r=zo.compile(t);return E.newValue({booleanValue:r.test(e)})}catch{return Xe(`Invalid regex pattern found in regex_contains: ${t}, returning error`),E.dr()}}}class QE extends er{Fr(e,t){try{return E.newValue({booleanValue:zo.compile(t).matches(e)})}catch{return Xe(`Invalid regex pattern found in regex_match: ${t}, returning error`),E.dr()}}}class JE extends er{Fr(e,t){return E.newValue({booleanValue:e.includes(t)})}}class YE extends er{Fr(e,t){return E.newValue({booleanValue:e.startsWith(t)})}}class XE extends er{Fr(e,t){return E.newValue({booleanValue:e.endsWith(t)})}}class ZE{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,29079);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return E.pr();default:return E.dr()}}}class ew{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,60487);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return E.pr();default:return E.dr()}}}class tw{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,28544);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return E.pr();default:return E.dr()}}}class nw{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map(a=>q(a).evaluate(e,t));let s="",i=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return E.dr()}return i?E.pr():E.newValue({stringValue:s})}}class rw{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,4483);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return E.mr();case"MAP":break;default:return E.dr()}const s=q(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return E.dr();const i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?E.mr():E.newValue(i)}}class Aa{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.dr()}if(r)return E.pr();const a=bo(s.value),c=bo(i.value);if(a===void 0||c===void 0||a.values?.length!==c.values?.length)return E.dr();const h=this.Or(a,c);return h===void 0||isNaN(h)?E.dr():E.newValue({doubleValue:h})}}class sw extends Aa{Or(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,a=0,c=0;for(let d=0;d<r.length;d++){if(!zt(r[d])||!zt(s[d]))return;const p=we(r[d]),m=we(s[d]);i+=p*m,a+=p*p,c+=m*m}const h=Math.sqrt(a)*Math.sqrt(c);if(h!==0)return 1-Math.max(-1,Math.min(1,i/h))}}class iw extends Aa{Or(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!zt(r[a])||!zt(s[a]))return;i+=we(r[a])*we(s[a])}return i}}class ow extends Aa{Or(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!zt(r[a])||!zt(s[a]))return;const c=we(r[a]),h=we(s[a]);i+=Math.pow(c-h,2)}return Math.sqrt(i)}}class aw{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,39044);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const s=bo(r.value);return E.newValue({integerValue:s?.values?.length??0})}case"NULL":return E.pr();default:return E.dr()}}}const Wr=BigInt(-62135596800),Gr=BigInt(253402300799),li=BigInt(1e3),qt=BigInt(1e6),uw=Wr*li,cw=Gr*li+BigInt(999),lw=Wr*qt,hw=Gr*qt+BigInt(999999);function Ra(n){return n>=lw&&n<=hw}function _d(n){return n>=Wr&&n<=Gr}function Hr(n,e){const t=BigInt(n);return!(t<Wr||t>Gr)&&!(e<0||e>=1e9)&&(t!==Wr||e===0)&&!(t===Gr&&e>999999999)}function yd(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Pa(n){return BigInt(n.seconds)*qt+BigInt(Math.trunc(n.nanoseconds/1e3))}class Sa{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return E.pr();default:return E.dr()}}}class dw extends Sa{toTimestamp(e){if(!Ra(e))return E.dr();let t=Number(e/qt),r=Number(e%qt*BigInt(1e3));const s=yd(t,r);return t=s.seconds,r=s.nanos,Hr(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.dr()}}class fw extends Sa{toTimestamp(e){if(!function(a){return a>=uw&&a<=cw}(e))return E.dr();let t=Number(e/li),r=Number(e%li*BigInt(1e6));const s=yd(t,r);return t=s.seconds,r=s.nanos,Hr(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.dr()}}class pw extends Sa{toTimestamp(e){if(!_d(e))return E.dr();const t=Number(e);return E.newValue({timestampValue:{seconds:t,nanos:0}})}}class Va{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return E.pr();default:return E.dr()}const s=da(r.value.timestampValue);return Hr(s.seconds,s.nanoseconds)?this.Mr(s):E.dr()}}class mw extends Va{Mr(e){const t=Pa(e);return Ra(t)?E.newValue({integerValue:`${t.toString()}`}):E.dr()}}class gw extends Va{Mr(e){const t=Pa(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?E.newValue({integerValue:r.toString()}):E.newValue({integerValue:(r-BigInt(1)).toString()})}}class _w extends Va{Mr(e){const t=BigInt(e.seconds);return _d(t)?E.newValue({integerValue:t.toString()}):E.dr()}}class Ed{constructor(e){this.expr=e}evaluate(e,t){M(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return E.dr()}const i=q(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=function(X){switch(X){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),a===void 0)return E.dr();break;case"NULL":r=!0;break;default:return E.dr()}const c=q(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return E.dr()}if(r)return E.pr();const h=BigInt(c.value.integerValue);let d;try{switch(a){case"microsecond":d=h;break;case"millisecond":d=h*BigInt(1e3);break;case"second":d=h*BigInt(1e6);break;case"minute":d=h*BigInt(6e7);break;case"hour":d=h*BigInt(36e8);break;case"day":d=h*BigInt(864e8);break;default:return E.dr()}if(a!=="microsecond"&&h!==BigInt(0)&&d/h!==BigInt(this.Nr(a)))return E.dr()}catch(W){return Xe(`Error during timestamp arithmetic: ${W}`),E.dr()}const p=da(s.value.timestampValue);if(!Hr(p.seconds,p.nanoseconds))return E.dr();const m=Pa(p),R=this.Lr(m,d);if(!Ra(R))return E.dr();const C=Number(R/qt),N=R%qt,U=Number((N<0?N+qt:N)*BigInt(1e3)),L=N<0?C-1:C;return Hr(L,U)?E.newValue({timestampValue:{seconds:L,nanos:U}}):E.dr()}Nr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class yw extends Ed{Lr(e,t){return e+t}}class Ew extends Ed{Lr(e,t){return e-t}}function Kr(n){if((n=md(n))instanceof Yn)return`fld(${n.fieldName})`;if(n instanceof Xn)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof oe?`ref(${t.path})`:t instanceof xe?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(n.value)})`;if(n instanceof S)return`fn(${n.name},[${n.params.map(Kr).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.ur.map(Kr).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function ww(n){if(n instanceof dd)return`${n._name}(${Ds(n.fields)})`;if(n instanceof fd){let e=`${n._name}(${Ds(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Ds(n.groups)})`),e}if(n instanceof pd)return`${n._name}(${Ds(n.groups)})`;if(n instanceof Vi)return`${n._name}(${n.Er})`;if(n instanceof bi)return`${n._name}(${n.collectionId})`;if(n instanceof Ea)return`${n._name}()`;if(n instanceof wa)return`${n._name}(${n.hr.sort()})`;if(n instanceof Ci)return`${n._name}(${Kr(n.condition)})`;if(n instanceof _n)return`${n._name}(${n.limit})`;if(n instanceof mt)return`${n._name}(${function(t){return t.map(r=>`${Kr(r.expr)}${r.direction}`).join(",")}(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Ds(n){return`${Array.from(n.entries()).sort().map(([e,t])=>`${e}=${Kr(t)}`).join(",")}`}function Et(n){return n.stages.map(e=>ww(e)).join("|")}function wd(n,e){return Et(n)===Et(e)}function pe(n){return n instanceof be}function Jc(n){return pe(n)?Et(n):Vr(n)}function Td(n){return pe(n)?Et(n):function(t){return`${Nh(ot(t))}|lt:${t.limitType}`}(n)}function Di(n,e){return n instanceof be&&e instanceof be?wd(n,e):!(n instanceof be&&!(e instanceof be)||!(n instanceof be)&&e instanceof be)&&U_(n,e)}function Id(n){return sn(n)?Et(n):Nh(n)}function vd(n,e){return n instanceof be&&e instanceof be?wd(n,e):!(n instanceof be&&!(e instanceof be)||!(n instanceof be)&&e instanceof be)&&kh(n,e)}function Tw(n,e){const t=function(s){let i=!1;const a=[];for(const c of s)if(c instanceof mt)if(i=!0,c.orderings.some(h=>h.expr instanceof Yn&&h.expr.fieldName===rt))a.push(c);else{const h=c.orderings.map(d=>d);h.push(js(rt).ascending()),a.push(new mt(h,{}))}else c instanceof _n&&(i||(a.push(new mt([js(rt).ascending()],{})),i=!0)),a.push(c);return i||a.push(new mt([js(rt).ascending()],{})),a}(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach(s=>s._readUserData(r))}return new be(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&E_(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Pr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Pr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Uh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const h=Ih(a,c);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(j.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),H())}isEqual(e){return this.batchId===e.batchId&&Un(this.mutations,e.mutations,(t,r)=>Sc(t,r))&&Un(this.baseMutations,e.baseMutations,(t,r)=>Sc(t,r))}}class ba{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){M(e.mutations.length===r.length,58842,{Br:e.mutations.length,Ur:r.length});let s=function(){return j_}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new ba(e,t,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad="";function vw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Yc(e)),e=Aw(n.get(t),e);return Yc(e)}function Aw(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Ad:t+="";break;default:t+=i}}return t}function Yc(n){return n+Ad+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,r,s,i=j.min(),a=j.min(),c=he.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(e){return new gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(e){this.qr=e}}function Sw(n){const e=oy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ko(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(){this.Yi=new bw}addToCollectionParentIndex(e,t){return this.Yi.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.Yi.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(Wt.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(Wt.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class bw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new le(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new le(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this.gs=e}next(){return this.gs+=2,this.gs}static ys(){return new Kt(0)}static ws(){return new Kt(-1)}}// Copyright 2024 Google LLC* @license
function Rd(n,e){let t=e;for(const r of n.stages)t=Nw({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function xi(n,e){return Rd(n,[e]).length>0}function Cw(n,e){return pe(n)?xi(n,e):Ai(n,e)}function Nw(n,e,t){if(e instanceof Vi)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Er)}(0,e,t);if(e instanceof Ci)return function(s,i,a){return a.filter(c=>{const h=Nr(q(i.condition).evaluate(s,c));return h!==void 0&&Ge(h,Oe)})}(n,e,t);if(e instanceof bi)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof Ea)return function(s,i,a){return a.filter(c=>c.isFoundDocument())}(0,0,t);if(e instanceof wa)return function(s,i,a){return a.filter(c=>c.isFoundDocument()&&i.Tr.has(c.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof _n)return function(s,i,a){return a.slice(0,i.limit)}(0,e,t);if(e instanceof mt)return function(s,i,a){const c=i.orderings.map(h=>({Os:q(h.expr),direction:h.direction}));return[...a].sort((h,d)=>{for(const{Os:p,direction:m}of c){const R=Nr(p.evaluate(s,h)),C=Nr(p.evaluate(s,d)),N=Le(R??Bn,C??Bn);if(N!==0)return m==="ascending"?N:-N}return 0})}(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Uo(n){const e=function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof mt)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(n);return(t,r)=>{for(const s of e){const i=Nr(q(s.expr).evaluate({serializer:n.serializer},t)),a=Nr(q(s.expr).evaluate({serializer:n.serializer},r)),c=Le(i||Bn,a||Bn);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function yo(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof _n)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(){this.changes=new wn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Pr(r.mutation,s,Je.empty(),te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,H()).next(()=>r))}getLocalViewOfDocuments(e,t,r=H()){const s=Lt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Vn();return i.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Lt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,H()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=De();const a=br(),c=function(){return br()}();return t.forEach((h,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof En)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Pr(p.mutation,d,p.mutation.getFieldMask(),te.now())):a.set(d.key,Je.empty())}),this.recalculateAndSaveOverlays(e,i).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>c.set(d,new Dw(p,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const r=br();let s=new ne((a,c)=>a-c),i=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=r.get(h)||Je.empty();p=c.applyToLocalView(d,p),r.set(h,p);const m=(s.get(c.batchId)||H()).add(h);s=s.insert(c.batchId,m)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,p=h.value,m=Uh();p.forEach(R=>{if(!i.has(R)){const C=Ih(t.get(R),r.get(R));C!==null&&m.set(R,C),i=i.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return b.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return pe(t)?this.getDocumentsMatchingPipeline(e,t,r,s):L_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):xh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):b.resolve(Lt());let c=$r,h=i;return a.next(d=>b.forEach(d,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?b.resolve():this.remoteDocumentCache.getEntry(e,p).next(R=>{h=h.insert(p,R)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,h,d,H())).next(p=>({batchId:c,changes:Mh(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let s=Vn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Vn();return this.indexManager.getCollectionParents(e,i).next(c=>b.forEach(c,h=>{const d=function(m,R){return new is(R,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,h.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((m,R)=>{a=a.insert(m,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>this.retrieveMatchingLocalDocuments(i,a,c=>Ai(t,c)))}getDocumentsMatchingPipeline(e,t,r,s){if(Bt(t)==="collection_group"){const i=Ia(t);let a=Vn();return this.indexManager.getCollectionParents(e,i).next(c=>b.forEach(c,h=>{const d=function(m,R){const C=m.stages.map(N=>N instanceof bi?new Vi(R.canonicalString(),{}):N);return new be(m.serializer,C)}(t,h.child(i));return this.getDocumentsMatchingPipeline(e,d,r,s).next(p=>{p.forEach((m,R)=>{a=a.insert(m,R)})})}).next(()=>a))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(a=>{switch(i=a,Bt(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=H();for(const h of Mo(t))c=c.add(F.fromPath(h));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new x("invalid-argument",`Invalid pipeline source to execute offline: ${Et(t)}`)}}).next(a=>this.retrieveMatchingLocalDocuments(i,a,c=>xi(t,c)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((i,a)=>{const c=a.getKey();t.get(c)===null&&(t=t.insert(c,Ae.newInvalidDocument(c)))});let s=Vn();return t.forEach((i,a)=>{const c=e.get(i);c!==void 0&&Pr(c.mutation,a,Je.empty(),te.now()),r(a)&&(s=s.insert(i,a))}),s}getOverlaysForPipeline(e,t,r){switch(Bt(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Y.fromString(Ni(t)),r);case"collection_group":throw new x("invalid-argument",`Unexpected collection group pipeline: ${Et(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Mo(t).map(s=>F.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new x("invalid-argument",`Failed to get overlays for pipeline: ${Et(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e){this.serializer=e,this.Ks=new Map,this.Qs=new Map}getBundleMetadata(e,t){return b.resolve(this.Ks.get(t))}saveBundleMetadata(e,t){return this.Ks.set(t.id,function(s){return{id:s.id,version:s.version,createTime:at(s.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Qs.get(t))}saveNamedQuery(e,t){return this.Qs.set(t.name,function(s){return{name:s.name,query:Sw(s.bundledQuery),readTime:at(s.readTime)}}(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(){this.overlays=new ne(F.comparator),this.Ws=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Lt();return b.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}getAllOverlays(e,t){const r=Lt();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&r.set(s,i)}),b.resolve(r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Yr(e,t,i)}),b.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ws.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ws.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const s=Lt(),i=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ne((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Lt(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=Lt(),h=i.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=s)););return b.resolve(c)}Yr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ws.get(s.largestBatchId).delete(r.key);this.Ws.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Rw(t,r));let i=this.Ws.get(t);i===void 0&&(i=H(),this.Ws.set(t,i)),this.Ws.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(){this.sessionToken=he.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(){this.Gs=new le(ge.zs),this.js=new le(ge.Hs)}isEmpty(){return this.Gs.isEmpty()}addReference(e,t){const r=new ge(e,t);this.Gs=this.Gs.add(r),this.js=this.js.add(r)}Js(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ys(new ge(e,t))}Zs(e,t){e.forEach(r=>this.removeReference(r,t))}Xs(e){const t=new F(new Y([])),r=new ge(t,e),s=new ge(t,e+1),i=[];return this.js.forEachInRange([r,s],a=>{this.Ys(a),i.push(a.key)}),i}e_(){this.Gs.forEach(e=>this.Ys(e))}Ys(e){this.Gs=this.Gs.delete(e),this.js=this.js.delete(e)}t_(e){const t=new F(new Y([])),r=new ge(t,e),s=new ge(t,e+1);let i=H();return this.js.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new ge(e,0),r=this.Gs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ge{constructor(e,t){this.key=e,this.n_=t}static zs(e,t){return F.comparator(e.key,t.key)||K(e.n_,t.n_)}static Hs(e,t){return K(e.n_,t.n_)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Wr=1,this.r_=new le(ge.zs)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Wr;this.Wr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Iw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.r_=this.r_.add(new ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(a)}lookupMutationBatch(e,t){return b.resolve(this.i_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.s_(r),i=s<0?0:s;return b.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?ia:this.Wr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ge(t,0),s=new ge(t,Number.POSITIVE_INFINITY),i=[];return this.r_.forEachInRange([r,s],a=>{const c=this.i_(a.n_);i.push(c)}),b.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new le(K);return t.forEach(s=>{const i=new ge(s,0),a=new ge(s,Number.POSITIVE_INFINITY);this.r_.forEachInRange([i,a],c=>{r=r.add(c.n_)})}),b.resolve(this.__(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;F.isDocumentKey(i)||(i=i.child(""));const a=new ge(new F(i),0);let c=new le(K);return this.r_.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(h.n_)),!0)},a),b.resolve(this.__(c))}__(e){const t=[];return e.forEach(r=>{const s=this.i_(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){M(this.o_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.r_;return b.forEach(t.mutations,s=>{const i=new ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.r_=r})}jr(e){}containsKey(e,t){const r=new ge(t,0),s=this.r_.firstAfterOrEqual(r);return b.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}o_(e,t){return this.s_(e)}s_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}i_(e){const t=this.s_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e){this.a_=e,this.docs=function(){return new ne(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.a_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():Ae.newInvalidDocument(t))}getEntries(e,t){let r=De();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ae.newInvalidDocument(s))}),b.resolve(r)}getAllEntries(e){let t=De();return this.docs.forEach((r,s)=>{t=t.insert(r,s.document)}),b.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;pe(t)?(i=Y.fromString(Ni(t)),a=p=>xi(t,p)):(i=t.path,a=p=>Ai(t,p));let c=De();const h=new F(i.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(h);for(;d.hasNext();){const{key:p,value:{document:m}}=d.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||D_(k_(m),r)<=0||(s.has(m.key)||a(m))&&(c=c.insert(m.key,m.mutableCopy()))}return b.resolve(c)}getAllFromCollectionGroup(e,t,r,s){B(9500)}u_(e,t){return b.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Bw(this)}getSize(e){return b.resolve(this.size)}}class Bw extends kw{constructor(e){super(),this.qs=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.qs.addEntry(e,s)):this.qs.removeEntry(r)}),b.waitFor(t)}getFromCache(e,t){return this.qs.getEntry(e,t)}getAllFromCache(e,t){return this.qs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e){this.persistence=e,this.c_=new wn(t=>Id(t),vd),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.l_=0,this.E_=new Ca,this.targetCount=0,this.h_=Kt.ys()}forEachTarget(e,t){return this.c_.forEach((r,s)=>t(s)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.l_)}allocateTargetId(e){return this.highestTargetId=this.h_.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.l_&&(this.l_=t),b.resolve()}vs(e){this.c_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.h_=new Kt(t),this.highestTargetId=t),e.sequenceNumber>this.l_&&(this.l_=e.sequenceNumber)}addTargetData(e,t){return this.vs(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.vs(t),b.resolve()}removeTargetData(e,t){return this.c_.delete(t.target),this.E_.Xs(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.c_.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.c_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),b.waitFor(i).next(()=>s)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.c_.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.E_.Js(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.E_.Zs(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),b.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.E_.Xs(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.E_.t_(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.E_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e,t){this.T_={},this.overlays={},this.P_=new Pi(0),this.R_=!1,this.R_=!0,this.I_=new Mw,this.referenceDelegate=e(this),this.A_=new qw(this),this.indexManager=new Vw,this.remoteDocumentCache=function(s){return new Fw(s)}(r=>this.referenceDelegate.V_(r)),this.serializer=new Pw(t),this.d_=new Ow(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Lw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.T_[e.toKey()];return r||(r=new Uw(t,this.referenceDelegate),this.T_[e.toKey()]=r),r}getGlobalsCache(){return this.I_}getTargetCache(){return this.A_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.d_}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new $w(this.P_.next());return this.referenceDelegate.f_(),r(s).next(i=>this.referenceDelegate.m_(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}p_(e,t){return b.or(Object.values(this.T_).map(r=>()=>r.containsKey(e,t)))}}class $w extends Dy{constructor(e){super(),this.currentSequenceNumber=e}}class Na{constructor(e){this.persistence=e,this.g_=new Ca,this.y_=null}static w_(e){return new Na(e)}get b_(){if(this.y_)return this.y_;throw B(60996)}addReference(e,t,r){return this.g_.addReference(r,t),this.b_.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.g_.removeReference(r,t),this.b_.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.b_.add(t.toString()),b.resolve()}removeTarget(e,t){this.g_.Xs(t.targetId).forEach(s=>this.b_.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.b_.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}f_(){this.y_=new Set}m_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.b_,r=>{const s=F.fromPath(r);return this.S_(e,s).next(i=>{i||t.removeEntry(s,j.min())})}).next(()=>(this.y_=null,t.apply(e)))}updateLimboDocument(e,t){return this.S_(e,t).next(r=>{r?this.b_.delete(t.toString()):this.b_.add(t.toString())})}V_(e){return 0}S_(e,t){return b.or([()=>b.resolve(this.g_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.p_(e,t)])}}class hi{constructor(e,t){this.persistence=e,this.v_=new wn(r=>vw(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Fy(this,t)}static w_(e,t){return new hi(e,t)}f_(){}m_(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}rr(e){const t=this.xs(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}xs(e){let t=0;return this.ir(e,r=>{t++}).next(()=>t)}ir(e,t){return b.forEach(this.v_,(r,s)=>this.Fs(e,r,s).next(i=>i?b.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.u_(e,a=>this.Fs(e,a,t).next(c=>{c||(r++,i.removeEntry(a,j.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.v_.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.v_.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.v_.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.v_.set(t,e.currentSequenceNumber),b.resolve()}V_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Fs(e.data.value)),t}Fs(e,t,r){return b.or([()=>this.persistence.p_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.v_.get(t);return b.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ao=r,this.Vo=s}static fo(e,t){let r=H(),s=H();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ka(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(n,e){return F.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(){this.mo=!1,this.po=!1,this.yo=100,this.wo=function(){return Qf()?8:xy(Re())>0?6:4}()}initialize(e,t){this.bo=e,this.indexManager=t,this.mo=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.So(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.vo(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new zw;return this.Do(e,t,a).next(c=>{if(i.result=c,this.po)return this.xo(e,t,a,c.size)})}).next(()=>i.result)}xo(e,t,r,s){return pe(t)?b.resolve():r.documentReadCount<this.yo?(Pn()<=Q.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Vr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.yo,"documents"),b.resolve()):(Pn()<=Q.DEBUG&&O("QueryEngine","Query:",Vr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.wo*s?(Pn()<=Q.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Vr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ot(t))):b.resolve())}So(e,t){if(pe(t))return b.resolve(null);let r=t;if(Dc(r))return b.resolve(null);let s=ot(r);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(r.limit!==null&&i===1&&(r=ko(r,null,"F"),s=ot(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next(a=>{const c=H(...a);return this.bo.getDocuments(e,c).next(h=>this.indexManager.getMinOffset(e,s).next(d=>{const p=this.Co(r,h);return this.Fo(r,p,c,d.readTime)?this.So(e,ko(r,null,"F")):this.Oo(e,p,r,d)}))})))}vo(e,t,r,s){return(pe(t)?function(a){for(const c of a.stages){if(c instanceof _n||c instanceof Qc)return!1;if(c instanceof Ci){if(c.condition instanceof cd&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof Yn&&c.condition._expr.params[0].fieldName===rt)continue;return!1}}return!0}(t):Dc(t))||s.isEqual(j.min())?b.resolve(null):this.bo.getDocuments(e,r).next(i=>{const a=this.Co(t,i);return this.Fo(t,a,r,s)?b.resolve(null):(Pn()<=Q.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Jc(t)),this.Oo(e,a,t,N_(s,$r)).next(c=>c))})}Co(e,t){let r,s;return pe(e)?(r=new le(jw),s=i=>xi(e,i)):(r=new le(la(e)),s=i=>Ai(e,i)),t.forEach((i,a)=>{s(a)&&(r=r.add(a))}),r}Fo(e,t,r,s){if(pe(e))return function(c){return c.stages.some(h=>h instanceof _n||h instanceof Qc)}(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Do(e,t,r){return Pn()<=Q.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Jc(t)),this.bo.getDocumentsMatchingQuery(e,t,Wt.min(),r)}Oo(e,t,r,s){return this.bo.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="LocalStore",Gw=3e8;class Hw{constructor(e,t,r,s){this.persistence=e,this.Mo=t,this.serializer=s,this.No=new ne(K),this.Lo=new wn(i=>Id(i),vd),this.Bo=new Map,this.Uo=e.getRemoteDocumentCache(),this.A_=e.getTargetCache(),this.d_=e.getBundleCache(),this.ko(r)}ko(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new xw(this.Uo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Uo.setIndexManager(this.indexManager),this.Mo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.No))}}function Kw(n,e,t,r){return new Hw(n,e,t,r)}async function Sd(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ko(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let h=H();for(const d of s){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of i){c.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(r,h).next(d=>({qo:d,removedBatchIds:a,addedBatchIds:c}))})})}function Qw(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Uo.newChangeBuffer({trackRemovals:!0});return function(c,h,d,p){const m=d.batch,R=m.keys();let C=b.resolve();return R.forEach(N=>{C=C.next(()=>p.getEntry(h,N)).next(U=>{const L=d.docVersions.get(N);M(L!==null,48541),U.version.compareTo(L)<0&&(m.applyToRemoteDocument(U,d),U.isValidDocument()&&(U.setReadTime(d.commitVersion),p.addEntry(U)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(h,m))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let h=H();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Vd(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.A_.getLastRemoteSnapshotVersion(t))}function Jw(n,e){const t=z(n),r=e.snapshotVersion;let s=t.No;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Uo.newChangeBuffer({trackRemovals:!0});s=t.No;const c=[];e.targetChanges.forEach((p,m)=>{const R=s.get(m);if(!R)return;c.push(t.A_.removeMatchingKeys(i,p.removedDocuments,m).next(()=>t.A_.addMatchingKeys(i,p.addedDocuments,m)));let C=R.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?C=C.withResumeToken(he.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):p.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(p.resumeToken,r)),s=s.insert(m,C),function(U,L,W){return U.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-U.snapshotVersion.toMicroseconds()>=Gw?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(R,C,p)&&c.push(t.A_.updateTargetData(i,C))});let h=De(),d=H();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),c.push(Yw(i,a,e.documentUpdates).next(p=>{h=p.$o,d=p.Ko})),!r.isEqual(j.min())){const p=t.A_.getLastRemoteSnapshotVersion(i).next(m=>t.A_.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(p)}return b.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,h,d)).next(()=>h)}).then(i=>(t.No=s,i))}function Yw(n,e,t){let r=H(),s=H();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=De();return t.forEach((c,h)=>{const d=i.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(j.min())?(e.removeEntry(c,h.readTime),a=a.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(c,h)):O(Da,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)}),{$o:a,Ko:s}})}function Xw(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ia),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Zw(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.A_.getTargetData(r,e).next(i=>i?(s=i,b.resolve(s)):t.A_.allocateTargetId(r).next(a=>(s=new gt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.A_.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.No.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.No=t.No.insert(r.targetId,r),t.Lo.set(e,r.targetId)),r})}async function Fo(n,e,t){const r=z(n),s=r.No.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Qn(a))throw a;O(Da,`Failed to update sequence numbers for target ${e}: ${a}`)}r.No=r.No.remove(e),r.Lo.delete(s.target)}function Xc(n,e,t){const r=z(n);let s=j.min(),i=H();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,p){const m=z(h),R=m.Lo.get(p);return R!==void 0?b.resolve(m.No.get(R)):m.A_.getTargetData(d,p)}(r,a,pe(e)?e:ot(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.A_.getMatchingKeysForTargetId(a,c.targetId).next(h=>{i=h})}).next(()=>r.Mo.getDocumentsMatchingQuery(a,e,t?s:j.min(),t?i:H())).next(c=>(eT(r,c),{documents:c,Qo:i})))}function eT(n,e){e.forEach((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Bo.get(s)||j.min();r.readTime.compareTo(i)>0&&n.Bo.set(s,r.readTime)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Jo=0,this.Yo=null,this.Zo=!0}Xo(){this.Jo===0&&(this.ea("Unknown"),this.Yo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Yo=null,this.ta("Backend didn't respond within 10 seconds."),this.ea("Offline"),Promise.resolve())))}na(e){this.state==="Online"?this.ea("Unknown"):(this.Jo++,this.Jo>=1&&(this.ra(),this.ta(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ea("Offline")))}set(e){this.ra(),this.Jo=0,e==="Online"&&(this.Zo=!1),this.ea(e)}ea(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ta(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Zo?(It(t),this.Zo=!1):O("OnlineStateTracker",t)}ra(){this.Yo!==null&&(this.Yo.cancel(),this.Yo=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="RemoteStore";class nT{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.ia=[],this.sa=new Map,this._a=new Map,this.oa=new Map,this.aa=new Kt(1e3),this.ua=new Kt(1001),this.ca=new Set,this.la=[],this.Ea=i,this.Ea.Ke(a=>{r.enqueueAndForget(async()=>{In(this)&&(O(ht,"Restarting streams for network reachability change."),await async function(h){const d=z(h);d.ca.add(4),await ls(d),d.ha.set("Unknown"),d.ca.delete(4),await Oi(d)}(this))})}),this.ha=new tT(r,s)}}async function Oi(n){if(In(n))for(const e of n.la)await e(!0)}async function ls(n){for(const e of n.la)await e(!1)}function Bo(n,e){return n._a.get(e)||void 0}function bd(n,e){const t=z(n),r=Bo(t,e.targetId);if(r!==void 0&&t.sa.has(r))return;const s=function(c,h){const d=Bo(c,h);d!==void 0&&c.oa.delete(d);const p=function(R,C){return C%2!=0?R.ua.next():R.aa.next()}(c,h);return c._a.set(h,p),c.oa.set(p,h),p}(t,e.targetId);O(ht,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new gt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.sa.set(s,i),Ma(t)?La(t):tr(t).Jt()&&Oa(t,i)}function xa(n,e){const t=z(n),r=tr(t),s=Bo(t,e);O(ht,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.sa.delete(s),t._a.delete(e),t.oa.delete(s),r.Jt()&&Cd(t,s),t.sa.size===0&&(r.Jt()?r.Xt():In(t)&&t.ha.set("Unknown"))}function Oa(n,e){if(n.Ta.H(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=n.oa.get(e.targetId);if(t===void 0)return void O(ht,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}tr(n).Tn(e)}function Cd(n,e){n.Ta.H(e),tr(n).Pn(e)}function La(n){n.Ta=new Q_({getRemoteKeysForTarget:e=>{const t=n.oa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):H()},ge:e=>n.sa.get(e)||null,Ae:()=>n.datastore.serializer.databaseId}),tr(n).start(),n.ha.Xo()}function Ma(n){return In(n)&&!tr(n).Ht()&&n.sa.size>0}function In(n){return z(n).ca.size===0}function Nd(n){n.Ta=void 0}async function rT(n){n.ha.set("Online")}async function sT(n){n.sa.forEach((e,t)=>{Oa(n,e)})}async function iT(n,e){Nd(n),Ma(n)?(n.ha.na(e),La(n)):n.ha.set("Unknown")}async function oT(n,e,t){if(n.ha.set("Online"),e instanceof Bh&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.sa.has(c)){const h=s.oa.get(c);h!==void 0&&(await s.remoteSyncer.rejectListen(h,a),s._a.delete(h),s.oa.delete(c)),s.sa.delete(c)}s.Ta.removeTarget(c)}}(n,e)}catch(r){O(ht,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await di(n,r)}else if(e instanceof qs?n.Ta.se(e):e instanceof Fh?n.Ta.Ee(e):n.Ta.ae(e),!t.isEqual(j.min()))try{const r=await Vd(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Ta.de(a);c.targetChanges.forEach((d,p)=>{if(d.resumeToken.approximateByteSize()>0){const m=i.sa.get(p);m&&i.sa.set(p,m.withResumeToken(d.resumeToken,a))}}),c.targetMismatches.forEach((d,p)=>{const m=i.sa.get(d);if(!m)return;i.sa.set(d,m.withResumeToken(he.EMPTY_BYTE_STRING,m.snapshotVersion)),Cd(i,d);const R=new gt(m.target,d,p,m.sequenceNumber);Oa(i,R)});const h=function(p,m){const R=new Map;m.targetChanges.forEach((N,U)=>{const L=p.oa.get(U);L!==void 0&&R.set(L,N)});let C=new ne(K);return m.targetMismatches.forEach((N,U)=>{const L=p.oa.get(N);L!==void 0&&(C=C.insert(L,U))}),new os(m.snapshotVersion,R,C,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)}(i,c);return i.remoteSyncer.applyRemoteEvent(h)}(n,t)}catch(r){O(ht,"Failed to raise snapshot:",r),await di(n,r)}}async function di(n,e,t){if(!Qn(e))throw e;n.ca.add(1),await ls(n),n.ha.set("Offline"),t||(t=()=>Vd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(ht,"Retrying IndexedDB access"),await t(),n.ca.delete(1),await Oi(n)})}function kd(n,e){return e().catch(t=>di(n,t,e))}async function Li(n){const e=z(n),t=Qt(e);let r=e.ia.length>0?e.ia[e.ia.length-1].batchId:ia;for(;aT(e);)try{const s=await Xw(e.localStore,r);if(s===null){e.ia.length===0&&t.Xt();break}r=s.batchId,uT(e,s)}catch(s){await di(e,s)}Dd(e)&&xd(e)}function aT(n){return In(n)&&n.ia.length<10}function uT(n,e){n.ia.push(e);const t=Qt(n);t.Jt()&&t.Rn&&t.In(e.mutations)}function Dd(n){return In(n)&&!Qt(n).Ht()&&n.ia.length>0}function xd(n){Qt(n).start()}async function cT(n){Qt(n).dn()}async function lT(n){const e=Qt(n);for(const t of n.ia)e.In(t.mutations)}async function hT(n,e,t){const r=n.ia.shift(),s=ba.from(r,e,t);await kd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Li(n)}async function dT(n,e){e&&Qt(n).Rn&&await async function(r,s){if(function(a){return q_(a)&&a!==V.ABORTED}(s.code)){const i=r.ia.shift();Qt(r).Zt(),await kd(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Li(r)}}(n,e),Dd(n)&&xd(n)}async function Zc(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),O(ht,"RemoteStore received new credentials");const r=In(t);t.ca.add(3),await ls(t),r&&t.ha.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.ca.delete(3),await Oi(t)}async function fT(n,e){const t=z(n);e?(t.ca.delete(2),await Oi(t)):e||(t.ca.add(2),await ls(t),t.ha.set("Unknown"))}function tr(n){return n.Pa||(n.Pa=function(t,r,s){const i=z(t);return i.mn(),new Ry(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ut:rT.bind(null,n),lt:sT.bind(null,n),ht:iT.bind(null,n),hn:oT.bind(null,n)}),n.la.push(async e=>{e?(n.Pa.Zt(),Ma(n)?La(n):n.ha.set("Unknown")):(await n.Pa.stop(),Nd(n))})),n.Pa}function Qt(n){return n.Ra||(n.Ra=function(t,r,s){const i=z(t);return i.mn(),new Py(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ut:()=>Promise.resolve(),lt:cT.bind(null,n),ht:dT.bind(null,n),An:lT.bind(null,n),Vn:hT.bind(null,n)}),n.la.push(async e=>{e?(n.Ra.Zt(),await Li(n)):(await n.Ra.stop(),n.ia.length>0&&(O(ht,`Stopping write stream with ${n.ia.length} pending writes`),n.ia=[]))})),n.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ia(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ia(this.observer.error,e):It("Uncaught Error in snapshot listener:",e.toString()))}Aa(){this.muted=!0}Ia(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new yt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Ua(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Fa(n,e){if(It("AsyncQueue",`${e}: ${n}`),Qn(n))return new x(V.UNAVAILABLE,`${e}: ${n}`);throw n}class el{constructor(){this.activeTargetIds=G_()}La(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ba(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Na(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class pT{constructor(){this.du=new el,this.fu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.du.La(e),this.fu[e]||"not-current"}updateQueryState(e,t,r){this.fu[e]=t}removeLocalQueryTarget(e){this.du.Ba(e)}isLocalQueryTarget(e){return this.du.activeTargetIds.has(e)}clearQueryState(e){delete this.fu[e]}getAllActiveQueryTargets(){return this.du.activeTargetIds}isActiveQueryTarget(e){return this.du.activeTargetIds.has(e)}start(){return this.du=new el,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Eo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{static emptySet(e){return new ln(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Vn(),this.sortedSet=new ne(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ln)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ln;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(){this.mu=new ne(F.comparator)}track(e){const t=e.doc.key,r=this.mu.get(t);r?e.type!==0&&r.type===3?this.mu=this.mu.insert(t,e):e.type===3&&r.type!==1?this.mu=this.mu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.mu=this.mu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.mu=this.mu.remove(t):e.type===1&&r.type===2?this.mu=this.mu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):B(63341,{ye:e,pu:r}):this.mu=this.mu.insert(t,e)}gu(){const e=[];return this.mu.inorderTraversal((t,r)=>{e.push(r)}),e}}class zn{constructor(e,t,r,s,i,a,c,h,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new zn(e,t,ln.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Di(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(){this.yu=void 0,this.wu=[]}bu(){return this.wu.some(e=>e.Su())}}class gT{constructor(){this.queries=nl(),this.onlineState="Unknown",this.vu=new Set}terminate(){(function(t,r){const s=z(t),i=s.queries;s.queries=nl(),i.forEach((a,c)=>{for(const h of c.wu)h.onError(r)})})(this,new x(V.ABORTED,"Firestore shutting down"))}}function nl(){return new wn(n=>Td(n),Di)}async function Ld(n,e){const t=z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.bu()&&e.Su()&&(r=2):(i=new mT,r=e.Su()?0:1);try{switch(r){case 0:i.yu=await t.onListen(s,!0);break;case 1:i.yu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Fa(a,`Initialization of query '${pe(e.query)?Et(e.query):Vr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.wu.push(e),e.Du(t.onlineState),i.yu&&e.xu(i.yu)&&Ba(t)}async function Md(n,e){const t=z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wu.indexOf(e);a>=0&&(i.wu.splice(a,1),i.wu.length===0?s=e.Su()?0:1:!i.bu()&&e.Su()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function _T(n,e){const t=z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.wu)c.xu(s)&&(r=!0);a.yu=s}}r&&Ba(t)}function yT(n,e,t){const r=z(n),s=r.queries.get(e);if(s)for(const i of s.wu)i.onError(t);r.queries.delete(e)}function Ba(n){n.vu.forEach(e=>{e.next()})}var qo;(function(n){n.Default="default",n.Cache="cache"})(qo||(qo={}));class Ud{constructor(e,t,r){this.query=e,this.Cu=t,this.Fu=!1,this.Ou=null,this.onlineState="Unknown",this.options=r||{}}xu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new zn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Mu(e)&&(this.Cu.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.Lu(e),t=!0),this.Ou=e,t}onError(e){this.Cu.error(e)}Du(e){this.onlineState=e;let t=!1;return this.Ou&&!this.Fu&&this.Nu(this.Ou,e)&&(this.Lu(this.Ou),t=!0),t}Nu(e,t){if(!e.fromCache||!this.Su())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Mu(e){if(e.docChanges.length>0)return!0;const t=this.Ou&&this.Ou.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Lu(e){e=zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Cu.next(e)}Su(){return this.options.source!==qo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e){this.key=e}}class Bd{constructor(e){this.key=e}}class ET{constructor(e,t){this.query=e,this.Gu=t,this.zu=null,this.hasCachedResults=!1,this.current=!1,this.ju=H(),this.mutatedKeys=H(),this.Hu=pe(e)?Uo(e):la(e),this.Ju=new ln(this.Hu)}get Yu(){return this.Gu}Zu(e,t){const r=t?t.Xu:new tl,s=t?t.Ju:this.Ju;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const[h,d]=this.ec(this.query,s);e.inorderTraversal((m,R)=>{const C=s.get(m),N=Cw(this.query,R)?R:null,U=!!C&&this.mutatedKeys.has(C.key),L=!!N&&(N.hasLocalMutations||this.mutatedKeys.has(N.key)&&N.hasCommittedMutations);let W=!1;C&&N?C.data.isEqual(N.data)?U!==L&&(r.track({type:3,doc:N}),W=!0):this.tc(C,N)||(r.track({type:2,doc:N}),W=!0,(h&&this.Hu(N,h)>0||d&&this.Hu(N,d)<0)&&(c=!0)):!C&&N?(r.track({type:0,doc:N}),W=!0):C&&!N&&(r.track({type:1,doc:C}),W=!0,(h||d)&&(c=!0)),W&&(N?(a=a.add(N),i=L?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))});const p=this.nc(this.query);if(p)if(pe(this.query)){const m=[];a.forEach(N=>m.push(N));const R=Rd(this.query,m);let C=new ln(Uo(this.query));for(const N of R)C=C.add(N);a.forEach(N=>{C.has(N.key)||(i=i.delete(N.key),r.track({type:1,doc:N}))}),a=C}else{const m=this.rc(this.query);for(;a.size>p;){const R=m==="F"?a.last():a.first();a=a.delete(R.key),i=i.delete(R.key),r.track({type:1,doc:R})}}return{Ju:a,Xu:r,Fo:c,mutatedKeys:i}}nc(e){return pe(e)?yo(e)?.limit:e.limit||void 0}rc(e){if(pe(e)){const t=yo(e);return t&&t.limit<0?"L":"F"}return e.limitType}ec(e,t){if(pe(e)){const r=yo(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.nc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.nc(this.query)?t.first():null]}tc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ju;this.Ju=e.Ju,this.mutatedKeys=e.mutatedKeys;const a=e.Xu.gu();a.sort((p,m)=>function(C,N){const U=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{ye:L})}};return U(C)-U(N)}(p.type,m.type)||this.Hu(p.doc,m.doc)),this.sc(r),s=s??!1;const c=t&&!s?this._c():[],h=this.ju.size===0&&this.current&&!s?1:0,d=h!==this.zu;return this.zu=h,a.length!==0||d?{snapshot:new zn(this.query,e.Ju,i,a,e.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),oc:c}:{oc:c}}Du(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ju:this.Ju,Xu:new tl,mutatedKeys:this.mutatedKeys,Fo:!1},!1)):{oc:[]}}ac(e){return!this.Gu.has(e)&&!!this.Ju.has(e)&&!this.Ju.get(e).hasLocalMutations}sc(e){e&&(e.addedDocuments.forEach(t=>this.Gu=this.Gu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Gu=this.Gu.delete(t)),this.current=e.current)}_c(){if(!this.current)return[];const e=this.ju;this.ju=H(),this.Ju.forEach(r=>{this.ac(r.key)&&(this.ju=this.ju.add(r.key))});const t=[];return e.forEach(r=>{this.ju.has(r)||t.push(new Bd(r))}),this.ju.forEach(r=>{e.has(r)||t.push(new Fd(r))}),t}uc(e){this.Gu=e.Qo,this.ju=H();const t=this.Zu(e.documents);return this.applyChanges(t,!0)}cc(){return zn.fromInitialDocuments(this.query,this.Ju,this.mutatedKeys,this.zu===0,this.hasCachedResults)}}const qa="SyncEngine";class wT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class TT{constructor(e){this.key=e,this.lc=!1}}class IT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ec={},this.hc=new wn(c=>Td(c),Di),this.Tc=new Map,this.Pc=new Set,this.Rc=new ne(F.comparator),this.Ic=new Map,this.Ac=new Ca,this.Vc={},this.dc=new Map,this.fc=Kt.ws(),this.onlineState="Unknown",this.mc=void 0}get isPrimaryClient(){return this.mc===!0}}async function vT(n,e,t=!0){const r=Gd(n);let s;const i=r.hc.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cc()):s=await qd(r,e,t,!0),s}async function AT(n,e){const t=Gd(n);await qd(t,e,!0,!1)}async function qd(n,e,t,r){const s=await Zw(n.localStore,pe(e)?e:ot(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await RT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&bd(n.remoteStore,s),c}async function RT(n,e,t,r,s){n.gc=(m,R,C)=>async function(U,L,W,X){let se=L.view.Zu(W);se.Fo&&(se=await Xc(U.localStore,L.query,!1).then(({documents:T})=>L.view.Zu(T,se)));const Ce=X&&X.targetChanges.get(L.targetId),He=X&&X.targetMismatches.get(L.targetId)!=null,ye=L.view.applyChanges(se,U.isPrimaryClient,Ce,He);return sl(U,L.targetId,ye.oc),ye.snapshot}(n,m,R,C);const i=await Xc(n.localStore,e,!0),a=new ET(e,i.Qo),c=a.Zu(i.documents),h=as.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,h);sl(n,t,d.oc);const p=new wT(e,t,a);return n.hc.set(e,p),n.Tc.has(t)?n.Tc.get(t).push(e):n.Tc.set(t,[e]),d.snapshot}async function PT(n,e,t){const r=z(n),s=r.hc.get(e),i=r.Tc.get(s.targetId);if(i.length>1)return r.Tc.set(s.targetId,i.filter(a=>!Di(a,e))),void r.hc.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Fo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&xa(r.remoteStore,s.targetId),$o(r,s.targetId)}).catch(Kn)):($o(r,s.targetId),await Fo(r.localStore,s.targetId,!0))}async function ST(n,e){const t=z(n),r=t.hc.get(e),s=t.Tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),xa(t.remoteStore,r.targetId))}async function VT(n,e,t){const r=OT(n);try{const s=await function(a,c){const h=z(a),d=te.now(),p=c.reduce((C,N)=>C.add(N.key),H());let m,R;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let N=De(),U=H();return h.Uo.getEntries(C,p).next(L=>{N=L,N.forEach((W,X)=>{X.isValidDocument()||(U=U.add(W))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,N)).next(L=>{m=L;const W=[];for(const X of c){const se=w_(X,m.get(X.key).overlayedDocument);se!=null&&W.push(new En(X.key,se,_h(se.value.mapValue),_t.exists(!0)))}return h.mutationQueue.addMutationBatch(C,d,W,c)}).next(L=>{R=L;const W=L.applyToLocalDocumentSet(m,U);return h.documentOverlayCache.saveOverlays(C,L.batchId,W)})}).then(()=>({batchId:R.batchId,changes:Mh(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,h){let d=a.Vc[a.currentUser.toKey()];d||(d=new ne(K)),d=d.insert(c,h),a.Vc[a.currentUser.toKey()]=d}(r,s.batchId,t),await hs(r,s.changes),await Li(r.remoteStore)}catch(s){const i=Fa(s,"Failed to persist write");t.reject(i)}}async function $d(n,e){const t=z(n);try{const r=await Jw(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ic.get(i);a&&(M(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lc=!0:s.modifiedDocuments.size>0?M(a.lc,14607):s.removedDocuments.size>0&&(M(a.lc,42227),a.lc=!1))}),await hs(t,r,e)}catch(r){await Kn(r)}}function rl(n,e,t){const r=z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.hc.forEach((i,a)=>{const c=a.view.Du(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const h=z(a);h.onlineState=c;let d=!1;h.queries.forEach((p,m)=>{for(const R of m.wu)R.Du(c)&&(d=!0)}),d&&Ba(h)}(r.eventManager,e),s.length&&r.Ec.hn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function bT(n,e,t){const r=z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ic.get(e),i=s&&s.key;if(i){let a=new ne(F.comparator);a=a.insert(i,Ae.newNoDocument(i,j.min()));const c=H().add(i),h=new os(j.min(),new Map,new ne(K),a,De(),c);await $d(r,h),r.Rc=r.Rc.remove(i),r.Ic.delete(e),$a(r)}else await Fo(r.localStore,e,!1).then(()=>$o(r,e,t)).catch(Kn)}async function CT(n,e){const t=z(n),r=e.batch.batchId;try{const s=await Qw(t.localStore,e);zd(t,r,null),jd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await hs(t,s)}catch(s){await Kn(s)}}async function NT(n,e,t){const r=z(n);try{const s=await function(a,c){const h=z(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,c).next(m=>(M(m!==null,37113),p=m.keys(),h.mutationQueue.removeMutationBatch(d,m))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(r.localStore,e);zd(r,e,t),jd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await hs(r,s)}catch(s){await Kn(s)}}function jd(n,e){(n.dc.get(e)||[]).forEach(t=>{t.resolve()}),n.dc.delete(e)}function zd(n,e,t){const r=z(n);let s=r.Vc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vc[r.currentUser.toKey()]=s}}function $o(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tc.get(e))n.hc.delete(r),t&&n.Ec.yc(r,t);n.Tc.delete(e),n.isPrimaryClient&&n.Ac.Xs(e).forEach(r=>{n.Ac.containsKey(r)||Wd(n,r)})}function Wd(n,e){n.Pc.delete(e.path.canonicalString());const t=n.Rc.get(e);t!==null&&(xa(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ic.delete(t),$a(n))}function sl(n,e,t){for(const r of t)r instanceof Fd?(n.Ac.addReference(r.key,e),kT(n,r)):r instanceof Bd?(O(qa,"Document no longer in limbo: "+r.key),n.Ac.removeReference(r.key,e),n.Ac.containsKey(r.key)||Wd(n,r.key)):B(19791,{wc:r})}function kT(n,e){const t=e.key,r=t.path.canonicalString();n.Rc.get(t)||n.Pc.has(r)||(O(qa,"New document in limbo: "+t),n.Pc.add(r),$a(n))}function $a(n){for(;n.Pc.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){const e=n.Pc.values().next().value;n.Pc.delete(e);const t=new F(Y.fromString(e)),r=n.fc.next();n.Ic.set(r,new TT(t)),n.Rc=n.Rc.insert(t,r),bd(n.remoteStore,new gt(ot(ca(t.path)),r,"TargetPurposeLimboResolution",Pi.yn))}}async function hs(n,e,t){const r=z(n),s=[],i=[],a=[];r.hc.isEmpty()||(r.hc.forEach((c,h)=>{a.push(r.gc(h,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:t?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,p?"current":"not-current")}if(d){s.push(d);const p=ka.fo(h.targetId,d);i.push(p)}}))}),await Promise.all(a),r.Ec.hn(s),await async function(h,d){const p=z(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>b.forEach(d,R=>b.forEach(R.Ao,C=>p.persistence.referenceDelegate.addReference(m,R.targetId,C)).next(()=>b.forEach(R.Vo,C=>p.persistence.referenceDelegate.removeReference(m,R.targetId,C)))))}catch(m){if(!Qn(m))throw m;O(Da,"Failed to update sequence numbers: "+m)}for(const m of d){const R=m.targetId;if(!m.fromCache){const C=p.No.get(R),N=C.snapshotVersion,U=C.withLastLimboFreeSnapshotVersion(N);p.No=p.No.insert(R,U)}}}(r.localStore,i))}async function DT(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){O(qa,"User change. New user:",e.toKey());const r=await Sd(t.localStore,e);t.currentUser=e,function(i,a){i.dc.forEach(c=>{c.forEach(h=>{h.reject(new x(V.CANCELLED,a))})}),i.dc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await hs(t,r.qo)}}function xT(n,e){const t=z(n),r=t.Ic.get(e);if(r&&r.lc)return H().add(r.key);{let s=H();const i=t.Tc.get(e);if(!i)return s;for(const a of i??[]){const c=t.hc.get(a);s=s.unionWith(c.view.Yu)}return s}}function Gd(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$d.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=xT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=bT.bind(null,e),e.Ec.hn=_T.bind(null,e.eventManager),e.Ec.yc=yT.bind(null,e.eventManager),e}function OT(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=CT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=NT.bind(null,e),e}class fi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ri(e.databaseInfo.databaseId),this.sharedClientState=this.Sc(e),this.persistence=this.vc(e),await this.persistence.start(),this.localStore=this.Dc(e),this.gcScheduler=this.xc(e,this.localStore),this.indexBackfillerScheduler=this.Cc(e,this.localStore)}xc(e,t){return null}Cc(e,t){return null}Dc(e){return Kw(this.persistence,new Ww,e.initialUser,this.serializer)}vc(e){return new Pd(Na.w_,this.serializer)}Sc(e){return new pT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}fi.provider={build:()=>new fi};class LT extends fi{constructor(e){super(),this.cacheSizeBytes=e}xc(e,t){M(this.persistence.referenceDelegate instanceof hi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new My(r,e.asyncQueue,t)}vc(e){const t=this.cacheSizeBytes!==void 0?ke.withCacheSize(this.cacheSizeBytes):ke.DEFAULT;return new Pd(r=>hi.w_(r,t),this.serializer)}}class jo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>rl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=DT.bind(null,this.syncEngine),await fT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new gT}()}createDatastore(e){const t=Ri(e.databaseInfo.databaseId),r=Ay(e.databaseInfo);return by(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new nT(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>rl(this.syncEngine,t,0),function(){return qc.Je()?new qc:new wy}())}createSyncEngine(e,t){return function(s,i,a,c,h,d,p){const m=new IT(s,i,a,c,h,d);return p&&(m.mc=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=z(t);O(ht,"RemoteStore shutting down."),r.ca.add(5),await ls(r),r.Ea.shutdown(),r.ha.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}jo.provider={build:()=>new jo};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="FirestoreClient";class MT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=ve.UNAUTHENTICATED,this.clientId=sa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{O(Jt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(Jt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new yt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Fa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function wo(n,e){n.asyncQueue.verifyOperationInProgress(),O(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Sd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function il(n,e){n.asyncQueue.verifyOperationInProgress();const t=await UT(n);O(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Zc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Zc(e.remoteStore,s)),n._onlineComponents=e}async function UT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Jt,"Using user provided OfflineComponentProvider");try{await wo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Xe("Error using user provided cache. Falling back to memory cache: "+t),await wo(n,new fi)}}else O(Jt,"Using default OfflineComponentProvider"),await wo(n,new LT(void 0));return n._offlineComponents}async function Hd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Jt,"Using user provided OnlineComponentProvider"),await il(n,n._uninitializedComponentsProvider._online)):(O(Jt,"Using default OnlineComponentProvider"),await il(n,new jo))),n._onlineComponents}function FT(n){return Hd(n).then(e=>e.syncEngine)}async function Kd(n){const e=await Hd(n),t=e.eventManager;return t.onListen=vT.bind(null,e.syncEngine),t.onUnlisten=PT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=AT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ST.bind(null,e.syncEngine),t}function BT(n,e,t={}){const r=new yt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,h,d){const p=new Od({next:R=>{p.Aa(),a.enqueueAndForget(()=>Md(i,m));const C=R.docs.has(c);!C&&R.fromCache?d.reject(new x(V.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&R.fromCache&&h&&h.source==="server"?d.reject(new x(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(R)},error:R=>d.reject(R)}),m=new Ud(ca(c.path),p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Ld(i,m)}(await Kd(n),n.asyncQueue,e,t,r)),r.promise}function qT(n,e,t={}){const r=new yt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,h,d){const p=new Od({next:R=>{p.Aa(),a.enqueueAndForget(()=>Md(i,m)),R.fromCache&&h.source==="server"?d.reject(new x(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(R)},error:R=>d.reject(R)}),m=new Ud(c instanceof Cr?Tw(c):c,p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Ld(i,m)}(await Kd(n),n.asyncQueue,e,t,r)),r.promise}function $T(n,e){const t=new yt;return n.asyncQueue.enqueueAndForget(async()=>VT(await FT(n),e,t)),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qd=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new jT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(us("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},jT=class extends Qd{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{convertValue(e,t="none"){switch(de(e)){case 0:return null;case 1:return e.booleanValue;case 2:return re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return yn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){const t=e.fields?.[Lr].arrayValue?.values?.map(r=>re(r.doubleValue));return new xe(t)}convertGeoPoint(e){return new ut(re(e.latitude),re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=rs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Fn(e));default:return null}}convertTimestamp(e){const t=$t(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);M(Hh(r),9688,{name:e});const s=new xr(r.get(1),r.get(3)),i=new F(r.popFirst(5));return s.isEqual(t)||It(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WT(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="AsyncQueue";class al{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Qc=null,this.Wc=!1,this.Gc=!1,this.zc=[],this.jt=new Xh(this,"async_queue_retry"),this.jc=()=>{const r=Eo();r&&O(ol,"Visibility state changed to "+r.visibilityState),this.jt.qt()},this.Hc=e;const t=Eo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=Eo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise(()=>{});const t=new yt;return this.Yc(()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.qc.push(e),this.Zc()))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.jt.reset()}catch(e){if(!Qn(e))throw e;O(ol,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.jt.Ut(()=>this.Zc())}}Yc(e){const t=this.Hc.then(()=>(this.Wc=!0,e().catch(r=>{throw this.Qc=r,this.Wc=!1,It("INTERNAL UNHANDLED ERROR: ",ul(r)),r}).then(r=>(this.Wc=!1,r))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=Ua.createAndSchedule(this,e,t,r,i=>this.Xc(i));return this.Kc.push(s),s}Jc(){this.Qc&&B(47125,{el:ul(this.Qc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then(()=>{this.Kc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()})}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function ul(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Mi extends Si{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new al,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new al(e),this._firestoreClient=void 0,await e}}}function uI(n,e){const t=typeof n=="object"?n:wl(),r=typeof n=="string"?n:ei,s=Go(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Bf("firestore");i&&By(s,...i)}return s}function ja(n){if(n._terminated)throw new x(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||GT(n),n._firestoreClient}function GT(n){const e=n._freezeSettings(),t=Ny(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new MT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd extends zT{constructor(e){super(),this.firestore=e}convertBytes(e){return new ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new oe(this.firestore,null,t)}}class vr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hn extends Qd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new zs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(us("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new x(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",hn._jsonSchema={type:ce("string",hn._jsonSchemaVersion),bundleSource:ce("string","DocumentSnapshot"),bundleName:ce("string"),bundle:ce("string")};class zs extends hn{data(e={}){return super.data(e)}}class On{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new vr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new zs(this._firestore,this._userDataWriter,r.key,r,new vr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new x(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{pe(s._snapshot.query)?Uo(s._snapshot.query):la(s.query._query);const h=new zs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new vr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const h=new zs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new vr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:HT(c.type),doc:h,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new x(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=On._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=sa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function HT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */On._jsonSchemaVersion="firestore/querySnapshot/1.0",On._jsonSchema={type:ce("string",On._jsonSchemaVersion),bundleSource:ce("string","QuerySnapshot"),bundleName:ce("string"),bundle:ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new x(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class za{}class QT extends za{}function cI(n,e,...t){let r=[];e instanceof za&&r.push(e),r=r.concat(t),function(i){const a=i.filter(h=>h instanceof Wa).length,c=i.filter(h=>h instanceof Ui).length;if(a>1||a>0&&c>0)throw new x(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ui extends QT{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ui(e,t,r)}_apply(e){const t=this._parse(e);return Yd(e._query,t),new Jn(e.firestore,e.converter,No(e._query,t))}_parse(e){const t=rd(e.firestore);return function(i,a,c,h,d,p,m){let R;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new x(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ll(m,p);const N=[];for(const U of m)N.push(cl(h,i,U));R={arrayValue:{values:N}}}else R=cl(h,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ll(m,p),R=Wy(c,a,m,p==="in"||p==="not-in");return ue.create(d,p,R)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function lI(n,e,t){const r=e,s=us("where",n);return Ui._create(s,r,t)}class Wa extends za{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Wa(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const h of c)Yd(a,h),a=No(a,h)}(e._query,t),new Jn(e.firestore,e.converter,No(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function cl(n,e,t){if(typeof(t=We(t))=="string"){if(t==="")throw new x(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!xh(e)&&t.indexOf("/")!==-1)throw new x(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!F.isDocumentKey(r))throw new x(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Rc(n,new F(r))}if(t instanceof oe)return Rc(n,t._key);throw new x(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${yi(t)}.`)}function ll(n,e){if(!Array.isArray(n)||n.length===0)throw new x(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Yd(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new x(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new x(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hI(n){n=gn(n,oe);const e=gn(n.firestore,Mi),t=ja(e);return BT(t,n._key).then(r=>YT(e,n,r))}function dI(n){n=gn(n,Jn);const e=gn(n.firestore,Mi),t=ja(e),r=new Jd(e);return KT(n._query),qT(t,n._query).then(s=>new On(e,r,n,s))}function fI(n,e,t){n=gn(n,oe);const r=gn(n.firestore,Mi),s=WT(n.converter,e,t),i=rd(r);return JT(r,[zy(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,_t.none())])}function JT(n,e){const t=ja(n);return $T(t,e)}function YT(n,e,t){const r=t.docs.get(e._key),s=new Jd(n);return new hn(n,s,e._key,r,new vr(t.hasPendingWrites,t.fromCache),e.converter)}const hl="@firebase/firestore",dl="4.17.1";(function(e,t=!0){e_(Wn),Ln(new fn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Mi(new gy(r.getProvider("auth-internal")),new Ey(a,r.getProvider("app-check-internal")),c_(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Mt(hl,dl,e),Mt(hl,dl,"esm2020")})();export{Dt as G,uI as a,dI as b,rI as c,sI as d,iI as e,fI as f,eI as g,hI as h,Wp as i,cI as q,ZT as s,lI as w};
