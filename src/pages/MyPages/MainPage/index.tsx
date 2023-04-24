// import axios from "axios";
import { Panel } from 'rsuite';
import React from "react";
import { Drawer, Placeholder } from "rsuite";
import { useEffect, useState } from "react";
import { Table, Button } from "rsuite";

// import FormComponent from "../../../";
// import FormComponent from "../../component/Form";

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {

  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
            console.log(rowData.id);
            console.log(dataKey);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};

// const initFormValue={
//   id: data.id,
//   sn: data.sn,
//   name: data.name,
//   ipAddress: data.ipAddress
// }

const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const [formEditId, setFormEditId] = React.useState(0);
  // const [formValue, setFormValue] = useState(initFormValue);
  const [placement, setPlacement] = React.useState();
  const handleOpen = (key) => {
    setFormEditId(key);
    setOpen(true);
    setPlacement("bottom");
  };
  const [data, setData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://172.16.20.171:8082/api/scada/power/gatewayList", { headers })
      .then((result) => {
        console.log(result.data);
        setData(result.data.result);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find((item) => item.id === id)[key] = value;
    setData(nextData);
  };
  const handleEditState = (id) => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find((item) => item.id === id);
    activeItem.status = activeItem.status ? null : "EDIT";
    setData(nextData);
  };

  return (
    <Panel header={<h3 className="title">New Dashboard</h3>}>
      <Table height={450} data={data}>
        {/* <Column width={200}>
          <HeaderCell>Id</HeaderCell>
          <EditableCell dataKey="ID" onChange={handleChange} />
        </Column> */}

        <Column width={200}>
          <HeaderCell>SN</HeaderCell>
          <EditableCell dataKey="SN" onChange={handleChange} />
        </Column>

        <Column width={300}>
          <HeaderCell>Name</HeaderCell>
          <EditableCell dataKey="NAME" onChange={handleChange} />
        </Column>
        <Column width={150}>
          <HeaderCell>Ip Address</HeaderCell>
          <EditableCell dataKey="IP_ADDRESS" onChange={handleChange} />
        </Column>
        <Column width={300}>
          <HeaderCell>Site</HeaderCell>
          <EditableCell dataKey="SITE" onChange={handleChange} />
        </Column>
        <Column width={300}>
          <HeaderCell>Owner</HeaderCell>
          <EditableCell dataKey="OWNER" onChange={handleChange} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell></HeaderCell>
          <ActionCell dataKey="ID" onClick={handleEditState} />
          
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Form</HeaderCell>
          <Cell style={{ padding: "6px" }}>
            {(dataKey:any) => (
              <Button appearance="primary" onClick={() => handleOpen(dataKey)}>
                Edit
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      <Drawer placement="bottom" open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>

        <Drawer.Body>
          <FormComponent formEditId={formEditId}/>
        </Drawer.Body>
      </Drawer>
      </Panel>
  );
};
export default MainPage;




