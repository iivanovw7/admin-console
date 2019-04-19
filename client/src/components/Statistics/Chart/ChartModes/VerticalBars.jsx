import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { withFauxDOM } from 'react-faux-dom';

const VerticalBars = props => {
  const data = props.data;
  const margin = ({ top: 20, right: 10, bottom: 80, left: 60 });
  const frameName = props.dataType;
  const height = 350;
  const width = props.width;

  const x = d3.scaleBand()
              .domain(data.map(d => d.name))
              .range([margin.left, width - margin.right])
              .padding(0.1);


  const y = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.value)]).nice()
              .range([height - margin.bottom, margin.top]);

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)');

  const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select('.domain').remove());

  useEffect(() => {

    const header = props.connectFauxDOM('div', `${frameName}div`);
    const faux = props.connectFauxDOM('svg', frameName);

    d3.select(faux)
      .selectAll('g').remove();

    d3.select(header)
      .selectAll('div').remove();

    const tooltip = d3.select(header)
                      .append('div')
                      .attr('class', 'tooltip')
                      .style('height', 20)
                      .style('width', '100%')
                      .style('margin-top', 10)
                      .style('text-align', 'left')
                      .style('opacity', 0);

    d3.select(faux)
      .append('g')
      .style('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 0)
      .on('mouseover', (d) => {
        tooltip.transition().duration(200).style('opacity', 1);
        tooltip.html(`Quantity: ${d.value}`);
        d3.select(d3.event.target)
          .transition()
          .duration(500)
          .attr('fill', '#2196f3')
          .attr('stroke-width', 2);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(d3.event.target)
          .transition()
          .duration(500)
          .attr('stroke-width', 0)
          .attr('fill', 'steelblue');
      });

    d3.select(faux)
      .append('g')
      .call(xAxis);

    d3.select(faux)
      .append('g')
      .call(yAxis)
      .append('text')
      .attr('fill', 'black')
      .style('font', '11px sans-serif')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -30)
      .attr('dy', '0.15em')
      .style('text-anchor', 'end')
      .text('Quantity');

    props.animateFauxDOM(800);
  }, [data]);


  props.animateFauxDOM(800);
  return (
    <div id={props.dataType}>
      {props[`${frameName}div`]}
      <div>
        <svg className='renderedD3' style={{ width: width, height: height }}>
          {props[frameName]}
        </svg>
      </div>
    </div>
  );
};

export default withFauxDOM(VerticalBars);

