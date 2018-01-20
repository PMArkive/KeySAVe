webpackJsonp(["formatters/reddit"],{"./src/components/formatters/reddit/FormattingOptionsReddit.module.scss":function(e,t){e.exports={flexRow:"_1rdrbf3YFacPYYyfyYQoW-",column:"_1vbAzSlkHgzfEyTJbUkD6C",menuRow:"bovS9tzCXxJkZQvmGK1uv"}},"./src/components/formatters/reddit/PkmListReddit.module.scss":function(e,t){e.exports={paper:"_1pWfBVqjmHTDf0ImnwGCMo",boldIV:"_105urWEEYat1NFr4qqgd72",boxNumber:"_34hAEtX6sKEO6bI-PfRcNk",hide:"_2d3n0Lun1zo4ctb3HEy-B6",table:"_3Vw0qv3gZf_9jqEPCgwoQp",odd:"_16g8glspL0BGCUFtI4YKXl",even:"_1lGOJAXqcX6cq7q4ImzNOc",colorBlue:"_2IX74Wxp_QR8Fl8GsD3dVP",colorGreen:"_1bWM2Nr0UKj13VB8BDJw83",colorYellow:"JQhMfaKiwRrjjVRKYiheq",colorRed:"_2-6YrhaONhoZDU0wIjTPtA"}},"./src/components/formatters/reddit/components.js":function(e,t,a){"use strict";function o(e){switch(e){case 0:return"♂";case 1:return"♀";default:return"-"}}function r(e,t,a,o){const r=(6===a?o.forms6:o.forms7)[e];return r&&r[t]?`${o.species[e]} (${r[t]})`:o.species[e]}Object.defineProperty(t,"__esModule",{value:!0});var s=a("./node_modules/react/index.js"),l=a.n(s),n=a("./node_modules/reselect/lib/index.js"),i=a("./node_modules/prop-types/index.js"),c=a.n(i),m=a("./src/containers/DataLoader.js"),p=a("./src/components/formatters/reddit/PkmListReddit.module.scss"),d=a.n(p);class u extends l.a.PureComponent{render(){var e=this.props;const t=e.pkm,a=e.local;return l.a.createElement("tr",{className:`${"mark"===this.props.format.ghosts&&t.isGhost?d.a.ghost:""} ${this.props.isEven?d.a.even:d.a.odd}`,style:{display:this.props.hidden?"none":void 0}},l.a.createElement("td",null,"mark"===this.props.format.ghosts&&t.isGhost?"~":"","B",("00"+(t.box+1)).slice(-2)),l.a.createElement("td",null,Math.floor(t.slot/6)+1,",",t.slot%6+1),l.a.createElement("td",null,r(t.species,t.form,t.version,a)," (",o(t.gender),")"),l.a.createElement("td",null,a.natures[t.nature]),l.a.createElement("td",null,a.abilities[t.ability]," "),this.props.format.boldPerfectIVs?l.a.createElement("td",null,31===t.ivHp?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivHp,".",31===t.ivAtk?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivAtk,".",31===t.ivDef?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivDef,".",31===t.ivSpAtk?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivSpAtk,".",31===t.ivSpDef?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivSpDef,".",31===t.ivSpe?l.a.createElement("span",{className:d.a.boldIV},"31"):t.ivSpe):l.a.createElement("td",null,t.ivHp,".",t.ivAtk,".",t.ivDef,".",t.ivSpAtk,".",t.ivSpDef,".",t.ivSpe),l.a.createElement("td",null,a.types[t.hpType]),l.a.createElement("td",null,("0000"+t.esv).slice(-4)))}}u.propTypes={pkm:c.a.object,language:c.a.string,format:c.a.object,hidden:c.a.bool,isEven:c.a.bool,local:c.a.object};class h extends l.a.PureComponent{constructor(...e){var t;return t=super(...e),this.getPokemonGroupedByBox=Object(n.createSelector)(()=>this.props.pokemon,()=>this.props.pokemon.groupBy(e=>e.box)),this.getShowBoxMap=Object(n.createSelector)(this.getPokemonGroupedByBox,()=>this.props.filterFunction,(e,t)=>e.map(e=>e.some(t))),t}getPlainTextBox(e){const t=this.props.local,a=this.props.format.ghosts,s="hide"===this.props.format.ghosts;return"| Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPA.SPD.SPE | Hidden Power | ESV |\n|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n"+e.filter(e=>this.props.filterFunction(e)&&(!s||!e.isGhost)).map(e=>`| ${"mark"===a&&e.isGhost?"~":""}`+`B${("0"+(e.box+1)).slice(-2)} | ${Math.floor(e.slot/6)+1},${e.slot%6+1} | `+`${r(e.species,e.form,e.version,t)} (${o(e.gender)}) | `+`${t.natures[e.nature]} | ${t.abilities[e.ability]} | `+(this.props.format.boldPerfectIVs?["Hp","Atk","Def","SpAtk","SpDef","Spe"].map(t=>31===e["iv"+t]?"**31**":""+e["iv"+t]).join("."):["Hp","Atk","Def","SpAtk","SpDef","Spe"].map(t=>e["iv"+t]).join("."))+` | ${t.types[e.hpType]} | ${("0000"+e.esv).slice(-4)} |`).join("\n")}getPlainText(){if(this.props.format.splitBoxes){return this.props.pokemon.groupBy(e=>e.box).map((e,t)=>`${this.getBoxHeader(t)+" "}Box ${t+1}\n\n${this.getPlainTextBox(e)}`).join("\n\n")}return`${this.getBoxHeader(0)} All Boxes\n\n${this.getPlainTextBox(this.props.pokemon)}`}getBoxHeader(e){switch(this.props.format.color){case 0:return"##";case 1:return["###","####","#####","######"][e%4];case 2:return"###";case 3:return"####";case 4:return"#####";case 5:return"######";default:return"##"}}getBoxClass(e){switch(this.props.format.color){case 0:return d.a.colorNone;case 1:return[d.a.colorBlue,d.a.colorGreen,d.a.colorYellow,d.a.colorRed][e%4];case 2:return d.a.colorBlue;case 3:return d.a.colorGreen;case 4:return d.a.colorYellow;case 5:return d.a.colorRed;default:return d.a.colorNone}}renderBox(e,t){const a="hide"===this.props.format.ghosts;let o=!1;const r=this.props.local;return l.a.createElement("table",{className:`${d.a.table} ${this.getBoxClass(t)}`},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Box"),l.a.createElement("th",null,"Slot"),l.a.createElement("th",null,"Species (Gender)"),l.a.createElement("th",null,"Nature"),l.a.createElement("th",null,"Ability"),l.a.createElement("th",null,"HP.ATK.DEF.SPATK.SPDEF.SPE"),l.a.createElement("th",null,"Hidden Power"),l.a.createElement("th",null,"ESV")),e.map(e=>{const t=!this.props.filterFunction(e)||a&&e.isGhost;return o=o===t,l.a.createElement(u,{key:30*e.box+e.slot,pkm:e,format:this.props.format,language:this.props.language,local:r,filterFunction:this.props.filterFunction,hidden:t,isEven:o})}).cacheResult()))}render(){if(!this.props.pokemon.first())return l.a.createElement("div",null);if(this.props.format.splitBoxes){const e=this.getPokemonGroupedByBox(),t=this.getShowBoxMap();return l.a.createElement("div",null,e.map((e,a)=>l.a.createElement("div",{key:a,style:{display:t.get(a)?"block":"none"}},l.a.createElement("h2",{className:d.a.boxNumber},l.a.createElement("span",{className:d.a.hide},this.getBoxHeader(a)," "),"Box ",a+1),this.renderBox(e,a))).valueSeq().cacheResult())}return this.renderBox(this.props.pokemon,0)}}h.propTypes={pokemon:c.a.object,filterFunction:c.a.func.isRequired,language:c.a.string,format:c.a.object,local:c.a.object};var f=Object(m.a)({loadLocal:!0},h),E=a("./node_modules/material-ui/RadioButton/RadioButtonGroup.js"),b=a.n(E),v=a("./node_modules/material-ui/RadioButton/index.js"),x=a.n(v),g=a("./node_modules/material-ui/Checkbox/index.js"),B=a.n(g),k=a("./node_modules/material-ui/DropDownMenu/index.js"),S=a.n(k),y=a("./node_modules/material-ui/MenuItem/index.js"),P=a.n(y),j=a("./src/components/formatters/reddit/FormattingOptionsReddit.module.scss"),w=a.n(j);var N=({format:{ghosts:e,splitBoxes:t,color:a,boldPerfectIVs:o},updateCurrentFormat:r,isDefault:s})=>l.a.createElement("div",{className:w.a.flexRow},l.a.createElement("div",{className:w.a.column},l.a.createElement("h4",null,"Ghost data"),l.a.createElement(b.a,{name:"Ghosts",valueSelected:e,onChange:(e,t)=>r({ghosts:t}),disabled:s},l.a.createElement(x.a,{value:"show",label:"Show"}),l.a.createElement(x.a,{value:"mark",label:"Mark with ~ (recommended)"}),l.a.createElement(x.a,{value:"hide",label:"Hide"}))),l.a.createElement("div",{className:w.a.column},l.a.createElement("h4",null,"Miscellaneous"),l.a.createElement(B.a,{label:"Split boxes",checked:t,onCheck:(e,t)=>r({splitBoxes:t}),disabled:s}),l.a.createElement(B.a,{label:"Bold perfect IVs",checked:o,onCheck:(e,t)=>r({boldPerfectIVs:t}),disabled:s}),l.a.createElement("div",{className:w.a.menuRow},l.a.createElement("span",null,"Color boxes:"),l.a.createElement(S.a,{value:a,onChange:(e,t)=>r({color:t}),disabled:s},l.a.createElement(P.a,{value:0,primaryText:"None"}),l.a.createElement(P.a,{value:1,primaryText:"Cycle"}),l.a.createElement(P.a,{value:2,primaryText:"Blue"}),l.a.createElement(P.a,{value:3,primaryText:"Green"}),l.a.createElement(P.a,{value:4,primaryText:"Yellow"}),l.a.createElement(P.a,{value:5,primaryText:"Red"})))));a.d(t,"PkmList",function(){return f}),a.d(t,"FormattingOptions",function(){return N})}});