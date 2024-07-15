import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { throttle } from 'lodash-es'
import echarts from './echarts'

interface Props {
  option: object | null | undefined;
  style: any;
  registerMap?: any;
}

function Chart(props: Props) {
  const chartEl = useRef(null)

  const [localStyle, setLocalStyle] = useState(props.style);

  let chart: any = null;

  useEffect(() => {
    setLocalStyle(props.style)
  }, [props.style])

  // 组件更新后，重新生成图表
  useEffect(() => {
    renderChart(props.option);
  })

  useLayoutEffect(() => {
    renderChart(props.option);
    // @ts-ignore
    resizeObserver.observe(chartEl.current, { box: "border-box" });

    return () => {
      dispose()
      // @ts-ignore
      resizeObserver.unobserve(chartEl.current);
    }
  }, [])

  // 监听尺寸变化，重新渲染图标
  const refresh = throttle(() => {
    if (chart) {
      renderChart(props.option)
    }
  }, 1500)

  const resizeObserver = new ResizeObserver((entries) => {
    refresh()
  });

  // 渲染图表、销毁图表
  function dispose() {
    if (chart) {
      chart.dispose()
      chart = null;
    }
  }

  function renderChart(option: any) {
    if (!option) {
      return;
    }

    dispose()
    chart = echarts.init(chartEl.current);
    // 如果是地图，需要注册地图
    if (props.registerMap) {
      props.registerMap(echarts)
    }
    chart.clear();
    chart.setOption(option);
  }

  return (
    <div ref={chartEl} style={localStyle}></div>
  )
}

export default Chart