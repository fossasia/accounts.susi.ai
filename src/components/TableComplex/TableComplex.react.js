import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import TextField from 'material-ui/TextField';

const styles = {
  tableHeaderColumnStyle: {
    width: '120px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  tableRowStyle: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  tableRowColumnStyle: {
    width: '40px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    paddingLeft: '0px',
  },
};

class TableComplex extends Component {
  static propTypes = {
    tableData: PropTypes.array,
    startEditing: PropTypes.func,
    stopEditing: PropTypes.func,
    handleChange: PropTypes.func,
    handleRemove: PropTypes.func,
    handleRemoveConfirmation: PropTypes.func,
    editIdx: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 'inherit',
    };
  }

  render() {
    const {
      height,
      selectable,
      multiSelectable,
      showCheckboxes,
      enableSelectAll,
      deselectOnClickaway,
      showRowHover,
      stripedRows,
    } = this.state;
    const {
      tableData,
      editIdx,
      handleChange,
      stopEditing,
      startEditing,
      handleRemoveConfirmation,
    } = this.props;
    const {
      tableHeaderColumnStyle,
      tableRowColumnStyle,
      tableRowStyle,
    } = styles;

    return (
      <div>
        <Table
          height={height}
          selectable={selectable}
          multiSelectable={multiSelectable}
          fixedHeader={false}
          style={{ width: 'auto', tableLayout: 'auto', marginLeft: 'unset' }}
        >
          <TableHeader
            displaySelectAll={showCheckboxes}
            adjustForCheckbox={showCheckboxes}
            enableSelectAll={enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn style={tableHeaderColumnStyle}>
                Device Name
              </TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderColumnStyle}>
                Mac Address
              </TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderColumnStyle}>
                Room
              </TableHeaderColumn>
              <TableHeaderColumn style={tableHeaderColumnStyle}>
                Geolocation
              </TableHeaderColumn>
              <TableHeaderColumn
                style={{
                  width: '40px',
                  paddingLeft: '0px',
                }}
              />
              <TableHeaderColumn
                style={{
                  ...tableHeaderColumnStyle,
                  width: '40px',
                  paddingLeft: '0px',
                }}
              />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={showCheckboxes}
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            stripedRows={stripedRows}
          >
            {/* eslint-disable-next-line */}
            {tableData &&
              tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    {editIdx === index ? (
                      <TextField
                        name={index.toString()}
                        onChange={e => handleChange(e, 'devicename', index)}
                        value={row.devicename}
                        style={{ fontSize: '13px', width: '80px' }}
                      />
                    ) : (
                      row.devicename
                    )}
                  </TableRowColumn>
                  <TableRowColumn
                    style={{
                      ...tableRowStyle,
                      paddingLeft: '0px',
                      paddingRight: '0px',
                    }}
                  >
                    {row.macid}
                  </TableRowColumn>
                  <TableRowColumn style={tableRowStyle}>
                    {editIdx === index ? (
                      <TextField
                        name={index.toString()}
                        onChange={e => handleChange(e, 'room', index)}
                        value={row.room}
                        style={{ fontSize: '13px', width: '80px' }}
                      />
                    ) : (
                      row.room
                    )}
                  </TableRowColumn>
                  <TableRowColumn
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    {!(
                      row.latitude === 'Latitude not available.' ||
                      row.longitude === 'Longitude not available.'
                    )
                      ? row.latitude + ', ' + row.longitude
                      : 'Location not available'}
                  </TableRowColumn>
                  <TableRowColumn style={tableRowColumnStyle}>
                    {editIdx === index ? (
                      <CheckIcon
                        onClick={() => stopEditing(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : (
                      <EditIcon
                        onClick={() => startEditing(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </TableRowColumn>
                  <TableRowColumn style={tableRowColumnStyle}>
                    <TrashIcon
                      onClick={() => handleRemoveConfirmation(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TableComplex;
