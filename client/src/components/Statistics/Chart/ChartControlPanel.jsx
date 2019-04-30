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
import { TimeLimitSelector } from './ControlElements/TimeLimitSelector';

export const ChartControlPanel = props => {
  const { classes, dataType, limit, limits, handleLimitSelect, handleTypeSelect, total, style, stats } = props;
  const [appendCsv, setCsvReport] = useState(false);

  function sendChartToPrint() {

    //gets component with chart by id
    const content = document.getElementById(dataType);

    //gets empty iframe by id
    const pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open(); //opens iframe
    pri.document.write(content.innerHTML); //writes chart into iframe
    pri.document.close(); //closes iframe
    pri.focus(); //send iframe to the front)
    pri.print(); //triggers browser built-in print function
  }

  function exportToXlsx() {
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
  handleLimitSelect: PropTypes.func.isRequired,
  handleTypeSelect: PropTypes.func.isRequired,
  stats: PropTypes.any,
  total: PropTypes.number.isRequired
};
