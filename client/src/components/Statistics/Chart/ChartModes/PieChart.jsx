import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { withFauxDOM } from 'react-faux-dom';

const PieChart = props => {
  const data = props.data;
  const frameName = props.dataType;
  const height = 350;
  const width = props.width;
  const radius = Math.min(width, height) / 2.3;

  useEffect(() => {

    const header = props.connectFauxDOM('div', `${frameName}div`);
    const faux = props.connectFauxDOM('svg', frameName);

    d3.select(faux)
      .selectAll('svg').remove();

    d3.select(header)
      .selectAll('div').remove();

    const svg = d3.select(faux)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .append('g')
                  .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie()
                  .value(d => d.value)
                  .sort(null);

    const arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius);

    const path = svg.selectAll('path')
                    .data(pie(data));

    const tooltip = d3.select(header)
                      .append('div')
                      .attr('class', 'tooltip')
                      .style('height', 20)
                      .style('width', '100%')
                      .style('margin-top', 10)
                      .style('text-align', 'left')
                      .style('opacity', 0);


    path.enter()
        .append('path')
        .attr('fill', 'steelblue')
        .attr('d', arc)
        .attr('stroke', 'white')
        .attr('stroke-width', '2px')
        .data(data)
        .on('mouseover', d => {
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.html(`${d.name.toUpperCase()}`);
          d3.select(d3.event.target)
            .transition()
            .duration(500)
            .attr('fill', '#2196f3')
            .attr('stroke', '#2196f3');
        })
        .on('mouseout', () => {
          tooltip.transition().duration(500).style('opacity', 0);
          d3.select(d3.event.target)
            .transition()
            .duration(500)
            .attr('fill', 'steelblue')
            .attr('stroke', 'white');
        });

    path.enter()
        .append('text')
        .attr('transform', function (d) {
          return 'translate(' + arc.centroid(d)[0] * 1.6 + ',' + arc.centroid(d)[1] * 1.6 + ')';
        })
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(d => {
          return d.value;
        });

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

export default withFauxDOM(PieChart);