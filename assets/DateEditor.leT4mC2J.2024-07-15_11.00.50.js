import{r as p,j as i}from"./index.A5_RCYys.2024-07-15_11.00.50.js";import{d as l,D as f}from"./index.DMSqGERw.2024-07-15_11.00.50.js";import{F as m}from"./index.GPB0Veiu.2024-07-15_11.00.50.js";import"./main.BkD57bvT.2024-07-15_11.00.50.js";import"./PurePanel.1CntK9Wm.2024-07-15_11.00.50.js";import"./index.ssiFPKLK.2024-07-15_11.00.50.js";import"./useSize.B5R39EM4.2024-07-15_11.00.50.js";import"./SwapRightOutlined.C9sNAccJ.2024-07-15_11.00.50.js";import"./pickAttrs.CoR-7awW.2024-07-15_11.00.50.js";import"./Overflow.B_ox2rJe.2024-07-15_11.00.50.js";import"./ContextIsolator.CLjvY27q.2024-07-15_11.00.50.js";import"./Compact.BVlaTQGL.2024-07-15_11.00.50.js";import"./index.BaWYTrqt.2024-07-15_11.00.50.js";import"./reactNode.D2Y6dV9y.2024-07-15_11.00.50.js";import"./useVariants.D-pOHXpd.2024-07-15_11.00.50.js";import"./index.DDtRjkpN.2024-07-15_11.00.50.js";import"./compact-item.5orumCwJ.2024-07-15_11.00.50.js";import"./useIcons.47OKQnWA.2024-07-15_11.00.50.js";import"./CheckOutlined.CF9JIkbF.2024-07-15_11.00.50.js";import"./CloseOutlined.dEC9RxCi.2024-07-15_11.00.50.js";import"./DownOutlined.DHm9oZvC.2024-07-15_11.00.50.js";import"./SearchOutlined.C7x3dIvf.2024-07-15_11.00.50.js";import"./button.Cra3yNpi.2024-07-15_11.00.50.js";import"./collapse.BbEVqHco.2024-07-15_11.00.50.js";import"./row.D8vMAbAC.2024-07-15_11.00.50.js";import"./responsiveObserver.CzQYBw52.2024-07-15_11.00.50.js";import"./QuestionCircleOutlined.peoPbWj6.2024-07-15_11.00.50.js";const a="YYYY-MM-DD";function K(r){const[t]=m.useForm(),s=p.useRef(null),e="value",c=[{required:!0,message:""}];function u(){t.validateFields().then(()=>{const o=t.getFieldValue(e).format(a);r.onChange(o)})}return p.useEffect(()=>{const n=l(r.value,a);if(t.setFieldValue(e,n),r.focus){const o=s.current;o.focus(),o.nativeElement.click()}},[]),i.jsx(m,{form:t,children:i.jsx(m.Item,{name:e,rules:c,children:i.jsx(f,{ref:s,format:a,onChange:u})})})}export{K as default};
