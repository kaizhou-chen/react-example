import{r,j as a}from"./index.A5_RCYys.2024-07-15_11.00.50.js";import x from"./Chart.Dkuuhf1T.2024-07-15_11.00.50.js";import{C as m}from"./index.DFujJypi.2024-07-15_11.00.50.js";import"./debounce.CJ01Vb4c.2024-07-15_11.00.50.js";import"./main.BkD57bvT.2024-07-15_11.00.50.js";import"./useSize.B5R39EM4.2024-07-15_11.00.50.js";import"./index.CC-Hjpgm.2024-07-15_11.00.50.js";import"./CloseOutlined.dEC9RxCi.2024-07-15_11.00.50.js";import"./EllipsisOutlined.BHz-VW5L.2024-07-15_11.00.50.js";import"./index.ssiFPKLK.2024-07-15_11.00.50.js";import"./KeyCode.DNlgD2sM.2024-07-15_11.00.50.js";import"./Overflow.B_ox2rJe.2024-07-15_11.00.50.js";import"./PlusOutlined.BDkxnF19.2024-07-15_11.00.50.js";function R(){const[s,n]=r.useState();r.useEffect(()=>{const e=p();n(e)},[]);function p(){return{title:{text:"销售额"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:o=>{const t=[];return t.push(`<div>${o[0].name}</div>`),o.forEach((i,l)=>{let d=l===2?"%":"";t.push(`<div class="ux-chart-tooltip" style="min-width: 120px;">
              <div class="dot" style="background-color: ${i.color}"></div>
              <div>${i.seriesName}</div>
              <div style="flex: 1; text-align: right;">${i.data+d}</div>
            </div>`)}),t.join("")}},legend:{top:"9%",data:["销售额","净利润","利润率"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},yAxis:[{type:"value"},{type:"value",axisLabel:{show:!0,interval:"auto",formatter:"{value}%"}}],xAxis:{type:"category",data:["一月","二月","三月","四月","五月","六月","七月"]},series:[{name:"销售额",type:"bar",label:{show:!0,position:"insideRight"},yAxisIndex:0,data:[320,302,301,334,390,330,320]},{name:"净利润",type:"bar",label:{show:!0,position:"insideRight"},yAxisIndex:0,data:[120,132,101,134,90,230,210]},{name:"利润率",type:"line",label:{show:!0,position:"insideRight",formatter:"{c}%"},yAxisIndex:1,data:[45,52,63,58,41,53,58]}]}}return a.jsx(m,{children:a.jsx(x,{option:s,style:{height:"405px"}})})}export{R as default};
