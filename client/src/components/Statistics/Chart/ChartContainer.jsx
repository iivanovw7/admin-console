import { Grid, withWidth } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeChartStyle, getStatistics } from '../../../actions';
import { ChartsComponents } from '../../../constants/chartsStyles';
import SwitchedComponent, { calculateWidth, formDataForCharts } from '../../../utils';
import Spinner from '../../UI/Spinner';
import { Container } from '../../UI/ThemeProperties';
import { ChartControlPanel } from './ChartControlPanel';

const ChartContainer = props => {

  const { history, dispatch, dataType, width } = props;
  const limits = [6, 12, 24, 36, 48];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [chartType, setChartType] = useState(props.style);
  const [limit, setLimit] = useState(props.months || 12);

  //Getting current screen width for adaptive charts
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  //Changing time period for stats request (in months)
  useEffect(() => {
    dispatch(changeChartStyle(dataType, chartType));
    dispatch(getStatistics(dataType, history, limit));
  }, [limit, chartType]);

  const handleLimitSelect = event => {
    setLimit(event.target.value);
  };

  const handleTypeSelect = event => {
    setChartType(ChartsComponents[event.target.value]);
  };

  //renders selected chart
  const renderStatsContainer = () => (
    <SwitchedComponent
      {...chartType}
      data={formDataForCharts(props.stats[0])}
      dataType={dataType}
      breakPoint={width}
      width={calculateWidth(screenWidth, width)}
    />
  );

  return (
    <Grid item md={12} lg={6} style={{ width: '100%' }}>
      <h3>{dataType}</h3>
      <ChartControlPanel
        limits={limits}
        limit={limit}
        handleLimitSelect={handleLimitSelect}
        handleTypeSelect={handleTypeSelect}
        style={props.style}
        classes={props.classes}
        stats={!props.stats ? {} : props.stats}
        total={!props.stats ? 0 : props.stats[0].total}
        {...props}
      />
      <div style={{ minHeight: 100 }}>
        {!props.stats ? <Spinner/> : renderStatsContainer()}
      </div>
    </Grid>
  );
};

ChartContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  style: PropTypes.any.isRequired,
  width: PropTypes.any.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    stats: state.stats[ownProps.dataType.toLocaleLowerCase()].data,
    months: state.stats[ownProps.dataType.toLocaleLowerCase()].months,
    style: state.stats[ownProps.dataType.toLocaleLowerCase()].chartsStyle,
    errorMessage: state.stats.error,
    successMessage: state.stats.success,
    messageConfirmed: state.stats.confirmed
  };
}

export default connect(mapStateToProps, {
  getStatistics,
  changeChartStyle
})(withWidth()(withStyles(Container)(ChartContainer)));
