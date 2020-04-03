import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Row, Col, Layout ,Table, Tag} from 'antd';
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
  } from '@ant-design/icons';
import CountryService from '../services/countryService';
import 'antd/dist/antd.css';


class DataTable extends React.Component {


  state = {
    data : []
  }

  columns = [{
    title: 'Zip Name',
    dataIndex: 'zipFileName',
    key: 'zipFileName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Extracted Name',
    dataIndex: 'extractedFileName',
    key: 'extractedFileName',
  },
  {
    title: 'File Contnet',
    dataIndex: 'fileContent',
    key: 'fileContent',
  },
  {
    title: 'Country',
    dataIndex: 'countryName',
    key: 'countryName',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render : status => {
      let color = "red"
      if(status == "SUCCESS"){
        color = "green"
      }
      return (
        <Tag color={color} key={status} > {status} </Tag>
      )
    }
  },
  {
    title: 'Date',
    dataIndex : 'date',
    key: 'date',
    
  },
];
  

onCountryCall = () =>{
  CountryService.getCountryInfo().then(res => {
    this.setState({data : res})
    
  })
}
 

  render() {
  this.onCountryCall();
    return (
        <div>
            <Table columns={this.columns} dataSource={this.state.data} />
        </div>
    )
  }
}

export default DataTable;