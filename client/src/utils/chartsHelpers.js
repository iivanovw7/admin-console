import React from 'react';
import HorizontalBars from '../components/Statistics/Chart/ChartModes/HorizontalBars';
import PieChart from '../components/Statistics/Chart/ChartModes/PieChart';
import VerticalBars from '../components/Statistics/Chart/ChartModes/VerticalBars';

//returns selected component
export const SwitchedComponent = props => {

  // check the type of the component given in props
  switch (props.type) {

    // render VerticalBars with props
    case 'VBars':
      return (<VerticalBars {...props} />);

    // render HorizontalBars with props
    case 'HBars':
      return (<HorizontalBars {...props} />);

    //render PieChart with props
    case 'PieChart':
      return (<PieChart {...props} />);

    // unknown type ... output null to not render
    default:
      return null; // to return nothing, use null

  }
};

export default SwitchedComponent;

//forms array of data needed to draw charts
export function formDataForCharts(data) {

  let array = [];

  if (!data) {
    return [];
  }

  for (const prop of Object.keys(data)) {
    const value = data[prop];
    if (prop !== 'total' || Object.keys(data).length === 1) {
      array.push({ 'name': prop, 'value': value });
    }
  }
  return array;

}

//forms array of data needed to export in xlsx
export function formDataForExcel(data) {

  let array = [];
  let cols = [];
  let numbers = [];

  if (!data) {
    return [];
  }

  for (const prop of Object.keys(data[0])) {
    const value = data[0][prop];
    cols.push(prop);
    numbers.push(value);
  }

  array.push(cols);
  array.push(numbers);

  return array;

}

//calculates width for chart container according to current breakpoint
export function calculateWidth(screenWidth, breakPoint) {

  switch (breakPoint) {
    case 'xs': {
      return screenWidth * 0.8;
    }
    case 'sm': {
      return screenWidth * 0.6;
    }
    case 'md': {
      return screenWidth * 0.7;
    }
    case 'lg': {
      return screenWidth * 0.37;
    }
    case 'xl': {
      return screenWidth * 0.37;
    }
    default: {
      return screenWidth * 0.37;
    }
  }
}


