import * as d3 from "d3";
import { useEffect } from "react";
import { useRef } from "react";
import { spendListState } from "../recoil/spendListAtom";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";

const Chart = () => {
  const spendList = useRecoilValue(spendListState);
  const svgRef = useRef(null);
  const width = 550;
  const height = 250;

  // 막대에 호버하면 해당 일자 한끼금액 막대 상단에 노출
  // done xAxis 에 날짜 MM-dd 형식으로 노출
  // 디자인
  // done 데이터 불러올때마다 그래프 새로고침 (새로고침, 페이지 이동, 기간 검색)
  // 왼쪽부터 촤르륵 하면서 그래프 등장
  // done 중복으로 나타나지 않음

  useEffect(() => {
    let [mt, mb, ml, mr] = [20, 30, 60, 60];
    const reversedSpendList = [...spendList].reverse();
    const svg = d3.select(svgRef.current);

    // 이전 그래프가 없을때만 새로 캔버스
    let graph = svg.select(".graph");
    if (graph.empty()) {
      const newSvg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      graph = newSvg
        .append("g")
        .attr("class", "graph")
        .attr("width", width - ml - mr)
        .attr("height", height - mb - mt)
        .attr("transform", `translate(${ml}, ${mt})`);
    }
    const graphWidth = width - ml - mr;
    const graphHeight = height - mb - mt;

    /* 축 그리기 */
    const previousXAxis = graph.selectAll(".x-axis");
    const previousYAxis = graph.selectAll(".y-axis");
    previousXAxis.transition().duration(500).style("opacity", 0).remove();
    previousYAxis.transition().duration(500).style("opacity", 0).remove();

    const xAxisG = graph
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${graphHeight})`);

    const yAxisG = graph.append("g").attr("class", "y-axis");

    const x = d3
      .scaleBand()
      .domain(
        reversedSpendList.map((item) => format(new Date(item.date), "MM-dd"))
      )
      .range([0, graphWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          reversedSpendList,
          (item) =>
            item.items.reduce((acc, cur) => acc + cur.price, 0) / item.mealCount
        ),
      ])
      .range([graphHeight, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(3);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    /* 새로운 차트 생성 */
    /* 차트 그리기 */
    const bars = graph.append("g").selectAll(".bar").data(reversedSpendList);

    const barsGroup = bars
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .on("mouseover", function () {
        d3.select(this)
          .select(".bar")
          .attr("opacity", 0.7)
          .style("stroke", "black")
          .style("stroke-width", "2px");
        d3.select(this).select(".barText").style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this)
          .select(".bar")
          .attr("opacity", 1)
          .style("stroke", "none");
        d3.select(this).select(".barText").style("opacity", 0);
      });

    // 이전 rect 삭제
    const previousBars = graph.selectAll("rect");
    previousBars.transition().duration(500).style("opacity", 0).remove();

    // rect 그리기
    barsGroup
      .append("rect")
      .attr("class", "bar")
      .attr(
        "height",
        (item) =>
          graphHeight -
          y(
            item.items.reduce((acc, cur) => acc + cur.price, 0) / item.mealCount
          )
      )
      .attr("width", x.bandwidth)
      .attr("x", (item) => x(format(new Date(item.date), "MM-dd")))
      .attr("y", (item) =>
        y(item.items.reduce((acc, cur) => acc + cur.price, 0) / item.mealCount)
      )
      .style("fill", "#3B5BDB");

    // 이전 text 삭제
    const previousText = graph.selectAll(".barText");
    previousText.transition().duration(500).style("opacity", 0).remove();

    // text 그리기
    barsGroup
      .append("text")
      .attr("class", "barText")
      .style("font-size", "14px")
      .style("opacity", 0)
      .attr("x", (item) => x(format(new Date(item.date), "MM-dd")))
      .attr(
        "y",
        (item) =>
          y(
            item.items.reduce((acc, cur) => acc + cur.price, 0) / item.mealCount
          ) - 5
      )
      .text(
        (item) =>
          `${Math.floor(
            item.items.reduce((acc, cur) => acc + cur.price, 0) / item.mealCount
          ).toLocaleString("ko-KR")}원`
      );

    xAxisG
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
  }, [spendList]);

  return (
    <div className="flex items-center justify-center mb-4 w-full rounded-lg p-3 bg-white border-2 border-indigo-500">
      <div className="canvas" ref={svgRef}></div>
    </div>
  );
};

export default Chart;
