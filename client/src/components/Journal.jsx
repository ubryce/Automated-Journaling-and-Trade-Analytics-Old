import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';

const Journal = ({fetchAgain, setFetchAgain}) => {
    const { user, selectedJournal } = useStateContext();

    const toolbarOptions = ['Search'];

    const editing = { allowDeleting: true, allowEditing: true };

    const navigate = useNavigate();

    let gridInstance = null
    const rowSelected = () => {
        if(gridInstance) {
          const selectedrowindex = gridInstance.getSelectedRowIndexes();
          const selectedrecords = gridInstance.getSelectedRecords();
          alert(selectedrowindex + " : " + JSON.stringify(selectedrecords))
          navigate('/');
        }
    };

    const finishedTradeGrid = [
      { field: 'Side',
        headerText: 'Side',
        width: '125',
        textAlign: 'Center' },
      { field: 'Asset',
        headerText: 'Asset',
        width: '125',
        textAlign: 'Center',
      },
      { field: 'Size',
        headerText: 'Designation',
        width: '125',
        textAlign: 'Center',
      },
      { headerText: 'Close Date',
        width: '125',
        format: 'yMd',
        textAlign: 'Center',
      },
      { field: 'Entry',
        headerText: 'Entry',
        width: '125',
        format: 'yMd',
        textAlign: 'Center' },
    
      { field: 'Exit',
        headerText: 'Exit',
        width: '125',
        textAlign: 'Center' },
      { field: 'Duration',
        headerText: 'Duration',
        width: '125',
        textAlign: 'Center' },
      { field: 'Result',
        headerText: 'Result',
        width: '125',
        textAlign: 'Center' },
    ];

    return (
        <div>
          <GridComponent
            dataSource={selectedJournal.journalTrades}
            width="auto"
            allowPaging
            allowSorting
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
            toolbar={toolbarOptions}
            ref={grid => gridInstance = grid}
            rowSelected={rowSelected}
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {finishedTradeGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              
            </ColumnsDirective>
            <Inject services={[Search, Page, Toolbar]} />

          </GridComponent>
        </div>
    )
}

export default Journal