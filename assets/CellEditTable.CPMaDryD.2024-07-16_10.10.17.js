import{r as c,j as p}from"./index.yAVndTQV.2024-07-16_10.10.17.js";import h from"./CellEditor.Dt3ez-1z.2024-07-16_10.10.17.js";import{d as f,o as u}from"./tableData.BTIq064J.2024-07-16_10.10.17.js";import{F as y}from"./Table.BJfasK-e.2024-07-16_10.10.17.js";import{A as E}from"./index.BQ_LQERs.2024-07-16_10.10.17.js";import"./InputEditor.bW7gfxLZ.2024-07-16_10.10.17.js";import"./index.tzcU0Yrt.2024-07-16_10.10.17.js";import"./ContextIsolator.BYzJWBGg.2024-07-16_10.10.17.js";import"./main.CrRj0arD.2024-07-16_10.10.17.js";import"./Compact.BG541cxf.2024-07-16_10.10.17.js";import"./useSize.BCYZpnQ5.2024-07-16_10.10.17.js";import"./index.BZlf2dsF.2024-07-16_10.10.17.js";import"./collapse.BbEVqHco.2024-07-16_10.10.17.js";import"./index.CHHsEmMV.2024-07-16_10.10.17.js";import"./reactNode.DW83qWeS.2024-07-16_10.10.17.js";import"./row.qIUv9o-2.2024-07-16_10.10.17.js";import"./responsiveObserver.DVbAj7vt.2024-07-16_10.10.17.js";import"./QuestionCircleOutlined.BfD1sMow.2024-07-16_10.10.17.js";import"./index.DXxfDrD4.2024-07-16_10.10.17.js";import"./index.fvJ2s5s2.2024-07-16_10.10.17.js";import"./compact-item.5orumCwJ.2024-07-16_10.10.17.js";import"./BaseInput.B9hndMQZ.2024-07-16_10.10.17.js";import"./useVariants.BUZxCIVY.2024-07-16_10.10.17.js";import"./pickAttrs.CrGdz-G0.2024-07-16_10.10.17.js";import"./EyeInvisibleOutlined.CozjUhBV.2024-07-16_10.10.17.js";import"./EyeOutlined.CCe--QzZ.2024-07-16_10.10.17.js";import"./SearchOutlined.CajD6swK.2024-07-16_10.10.17.js";import"./button.B0eiudYs.2024-07-16_10.10.17.js";import"./NumberEditor.D1dvsQK8.2024-07-16_10.10.17.js";import"./DownOutlined.Dvc6LtQJ.2024-07-16_10.10.17.js";import"./UpOutlined.Dr98jh9F.2024-07-16_10.10.17.js";import"./DateEditor.C1PlwIPf.2024-07-16_10.10.17.js";import"./index.CLv1otT0.2024-07-16_10.10.17.js";import"./PurePanel.C0PkgfxI.2024-07-16_10.10.17.js";import"./SwapRightOutlined.Cz8VzmFN.2024-07-16_10.10.17.js";import"./Overflow.pfFV3mvy.2024-07-16_10.10.17.js";import"./useIcons.Dy78e0oZ.2024-07-16_10.10.17.js";import"./CheckOutlined.CLx-yJFf.2024-07-16_10.10.17.js";import"./CloseOutlined.DrRXahxI.2024-07-16_10.10.17.js";import"./SelectEditor.BWXNF-Db.2024-07-16_10.10.17.js";import"./index.CUNaBznj.2024-07-16_10.10.17.js";import"./useShowArrow.DuodIs2x.2024-07-16_10.10.17.js";import"./KeyCode.DNlgD2sM.2024-07-16_10.10.17.js";import"./List.DrjmHvVO.2024-07-16_10.10.17.js";import"./addEventListener.DMvbmUMd.2024-07-16_10.10.17.js";import"./index.BNqdoqoE.2024-07-16_10.10.17.js";import"./conductUtil.vlq8qDxn.2024-07-16_10.10.17.js";import"./PlusSquareOutlined.DD3UGnP1.2024-07-16_10.10.17.js";import"./index.BWwKit6j.2024-07-16_10.10.17.js";import"./useMultipleSelect.K7wCLGoe.2024-07-16_10.10.17.js";import"./DoubleRightOutlined.DRUpmYSb.2024-07-16_10.10.17.js";import"./LeftOutlined.C-0sEjIY.2024-07-16_10.10.17.js";import"./EllipsisOutlined.BH_mYFmO.2024-07-16_10.10.17.js";import"./index.D9p1QX4v.2024-07-16_10.10.17.js";import"./useBreakpoint.CoS_g3sh.2024-07-16_10.10.17.js";import"./useForceUpdate.DOY6KeES.2024-07-16_10.10.17.js";import"./index.BTNQw-TU.2024-07-16_10.10.17.js";import"./index.lFl4EQ6E.2024-07-16_10.10.17.js";import"./CaretUpOutlined.bfpYB6sl.2024-07-16_10.10.17.js";import"./InfoCircleFilled.CNttOYev.2024-07-16_10.10.17.js";function vt(){const[o,m]=c.useState([]),s=j((i,t)=>{const e=o[i];e.editing=t,m([...o])},(i,t,e)=>{const r=o[i];r[t]=e,delete r.editing,m([...o])});return c.useEffect(()=>{f.forEach((i,t)=>{i.key=t}),m(f)},[]),p.jsxs("div",{children:[p.jsx(y,{style:{width:"100%"},bordered:!0,columns:s,dataSource:o,scroll:{x:1e3},pagination:!1}),p.jsx(E,{style:{marginTop:"20px"},showIcon:!0,type:"warning",message:p.jsx("p",{children:"点击单元格，编辑数据"})})]})}function j(o,m){return[{title:"日期",field:"date",type:"date"},{title:"名称",field:"name",type:"text"},{title:"年龄",field:"age",type:"number"},{title:"地区",field:"area",type:"select"},{title:"地址",field:"address"}].map(s=>{const{title:i,field:t,type:e}=s;return e?{title:i,dataIndex:t,key:t,width:200,render:(r,n,d)=>{var a;return n.editing===t?p.jsx(h,{type:e,value:r,options:u,focus:!0,onChange:l=>m(d,t,l)}):p.jsx("div",{style:{height:"32px",lineHeight:"32px"},children:e!=="select"?r:(a=u.find(l=>l.value===r))==null?void 0:a.label})},onCell:(r,n)=>({onClick:d=>{o(n,t)}})}:{title:i,dataIndex:t,key:t,render:(r,n,d)=>p.jsx("div",{children:r})}})}export{vt as default};
