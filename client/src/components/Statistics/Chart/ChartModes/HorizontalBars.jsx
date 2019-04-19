import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { withFauxDOM } from 'react-faux-dom';

const HorizontalBars = props => {
  const data = props.data;
  const margin = ({top: 30, right: 15, bottom: 10, left: 90});
  const frameName = props.dataType;
  const height = data.length * 25 + margin.top + margin.bottom;
  const width = props.width;

  const x = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.value)])
              .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
              .domain(data.map(d => d.name))
              .range([margin.top, height - margin.bottom])
              .padding(0.1);

  const format = d3.format(",d");

  const xAxis = g => g
    .attr('transform', `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80))
    .call(g => g.select('.domain').remove());

  const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0));

  useEffect(() => {

    const faux = props.connectFauxDOM('svg', frameName);

    d3.select(faux)
      .selectAll('g').remove();

    d3.select(faux)
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', x(0))
      .attr('y', d => y(d.name))
      .attr('width', d => x(d.value) - x(0))
      .attr('height', y.bandwidth())
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 0)
      .on('mouseover', () => {
        d3.select(d3.event.target)
          .transition()
          .duration(500)
          .attr('fill', '#2196f3')
          .attr('stroke-width', 2);
      })
      .on('mouseout', () => {
        d3.select(d3.event.target)
          .transition()
          .duration(500)
          .attr('stroke-width', 0)
          .attr('fill', 'steelblue');
      });

    d3.select(faux)
      .append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .style('font', '12px sans-serif')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', d => x(d.value) - 4)
      .attr('y', d => y(d.name) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .text(d => format(d.value));

    d3.select(faux)
      .append('g')
      .call(xAxis);

    d3.select(faux)
      .append('g')
      .call(yAxis);

    props.animateFauxDOM(800);
  }, [data]);

  return (
    <div id={props.dataType}>
      <svg className='renderedD3' style={{ width: width, height: height }}>
        {props[frameName]}
      </svg>
    </div>
  );
};

export default withFauxDOM(HorizontalBars);

