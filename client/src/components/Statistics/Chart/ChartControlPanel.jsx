import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CSVDownload } from 'react-csv';
import XLSX from 'xlsx';
import { ChartsComponents } from '../../../constants/chartsStyles';
import csvIcon from '../../../icons/csv-file-format-symbol.svg';
import pdfIcon from '../../../icons/pdf-file-format-symbol.svg';
import xlsxIcon from '../../../icons/xlsx-file-format-symbol.svg';
import { formDataForExcel } from '../../../utils';
import { ChartTypeSelector } from './ControlElements/ChartTypeSelector';
import { TopInfoBarButton } from './ControlElements/ReportButton';
import { TimeLimitSelector } from './ControlElements/TimeLimitSelector';

export const ChartControlPanel = props => {
  const { classes, dataType, limit, limits, handleLimitSelect, handleTypeSelect, total, style, stats } = props;
  const [appendCsv, setCsvReport] = useState(false);

  //find chart container by ID, then append content to iframe to focus and print
  function print() {
    const content = document.getElementById(dataType);
    const pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  //Create and save XLSX report
  function xlsxExport() {
    const data = formDataForExcel(stats);
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, 'Report');
    XLSX.writeFile(new_workbook, 'out.xlsx');
  }

  useEffect(() => {
    setCsvReport(false);
  }, [appendCsv]);

  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10
      }}
    >
      <iframe
        title='ifmcontentstoprint'
        id='ifmcontentstoprint'
        style={{
          height: '0px',
          width: '0px',
          position: 'absolute',
          border: 0
        }}>
      </iframe>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TimeLimitSelector
          classes={classes}
          dataType={dataType}
          limit={limit}
          limits={limits}
          handleLimit={handleLimitSelect}
        />
        <ChartTypeSelector
          classes={classes}
          dataType={dataType}
          option={style}
          options={ChartsComponents}
          handleSelect={handleTypeSelect}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <strong className={classes.desktop}>
            Total: {total}
          </strong>
        </div>
      </div>
      <div className={classes.reportBtnContainer}>
        <TopInfoBarButton
          classes={classes}
          title={'CSV'}
          image={csvIcon}
          alt={'Create csv report'}
          handleClick={() => {
            setCsvReport(true);
          }}
        />
        <TopInfoBarButton
          classes={classes}
          title={'XLSX'}
          image={xlsxIcon}
          alt={'Create excel report'}
          handleClick={() => {
            xlsxExport();
          }}
        />
        <TopInfoBarButton
          classes={classes}
          title={'PDF'}
          image={pdfIcon}
          alt={'Create pdf report'}
          handleClick={() => {
            print();
          }}
        />
      </div>
      {appendCsv && (
        <CSVDownload
          data={stats}
          target='_blank'
        />
      )}
    </Paper>
  );
};

ChartControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  handleLimitSelect: PropTypes.func.isRequired,
  handleTypeSelect: PropTypes.func.isRequired,
  stats: PropTypes.any,
  style: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired
};